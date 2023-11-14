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
import { SelectServiceStep } from "./SelectServiceStep";
import { AdditionalDetailsStep } from "./AdditionalDetailsStep";

export type RequestQuote = {
  party?: Party;
  newParty?: {
    name?: string;
    date?: Date;
    time?: string;
    location?: string;
  };
  peopleRange: number[];
  description: string;
  additionalDetails: string;
};

enum RequestQuoteStep {
  SELECT_PARTY,
  CREATE_PARTY,
  PEOPLE_SELECT,
  SELECT_SERVICE,
  ADDITIONAL_DETAILS,
}

export const RequestQuoteScreen: React.FC = () => {
  const navigation = useNavigation();
  const [currentStep, setCurrentStep] = useState(RequestQuoteStep.SELECT_PARTY);
  const [quote, setQuote] = useState({
    newParty: {},
    peopleRange: [30, 50],
  });

  const isNextDisabled = useMemo(() => {
    return false;
  }, []);

  const handleNextPress = () => {
    if (currentStep === RequestQuoteStep.SELECT_PARTY) {
      setCurrentStep(RequestQuoteStep.CREATE_PARTY);
    }
    if (currentStep === RequestQuoteStep.CREATE_PARTY) {
      setCurrentStep(RequestQuoteStep.PEOPLE_SELECT);
    }
    if (currentStep === RequestQuoteStep.PEOPLE_SELECT) {
      setCurrentStep(RequestQuoteStep.ADDITIONAL_DETAILS);
    }
  };

  const handleBackPress = () => {
    if (currentStep === RequestQuoteStep.SELECT_PARTY) {
      setCurrentStep(RequestQuoteStep.CREATE_PARTY);
    }
    if (currentStep === RequestQuoteStep.PEOPLE_SELECT) {
      setCurrentStep(RequestQuoteStep.CREATE_PARTY);
    }
    if (currentStep === RequestQuoteStep.ADDITIONAL_DETAILS) {
      setCurrentStep(RequestQuoteStep.PEOPLE_SELECT);
    }
  };

  const progressBarValue = useMemo(() => {
    if (currentStep === RequestQuoteStep.SELECT_PARTY) {
      return 15;
    }
    if (currentStep === RequestQuoteStep.CREATE_PARTY) {
      return 30;
    }
    if (currentStep === RequestQuoteStep.PEOPLE_SELECT) {
      return 45;
    }
    if (currentStep === RequestQuoteStep.ADDITIONAL_DETAILS) {
      return 90;
    }
    return 100;
  }, [currentStep]);

  return (
    <View style={styles.screen}>
      <ImageBackground
        style={styles.bgIcon}
        resizeMode="cover"
        source={require("../../../assets/bg11.png")}
      />

      <View style={styles.content}>
        <View style={styles.topContent}>
          <View style={styles.header}>
            <Pressable
              style={styles.backLayout}
              onPress={() => navigation.pop()}
            >
              <Image
                resizeMode="cover"
                source={require("../../../assets/vector14.png")}
              />
            </Pressable>
            {currentStep !== RequestQuoteStep.SELECT_PARTY && (
              <TouchableOpacity onPress={handleBackPress}>
                <AntDesign name="close" size={20} style={styles.closeIcon} />
              </TouchableOpacity>
            )}
          </View>
          <ProgressBar style={styles.progressBar} value={progressBarValue} />
          {currentStep === RequestQuoteStep.SELECT_PARTY && (
            <SelectPartyStep quote={quote} />
          )}
          {currentStep === RequestQuoteStep.CREATE_PARTY && (
            <CreatePartyStep quote={quote} setQuote={setQuote} />
          )}
          {currentStep === RequestQuoteStep.PEOPLE_SELECT && (
            <PeopleSelectStep quote={quote} setQuote={setQuote} />
          )}
          {currentStep === RequestQuoteStep.SELECT_SERVICE && (
            <SelectServiceStep quote={quote} setQuote={setQuote} />
          )}
          {currentStep === RequestQuoteStep.ADDITIONAL_DETAILS && (
            <AdditionalDetailsStep quote={quote} setQuote={setQuote} />
          )}
        </View>
        <GradientButton
          text="Next"
          disabled={isNextDisabled}
          onPress={handleNextPress}
          style={styles.nextButton}
          textStyle={styles.nextButtonText}
        />
        {currentStep === RequestQuoteStep.PEOPLE_SELECT && (
          <View>
            <Button text="Skip" style={styles.skipButton} />
            <Text style={styles.skipPartyText}>
              You can always add details later in my party
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};
