import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";
import Layouts from "./Layouts";
import axios from "axios";
import moment from "moment";
import WebView from "react-native-webview";

export default function ShowKisah({ navigation, route }) {
  const { slug } = route.params;
  const [kisah, setKisah] = useState();

  const fetchKisah = async () => {
    try {
      const response = await axios.get(URL + "show-kisah/" + slug);
      if (response.status === 200) {
        setKisah(response.data);
      } else {
        console.error("Gagal mengambil data");
      }
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    }
  };
  useEffect(() => {
    fetchKisah();
  }, []);

  return (
    <Layouts>
      <View>
        {kisah ? (
          <View>
            <Image
              source={{ uri: kisah.gambar }}
              style={{ width: "100%", height: 200, resizeMode: "cover" }}
            />
            <View className="py-3 px-3">
              <Text className="text-pink-500 font-bold text-lg capitalize ">
                {kisah.judul}
              </Text>
              <Text className="text-slate-700 font-bold text-sm capitalize ">
                {moment(kisah.created_at).format("LL")}
              </Text>
              <ScrollView className={"max-h-[500px]"}>
                <WebView
                  originWhitelist={["*"]}
                  source={{
                    html: `<html>
                      <head>
        <style>
          body {
            background-color: inherit;
          }
          p {
            color: white;
            font-size: 28pt;
          }
        </style>
      </head>
                      <body>
                    <p >${kisah.kontent}</p></body></html>`,
                  }}
                  style={{
                    width: "100%",
                    height: 700,
                    backgroundColor: "inherit",
                  }} // Sesuaikan dengan kebutuhan
                />
              </ScrollView>
            </View>
          </View>
        ) : (
          <View className="w-full h-[300px]  flex justify-center items-center">
            <ActivityIndicator animating={true} color={"white"} />
          </View>
        )}
      </View>
    </Layouts>
  );
}
