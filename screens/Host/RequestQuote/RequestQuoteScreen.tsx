import React, { useMemo, useState } from "react";
import { styles } from "./styles";
import {
  Image,
  ImageBackground,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { GradientButton, ProgressBar } from "../../../components/Atoms";
import { Party, SelectPartyStep } from "./SelectPartyStep";
import { CreatePartyStep } from "./CreatePartyStep";
import { AntDesign } from "@expo/vector-icons";
import { PeopleSelectStep } from "./PeopleSelectStep";
import { Button } from "../../../components/Atoms";
import { ServiceSelectStep } from "./ServiceSelectStep";
import { AdditionalDetailsStep } from "./AdditionalDetailsStep";
import { DeliveryServiceStep } from "./DeliveryServiceStep";
import { FinishStep } from "./FinishStep";

export type RequestQuote = {
  party?: Party;
  newParty?: {
    id: string;
    name?: string;
    date?: Date;
    startTime?: Date;
    endTime?: Date;
    location?: string;
  };
  peopleRange: number[];
  description?: string;
  selectedService?: number;
  additionalDetails?: string;
  deliveryService?: string;
  breakDownService?: string;
};

enum RequestQuoteStep {
  PARTY_SELECT,
  PARTY_CREATE,
  PEOPLE_SELECT,
  SERVICE_SELECT,
  ADDITIONAL_DETAILS,
  DELIVERY_SERVICE,
  FINISH,
}

export const RequestQuoteScreen: React.FC = () => {
  const navigation = useNavigation();
  const [currentStep, setCurrentStep] = useState(RequestQuoteStep.PARTY_SELECT);
  const [quote, setQuote] = useState<RequestQuote>({
    newParty: undefined,
    peopleRange: [30, 50],
  });

  const isNextDisabled = () => {
    if (currentStep === RequestQuoteStep.PARTY_SELECT) {
      return quote?.newParty?.id === undefined;
    }
    if (currentStep === RequestQuoteStep.PARTY_CREATE) {
      return (
        !quote?.newParty?.name ||
        !quote?.newParty?.date ||
        !quote?.newParty?.startTime ||
        !quote?.newParty?.endTime ||
        !quote?.newParty?.location
      );
    }
    if (currentStep === RequestQuoteStep.SERVICE_SELECT) {
      return !quote.selectedService;
    }
    if (currentStep === RequestQuoteStep.ADDITIONAL_DETAILS) {
      console.log("quote", quote);
      return !quote.additionalDetails;
    }

    if (currentStep === RequestQuoteStep.DELIVERY_SERVICE) {
      return !quote.breakDownService && !quote.breakDownService;
    }

    return false;
  };

  const handleNextPress = () => {
    if (currentStep === RequestQuoteStep.PARTY_SELECT) {
      if (quote?.newParty?.id === "") {
        setCurrentStep(RequestQuoteStep.PARTY_CREATE);
      } else {
        setCurrentStep(RequestQuoteStep.PEOPLE_SELECT);
      }
      return;
    }
    const step = currentStep + 1;
    setCurrentStep(step);
  };

  const handleBackPress = () => {
    if (currentStep === RequestQuoteStep.PEOPLE_SELECT) {
      if (quote?.newParty?.id === "") {
        setCurrentStep(RequestQuoteStep.PARTY_CREATE);
      } else {
        setCurrentStep(RequestQuoteStep.PARTY_SELECT);
      }
      return;
    }
    if (currentStep === RequestQuoteStep.FINISH) {
      navigation.pop();
      return;
    }
    const step = currentStep - 1;
    setCurrentStep(step);
  };

  const progressBarValue = useMemo(() => {
    if (currentStep === RequestQuoteStep.PARTY_SELECT) {
      return 15;
    }
    if (currentStep === RequestQuoteStep.PARTY_CREATE) {
      return 30;
    }
    if (currentStep === RequestQuoteStep.PEOPLE_SELECT) {
      return 45;
    }
    if (currentStep === RequestQuoteStep.SERVICE_SELECT) {
      return 60;
    }
    if (currentStep === RequestQuoteStep.ADDITIONAL_DETAILS) {
      return 75;
    }
    if (currentStep === RequestQuoteStep.DELIVERY_SERVICE) {
      return 90;
    }
    return 100;
  }, [currentStep]);

  const getSubmitButtonLabel = () => {
    if (currentStep === RequestQuoteStep.DELIVERY_SERVICE) {
      return "Submit Request";
    }

    if (currentStep === RequestQuoteStep.FINISH) {
      return "Sounds Great!";
    }

    return "Next";
  };

  const handleSkipPress = () => {
    setCurrentStep(RequestQuoteStep.SERVICE_SELECT);
  };

  return (
    <View style={styles.screen}>
      <ImageBackground
        style={styles.bgIcon}
        resizeMode="cover"
        source={require("../../../assets/bg11.png")}
      />

      <View style={styles.content}>
        <View style={styles.topContent}>
          <View style={styles.innerContainer}>
            <View style={styles.header}>
              <Pressable
                style={[
                  styles.backLayout,
                  currentStep === RequestQuoteStep.FINISH
                    ? styles.hidden
                    : undefined,
                ]}
                onPress={() => {
                  if (currentStep !== RequestQuoteStep.FINISH) {
                    navigation.pop();
                  }
                }}
              >
                <Image
                  resizeMode="cover"
                  source={require("../../../assets/vector14.png")}
                />
              </Pressable>
              {currentStep !== RequestQuoteStep.PARTY_SELECT && (
                <TouchableOpacity onPress={handleBackPress}>
                  <AntDesign name="close" size={20} style={styles.closeIcon} />
                </TouchableOpacity>
              )}
            </View>
            {currentStep !== RequestQuoteStep.FINISH && (
              <ProgressBar
                style={styles.progressBar}
                value={progressBarValue}
              />
            )}
          </View>
          {currentStep === RequestQuoteStep.PARTY_SELECT && (
            <SelectPartyStep quote={quote} setQuote={setQuote} />
          )}
          {currentStep === RequestQuoteStep.PARTY_CREATE && (
            <CreatePartyStep quote={quote} setQuote={setQuote} />
          )}
          {currentStep === RequestQuoteStep.PEOPLE_SELECT && (
            <PeopleSelectStep quote={quote} setQuote={setQuote} />
          )}
          {currentStep === RequestQuoteStep.SERVICE_SELECT && (
            <ServiceSelectStep quote={quote} setQuote={setQuote} />
          )}
          {currentStep === RequestQuoteStep.ADDITIONAL_DETAILS && (
            <AdditionalDetailsStep quote={quote} setQuote={setQuote} />
          )}
          {currentStep === RequestQuoteStep.DELIVERY_SERVICE && (
            <DeliveryServiceStep quote={quote} setQuote={setQuote} />
          )}
          {currentStep === RequestQuoteStep.FINISH && <FinishStep />}
        </View>
        <View style={styles.innerContainer}>
          <GradientButton
            text={getSubmitButtonLabel()}
            disabled={isNextDisabled()}
            onPress={handleNextPress}
            style={styles.nextButton}
            textStyle={styles.nextButtonText}
          />
        </View>
        {currentStep === RequestQuoteStep.PEOPLE_SELECT && (
          <View style={styles.innerContainer}>
            <Button
              text="Skip"
              style={styles.skipButton}
              onPress={handleSkipPress}
            />
            <Text style={styles.skipPartyText}>
              You can always add details later in my party
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};
