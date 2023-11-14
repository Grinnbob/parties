import React, { Dispatch, SetStateAction } from "react";
import { View } from "react-native";
import { styles } from "./styles";
import { RequestQuote } from "../RequestQuoteScreen";

type SelectServiceStepProps = {
  quote: RequestQuote;
  setQuote: Dispatch<SetStateAction<RequestQuote>>;
};

export const SelectServiceStep: React.FC<SelectServiceStepProps> = ({
  quote,
  setQuote,
}) => {
  return <View></View>;
};
