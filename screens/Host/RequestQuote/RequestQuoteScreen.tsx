import React, { useEffect, useMemo, useState } from "react";
import { styles } from "./styles";
import {
  Image,
  ImageBackground,
  Keyboard,
  Pressable,
  ScrollView,
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
import apis from "../../../apis";
import dayjs from "dayjs";
import { PartyModel, ServiceModel, VendorModel } from "../../../models";
import { useToast } from "native-base";
import { useRecoilRefresher_UNSTABLE } from "recoil";
import { myPartiesQuery } from "../../../stateManagement";
import { useKeyboard } from "../../../hooks/useKeyboard";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export type NewParty = {
  id?: number | string;
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
  party?: NewParty;
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
  const insets = useSafeAreaInsets();
  const refreshMyParties = useRecoilRefresher_UNSTABLE(myPartiesQuery);
  const navigation = useNavigation();
  const toast = useToast();
  const [currentStep, setCurrentStep] = useState(
    RequestQuoteStepEnum.ADDITIONAL_DETAILS
    // RequestQuoteStepEnum.SERVICE_SELECT
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
  const [parties, setParties] = useState<PartyModel[]>([]);
  const [isPartiesLoading, setIsPartiesLoading] = useState(true);

  useEffect(() => {
    const getParties = async () => {
      try {
        const parties = await apis.party.getMyParties({
          minDate: new Date(),
        });
        if (Array.isArray(parties.data)) {
          setParties(parties.data);
        }
      } finally {
        setIsPartiesLoading(false);
      }
    };
    getParties();
  }, []);

  const { vendor, services } = route?.params;
  const isNextDisabled = () => {
    if (currentStep === RequestQuoteStepEnum.FINISH) {
      return false;
    }
    return !quote.steps[currentStep]?.isValid;
  };

  const handleNextPress = async () => {
    if (currentStep === RequestQuoteStepEnum.PARTY_SELECT) {
      if (quote.party?.id !== "") {
        setCurrentStep(RequestQuoteStepEnum.SERVICE_SELECT);
        return;
      }
    }
    if (currentStep === RequestQuoteStepEnum.DELIVERY_SERVICE) {
      try {
        setIsSubmitting(true);
        let partyId;
        if (quote.party?.id === "") {
          const party = await apis.party.create({
            name: quote.party.name!,
            startDate: dayjs(quote.party.startDate).format("YYYY-MM-DD"),
            endDate: dayjs(quote.party.endDate).format("YYYY-MM-DD"),
            startTime: quote.party.startTime,
            endTime: quote.party.endTime,
            description: quote.party.description,
            attendingMin: quote.party.peopleRange![0],
            attendingMax: quote.party.peopleRange![1]!,
          });
          if (!party.success) {
            toast.show({
              description: "Something went wrong. Please try again.",
            });
            return;
          }
          partyId = party.data.id;
        } else {
          partyId = quote.party?.id;
        }
        const response = await apis.quote.create({
          assembling: quote.assembling!,
          shipment: quote.shipment!,
          services: quote.services,
          vendorId: vendor?.id,
          partyId: Number(partyId),
          notes: quote.notes!,
        });
        refreshMyParties();
        if (!response.success) {
          toast.show({
            description: "Something went wrong. Please try again.",
          });
          return;
        }
      } finally {
        setIsSubmitting(false);
      }
    }
    if (currentStep === RequestQuoteStepEnum.FINISH) {
      navigation.pop();
      return;
    }
    const step = currentStep + 1;
    setCurrentStep(step);
  };

  const handleBackPress = () => {
    if (currentStep === RequestQuoteStepEnum.SERVICE_SELECT) {
      if (quote?.party?.id === "") {
        setCurrentStep(RequestQuoteStepEnum.PEOPLE_SELECT);
      } else {
        setCurrentStep(RequestQuoteStepEnum.PARTY_SELECT);
      }
      return;
    }
    if (
      currentStep === RequestQuoteStepEnum.FINISH ||
      currentStep === RequestQuoteStepEnum.PARTY_SELECT
    ) {
      navigation.pop();
      return;
    }
    const step = currentStep - 1;
    setCurrentStep(step);
  };

  const handleCancelPress = () => {
    navigation.pop();
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
    <KeyboardAwareScrollView
      bounces={false}
      keyboardShouldPersistTaps="handled"
      enableOnAndroid={true}
      extraScrollHeight={
        currentStep === RequestQuoteStepEnum.PARTY_CREATE ? 200 : 50
      }
      contentContainerStyle={[
        styles.content,
        {
          paddingBottom: insets.bottom ? insets.bottom : 16,
          paddingTop: insets.top ? insets.top : 16,
        },
      ]}
    >
      <ImageBackground
        style={styles.bgIcon}
        resizeMode="cover"
        source={require("../../../assets/bg11.png")}
      />
      <View style={styles.innerContainer}>
        <View style={styles.header}>
          <Pressable
            style={[
              styles.backLayout,
              currentStep === RequestQuoteStepEnum.FINISH
                ? styles.hidden
                : undefined,
            ]}
            onPress={handleBackPress}
          >
            <Image
              resizeMode="cover"
              source={require("../../../assets/vector14.png")}
            />
          </Pressable>
          <TouchableOpacity onPress={handleCancelPress}>
            <AntDesign name="close" size={20} style={styles.closeIcon} />
          </TouchableOpacity>
        </View>
        {currentStep !== RequestQuoteStepEnum.FINISH && (
          <ProgressBar style={styles.progressBar} value={progressBarValue} />
        )}
      </View>
      {currentStep === RequestQuoteStepEnum.PARTY_SELECT && (
        <SelectPartyStep
          quote={quote}
          setQuote={setQuote}
          parties={parties}
          isPartiesLoading={isPartiesLoading}
        />
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
      <View style={styles.nextContainer}>
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
        <View style={styles.skipContainer}>
          <Button text="Skip" onPress={handleSkipPress} />
          <Text style={styles.skipPartyText}>
            You can always add details later in my party
          </Text>
        </View>
      )}
    </KeyboardAwareScrollView>
  );
};
