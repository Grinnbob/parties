import React from "react";
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./styles";
import LinearGradient from "react-native-linear-gradient";
import { Color } from "../../../GlobalStyles";

type GetStripeButtonProps = {
  isLoading?: boolean;
  handleStripe?: () => void;
};

export const GetStripeButton: React.FC<GetStripeButtonProps> = ({
  isLoading,
  handleStripe,
}) => {
  return (
    <View style={styles.root}>
        <TouchableOpacity onPress={handleStripe} disabled={isLoading}>
          <LinearGradient
            colors={["#6C1B9E", "#FF077E"]}
            locations={[0, 1]}
            useAngle={true}
            angle={-90}
            style={{ padding: 1, borderRadius: 30 }}
          >
            <View style={styles.button}>
              {isLoading ? (
                <ActivityIndicator
                  color={Color.textMainWhite}
                  size={16}
                  style={styles.activityIndicator}
                />
              ) : (
                <View style={styles.activityIndicator} />
              )}
              <Text style={styles.buttonText}>Connect Your Stripe Account & Get Paid</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
    </View>
  );
};
