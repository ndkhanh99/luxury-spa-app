import React, { useRef, useEffect, useState } from 'react';
import {StyleSheet, View, Text, TouchableOpacity, ImageBackground , TouchableWithoutFeedback} from 'react-native';
import LottieView from 'lottie-react-native';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Drawer from './src/Components/Drawer';
import 'react-native-gesture-handler';
import AppBackground from './assets/images/bg3.jpg';
export default function App() {
    const [loaded] = useFonts({
        Montserrat: require('./assets/fonts/Montserrat-BoldItalic.ttf'),
        Lato: require('./assets/fonts/Lato-BoldItalic.ttf'),
        Fuggles: require('./assets/fonts/Fuggles-Regular.ttf'),
        Roboto: require('./assets/fonts/Roboto-Italic.ttf'),
    })
    const animationRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const timerRef = useRef();
    function toHomeScreen() {
        setIsLoading(!isLoading);
        console.log(isLoading);
    }
    const resetTimer = () => {
        if (timerRef.current) clearTimeout(timerRef.current);
            timerRef.current = setTimeout(() => {
            setIsLoading(false);
        }, 5000); // 2 minutes
    };
    useEffect(() => {
        if (animationRef.current){
            animationRef.current.play();
        }
        resetTimer();
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, []);

    if (!loaded){
        return null;
    }


    return (
        <NavigationContainer>
            <TouchableWithoutFeedback onPress={resetTimer}>
                {
                    !isLoading
                    ?
                    <>
                        <View className = "flex-1">
                            <ImageBackground className = "w-full h-full" source={AppBackground}>
                                <View className="flex flex-row items-baseline max-h-screen">
                                    <LottieView 
                                        ref={(animation) => {
                                            animationRef.current = animation;
                                        }}
                                        loop
                                        autoPlay
                                        style={styles.centered}
                                        source={require('./assets/animations/animation_nails.json')}
                                    />
                                </View>
                                <View className="flex flex-row justify-center mt-6">
                                    <View className="flex flex-col justify-center space-y-5 text-center items-center">
                                        <Text style = {{fontFamily: 'Fuggles'}}  className=" text-yellow-500  text-8xl ml-2" >Luxury Nail Spa</Text>
                                        <Text className = "text-4xl text-gray-500 font-bold italic" style={styles.title}>Welcome to Our Salon</Text>
                                        <View>
                                            <TouchableOpacity
                                                className="bg-yellow-500 items-center capitalize text-white text-center px-12 py-3 rounded"
                                                onPress={() => toHomeScreen()}
                                            >
                                                <Text className="text-2xl text-white">Check In</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>                                
                            </ImageBackground>
                        </View>
                    </>
                    :
                    <Drawer isLoading={isLoading} setIsLoading={setIsLoading} />
                }
            </TouchableWithoutFeedback>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    centered: {
        width: 500,
        height: 500,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        marginVertical: 2,
        fontFamily: 'Roboto',
    },
});
