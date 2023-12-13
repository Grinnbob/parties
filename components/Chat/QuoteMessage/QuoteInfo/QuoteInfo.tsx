import React from "react";
import { Text, View } from "react-native";
import { styles } from "../styles";
import { QuoteModel } from "../../../../models";

type QuoteInfoProps = {
  title?: string;
  quote: QuoteModel;
};

export const QuoteInfo: React.FC<QuoteInfoProps> = ({ title, quote }) => {
  return (
    <View style={styles.acceptedByVendorContent}>
      <Text style={styles.quoteTitle}>
        {title ? title : "Here is your party Quote"}
      </Text>
      <View style={styles.quoteFields}>
        <View style={styles.quoteFieldsRow}>
          <Text style={styles.quoteFieldLabel}>Total price</Text>
          <Text style={styles.quoteFieldValue}>${quote?.price}</Text>
        </View>
        <View style={styles.quoteFieldsRow}>
          <Text style={styles.quoteFieldLabel}>Payment due now</Text>
          <Text style={styles.quoteFieldValue}>
            ${(quote?.price! * quote?.downpayment!) / 100}
          </Text>
        </View>
      </View>
    </View>
  );
};
