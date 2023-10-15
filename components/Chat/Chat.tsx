import React, { useEffect, useRef, useState } from "react";
import { KeyboardAvoidingView, ScrollView, View } from "react-native";
import { useChat } from "./hooks/use-chat";
import { Tag } from "../Atoms";
import { MyMessage } from "./MyMessage/MyMessage";
import { VendorMessage } from "./VendorMessage/VendorMessage";
import { MessageInput } from "./MessageInput";
import { styles } from "./styles";

export const Chat: React.FC = () => {
  const { startChatSocket, chatSocketDisconnect, sendImage, sendMessage } =
    useChat();
  const scrollViewRef = useRef<ScrollView | null>(null);

  useEffect(() => {
    startChatSocket();

    return () => {
      chatSocketDisconnect();
    };
  }, [startChatSocket]);

  const [message, setMessage] = useState("");
  const handleTextChange = (val: string) => {
    setMessage(val);
  };

  const handleSubmitText = (params: {
    message?: string;
    imageUrl?: string;
  }) => {
    if (params.imageUrl) {
      sendImage(params.imageUrl);
    } else if (params.imageUrl) {
      sendMessage(params.imageUrl);
      setMessage("");
    }
  };

  return (
    <>
      <ScrollView
        ref={scrollViewRef}
        automaticallyAdjustKeyboardInsets={true}
        keyboardShouldPersistTaps="always"
      >
        <View style={styles.messagesContainer}>
          <Tag text="Feb 21" style={{ alignSelf: "center" }} />
          <MyMessage text="How early can you arrive?" time="2:31 PM" />
          <VendorMessage
            name="All American Vendor Truck"
            text="I can arrive 1 hour before the party, to set up my Taco Truck. I’ll even throw in free Horchata!"
            time="2:35 PM"
          />
          <MyMessage
            text="OMG! We love Horchata! That is si kind. Please send an invoice over, and i will pay it on Friday, when i get paid!"
            time="2:31 PM"
          />
          <MyMessage text="How early can you arrive?" time="2:31 PM" />
          <VendorMessage
            name="All American Vendor Truck"
            text="I can arrive 1 hour before the party, to set up my Taco Truck. I’ll even throw in free Horchata!"
            time="2:35 PM"
          />
          <MyMessage
            text="OMG! We love Horchata! That is si kind. Please send an invoice over, and i will pay it on Friday, when i get paid!"
            time="2:31 PM"
          />
        </View>
      </ScrollView>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior="position"
      >
        <MessageInput
          value={message}
          onChangeText={handleTextChange}
          onSubmit={handleSubmitText}
          scrollViewRef={scrollViewRef}
        />
      </KeyboardAvoidingView>
    </>
  );
};
