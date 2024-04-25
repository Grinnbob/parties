import {useState} from 'react';
import {useStripe} from '@stripe/stripe-react-native';
import {payToVendor} from '../../../../apis/routes/user';
import {useToast} from 'native-base';

export const usePayment = () => {
  const toast = useToast();
  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const [isLoading, setIsLoading] = useState(false);

  const initializePaymentSheet = async (
    paymentIntent: string,
    ephemeralId: string,
    customer: string,
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
      if (error?.code === 'Canceled' || error?.code === 'Failed') {
        toast.show({
          placement: 'top',
          description: `${error}`,
        });
      } else {
        return;
      }
    } else {
      toast.show({
        placement: 'top',
        description: `${error}`,
      });
      setIsLoading(false);
    }
  };

  const fetchPaymentSheetParams = async (amount: number, vendorId: number, 
  ) => {
    const orderAmount = Number(amount);
    setIsLoading(true);

    let data = {
      amount: orderAmount,
      vendorId,
    };
    let response = await payToVendor(data);
    console.log('response', response);

    if (response.success) {
      const {paymentIntent, ephemeralKey, customer} = response.data;
      if (paymentIntent) {
        await initializePaymentSheet(
          paymentIntent?.client_secret, // may change for android
          ephemeralKey?.secret, // will be changed for android
          customer,
        );
        setIsLoading(false);
      }
      
    } else {
      toast.show({
        placement: 'top',
        description: response.message,
      });
    }
    setIsLoading(false);
  };

  return {
    isLoading,
    fetchPaymentSheetParams,
  };
};
