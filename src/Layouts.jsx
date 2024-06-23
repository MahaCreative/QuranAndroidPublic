import React from "react";
import { View } from "react-native";
import { Drawer } from "react-native-paper";

export default function Layouts({ children }) {
  return (
    <View className=" w-full h-full bg-slate-950">
      <View className="bg-slate-950 w-full py-3"></View>
      {children}
    </View>
  );
}
