import { View, TextInput, Modal, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { height, width } from '../constants/Layout';

export const ComingSoon = () => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Image source={require('../assets/images/extra/soon.png')} style={{ width: width / 1.5, height: height * 0.40 }} />
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10, }}>Calculator Coming Soon</Text>
            <Text style={{ marginVertical: 25, fontSize: 16, textAlign: 'center', paddingHorizontal: 30, }}>We are currently working on adding a calculator to this app. Please check back later for updates.</Text>
        </View>
    )
}