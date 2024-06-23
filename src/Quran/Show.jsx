import axios from "axios";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Layouts from "../Layouts";
import { ActivityIndicator, Icon } from "react-native-paper";
import { Audio } from "expo-av";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Show({ navigation, route }) {
  const [loading, setLoading] = useState(true);
  const [quran, setQuran] = useState();
  const { id } = route.params;

  const [showArti, setShowArti] = useState("");
  const [idSurah, setIdSurah] = useState("");
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  async function playSound(audioUrl) {
    if (sound) {
      await sound.unloadAsync();
      setSound(null);
    }

    try {
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: audioUrl },
        { shouldPlay: true }
      );
      setSound(newSound);
      setIsPlaying(true);
    } catch (error) {
      console.error("Error loading sound", error);
    }
  }

  async function pauseSound() {
    if (sound) {
      await sound.pauseAsync();
      setIsPlaying(false);
    }
  }
  useEffect(() => {
    const fetchQuran = async () => {
      try {
        const response = await axios.get(
          `https://equran.id/api/v2/surat/${id}`
        );
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

    fetchQuran();
  }, []);
  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);
  useEffect(() => {
    const saveSession = async () => {
      try {
        await AsyncStorage.setItem(
          "bacaanTerakhir",
          JSON.stringify({
            namaSurat: quran.namaLatin,
            jumlahAyat: quran.jumlahAyat,
          })
        );
      } catch (error) {
        console.error("Failed to save session.", error);
      }
    };
    if (quran) {
      saveSession();
    }
  }, []);
  return (
    <Layouts>
      <View className="w-full px-6 py-6">
        {loading && (
          <View className="w-full h-full  flex justify-center items-center">
            <ActivityIndicator animating={true} color={"white"} />
          </View>
        )}
        {quran && (
          <>
            <View>
              <View className="bg-purple-400 px-2 py-3 relative w-[300px] h-[200px] rounded-xl overflow-hidden">
                <Image
                  source={require("../../assets/Icon/quran.png")}
                  className="absolute bottom-0 right-0 "
                  resizeMode="cover"
                  style={{ width: 270, height: 200, objectFit: "contain" }}
                />
                <View className="absolute w-[300px] h-full top-0 left-0 bg-purple-400/50 flex justify-center items-center">
                  <View className="">
                    <Text className="text-white font-medium text-2xl tracking-tighter text-center">
                      {quran.namaLatin}
                    </Text>
                    <Text className="text-white font-light text-xl tracking-tighter text-center">
                      {quran.arti}
                    </Text>

                    <View className="border-b border-white  my-2"></View>

                    <View className="flex items-center flex-row gap-1 text-center justify-center">
                      <Text className="text-white tracking-tighter font-light text-center">
                        {quran.tempatTurun}
                      </Text>
                      <Text className="text-white tracking-tighter font-light">
                        {" - " + quran.jumlahAyat + " Ayat"}
                      </Text>
                    </View>
                    <Image
                      className="mt-3"
                      source={require("../../assets/Icon/bismillah.png")}
                    />
                  </View>
                </View>
              </View>
              <ScrollView className="my-2 max-h-[500px]">
                {quran.ayat.map((item, index) => (
                  <View key={index} className="px-2 my-1 py-2">
                    <View className="py-2 px-4 bg-slate-700 w-full rounded-md flex flex-row justify-between items-center">
                      <View className="">
                        <View className="bg-purple-500 h-[25px] w-[25px] rounded-full flex items-center justify-center">
                          <Text className="text-white">{item.nomorAyat}</Text>
                        </View>
                      </View>
                      <View className="flex gap-2 flex-row items-center">
                        {item.nomorAyat == idSurah ? (
                          <TouchableOpacity
                            onPress={() => {
                              pauseSound();
                              setIdSurah(item.nomorAyat);
                            }}
                          >
                            <Icon
                              source="pause"
                              color="rgb(192,132,252)"
                              size={30}
                            />
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            onPress={() => {
                              playSound(item.audio["01"]);
                              setIdSurah(item.nomorAyat);
                            }}
                          >
                            <Icon
                              source="play"
                              color="rgb(192,132,252)"
                              size={30}
                            />
                          </TouchableOpacity>
                        )}
                        {showArti == item.nomorAyat ? (
                          <TouchableOpacity onPress={() => setShowArti("")}>
                            <Icon
                              source={"abjad-arabic"}
                              color="rgb(192,132,252)"
                              size={30}
                            />
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            onPress={() => setShowArti(item.nomorAyat)}
                          >
                            <Icon
                              source={"format-text"}
                              color="rgb(192,132,252)"
                              size={30}
                            />
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                    <View className="w-full mt-3">
                      <Text className="text-white font-medium text-lg">
                        {item.teksArab}
                      </Text>
                      <Text className="text-slate-400 font-light text-sm">
                        {item.teksLatin}
                      </Text>
                      {showArti == item.nomorAyat && (
                        <View className="bg-slate-800 py-1 px-2 rounded-md">
                          <Text className="text-slate-300 font-light text-sm">
                            {item.teksIndonesia}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                ))}
              </ScrollView>
            </View>
          </>
        )}
      </View>
    </Layouts>
  );
}
