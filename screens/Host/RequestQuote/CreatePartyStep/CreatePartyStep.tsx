import React, {Dispatch, SetStateAction, useEffect, useMemo} from 'react';
import {
  Dimensions,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from './styles';
import {RequestQuote, RequestQuoteStepEnum} from '../RequestQuoteScreen';
import {TextInput} from '../../../../components/Input';
import {DatePicker} from '../../../../components/Input/DatePicker';
import {LocationAutocomplete} from '../../../../components/Input/LocationAutocomplete';
import {
  GooglePlaceData,
  GooglePlaceDetail,
} from 'react-native-google-places-autocomplete';
import dayjs from 'dayjs';
import LinearGradient from 'react-native-linear-gradient';
import {CameraAddIcon, TrashIcon} from '../../../../components/Icons';
import {Color} from '../../../../GlobalStyles';
import {useNavigation} from '@react-navigation/core';
import {
  selectedMediaAtom,
  SelectedMediaEnum,
} from '../../../../stateManagement';
import {useRecoilState} from 'recoil';
import {IconBg} from '../../../../components/Atoms';
import {useImageSelect} from '../../../../hooks/useImageSelect';
const height = Dimensions.get('window').height;

type CreatePartyStepProps = {
  quote: RequestQuote;
  setQuote: Dispatch<SetStateAction<RequestQuote>>;
};

export const CreatePartyStep: React.FC<CreatePartyStepProps> = ({
  quote,
  setQuote,
}) => {
  const [selectedMedia, setSelectedMedia] = useRecoilState(selectedMediaAtom);
  const navigation = useNavigation();
  const {selectImage} = useImageSelect();
  const handleFieldChange = (key: string, val?: unknown) => {
    setQuote(prevState => {
      return {
        ...prevState,
        party: {
          ...prevState.party,
          [key]: val,
        },
      };
    });
  };

  const formErrors = useMemo(() => {
    const errors: Record<string, string> = {};
    if (
      !!quote.party?.startDate &&
      !!quote.party?.endDate &&
      dayjs(quote.party?.startDate).isAfter(quote.party?.endDate, 'date')
    ) {
      errors.endDate = "End date can't be after start date";
    }
    if (
      !!quote.party?.startDate &&
      !!quote.party?.endDate &&
      !!quote.party?.startTime &&
      !!quote.party?.endTime &&
      dayjs(quote.party?.startDate).isSame(quote.party?.endDate, 'date') &&
      dayjs(quote.party?.startTime).isAfter(quote.party?.endTime)
    ) {
      errors.endTime = "End time can't be after start time";
    }
    return errors;
  }, [quote]);

  const isValid =
    !Object.keys(formErrors).length &&
    !!quote.party?.name &&
    !!quote.party?.startDate &&
    !!quote.party?.endDate &&
    !!quote.party?.startTime &&
    !!quote.party?.endTime;

  useEffect(() => {
    setQuote(prevState => {
      return {
        ...prevState,
        steps: {
          ...prevState.steps,
          [RequestQuoteStepEnum.PARTY_CREATE]: {
            isValid,
            errors: formErrors,
          },
        },
      } as RequestQuote;
    });
  }, [isValid]);

  const handleNavigateMedia = async () => {
    const image = await selectImage();
    console.log('image', image);
    if (image) {
      setQuote(prevState => {
        return {
          ...prevState,
          party: {
            ...prevState.party,
            image: image.assets?.[0]?.uri,
          },
        } as RequestQuote;
      });
    }
  };

  const handleClearPhoto = () => {
    setQuote(prevState => {
      return {
        ...prevState,
        party: {
          ...prevState.party,
          image: undefined,
        },
      } as RequestQuote;
    });
  };

  return (
    <View style={[styles.root, {minHeight: height - 300}]}>
      <Text style={styles.title}>Create Your Party!</Text>
      <Text style={styles.subTitle}>
        Fill in your party info so you can start to book services.
      </Text>
      {quote.party?.image ? (
        <TouchableOpacity
          onPress={handleNavigateMedia}
          style={styles.imageContainer}>
          <ImageBackground
            source={quote.party?.image ? {uri: quote.party.image} : undefined}
            style={{position: 'absolute', width: '100%', height: '100%'}}
            imageStyle={{borderRadius: 8}}
          />
          <TouchableOpacity
            style={styles.deleteContainer}
            onPress={handleClearPhoto}>
            <IconBg>
              <TrashIcon color={Color.textMainWhite} />
            </IconBg>
          </TouchableOpacity>
          <LinearGradient
            style={styles.circle}
            locations={[0, 1]}
            colors={['#FF077EE5', '#ff077e']}
            useAngle={true}
            angle={-90}>
            <CameraAddIcon color={Color.textMainWhite} width={30} height={30} />
          </LinearGradient>
          <TouchableOpacity />
        </TouchableOpacity>
      ) : (
        <View style={styles.addPhotoContainer}>
          <TouchableOpacity
            style={styles.addPhotoWrapper}
            onPress={handleNavigateMedia}>
            <LinearGradient
              style={styles.circle}
              locations={[0, 1]}
              colors={['#FF077EE5', '#ff077e']}
              useAngle={true}
              angle={-90}>
              <CameraAddIcon
                color={Color.textMainWhite}
                width={30}
                height={30}
              />
            </LinearGradient>
          </TouchableOpacity>
          <Text style={styles.addPhotoText}>Add Photos or Videos</Text>
        </View>
      )}
      <View style={styles.inputsContainer}>
        <TextInput
          inputProps={{
            value: quote.party?.name,
            onChangeText: (text: string) => {
              handleFieldChange('name', text);
            },
            placeholder: 'Party Name',
          }}
          formControlProps={{style: styles.partyNameInput}}
        />
        <DatePicker
          inputProps={{placeholder: 'Start Date'}}
          date={quote.party?.startDate}
          datePickerProps={{mode: 'date', minimumDate: new Date()}}
          onChange={date => {
            handleFieldChange('startDate', date);
          }}
          error={formErrors.startDate}
        />
        <DatePicker
          inputProps={{placeholder: 'End Date'}}
          date={quote.party?.endDate}
          datePickerProps={{mode: 'date', minimumDate: new Date()}}
          onChange={date => {
            handleFieldChange('endDate', date);
          }}
          error={formErrors.endDate}
        />
        <View style={styles.timePickersContainer}>
          <DatePicker
            inputProps={{placeholder: 'Start time'}}
            datePickerProps={{mode: 'time'}}
            date={quote.party?.startTime}
            onChange={date => {
              handleFieldChange('startTime', date);
            }}
            formControlProps={{style: styles.timePicker}}
            error={formErrors.startTime}
          />
          <DatePicker
            inputProps={{placeholder: 'End time'}}
            datePickerProps={{mode: 'time'}}
            date={quote.party?.endTime}
            onChange={date => {
              handleFieldChange('endTime', date);
            }}
            formControlProps={{style: styles.timePicker}}
            error={formErrors.endTime}
          />
        </View>
        <LocationAutocomplete
          placeholder="Location"
          value={quote.party?.street || ''}
          textInputProps={{
            onChangeText: val => {
              handleFieldChange('street', val);
            },
          }}
          onPress={(
            data: GooglePlaceData,
            detail: GooglePlaceDetail | null,
          ) => {
            handleFieldChange('street', detail?.formatted_address || '');
          }}
        />
      </View>
    </View>
  );
};
