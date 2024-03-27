import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from 'react';
import {Text, View} from 'react-native';
import {styles} from './styles';
import {
  CalendarIcon,
  ClockIcon,
  GuestsIcon,
  LocationIcon,
  PersonIcon,
} from '../../Icons';
import {ChatMessageModel, QuoteStatusEnum} from '../../../models';
import dayjs from 'dayjs';
import {Button, GradientButton} from '../../Atoms';
import {DenyQuoteModal} from '../../Moleculs';
import {CreateQuoteModal} from '../../Moleculs/CreateQuoteModal/CreateQuoteModal';
import {Message} from '../Message/Message';
import FastImage from 'react-native-fast-image';
import {Color} from '../../../GlobalStyles';
import useGlobalState from '../../../stateManagement/hook';
import StateTypes from '../../../stateManagement/StateTypes';
import {GhostButton} from '../../GhostButton';
import {ConfirmationModal} from '../../Moleculs/ConfirmationModal';
import apis from '../../../apis';
import {useToast} from 'native-base';
import {QuoteInfo} from './QuoteInfo';
import {usePayment} from './hooks/use-payment';

type QuoteMessageProps = {
  chatMessage: ChatMessageModel;
  isMe: boolean;
  setMessages: Dispatch<SetStateAction<ChatMessageModel[]>>;
  vendorId: number;
};

