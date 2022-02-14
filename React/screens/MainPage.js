import React from 'react';
import {SafeAreaView, View} from 'react-native';
import Header from '../modules/Header';
import Categories from '../modules/Categories'
import NavigBar from '../modules/NavigBar';


const MainPage = ({navigation}) => {
    return (
        <View style={{flex: 1}}>
            <View style={{flex: 1}}>
                <Header/>
            </View>
            <SafeAreaView style={{flex: 5}}>
                <Categories navigation={navigation}/>
            </SafeAreaView>
            <View style={{flex: 1}}>
                <NavigBar navigation={navigation} root={'MainPage'}/>
            </View>
        </View>
    );
};

export default MainPage;