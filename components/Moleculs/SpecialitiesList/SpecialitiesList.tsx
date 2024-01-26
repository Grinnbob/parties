import React, { useCallback, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { Color } from "../../../GlobalStyles";
import { Tag } from "../../Atoms";
import { CloseIcon } from "../../Icons";
import { ReactNativeModal } from "react-native-modal";
import SearchBar from "../../Input/SearchBar";
import { FlatList } from "native-base";
import apis from "../../../apis";
import { KeyItemModel } from "../../../models";
import { AddButton } from "../../Atoms/AddButton";

export const MAX_SPECIALITIES_KEY_COUNT = 5;

type SpecialitiesListProps = {
  label?: string;
  keys: Array<KeyItemModel>;
  onChange?: (keys: Array<KeyItemModel>) => void;
  onRemove?: (key: KeyItemModel) => Promise<void>;
};

export const SpecialitiesList: React.FC<SpecialitiesListProps> = ({
  label = "Our Specialties",
  keys = [],
  onChange,
  onRemove,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [idToDelete, setIdToDelete] = useState<number | null>(null);
  const [searchResult, setSearchResult] = useState<KeyItemModel[]>([]);
  const [debounceValue, setDebounceValue] = useState("");

  const setSearch = async (item: KeyItemModel | { name: string }) => {
    if ((item as KeyItemModel).id) {
      onChange?.([...keys, item as KeyItemModel]);
      setIsOpen(false);
      setSearchTerm("");
      return;
    }

    const res = await apis.key.create(item as KeyItemModel);

    onChange?.([...keys, res.data]);
    setSearchTerm("");
    setIsOpen(false);
  };

  const handleCancel = () => {
    setSearchTerm("");
  };

  const onDebounce = async (text: string) => {
    try {
      setIsLoading(true);

      const res = await apis.key.getAllSearch(text);

      if (res.success) {
        setSearchResult(res.data);
      }
      setDebounceValue(text);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const toggle = useCallback(() => {
    setIsOpen((prevState) => {
      return !prevState;
    });
  }, []);

  const isDisabledAdd = keys.length >= MAX_SPECIALITIES_KEY_COUNT || !onChange;

  return (
    <>
      <View style={styles.root}>
        <View style={styles.header}>
          <Text style={styles.title}>{label}</Text>
          {!!onChange && (
            <AddButton
              style={isDisabledAdd ? styles.hidden : undefined}
              onPress={toggle}
              disabled={isDisabledAdd}
            />
          )}
        </View>
        <View style={styles.tagsContainer}>
          {keys.map((key) => {
            return (
              <Tag
                key={key.name}
                text={key.name}
                style={styles.tag}
                textStyle={styles.tagText}
              >
                {!!onRemove && (
                  <TouchableOpacity
                    onPress={async () => {
                      setIdToDelete(key.id);
                      await onRemove?.(key);
                      setIdToDelete(null);
                    }}
                  >
                    {idToDelete === key.id ? (
                      <ActivityIndicator
                        color={Color.textMainWhite}
                        size={8}
                        style={styles.tagDeleteIndicator}
                      />
                    ) : (
                      <CloseIcon color={Color.textMainWhite} />
                    )}
                  </TouchableOpacity>
                )}
              </Tag>
            );
          })}
        </View>
        {!isDisabledAdd && (
          <Text style={styles.maxCountText}>
            Add at least {MAX_SPECIALITIES_KEY_COUNT} key words
          </Text>
        )}
      </View>
      <ReactNativeModal
        isVisible={isOpen}
        onBackdropPress={toggle}
        backdropOpacity={0}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <SearchBar
            placeholder="Search"
            placeholderTextColor={Color.gray300}
            onChangeText={setSearchTerm}
            value={searchTerm}
            onDebounce={onDebounce}
            onCancel={handleCancel}
            cancelEnabled={searchTerm.length}
            delay={1000}
          />
          <FlatList
            ListHeaderComponent={() => {
              if (!isLoading) {
                return <></>;
              }
              return <ActivityIndicator color={Color.primaryPink} size={16} />;
            }}
            data={searchResult.filter(
              (item) => !keys.find((key) => key.id === item.id)
            )}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.border}
                onPress={() => setSearch(item)}
              >
                <Text style={styles.search}>{item.name}</Text>
              </TouchableOpacity>
            )}
            ListEmptyComponent={() =>
              debounceValue.length ? (
                <TouchableOpacity
                  style={styles.border}
                  onPress={() => setSearch({ name: debounceValue })}
                >
                  <Text style={styles.search}>Add new tag</Text>
                </TouchableOpacity>
              ) : (
                <View />
              )
            }
          />
        </View>
      </ReactNativeModal>
    </>
  );
};
