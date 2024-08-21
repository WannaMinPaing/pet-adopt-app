import { db } from "@/config/FirebaseConfig"
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore"

export const GetFavList = async (user : any) => {
    const docSnap = await getDoc(doc(db,"UserFavPet",user?.primaryEmailAddress?.emailAddress));
    if(docSnap?.exists()){
        return docSnap.data();
    }
    else{
        await setDoc(doc(db,"UserFavPet",user?.primaryEmailAddress?.emailAddress),{
            email : user?.primaryEmailAddress?.emailAddress,
            favourites : []
        })
    }
}

export const UpdateFav = async  (user : any, favourites : string[]) => {
    const docRef = doc(db,"UserFavPet",user?.primaryEmailAddress?.emailAddress)
    try{
        await updateDoc(docRef,{
            favourites : favourites
        })
    }catch(e){
        console.log(e);
    }
}
