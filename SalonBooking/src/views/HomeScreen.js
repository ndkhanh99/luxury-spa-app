import * as React from 'react';
import { useFonts } from 'expo-font';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    Image,
    ImageBackground,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";
import Background1 from "../../assets/images/bg1.jpeg";
import Logo from "../../assets/images/logo.jpg";

export default function HomeScreen({ navigation }) {
    const [loaded] = useFonts({
        Montserrat: require('../../assets/fonts/Montserrat-BoldItalic.ttf')
    })
    const [name, onChangeName] = React.useState('');
    const [phone, onChangePhone] = React.useState('');
    const [dob, onChangedob] = React.useState('');

    function DismissKeyboard() {
        Keyboard.dismiss();
    }

    async function sendCheckIn() {
        console.log("submit");
        if (!phone && !name) {
            Alert.alert("Please Enter Full Your Information !");
            return false;
        }
        try {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    phone: phone,
                    name:name,
                    dob:dob,
                 })
            };
            await fetch("https://luxurynailwestsac.com/api/checking", requestOptions).then(
                (response) => {
                    response.json().then((data) => {
                        Alert.alert(data.messages);
                        onChangeName("");
                        onChangePhone("");
                        onChangedob("");
                        navigation.navigate('Admin');
                    });
                }
            );
        } catch (error) {
            console.error(error);
        }
    }
    if (!loaded){
        return null;
    }
    
    return (
        <View>
            <ImageBackground className = "w-full h-full" source={Background1}>
                <TouchableWithoutFeedback onPress={ () => { DismissKeyboard() } }>
                    <View className="flex-1 justify-center items-center">
                        <View className="flex py-6 shadow-md bg-white/90 w-1/2 flex-col justify-center items-center space-y-8 rounded-lg">
                            <Image className = "rounded-full  w-48 h-32" source={Logo}/>
                            <Text style = {{fontFamily: 'Montserrat'}} className = "text-red-400 text-lg">*Provide your birthday for exclusive promotion alerts!</Text>
                            <TextInput
                                className="
                                    border-b-2 border-b-black text-lg
                                    focus:ring-[#5ef5f7] focus:border-[#f5ca2f] block py-4 px-2 w-5/6
                                "
                                onChangeText={onChangeName}
                                value={name}
                                placeholder="Your Name (required)"
                                style={{fontFamily: 'Montserrat'}}
                            />
                            <TextInput
                                keyboardType='numeric'
                                className="
                                    border-b-2 border-b-black text-lg
                                    focus:ring-[#5ef5f7] focus:border-[#f5ca2f] block py-4 px-2 w-5/6
                                "
                                placeholder="Your Phone Number (required)"
                                onChangeText={onChangePhone}
                                value={phone}
                                style={{fontFamily: 'Montserrat'}}
                            />
                            <TextInput
                                className="
                                    border-b-2 border-b-black text-lg
                                    focus:ring-[#5ef5f7] focus:border-[#f5ca2f] block py-4 px-2 w-5/6
                                "
                                placeholder="Your Date of Birth (mm/dd/yyyy)"
                                onChangeText={onChangedob}
                                value={dob}
                                style={{fontFamily: 'Montserrat'}}
                            />
                            <TouchableOpacity
                                className="border-2 border-[#f5ca2f] bg-[#f5ca2f] items-center capitalize text-white text-center px-12 py-3 rounded"
                                title="Go to Details"
                                // onPress={() => navigation.navigate('Admin')}
                                onPress={() => sendCheckIn()}
                            ><Text className="text-xl" style={{fontFamily: 'LatoBlack'}}>Submit</Text></TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </ImageBackground>
        </View>
    );
}

// ... other code from the previous section