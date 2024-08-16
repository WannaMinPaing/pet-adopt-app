import { Link, Redirect, useRootNavigationState } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "@clerk/clerk-expo";
import { useEffect } from "react";

export default function Index() {

  const { user } = useUser();

  // const rootNavigationState = useRootNavigationState();

  // useEffect(() => {
  //   CheckNavLoaded();
  // },[]);

  // const CheckNavLoaded = () => {
  //     if(!rootNavigationState.key){
  //       return null;
  //     }
  // }

  return user &&  (
    <View>
      { user ? 
        <Redirect href={'/(tabs)/home'} />
        : <Redirect href={'/login'} />
      }
    </View>
  );
}

//https://www.youtube.com/watch?v=c0AOwKlAz9I&list=LL&index=1&t=412s
