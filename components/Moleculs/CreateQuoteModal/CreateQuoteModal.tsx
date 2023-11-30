import React, { useCallback, useMemo, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import ReactNativeModal from "react-native-modal";
import { styles } from "./styles";
import { AntDesign } from "@expo/vector-icons";
import { GradientButton } from "../../Atoms";
import { SelectInput, TextInput } from "../../Input";
import { useLoadable } from "../../../hooks";
import {
  constantsQuery,
  quotesListAtom,
  selectedQuoteAtom,
} from "../../../stateManagement";
import { Color } from "../../../GlobalStyles";
import { QuoteSubmittedModal } from "./QuoteSubmittedModal/QuoteSubmittedModal";
import apis from "../../../apis";
import dayjs from "dayjs";
import { useRecoilState } from "recoil";
import { useToast } from "native-base";
import { QuoteModel } from "../../../models";

type Quote = {
  price: string;
  downPayment: string;
  remainder: string;
};

const downPaymentOptions = [
  {
    value: 50,
    label: "50% Due at Booking",
  },
  {
    value: 100,
    label: "100% Due at Booking",
  },
];

type CreateQuoteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  quoteId: number;
  onAccept?: () => void;
};
export const CreateQuoteModal: React.FC<CreateQuoteModalProps> = ({
  isOpen,
  onClose,
  quoteId,
  onAccept,
}) => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [constants, isConstantsLoading] = useLoadable(constantsQuery);
  const [quote, setQuote] = useState<Quote>({
    price: "",
    downPayment: "",
    remainder: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const toggleSubmittedModal = useCallback(() => {
    setIsSubmitted((prevState) => {
      return !prevState;
    });
  }, []);
  const [selectedQuote, setSelectedQuote] = useRecoilState(selectedQuoteAtom);
  const [quotes, setQuotes] = useRecoilState(quotesListAtom);

  const handleFieldChange = (field: keyof Quote, text: string) => {
    const newQuote = { ...quote };
    if (field === "price") {
      const newVal = text.replace(/[^0-9,.]/g, "");
      const number = Number(newVal);
      newQuote[field] = isNaN(number) ? newQuote[field] : String(newVal);
    } else {
      newQuote[field] = text;
    }
    setQuote(newQuote);
  };

  const paymentOptions = useMemo(() => {
    if (constants) {
      return Object.keys(constants.QUOTE_OPTIONS.PAY).map((key) => {
        return {
          label:
            constants.QUOTE_OPTIONS.PAY[
              key as keyof typeof constants.QUOTE_OPTIONS.PAY
            ].text,
          value:
            constants.QUOTE_OPTIONS.PAY[
              key as keyof typeof constants.QUOTE_OPTIONS.PAY
            ].id,
        };
      });
    }
    return [];
  }, [constants]);

  const handleSubmit = async () => {
    setIsLoading(true);
    const data = {
      status: "accepted",
      price: Number(quote.price),
      due: dayjs().add(15, "days").toDate(),
      downpayment: Number(quote.downPayment),
      paymentOption: quote.remainder,
      cancellationTerm: constants.QUOTE_OPTIONS.CANCELLATION.WITHIN24BACK80.id,
    };
    const response = await apis.quote.approveQuote(quoteId, data);
    if (response.success) {
      const updatedQuote = {
        ...selectedQuote,
        ...data,
      } as unknown as QuoteModel;
      setSelectedQuote(updatedQuote);
      const newQuotes = [...quotes];
      const index = newQuotes.findIndex((item) => item.id === quoteId);
      if (index >= 0) {
        newQuotes[index] = updatedQuote;
      }
      setSelectedQuote(updatedQuote);
      setQuotes(newQuotes);
      setIsSubmitted(true);
      setIsLoading(false);
      handleClose();
      onAccept?.();
    } else {
      toast.show({
        placement: "top",
        description: "Something went wrong. Please try again.",
      });
    }
    setIsLoading(false);
  };

  const handleClose = () => {
    if (isLoading) {
      return;
    }
    setQuote({
      price: "",
      downPayment: "",
      remainder: "",
    });
    onClose();
  };

  return (
    <>
      <ReactNativeModal
        isVisible={isOpen}
        onBackdropPress={handleClose}
        backdropOpacity={0}
        style={styles.root}
      >
        <View style={styles.container}>
          <View>
            <View style={styles.header}>
              <View style={styles.hiddenBackButton} />
              <TouchableOpacity onPress={handleClose}>
                <AntDesign name="close" size={20} style={styles.closeIcon} />
              </TouchableOpacity>
            </View>
            <Text style={styles.title}>Submit your quote</Text>
            <View style={styles.inputsContainer}>
              <TextInput
                label="What is the full price for this party?"
                inputProps={{
                  keyboardType: "numeric",
                  InputLeftElement: <Text style={styles.usdSymbol}>$</Text>,
                  value: quote.price,
                  onChangeText: (text: string) => {
                    handleFieldChange("price", text);
                  },
                  style: styles.priceInput,
                }}
              />
              {quote.price !== "" && Number(quote.price) !== 0 && (
                <>
                  {isConstantsLoading ? (
                    <ActivityIndicator size={16} color={Color.primaryPink} />
                  ) : (
                    <>
                      <SelectInput
                        label="Downpayment"
                        selectedValue={quote.downPayment}
                        options={downPaymentOptions}
                        onValueChange={(itemValue: string) => {
                          handleFieldChange("downPayment", itemValue);
                        }}
                      />
                      <SelectInput
                        label="Remainder Payment Options"
                        selectedValue={quote.remainder}
                        options={paymentOptions}
                        onValueChange={(itemValue: string) => {
                          handleFieldChange("remainder", itemValue);
                        }}
                      />
                      <View style={styles.infoContainer}>
                        <Text style={styles.quoteValidText}>
                          Quote Valid for 15 Days
                        </Text>
                        <Text style={styles.cancellationTerms}>
                          Cancellation Terms
                        </Text>
                        <Text
                          style={[styles.quoteValidText, styles.cancelWith]}
                        >
                          Cancel witin 24 hours to receive 80% back
                        </Text>
                      </View>
                    </>
                  )}
                </>
              )}
            </View>
          </View>
          <GradientButton
            text="Submit"
            disabled={
              !quote.remainder || !quote.downPayment || Number(quote.price) <= 0
            }
            textStyle={styles.submitButtonText}
            loading={isLoading}
            onPress={handleSubmit}
          />
        </View>
      </ReactNativeModal>
      <QuoteSubmittedModal
        isOpen={isSubmitted}
        onClose={toggleSubmittedModal}
      />
    </>
  );
};
