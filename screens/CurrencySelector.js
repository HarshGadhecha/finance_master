import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, useColorScheme } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { ButtonColor, ML, MM, MS, width } from '../constants/Layout';
import { CURRENCY_CODES, feedbackOptions, getCurrencyIndex, selectedCurrencyIndex } from '../constants/ReUsableComponents';
import HapticFeedback from 'react-native-haptic-feedback';
import Colors from '../constants/Colors';

const CurrencySelector = () => {
    const colorScheme = useColorScheme();
    const themeColors = Colors[colorScheme ?? 'light'];
    const [currencyIndex, setcurrencyIndex] = useState(0);

    useEffect(() => {
        // retrieve the previously selected currency index from AsyncStorage
        async function loadCurrencyIndex() {
            const index = await AsyncStorage.getItem('selectedCurrencyIndex');
            if (index) {
                const parsedIndex = parseInt(index);
                setcurrencyIndex(parsedIndex);
                selectedCurrencyIndex[0] = parsedIndex;
            } else {
                setcurrencyIndex(0);
                selectedCurrencyIndex[0] = 0;
            }
        }
        loadCurrencyIndex();
    }, []);

    const handleCurrencyChange = async (selectedIndex) => {
        // save the selected currency index to AsyncStorage
        await AsyncStorage.setItem('selectedCurrencyIndex', selectedIndex.toString());
        setcurrencyIndex(selectedIndex);
        selectedCurrencyIndex[0] = Number(selectedIndex);
    };

    return (
        <SelectDropdown
            data={CURRENCY_CODES}
            defaultButtonText={CURRENCY_CODES[currencyIndex]}
            buttonStyle={{
                ...styles.dropdownBtnStyle,
                backgroundColor: themeColors.cardBackground,
                borderColor: themeColors.cardBorder,
            }}
            dropdownStyle={{
                ...styles.dropdownStyle,
                backgroundColor: themeColors.cardBackground,
            }}
            buttonTextStyle={{
                ...styles.dropdownTextStyle,
                color: themeColors.text,
            }}
            rowTextStyle={{
                ...styles.dropdownText,
                color: themeColors.text,
            }}
            rowStyle={{
                backgroundColor: themeColors.cardBackground,
            }}
            showsVerticalScrollIndicator={false}
            renderDropdownIcon={isOpened => {
                return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={themeColors.primary} size={12} />;
            }}
            onSelect={(selectedItem, index) => {
                HapticFeedback.trigger('impactLight', feedbackOptions);
                handleCurrencyChange(index);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
                return item;
            }}
        />
    );
};

export default CurrencySelector;


const styles = StyleSheet.create({
    dropdownBtnStyle: {
        borderWidth: 1,
        borderRadius: 12,
        fontSize: 12,
        width: width / 3 - 20,
        height: 45,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    dropdownTextStyle: {
        fontSize: 12,
        fontFamily: MS
    },
    dropdownStyle: {
        borderRadius: 12,
        fontSize: 12,
        fontFamily: MS,
        marginTop: -30,
    },
    dropdownText: {
        fontSize: 12,
        fontFamily: MM
    }
})