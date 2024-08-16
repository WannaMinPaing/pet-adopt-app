import { Link } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <View>
      <Link href="/login">
            <Text>Go To Login Screen</Text>
      </Link>
    </View>
  );
}

//https://www.youtube.com/watch?v=c0AOwKlAz9I&list=LL&index=1&t=412s
