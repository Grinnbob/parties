import {useState} from 'react';
import {useStripe} from '@stripe/stripe-react-native';
import {payToVendor} from '../../../../apis/routes/user';
import {useToast} from 'native-base';

export const usePayment = () => {
  const toast = useToast();
  const {initPaymentSheet, presentPaymentSheet} = useStripe();

  const [paymentId, setPaymentId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = (amount: number, paymentId: string) => {};
  const initializePaymentSheet = async (
    paymentIntent: string,
    ephemeralId: string,
    customer: string,
    amount: number,
    paymentId: string,
  ) => {
    const {error} = await initPaymentSheet({
      merchantDisplayName: 'Example, Inc.',
      customerId: customer,
      customerEphemeralKeySecret: ephemeralId,
      paymentIntentClientSecret: paymentIntent,
      allowsDelayedPaymentMethods: true,
      applePay: {
        merchantCountryCode: 'US',
      },
    });

    if (!error) {
      const {error} = await presentPaymentSheet(); // you can't change the variable name (error)
      console.log('Your order is confirmed///!', error);

      if (error?.code === 'Canceled' || error?.code === 'Failed') {
        setIsLoading(false);
      } else {
        // alert(`Error code: ${error.code}`, error.message);
        submitHandler(amount, paymentId);
      }
    }
  };

  const fetchPaymentSheetParams = async (amount: number, vendorId: number) => {
    const orderAmount = Number(amount);

    let data = {
      amount: orderAmount,
      vendorId,
    };
    setIsLoading(true);
    let response;
    response = await payToVendor(data);
    if (response.status === 200) {
      console.log('response', response);
      let resp = response.data;

      const {paymentIntent, ephemeralKey, customer} = resp?.data;
      const paymentID = paymentIntent?.client_secret; // may change for android
      const ephemeralId = ephemeralKey?.secret; // will be changed for android

      if (paymentIntent) {
        setPaymentId(paymentIntent.id);

        initializePaymentSheet(
          paymentId,
          ephemeralId,
          customer,
          amount,
          paymentIntent.id,
        );
      } else {
        console.log('payment id', paymentID);

        submitHandler(amount, paymentID);
      }
    } else {
      toast.show({
        placement: 'top',
        description: response.message,
      });
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    fetchPaymentSheetParams,
  };
};
