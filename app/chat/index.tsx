import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { addDoc, collection, doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '@/config/FirebaseConfig';
import { useUser } from '@clerk/clerk-expo';
import { GiftedChat } from 'react-native-gifted-chat';
import images from '@/constants/images';
import moment from 'moment';

export default function ChatScreen() {
    const params = useLocalSearchParams();
    const navigation = useNavigation();
    const {user} = useUser();
    const [messages, setMessages] = useState<any>([]);
    const paramsId =  Array.isArray(params.id) ? params.id[0] : params.id;


    const GetUserDetails = async() => {
        const docRef = doc(db,'Chat',paramsId);
        const docSnap = await getDoc(docRef);

        const result = docSnap.data();
        const otherUser = result?.users.filter((item: { email: string }) => item.email != user?.primaryEmailAddress?.emailAddress);
        navigation.setOptions({
            headerTitle : otherUser[0].name
        })
    } 

    const onSend = async (newMessage : any) => {
        setMessages((previousMessage : any) => GiftedChat.append(previousMessage,newMessage));
        newMessage[0].createdAt = moment().format('DD-MM-YYYY HH:mm:ss');
        await addDoc(collection(db, 'Chat', paramsId, 'Messages'), newMessage[0]);
    }

    useEffect(() => {
        GetUserDetails();
        const unsubscribe = onSnapshot(collection(db,'Chat',paramsId,'Messages'),(snapshot)=>{
            const MessageData = snapshot.docs.map((doc)=>({
                _id : doc.id,
                ...doc.data()
            }))
            setMessages(MessageData)
        });
        return () => unsubscribe();
    },[])

    return (
        <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        showUserAvatar = {true}
        user={{
            _id: user?.primaryEmailAddress?.emailAddress || 'anonymous@gmail.com',
            name: user?.fullName || 'UnKnown', 
            avatar: user?.imageUrl || images.anonymousProfile,
        }}
      />
  
    )
} 