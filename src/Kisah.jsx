import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Layouts from "./Layouts";
import { ActivityIndicator, Icon, TextInput } from "react-native-paper";
import moment from "moment";
import axios from "axios";

export default function Kisah({ navigation, route }) {
  const [kisah, setKisah] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSeacrh] = useState(false);
  const { kategoriId } = route.params;
  const [kategori, setKategori] = useState([]);
  const [params, setParams] = useState({ idKategori: kategoriId, cari: "" });

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

  const fetchKisah = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        URL +
          "get-kisah?kategori_id=" +
          params.idKategori +
          "&cari=" +
          params.cari
      );
      if (response.status === 200) {
        setKisah(response.data);
        setLoading(false);
      } else {
        alert("Gagal mengambil data");
        setLoading(false);
      }
    } catch (error) {
      alert("Gagal mengambil data:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchKategori();
  }, []);
  useEffect(() => {
    fetchKisah();
  }, [params]);

  return (
    <Layouts>
      <View className="flex justify-end flex-row">
        <View className="flex flex-row gap-3 py-3 items-center">
          <TextInput
            label={"Cari Kisah"}
            className="bg-white w-[180px]"
            onChangeText={(text) => setParams({ ...params, cari: text })}
          />
          <TouchableOpacity className="h-[60px] p-3 rounded-md bg-blue-500 flex justify-center items-center">
            <Text className="text-white">Seacrch</Text>
          </TouchableOpacity>
        </View>
      </View>
      {loading ? (
        <View className="w-full h-[500px]  flex justify-center items-center">
          <Text className="text-white font-bold text-xl">
            Ups, Data Kisah Tidak Ada
          </Text>
        </View>
      ) : (
        <>
          {kisah.length > 0 ? (
            <>
              <View className="px-4 py-5">
                <ScrollView
                  horizontal
                  className="flex flex-row  w-full overflow-x-auto bg-slate-800"
                >
                  <TouchableOpacity
                    onPress={() =>
                      setParams({ ...params, idKategori: kategoriId })
                    }
                    activeOpacity={0.8}
                    className={`${
                      params.idKategori == kategoriId
                        ? "border-pink-500"
                        : "border-slate-900"
                    } border-b-4 py-3`}
                  >
                    <Text className="text-white text-xs font-bold tracking-tighter px-4 capitalize">
                      All Kategori
                    </Text>
                  </TouchableOpacity>
                  {kategori.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() =>
                        setParams({ ...params, idKategori: item.id })
                      }
                      activeOpacity={0.8}
                      className={`${
                        item.id == params.idKategori
                          ? "border-pink-500"
                          : "border-slate-900"
                      } border-b-4 py-3`}
                    >
                      <Text className="text-white text-xs font-bold tracking-tighter px-4 capitalize">
                        {item.nama_kategori}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                <ScrollView>
                  <View className="">
                    {kisah.map((item, index) => (
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("ShowKisah", {
                            slug: item.slug,
                          })
                        }
                        key={index}
                        className="my-1 py-2 px-3 rounded-md bg-slate-800 w-full"
                      >
                        <View className="flex flex-row items-start  gap-3">
                          <Image
                            source={{ uri: item.gambar }}
                            style={{ width: 50, height: 50 }}
                          />
                          <View className="px-3">
                            <Text className="text-white text-xs tracking-tighter font-bold">
                              {item.judul}
                            </Text>
                            <Text className="text-slate-950 text-xs tracking-tighter">
                              {moment(item.created_at).format("LL")}
                            </Text>
                            <Text
                              numberOfLines={3} // Batasi teks hingga 3 baris
                              ellipsizeMode="tail"
                              className="text-slate-500 text-xs tracking-tighter line-clamp-3"
                            >
                              {item.kontent}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>
              </View>
            </>
          ) : (
            <View className="w-full h-[500px]  flex justify-center items-center">
              <ActivityIndicator animating={true} color={"white"} />
            </View>
          )}
        </>
      )}
    </Layouts>
  );
}
