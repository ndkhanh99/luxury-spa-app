import * as React from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    ImageBackground,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";
import Background1 from "../../assets/images/bg1.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';

export default function HomeScreen({ navigation }) {
    const [phoneArray, setPhoneArray] = React.useState([]);
    const [phone, setPhone] = React.useState("");

    function DismissKeyboard() {
        Keyboard.dismiss();
    }

    function handlePhoneNumber(number) {
        setPhoneArray(oldArray => [...oldArray, number]);
    }

    function deleteNumber() {
        setPhoneArray(oldArray => {
            let updatedAray = [...oldArray];
            updatedAray.pop();
            return updatedAray;
        });
    }

    async function sendCheckIn() {
        console.log("submit");
        if (!phone) {
            Alert.alert("Please Enter Full Your Information !");
            return false;
        }
        try {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone: phone })
            };
            await fetch("http://127.0.0.1:8080/api/checking", requestOptions).then(
                (response) => {
                    response.json().then((data) => {
                        Alert.alert(data.messages);
                    });
                }
            );
        } catch (error) {
            console.error(error);
        }
    }

    React.useEffect(() => {
        console.log(phoneArray);
        setPhone(phoneArray.join(""));
        console.log(phone);
    }, [phoneArray]);

    return (
        <View>
            <ImageBackground className="w-full h-full" source={Background1}>
                <TouchableWithoutFeedback
                    onPress={() => {
                        DismissKeyboard();
                    }}
                >
                    <View className="flex-1 justify-center items-center">
                        <View className="flex py-4 shadow-md bg-white/90 w-1/2 flex-col justify-center items-center space-y-8">
                            {phone
                                ?
                                <View className="flex flex-row gap-2 justify-center items-center">
                                    <TextInput
                                        className="text-lg mb-3"
                                        keyboardType="text"
                                        placeholder={phone}
                                        value={phone}
                                    />
                                    <TouchableOpacity onPress={() => deleteNumber()}>
                                        <FontAwesomeIcon icon={faDeleteLeft} size={30}></FontAwesomeIcon>
                                    </TouchableOpacity>
                                </View>
                                :
                                <Text>Fill your number to check in</Text>
                            }
                            <View className="flex flex-row gap-6">
                                <TouchableOpacity
                                    className="
                                    flex flex-row justify-center text-center
                                    border-2 border-black text-lg py-4 px-2 w-[100px] h-[100px] rounded-full
                                    "
                                    onPress={() => handlePhoneNumber(1)}
                                >
                                    <View className="flex flex-col justify-center text-center">
                                        <Text>1</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    className="
                                    flex flex-row justify-center text-center 
                                    border-2 border-black text-lg py-4 px-2 w-[100px] h-[100px] rounded-full
                                    "
                                    onPress={() => handlePhoneNumber(2)}
                                >
                                    <View className="flex flex-col justify-center text-center">
                                        <Text>2</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    className="
                                    flex flex-row justify-center text-center 
                                    border-2 border-black text-lg py-4 px-2 w-[100px] h-[100px] rounded-full
                                "
                                    onPress={() => handlePhoneNumber(3)}
                                >
                                    <View className="flex flex-col justify-center text-center">
                                        <Text>3</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View className="flex flex-row gap-6">
                                <TouchableOpacity
                                    className="
                                    flex flex-row justify-center text-center 
                                    border-2 border-black text-lg py-4 px-2 w-[100px] h-[100px] rounded-full
                                "
                                    onPress={() => handlePhoneNumber(4)}
                                >
                                    <View className="flex flex-col justify-center text-center">
                                        <Text>4</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    className="
                                    flex flex-row justify-center text-center 
                                    border-2 border-black text-lg py-4 px-2 w-[100px] h-[100px] rounded-full
                                "
                                    onPress={() => handlePhoneNumber(5)}
                                >
                                    <View className="flex flex-col justify-center text-center">
                                        <Text>5</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    className="
                                    flex flex-row justify-center text-center 
                                    border-2 border-black text-lg py-4 px-2 w-[100px] h-[100px] rounded-full
                                "
                                    onPress={() => handlePhoneNumber(6)}
                                >
                                    <View className="flex flex-col justify-center text-center">
                                        <Text>6</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View className="flex flex-row gap-6">
                                <TouchableOpacity
                                    className="
                                    flex flex-row justify-center text-center 
                                    border-2 border-black text-lg py-4 px-2 w-[100px] h-[100px] rounded-full
                                "
                                    onPress={() => handlePhoneNumber(7)}
                                >
                                    <View className="flex flex-col justify-center text-center">
                                        <Text>7</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    className="
                                    flex flex-row justify-center text-center 
                                    border-2 border-black text-lg py-4 px-2 w-[100px] h-[100px] rounded-full
                                "
                                    onPress={() => handlePhoneNumber(8)}
                                >
                                    <View className="flex flex-col justify-center text-center">
                                        <Text>8</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    className="
                                    flex flex-row justify-center text-center 
                                    border-2 border-black text-lg py-4 px-2 w-[100px] h-[100px] rounded-full
                                "
                                    onPress={() => handlePhoneNumber(9)}
                                >
                                    <View className="flex flex-col justify-center text-center">
                                        <Text>9</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View className="flex flex-row gap-6">
                                <TouchableOpacity
                                    className="
                                    flex flex-row justify-center text-center 
                                    border-2 border-black text-lg py-4 px-2 w-[100px] h-[100px] rounded-full
                                "
                                    onPress={() => handlePhoneNumber(0)}
                                >
                                    <View className="flex flex-col justify-center text-center">
                                        <Text>0</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity
                                className="border-2 border-yellow-500 bg-yellow-500 items-center capitalize text-white text-center px-12 py-3 rounded"
                                // onPress={() => navigation.navigate('Admin')}
                                onPress={() => sendCheckIn()}
                            >
                                <Text className="text-xl">Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </ImageBackground>
        </View>
    );
}

// ... other code from the previous section