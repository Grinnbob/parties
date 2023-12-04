type Option = { id: string; text: string };

export type ConstantsModel = {
  QUOTE_OPTIONS: {
    ASSEMBLING: {
      BOTH: Option;
      BREAKDOWN: Option;
      NONE: Option;
      SETUP: Option;
    };
    DOWNPAYMENT: { FULL: Option; HALF: Option; THIRD: Option };
    CANCELLATION: { WITHIN24BACK80: Option };
    PAY: { CARD: Option; CASH: Option };
    SHIPMENT: { DELIVERY: Option; PICKUP: Option };
    STATUS: {
      ACCEPTED: Option;
      DENIED: Option;
      NEW: Option;
      PENDING: Option;
    };
  };
};
