import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Layouts from "./Layouts";
import axios from "axios";
import { ActivityIndicator } from "react-native-paper";

export default function MenuKisah({ navigation }) {
  const [kategori, setKategori] = useState([]);
  const [idKategori, setIdKategori] = useState("");

  const fetchKategori = async () => {
    try {
      const response = await axios.get(URL + "get-kategori");
      if (response.status === 200) {
        setKategori(response.data);
      } else {
        console.error("Gagal mengambil data");
      }
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    }
  };
  useEffect(() => {
    fetchKategori();
  }, []);

  return (
    <Layouts>
      <View className="flex flex-col gap-3 items-center justify-center mt-6">
        <Text className="text-pink-600 font-bold text-3xl">
          Pilih Kategori Kisah
        </Text>
      </View>
      {kategori.length > 0 ? (
        <View className="w-full h-full flex py-3 items-center ">
          <ScrollView className=" max-h-[650px] px-4">
            <View className="flex flex-row gap-2 flex-wrap ">
              {kategori.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    navigation.navigate("DaftarKisah", { kategoriId: item.id })
                  }
                  className="bg-purple-700 py-2 px-3 flex mx-2 justify-center rounded-md w-[150px] h-[150px] relative"
                >
                  <View className="absolute w-[150px] h-[150px] rounded-md bg-pink-500/40 opacity-50">
                    <Image
                      source={require("../assets/Icon/quran.png")}
                      className="absolute bottom-0 right-0 -z-10"
                      style={{ width: 150, height: 100, resizeMode: "contain" }}
                    />
                  </View>
                  <Text className="text-white text-xl font-bold text-center capitalize">
                    {item.nama_kategori}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      ) : (
        <View className="w-full h-full  flex justify-center items-center">
          <ActivityIndicator animating={true} color={"white"} />
        </View>
      )}
    </Layouts>
  );
}
