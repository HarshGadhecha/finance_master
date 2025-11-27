import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, TextInput, Modal, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { ButtonColor, HeadingColor, MM, MS, height, width } from '../constants/Layout';
import { ResetButton, feedbackOptions, seachArray } from '../constants/ReUsableComponents';
import { AdBanner } from '../constants/AdMob';
import HapticFeedback from 'react-native-haptic-feedback';

const SearchInput = ({ }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const navigation = useNavigation();


  const [isFocused, setIsFocused] = useState(false);
  const searchColor = isFocused ? '#407BFF' : 'lightgrey';

  const handleSearch = ({ }) => {
    if (searchTerm) {
      const filteredData = seachArray.reduce((acc, cur) => [...acc, ...cur.data.filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()))], []);
      setSearchResults(filteredData);
      setShowResults(true);
    }
  };

  const handleCancel = () => {
    setSearchTerm('');
    setShowResults(false);
  };
  const renderItem = ({ item }) => (
    <TouchableOpacity style={{ flexDirection: 'row', padding: 20, borderColor: 'lightgrey', borderWidth: 0.5, margin: 5, borderRadius: 15, justifyContent: 'space-between' }}
      onPress={() => {
        HapticFeedback.trigger('impactLight', feedbackOptions);
        handleCancel();
        navigation.navigate(item.onPress)
      }} >
      <Text style={{ fontSize: 16, fontFamily: MM }}>{item.title}</Text>
      <AntDesign name='right' size={18} />
    </TouchableOpacity>
  );


  return (
    <View>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: isFocused ? '#407BFF' : 'lightgrey',
        borderRadius: 25,
        backgroundColor: 'white',
        marginVertical: 20,
        paddingVertical: 10, paddingHorizontal: 20, shadowColor: isFocused ? '#407BFF' : 'lightgrey',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.45,
        shadowRadius: 1.84,
        elevation: 5,
      }}>
        <Ionicons name="search-outline" size={24} color={searchColor} style={{ marginRight: 10, }} />
        <TextInput
          placeholder="Search calculator..."
          placeholderTextColor={'lightgrey'}
          value={searchTerm}
          onChangeText={setSearchTerm}
          numberOfLines={1}
          maxLength={30}
          onSubmitEditing={handleSearch}
          style={{ flex: 1, fontFamily: MS }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {searchTerm.length > 0 && (
          <TouchableOpacity onPress={handleCancel} style={{ marginLeft: 10 }}>
            <Ionicons name="close-outline" size={24} color="#FF725E" />
          </TouchableOpacity>
        )}
      </View>
      <Modal visible={showResults} animationType="slide">

        {searchResults.length > 0 ? (
          <FlatList
            data={searchResults}
            ListHeaderComponent={
              <View style={{ alignItems: 'center' }}>
                <Image source={require('../assets/images/extra/Search-true.png')} style={{ width: width / 2, height: height * 0.30 }} />
                <Text style={{ fontSize: 18, fontFamily: MS, marginVertical: 15, color: '#407BFF' }}>Search Results</Text>
              </View>
            }
            renderItem={renderItem}
            keyExtractor={(item) => item.title}
            style={{ padding: 20, marginTop: 50 }}
            ListFooterComponent={
              <>
                <TouchableOpacity style={{ backgroundColor: '#FF725E', paddingVertical: 15, paddingHorizontal: 30, borderRadius: 15, marginVertical: 20 }} onPress={() => {
                  HapticFeedback.trigger('impactLight', feedbackOptions);
                  setShowResults(false)
                }}>
                  <Text style={{ fontSize: 18, color: 'white', textAlign: 'center' }}>Close</Text>
                </TouchableOpacity>
                <View style={{ height: height * 0.10 }} />
              </>
            }
          />
        ) : (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Image source={require('../assets/images/extra/noResult.png')} style={{ width: width - 40, height: height * 0.40 }} />
            <Text style={{ marginVertical: 25, fontFamily: MS, fontSize: 16, textAlign: 'center' }}>Please try searching for{'\n'}another keyword.</Text>
            <TouchableOpacity style={{ backgroundColor: '#FF725E', paddingVertical: 15, paddingHorizontal: 30, borderRadius: 15 }} onPress={() => {
              HapticFeedback.trigger('impactLight', feedbackOptions);
              setShowResults(false)
            }}>
              <Text style={{ fontSize: 16, color: 'white', fontFamily: MS }}>Close</Text>
            </TouchableOpacity>
            <AdBanner />
          </View>
        )}
      </Modal>
    </View>
  );
};

export default SearchInput;












// <Ionicons name="search-outline" size={24} color="black" style={styles.searchIcon} />
// <TextInput
//   placeholder="Search..."
//   value={searchTerm}
//   onChangeText={setSearchTerm}
//   onEndEditing={handleSearch}
//   style={styles.searchInput}
// />


// flexDirection: 'row',
// alignItems: 'center',
// paddingHorizontal: 10,
// borderWidth: 1,
// margin: 10,
// borderRadius: 25,
// marginVertical: 20,
// },