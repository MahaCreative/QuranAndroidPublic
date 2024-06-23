import axios from "axios";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Layouts from "../Layouts";
import { ActivityIndicator, Icon } from "react-native-paper";
import { Audio } from "expo-av";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ShowDoa({ navigation, route }) {
  const [loading, setLoading] = useState(true);

  const [doa, setDoa] = useState();
  const data = route.params;
  const [showArti, setShowArti] = useState(false);
  useEffect(() => {
    setDoa(data);
    setLoading(false);
  }, []);

  return (
    <Layouts>
      <View className="w-full px-6 py-6">
        {loading && (
          <View className="w-full h-full  flex justify-center items-center">
            <ActivityIndicator animating={true} color={"white"} />
          </View>
        )}
        {doa && (
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
                      {doa.item.doa}
                    </Text>

                    <View className="border-b border-white  my-2"></View>
                    <Image
                      className="mt-3"
                      source={require("../../assets/Icon/bismillah.png")}
                    />
                  </View>
                </View>
              </View>
              <ScrollView className="my-2 max-h-[500px]">
                <View className="px-2 my-1 py-2">
                  <View className="py-2 px-4 bg-slate-700 w-full rounded-md flex flex-row justify-between items-center">
                    <View className="">
                      <View className="bg-purple-500 h-[25px] w-[25px] rounded-full flex items-center justify-center">
                        <Text className="text-white"></Text>
                      </View>
                    </View>
                    <View className="flex gap-2 flex-row items-center">
                      {showArti ? (
                        <TouchableOpacity onPress={() => setShowArti(false)}>
                          <Icon
                            source={"abjad-arabic"}
                            color="rgb(192,132,252)"
                            size={30}
                          />
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity onPress={() => setShowArti(true)}>
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
                      {doa.item.ayat}
                    </Text>
                    <Text className="text-slate-400 font-light text-sm">
                      {doa.item.latin}
                    </Text>
                    {showArti && (
                      <View className="bg-slate-800 py-1 px-2 rounded-md">
                        <Text className="text-slate-300 font-light text-sm">
                          {doa.item.artinya}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              </ScrollView>
            </View>
          </>
        )}
      </View>
    </Layouts>
  );
}
