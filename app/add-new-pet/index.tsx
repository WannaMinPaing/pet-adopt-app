import { View, Text, Image, TextInput, ScrollView, TouchableOpacity, Pressable, ToastAndroid, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import images from '@/constants/images';
import { Picker } from '@react-native-picker/picker';
import { collection, doc, getDocs, refEqual, setDoc } from 'firebase/firestore';
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage';
import { db, storage } from '@/config/FirebaseConfig';
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';
import { useUser } from '@clerk/clerk-expo';

type categoryListProps = {
    name: string;
    imageUrl: string;
  };

export default function AddNewPet() {

    const nagivation = useNavigation();
    const [formData,setFormData] = useState<{ [key: string]: string }>({
        category : 'Dogs',
        sex : 'Male'
    }); 
    const [gender,setGender] = useState<string>('');

    const [categoryList, setCategoryList] = useState<categoryListProps[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [image, setImage] = useState<string  | null>(null);
    const [loader,setLoader] = useState<boolean>(false);
    const {user} = useUser();
    const router = useRouter();


    const handleInputChange = (fieldName:string,filedValue:string) => {
        setFormData( prevFormData => ({
            ...prevFormData,[fieldName] : filedValue
        }))
    }

    const GetCategories = async () => {
        try {
          setCategoryList([]);
          const snapshot = await getDocs(collection(db, "Category"));
    
          snapshot.docs.forEach((doc, index) => {
            const data = doc.data() as categoryListProps;
            setCategoryList((prevCategoryList) => [...prevCategoryList, data]);
          });
        } catch (error) {
          console.log(error);
        }
    };


    const imagePicker = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
        setImage(result.assets[0].uri);
        }
    };

    const UploadImage =async () => {
        setLoader(true);
        if(image){
            const resp = await fetch(image);
            const blobImage = await resp.blob();
            const storageRef= ref(storage,'/PetAdopt/'+Date.now()+'.jpg');

            uploadBytes(storageRef,blobImage).then((snapshot)=>{
                console.log('File Uplaod')
            }).then(resp=>{
                getDownloadURL(storageRef).then(async(downloadUrl)=>{
                    console.log(downloadUrl);
                    SaveFormData(downloadUrl)
                })
            })
        } 
    }

    const SaveFormData = async (imageUrl : string) => {
        const docId = Date.now().toString();
        await setDoc(doc(db,'Pets',docId),{
            ...formData,
            imageUrl : imageUrl,
            username : user?.fullName,
            email : user?.primaryEmailAddress?.emailAddress,
            userImage:user?.imageUrl,
            id:docId
        })
        setLoader(false);
        router.replace('/(tabs)/home')
    }

    const onSubmit = () => {
        if(Object.keys(formData).length != 8){
            ToastAndroid.show('Enter All Details',ToastAndroid.SHORT)
            return;
        }
        UploadImage();
    }

    useEffect(()=>{
        nagivation.setOptions({
            headerTitle : "Add New Pet"
        });
        GetCategories();
    },[])

    return (
        <ScrollView className='pl-[20px] pr-[16px] gap-2' showsVerticalScrollIndicator={false}>
            <StatusBar backgroundColor="#e3d29d" />
            <Text className='font-outfitmedium text-base'>Add New Pet for adoption</Text>

            <Pressable onPress={imagePicker}>
                {!image ? 
                        <Image source={ images.bone} className='w-[100px] h-[100px] rounded-lg border-2 border-gray m-2' />
                        : <Image source={{uri:image}} className='w-[100px] h-[100px] rounded-lg border-2 border-gray m-2' />
                }
            </Pressable>

            <View >
                <Text className='font-outfit'>Pet Name*</Text>
                <TextInput onChangeText={(value) => handleInputChange('name',value)} className='bg-white rounded-lg p-[10px] font-outfit mt-[5px]' />
            </View>

            <View>
                <Text className='font-outfit'>Pet Category*</Text>
                <View className='bg-white rounded-lg h-[50px] font-outfit mt-[5px]' >
                    <Picker
                        selectedValue={selectedCategory}
                        onValueChange={(itemValue, itemIndex) =>{
                            setSelectedCategory(itemValue),
                            handleInputChange('category',itemValue)
                            }  
                        }
                        >
                            {categoryList.map((category,index)=>(
                                <Picker.Item key={index} label={category.name} value={category.name} />
                            ))}
                    </Picker>
                </View>
            </View>

            <View >
                <Text className='font-outfit'>Breed*</Text>
                <TextInput onChangeText={(value) => handleInputChange('breed',value)} className='bg-white rounded-lg p-[10px] font-outfit mt-[5px]' />
            </View>

            <View>
                <Text className='font-outfit'>Age*</Text>
                <TextInput keyboardType='numeric' onChangeText={(value) => handleInputChange('age',value)} className='bg-white rounded-lg p-[10px] font-outfit mt-[5px]' />
            </View>

            <View>
                <Text className='font-outfit'>Gender*</Text>
                <View className='bg-white rounded-lg h-[50px] font-outfit mt-[5px]' >
                    <Picker
                        selectedValue={gender}
                        onValueChange={(itemValue, itemIndex) =>{
                            setGender(itemValue),
                            handleInputChange('sex',itemValue)
                            }  
                        }
                        >
                        <Picker.Item label="Male" value="Male" />
                        <Picker.Item label="Female" value="Female" />
                    </Picker>
                </View>
            </View>

            <View>
                <Text className='font-outfit'>Weight*</Text>
                <TextInput keyboardType='numeric' onChangeText={(value) => handleInputChange('weight',value)} className='bg-white rounded-lg p-[10px] font-outfit mt-[5px]' />
            </View>

            <View>
                <Text className='font-outfit'>Address*</Text>
                <TextInput onChangeText={(value) => handleInputChange('address',value)} className='bg-white rounded-lg p-[10px] font-outfit mt-[5px]' />
            </View>

            <View>
                <Text className='font-outfit'>About*</Text>
                <TextInput
                    numberOfLines={5}
                    multiline={true}
                    onChangeText={(value) => handleInputChange('about',value)}
                    className='bg-white rounded-lg p-[10px] font-outfit mt-[5px]' />
            </View>

            <View>
                <TouchableOpacity onPress={onSubmit} disabled={loader} className='p-[15px] bg-primary rounded-lg mb-[50px] mt-[10px]'>
                    {loader ? <ActivityIndicator size='large' color={"red"} /> :
                        <Text className='text-center font-outfitmedium'>Submit</Text>
                    }
                </TouchableOpacity>
            </View>
            

        </ScrollView>
    )
}