import React, { useRef } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import { RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CreateKisah() {
  const richText = useRef();
  const handleSave = () => {
    if (richText.current) {
      richText.current.getContentHtml().then((html) => {
        console.log(html); // Lakukan sesuatu dengan HTML yang diperoleh
      });
    }
  };
  return (
    <View>
      <SafeAreaView>
        <ScrollView>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
          >
            <Text>Description:</Text>
            <RichEditor
              ref={richText}
              onChange={(descriptionText) => {
                console.log("descriptionText:", descriptionText);
              }}
            />
          </KeyboardAvoidingView>
        </ScrollView>

        <RichToolbar editor={richText} />
      </SafeAreaView>
    </View>
  );
}
