import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Layouts from "./Layouts";

export default function HomeScreen({ navigation }) {
  return (
    <Layouts>
      <View className="w-full h-full flex justify-center items-center ">
        <View className="flex flex-col gap-3">
          <TouchableOpacity
            onPress={() => navigation.navigate("ListQuraan")}
            className="bg-purple-700 py-2 px-3 flex mx-2 justify-center rounded-md w-[300px] h-[150px] relative"
          >
            <View className="absolute w-[300px] h-[150px] rounded-md bg-pink-500/40 opacity-50">
              <Image
                source={require("../assets/Icon/quran.png")}
                className="absolute bottom-0 right-0 -z-10"
                style={{ width: 230, height: 150, resizeMode: "contain" }}
              />
            </View>
            <Text className="text-white text-2xl font-bold text-center capitalize">
              Baca Al-Qur'an
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("MenuKisah")}
            className="bg-purple-700 py-2 px-3 flex mx-2 justify-center rounded-md w-[300px] h-[150px] relative"
          >
            <View className="absolute w-[300px] h-[150px] rounded-md bg-pink-500/40 opacity-50">
              <Image
                source={require("../assets/Icon/quran.png")}
                className="absolute bottom-0 right-0 -z-10"
                style={{ width: 230, height: 150, resizeMode: "contain" }}
              />
            </View>
            <Text className="text-white text-2xl font-bold text-center capitalize">
              Menu Kisah Islami
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Tentang")}
            className="bg-purple-700 py-2 px-3 flex mx-2 justify-center rounded-md w-[300px] h-[150px] relative"
          >
            <View className="absolute w-[300px] h-[150px] rounded-md bg-pink-500/40 opacity-50">
              <Image
                source={require("../assets/Icon/quran.png")}
                className="absolute bottom-0 right-0 -z-10"
                style={{ width: 230, height: 150, resizeMode: "contain" }}
              />
            </View>
            <Text className="text-white text-2xl font-bold text-center capitalize">
              Tentang Apps
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Layouts>
  );
}
