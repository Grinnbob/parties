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
import { SelectPartyStep } from "./SelectPartyStep";
import { CreatePartyStep } from "./CreatePartyStep";
import { AntDesign } from "@expo/vector-icons";
import { PeopleSelectStep } from "./PeopleSelectStep";
import { Button } from "../../../components/Atoms";
import { ServiceSelectStep } from "./ServiceSelectStep";
import { AdditionalDetailsStep } from "./AdditionalDetailsStep";
import { DeliveryServiceStep } from "./DeliveryServiceStep";
import { FinishStep } from "./FinishStep";
import { useLoadable } from "../../../hooks";
import { constantsQuery } from "../../../stateManagement";
import apis from "../../../apis";
import dayjs from "dayjs";
import { ServiceModel, VendorModel } from "../../../models";

type Party = {
  id?: string;
  name?: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  startTime?: Date;
  endTime?: Date;
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
  point?: [number, number];
  peopleRange?: [number, number];
};

export type RequestQuote = {
  party?: Party;
  services: number[];
  notes?: string;
  shipment?: string;
  assembling?: string;
  selectedSpecialties: ServiceModel["serviceTypes"];
  steps: {
    [key in RequestQuoteStepEnum]?: {
      isValid: boolean;
      errors: Record<string, string>;
    };
  };
};

export enum RequestQuoteStepEnum {
  PARTY_SELECT,
  PARTY_CREATE,
  PEOPLE_SELECT,
  SERVICE_SELECT,
  ADDITIONAL_DETAILS,
  DELIVERY_SERVICE,
  FINISH,
}

type RequestQuoteScreenProps = {
  route: {
    params: {
      vendor: VendorModel;
      services: Array<ServiceModel>;
    };
  };
};

export const RequestQuoteScreen: React.FC<RequestQuoteScreenProps> = ({
  route,
}) => {
  const navigation = useNavigation();
  const [currentStep, setCurrentStep] = useState(
    RequestQuoteStepEnum.PARTY_SELECT
  );
  const [quote, setQuote] = useState<RequestQuote>({
    party: {
      id: undefined,
      name: "",
      peopleRange: [30, 50],
    },
    services: [],
    selectedSpecialties: [],
    steps: {},
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { vendor, services } = route?.params;
  const isNextDisabled = () => {
    return !quote.steps[currentStep]?.isValid;
  };

  const handleNextPress = async () => {
    if (currentStep === RequestQuoteStepEnum.DELIVERY_SERVICE) {
      try {
        setIsSubmitting(true);
        if (quote.party?.id === "") {
          await apis.party.create({
            name: quote.party.name!,
            startDate: dayjs(quote.party.startDate).format("YYYY-MM-DD"),
            endDate: dayjs(quote.party.endDate).format("YYYY-MM-DD"),
            startTime: quote.party.startTime,
            endTime: quote.party.endTime,
            description: quote.party.description,
          });
        }
        await apis.quote.create({
          assembling: quote.assembling!,
          shipment: quote.shipment!,
          services: quote.services,
          VendorId: vendor?.id,
          PartyId: 1,
          note: quote.notes!,
        });
      } finally {
        setIsSubmitting(false);
      }
    }
    const step = currentStep + 1;
    setCurrentStep(step);
  };

  const handleBackPress = () => {
    if (currentStep === RequestQuoteStepEnum.PEOPLE_SELECT) {
      if (quote?.party?.id === "") {
        setCurrentStep(RequestQuoteStepEnum.PARTY_CREATE);
      } else {
        setCurrentStep(RequestQuoteStepEnum.PARTY_SELECT);
      }
      return;
    }
    if (currentStep === RequestQuoteStepEnum.FINISH) {
      navigation.pop();
      return;
    }
    const step = currentStep - 1;
    setCurrentStep(step);
  };

  const progressBarValue = useMemo(() => {
    if (currentStep === RequestQuoteStepEnum.PARTY_SELECT) {
      return 15;
    }
    if (currentStep === RequestQuoteStepEnum.PARTY_CREATE) {
      return 30;
    }
    if (currentStep === RequestQuoteStepEnum.PEOPLE_SELECT) {
      return 45;
    }
    if (currentStep === RequestQuoteStepEnum.SERVICE_SELECT) {
      return 60;
    }
    if (currentStep === RequestQuoteStepEnum.ADDITIONAL_DETAILS) {
      return 75;
    }
    if (currentStep === RequestQuoteStepEnum.DELIVERY_SERVICE) {
      return 90;
    }
    return 100;
  }, [currentStep]);

  const getSubmitButtonLabel = () => {
    if (currentStep === RequestQuoteStepEnum.DELIVERY_SERVICE) {
      return "Submit Request";
    }

    if (currentStep === RequestQuoteStepEnum.FINISH) {
      return "Sounds Great!";
    }

    return "Next";
  };

  const handleSkipPress = () => {
    setCurrentStep(RequestQuoteStepEnum.SERVICE_SELECT);
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
                  currentStep === RequestQuoteStepEnum.FINISH
                    ? styles.hidden
                    : undefined,
                ]}
                onPress={() => {
                  if (currentStep !== RequestQuoteStepEnum.FINISH) {
                    navigation.pop();
                  }
                }}
              >
                <Image
                  resizeMode="cover"
                  source={require("../../../assets/vector14.png")}
                />
              </Pressable>
              {currentStep !== RequestQuoteStepEnum.PARTY_SELECT && (
                <TouchableOpacity onPress={handleBackPress}>
                  <AntDesign name="close" size={20} style={styles.closeIcon} />
                </TouchableOpacity>
              )}
            </View>
            {currentStep !== RequestQuoteStepEnum.FINISH && (
              <ProgressBar
                style={styles.progressBar}
                value={progressBarValue}
              />
            )}
          </View>
          {currentStep === RequestQuoteStepEnum.PARTY_SELECT && (
            <SelectPartyStep quote={quote} setQuote={setQuote} />
          )}
          {currentStep === RequestQuoteStepEnum.PARTY_CREATE && (
            <CreatePartyStep quote={quote} setQuote={setQuote} />
          )}
          {currentStep === RequestQuoteStepEnum.PEOPLE_SELECT && (
            <PeopleSelectStep quote={quote} setQuote={setQuote} />
          )}
          {currentStep === RequestQuoteStepEnum.SERVICE_SELECT && (
            <ServiceSelectStep
              quote={quote}
              setQuote={setQuote}
              services={services}
            />
          )}
          {currentStep === RequestQuoteStepEnum.ADDITIONAL_DETAILS && (
            <AdditionalDetailsStep quote={quote} setQuote={setQuote} />
          )}
          {currentStep === RequestQuoteStepEnum.DELIVERY_SERVICE && (
            <DeliveryServiceStep quote={quote} setQuote={setQuote} />
          )}
          {currentStep === RequestQuoteStepEnum.FINISH && <FinishStep />}
        </View>
        <View style={styles.innerContainer}>
          <GradientButton
            text={getSubmitButtonLabel()}
            disabled={isNextDisabled()}
            onPress={handleNextPress}
            style={styles.nextButton}
            textStyle={styles.nextButtonText}
            loading={isSubmitting}
          />
        </View>
        {currentStep === RequestQuoteStepEnum.PEOPLE_SELECT && (
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
