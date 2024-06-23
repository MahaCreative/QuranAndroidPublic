import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function Splashsreen({ navigation }) {
  return (
    <View className="w-screen h-full flex justify-center items-center bg-slate-950">
      <View className="w-full flex justify-center items-center mb-10">
        <View className="flex justify-center items-center text-center w-full">
          <Text className="font-bold text-white uppercase text-3xl tracking-tighter">
            Apps Kisah Qur'an
          </Text>
          <Text className="text-white font-light  tracking-tighter text-center">
            Baca Qur'an dan Kisah-Kisah Islami Setiap Saat
          </Text>
        </View>
      </View>
      <View className="relative w-[300px] h-[450px] pb-6 bg-purple-700 flex items-center justify-center rounded-2xl">
        <Image
          source={require("../assets/Icon/splash.png")}
          style={{ width: 250, height: 270 }}
          resizeMode="cover"
        />
        <View className="absolute -bottom-3 w-full flex justify-center items-center">
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.navigate("HomeScreen")}
            className="bg-orange-300 text-white py-2 px-4 rounded-full"
          >
            <Text className=" text-xl font-bold text-black">Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