export const QuoteMessage: React.FC<QuoteMessageProps> = ({
  chatMessage,
  isMe,
  setMessages,
  vendorId,
}) => {
  const [user] = useGlobalState(StateTypes.user.key, StateTypes.user.default);
  const {isLoading: isPaymentLoading, fetchPaymentSheetParams} = usePayment();
  const toast = useToast();
  const {party, quote} = chatMessage;
  const startDate = useMemo(() => {
    const start = dayjs(party?.startDate).format('MM/DD/YYYY');
    const end = dayjs(party?.endDate).format('MM/DD/YYYY');

    return start === end ? start : `${start} - ${end}`;
  }, [party]);

  const [isDenyVendorModalOpen, setIsDenyVendorModalOpen] = useState(false);
  const [isDenyHostModalOpen, setIsDenyHostModalOpen] = useState(false);
  const [isDenyHostQuoteModalLoading, setIsDenyHostQuoteModalLoading] =
    useState(false);
  const [isCreateQuoteModalOpen, setIsCreateQuoteModalOpen] = useState(false);
  const [isAcceptHostQuoteModalOpen, setIsAcceptHostQuoteModalOpen] =
    useState(false);
  const [isAcceptHostQuoteModalLoading, setIsAcceptHostQuoteModalLoading] =
    useState(false);

  const toggleDenyVendorModal = useCallback(() => {
    setIsDenyVendorModalOpen(prevState => {
      return !prevState;
    });
  }, []);

  const toggleDenyHostModal = useCallback(() => {
    setIsDenyHostModalOpen(prevState => {
      return !prevState;
    });
  }, []);

  const toggleQuoteModal = useCallback(() => {
    setIsCreateQuoteModalOpen(prevState => {
      return !prevState;
    });
  }, []);

  const toggleAcceptHostQuoteModal = useCallback(() => {
    // fetchPaymentSheetParams(
    //   (quote?.price! * quote?.downpayment!) / 100,
    //   quote?.vendorId!,
    // );
    if (isAcceptHostQuoteModalLoading) {
      return;
    }
    setIsAcceptHostQuoteModalOpen(prevState => {
      return !prevState;
    });
  }, [isAcceptHostQuoteModalLoading]);

  const acceptHostQuote = useCallback(async () => {
    setIsAcceptHostQuoteModalLoading(true);
    const response = await apis.quote.changeStatus(
      quote?.id!,
      QuoteStatusEnum.ACCEPTED_BY_HOST,
    );
    setIsAcceptHostQuoteModalLoading(false);
    toggleAcceptHostQuoteModal();
    if (!response.success) {
      toast.show({
        placement: 'top',
        description: 'Something went wrong. Please try again.',
      });
    } else {
      setMessages(prevState => {
        const newState = prevState.slice();
        const message = newState.find(item => item.id === chatMessage.id);
        if (message?.quote) {
          message.quote.status = QuoteStatusEnum.ACCEPTED_BY_HOST;
        }

        return newState;
      });
    }
  }, []);

  const denyHostQuote = useCallback(async () => {
    setIsDenyHostQuoteModalLoading(true);
    const response = await apis.quote.changeStatus(
      quote?.id!,
      QuoteStatusEnum.DENIED_BY_HOST,
    );
    setIsDenyHostQuoteModalLoading(false);
    toggleDenyHostModal();
    if (!response.success) {
      toast.show({
        placement: 'top',
        description: 'Something went wrong. Please try again.',
      });
    } else {
      setMessages(prevState => {
        const newState = prevState.slice();
        const message = newState.find(item => item.id === chatMessage.id);
        if (message?.quote) {
          message.quote.status = QuoteStatusEnum.DENIED_BY_HOST;
        }

        return newState;
      });
    }
  }, []);

  const handleAccept = useCallback(() => {
    if (chatMessage.quoteId) {
      setMessages(prevState => {
        const newState = [...prevState];
        const index = newState.findIndex(
          item => item.quoteId === chatMessage.quoteId,
        );

        if (index >= 0 && newState[index]?.quote?.status) {
          // @ts-expect-error ignore
          newState[index].quote.status = 'accepted';
        }

        return newState;
      });
    }
  }, [setMessages, chatMessage.quoteId]);

  if (
    chatMessage.meta?.status === QuoteStatusEnum.ACCEPTED_BY_HOST ||
    chatMessage.meta?.status === QuoteStatusEnum.DENIED_BY_HOST
  ) {
    let getTitle = () => {
      if (quote?.status === QuoteStatusEnum.DENIED_BY_HOST) {
        return 'Offer rejected';
      } else {
        return 'Offer accepted';
      }
    };
    return (
      <Message
        chatMessage={chatMessage}
        isMe={isMe}
        type="host"
        contentStyle={styles.acceptedByVendorContainer}
        content={
          <>
            <QuoteInfo title={getTitle()} quote={quote!} />
          </>
        }
      />
    );
  }

  console.log('vendorId', vendorId);

  if (chatMessage.meta?.status === QuoteStatusEnum.ACCEPTED_BY_VENDOR) {
    return (
      <>
        <Message
          chatMessage={chatMessage}
          isMe={isMe}
          type="host"
          contentStyle={styles.acceptedByVendorContainer}
          userIconColor={Color.primaryPink}
          content={
            <>
              <QuoteInfo quote={quote!} />
              {quote?.status === QuoteStatusEnum.ACCEPTED_BY_VENDOR && (
                <>
                  {isMe ? null : (
                    <View style={styles.hostActions}>
                      <Text style={styles.bookVendorText}>
                        Would you like to book this vendor?
                      </Text>
                      <GradientButton
                        colors={['#FF077E', '#FF077E']}
                        style={styles.acceptButton}
                        textStyle={styles.acceptButtonText}
                        text="Yes, book this vendor!"
                        onPress={toggleAcceptHostQuoteModal}
                        loading={isPaymentLoading}
                      />
                      <GhostButton
                        style={styles.declineButton}
                        onPress={toggleDenyHostModal}>
                        <Text style={styles.declineText}>Decline Offer</Text>
                      </GhostButton>
                    </View>
                  )}
                </>
              )}
            </>
          }
        />
        <ConfirmationModal
          isOpen={isDenyHostModalOpen}
          onClose={toggleDenyHostModal}
          title="Are sure to denied this offer?"
          onAccept={denyHostQuote}
          isLoading={isDenyHostQuoteModalLoading}
        />

        <ConfirmationModal
          title="Are sure to accept this offer?"
          isOpen={isAcceptHostQuoteModalOpen}
          onClose={toggleAcceptHostQuoteModal}
          onAccept={acceptHostQuote}
          isLoading={isAcceptHostQuoteModalLoading}
        />
      </>
    );
  }

  return (
    <>
      <Message
        chatMessage={chatMessage}
        isMe={isMe}
        type="host"
        content={
          <>
            <Text style={styles.partyNameText}>{party?.name}</Text>
            <View style={styles.partyInfoContainer}>
              <View style={styles.partyItemRowInfo}>
                <CalendarIcon style={styles.icon} />
                <Text style={styles.contentText}>{startDate}</Text>
              </View>
              <View style={styles.partyItemRowInfo}>
                <ClockIcon style={styles.icon} />
                <Text style={styles.contentText}>
                  {dayjs(party?.startTime).format('h:mm A')} -{' '}
                  {dayjs(party?.endTime).format('h:mm A')}
                </Text>
              </View>
              {!!party?.street && (
                <View style={styles.partyItemRowInfo}>
                  <LocationIcon style={styles.icon} />
                  <Text style={styles.contentText}>{party.street}</Text>
                </View>
              )}
              <View style={styles.partyItemRowInfo}>
                <GuestsIcon style={styles.icon} />
                <Text style={styles.contentText}>
                  {party?.attendingMin}-{party?.attendingMax} guest
                </Text>
              </View>
            </View>
            {!!party?.description && (
              <Text style={styles.descriptionText}>{party?.description}</Text>
            )}
          </>
        }
      />
      {!!vendorId &&
        (chatMessage.quote?.status === QuoteStatusEnum.PENDING ||
          chatMessage.quote?.status === QuoteStatusEnum.NEW) && (
          <>
            <View style={styles.innerContainer}>
              <View style={styles.actionsRoot}>
                <Text style={styles.actionTitle}>
                  Would you like to accept or deny this Job?
                </Text>
                <GradientButton
                  text="Create a Quote"
                  textStyle={styles.createQuoteText}
                  onPress={toggleQuoteModal}
                />
                <Button
                  text="Denny Request"
                  onPress={toggleDenyVendorModal}
                  style={styles.denyRequestButton}
                />
              </View>
              {user?.avatar ? (
                <FastImage
                  style={styles.image}
                  resizeMode="cover"
                  source={{uri: user?.avatar}}
                />
              ) : (
                <PersonIcon width={32} height={32} fill={Color.primaryPink} />
              )}
            </View>
            <DenyQuoteModal
              isOpen={isDenyVendorModalOpen}
              onClose={toggleDenyVendorModal}
              quoteId={chatMessage.quoteId!}
            />
            <CreateQuoteModal
              isOpen={isCreateQuoteModalOpen}
              onClose={toggleQuoteModal}
              quoteId={chatMessage.quoteId!}
              onAccept={handleAccept}
            />
          </>
        )}
    </>
  );
};
