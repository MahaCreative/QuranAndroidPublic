import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Layouts from "../Layouts";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native-paper";
import axios from "axios";
import URL from "../URL";
import moment from "moment";
export default function ListQuranScreen({ navigation }) {
  const [lastRead, setLastRead] = useState();
  const [menu, setMenu] = useState("quran");
  const [loading, setLoading] = useState(true);
  const [quran, setQuran] = useState();
  const [doa, setDoa] = useState();
  const [kisah, setKisah] = useState();
  const [kategori, setKategori] = useState();
  const [idKategori, setIdKategori] = useState("");
  useEffect(() => {
    // Function to load last read item from AsyncStorage
    const loadLastRead = async () => {
      try {
        const lastReadItem = await AsyncStorage.getItem("lastReadItem");

        if (lastReadItem !== null) {
          setLastRead(lastReadItem);
        }
      } catch (error) {
        console.error("Error loading last read item:", error);
      }
    };

    loadLastRead();
  }, []);

  useEffect(() => {
    const fetchQuran = async () => {
      try {
        const response = await axios.get("https://equran.id/api/v2/surat");
        if (response.status === 200) {
          setQuran(response.data.data);
          setLoading(false);
        } else {
          console.error("Gagal mengambil data");
        }
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      }
    };
    const fetchDoa = async () => {
      try {
        const response = await axios.get(
          "https://doa-doa-api-ahmadramadhan.fly.dev/api"
        );
        if (response.status === 200) {
          setDoa(response.data);
        } else {
          console.error("Gagal mengambil doa");
        }
      } catch (error) {
        console.error("Gagal mengambil doa:", error);
      }
    };

    fetchQuran();
    fetchDoa();
  }, []);

  useEffect(() => {
    const loadSession = async () => {
      try {
        const savedSession = await AsyncStorage.getItem("bacaanTerakhir");
        if (savedSession !== null) {
          setLastRead(JSON.parse(savedSession));
        }
      } catch (error) {
        console.error("Failed to load session.", error);
      }
    };

    loadSession();
  }, []);

  return (
    <Layouts>
      <View className="w-full relative px-4">
        <View className="pt-6 pb-2">
          <Text className="text-slate-600 text-xl font-light tracking-tighter">
            Assalamu'alaikum
          </Text>
        </View>

        <View className="bg-purple-500  w-full py-3 px-5 rounded-xl realtive h-[140px]">
          <View className="flex flex-col">
            <View className="flex gap-3 items-center flex-row">
              <Image source={require("../../assets/Icon/book.png")} />
              <Text className="text-white font-medium leading-3">
                Last Read
              </Text>
            </View>
            {lastRead ? (
              <>
                <View className="mt-6">
                  <Text className="text-2xl font-semibold text-white">
                    {lastRead.namaSurat}
                  </Text>
                  <Text className="text-xl font-light text-white">
                    {"Jumlah Ayat: " + lastRead.jumlahAyat}
                  </Text>
                </View>
              </>
            ) : (
              <Text className="mt-8 text-black font-bold text-xl ">
                Belum Membaca Qur'an
              </Text>
            )}
          </View>
          <Image
            source={require("../../assets/Icon/quran.png")}
            className="absolute bottom-2 right-0 -z-10"
          />
        </View>

        <View className="mt-6 flex flex-row">
          <TouchableOpacity
            onPress={() => setMenu("quran")}
            activeOpacity={0.8}
            className={`${
              menu == "quran" ? "border-pink-500" : "border-slate-900"
            } border-b-4 `}
          >
            <Text className="text-white text-base font-bold tracking-tighter px-4 ">
              Surah
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setMenu("doa")}
            activeOpacity={0.8}
            className={`${
              menu == "doa" ? "border-pink-500" : "border-slate-900"
            } border-b-4`}
          >
            <Text className="text-white text-base font-bold tracking-tighter px-4">
              Doa-Doa
            </Text>
          </TouchableOpacity>
        </View>
        {menu == "quran" && (
          <>
            {loading ? (
              <View className="w-full h-[350px] flex justify-center items-center">
                <ActivityIndicator animating={true} color={"white"} />
              </View>
            ) : (
              <ScrollView className="max-h-[450px]">
                {quran.map((item, index) => (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("ShowQuran", { id: item.nomor })
                    }
                    key={index}
                    className="border-b border-slate-900 my-1 py-2 px-3 flex gap-3 flex-row justify-between items-center"
                  >
                    <View className="flex gap-3 items-center flex-row">
                      <View className="relative w-[45px] h-[45px]">
                        <Image
                          source={require("../../assets/Icon/nomor-surah.png")}
                          className="relative w-[45px] h-[45px]"
                        />
                        <View className="absolute w-[45px] h-[45px] top-0 left-0  flex justify-center items-center">
                          <Text className="text-purple-500 font-bold">
                            {item.nomor}
                          </Text>
                        </View>
                      </View>
                      <View>
                        <Text className="text-white font-bold">
                          {item.namaLatin}
                        </Text>
                        <View className="flex items-center flex-row gap-1">
                          <Text className="text-slate-700 tracking-tighter font-light">
                            {item.tempatTurun}
                          </Text>
                          <Text className="text-slate-700 tracking-tighter font-light">
                            {" - " + item.jumlahAyat + " Ayat"}
                          </Text>
                        </View>
                        <Text className="text-slate-700 tracking-tighter text-xs">
                          {item.arti}
                        </Text>
                      </View>
                    </View>
                    <View>
                      <Text className="text-white">{item.nama}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
          </>
        )}
        {menu == "doa" && (
          <>
            {loading ? (
              <View className="w-full h-[350px] flex justify-center items-center">
                <ActivityIndicator animating={true} color={"white"} />
              </View>
            ) : (
              <ScrollView className="max-h-[450px]">
                {doa.map((item, index) => (
                  <TouchableOpacity
                    onPress={() => navigation.navigate("ShowDoa", { item })}
                    key={index}
                    className="border-b border-slate-900 my-1 py-2 px-3 flex gap-3 flex-row justify-between items-center"
                  >
                    <View className="flex gap-3 items-center flex-row">
                      <View className="relative w-[45px] h-[45px]">
                        <Image
                          source={require("../../assets/Icon/nomor-surah.png")}
                          className="relative w-[45px] h-[45px]"
                        />
                        <View className="absolute w-[45px] h-[45px] top-0 left-0  flex justify-center items-center">
                          <Text className="text-purple-500 font-bold">
                            {item.id}
                          </Text>
                        </View>
                      </View>
                      <Text className="text-white font-bold">{item.doa}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
          </>
        )}
      </View>
    </Layouts>
  );
}
