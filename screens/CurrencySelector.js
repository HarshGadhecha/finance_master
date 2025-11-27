import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { ButtonColor, ML, MM, MS, width } from '../constants/Layout';
import { CURRENCY_CODES, feedbackOptions, getCurrencyIndex, selectedCurrencyIndex } from '../constants/ReUsableComponents';
import HapticFeedback from 'react-native-haptic-feedback';

const CurrencySelector = () => {

    const [currencyIndex, setcurrencyIndex] = useState(0);

    useEffect(() => {
        // retrieve the previously selected currency index from AsyncStorage
        async function getCurrencyIndex() {
            const index = await AsyncStorage.getItem('selectedCurrencyIndex');
            if (index) {
                setcurrencyIndex(parseInt(index));
            } else {
                setcurrencyIndex(0); // default to first currency if no currency is selected yet
            }
        }
        getCurrencyIndex();
    }, []);

    const handleCurrencyChange = async (selectedIndex) => {
        // save the selected currency index to AsyncStorage
        await AsyncStorage.setItem('selectedCurrencyIndex', selectedIndex.toString());
        setcurrencyIndex(selectedIndex);
        selectedCurrencyIndex[0] = Number(selectedIndex);
        console.log(selectedCurrencyIndex[0] + '   From handle change function');
    };
    return (
        <SelectDropdown
            data={CURRENCY_CODES}
            defaultButtonText={CURRENCY_CODES[currencyIndex]}
            dropdownBackgroundColor={null}
            buttonStyle={styles.dropdownBtnStyle}
            dropdownStyle={styles.dropdownStyle}
            buttonTextStyle={styles.dropdownTextStyle}
            rowTextStyle={styles.dropdownText}
            showsVerticalScrollIndicator={false}
            renderDropdownIcon={isOpened => {
                return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={ButtonColor} size={12} />;
            }}
            onSelect={(selectedItem, index) => {
                HapticFeedback.trigger('impactLight', feedbackOptions);

                handleCurrencyChange(index);
                console.log(index, selectedItem + '   - From dropdown');
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
        borderWidth: 0.5, borderRadius: 10, borderColor: '#ccc', backgroundColor: 'white', fontSize: 12, width: width / 3 - 20, height: 40, 
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    dropdownTextStyle: { fontSize: 12, fontFamily:MS},
    dropdownStyle: { borderRadius: 10, fontSize: 12,fontFamily:MS },
    buttonStyle: { color: 'white', fontSize: 12 },
    dropdownText: { fontSize: 12,fontFamily:MM }
})