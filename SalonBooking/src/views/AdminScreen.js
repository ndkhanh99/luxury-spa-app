import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import * as React from 'react';
import { View, Text, Image, ImageBackground, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { faRightToBracket, faUserClock } from '@fortawesome/free-solid-svg-icons';
import logo from "../../assets/images/logo.jpg";
import Background from "../../assets/images/bg3.jpg";
import io from "socket.io-client";


export default function AdminScreen({ navigation }) {
    const socket = io('http://127.0.0.1:8080/api/checking');
    const [customers, setCustomers] = React.useState([]);

    React.useEffect(() => {

        const handleNewCheckIn = (data) => {
            console.log(data.data);
            setCustomers(prevCustomers => [...prevCustomers , data.data]);
        }

        socket.on("waiting" , handleNewCheckIn)

        return () => {
            socket.off('waiting', handleNewCheckIn);
        };

    }, [])

    return (
        <View>
            <ImageBackground className ="w-full h-full flex flex-col justify-center items-center" source={Background}>
                <Image className="w-28 h-28" source={logo} />
                <Text className="text-2xl font-bold mt-2" style={{fontFamily: 'Lato'}}>Waiting List</Text>
                <Text className="text-5xl mt-2" style={{fontFamily: 'Fuggles'}}>Please be patient!</Text>
                <View className="flex flex-row justify-center grid grid-cols-2 mt-2">
                    <View className="w-20 h-20 bg-yellow-500"></View>
                    <View className="w-60 h-20 bg-yellow-500"><Text className="text-start mt-6 text-xl" style={{fontFamily: 'LatoBoldItalic'}}>Name</Text></View>
                    <View className="w-60 h-20 bg-yellow-500"><Text className="text-center mt-6 text-xl" style={{fontFamily: 'LatoBoldItalic'}}>Check In Time</Text></View>
                </View>
                <View className="h-60">
                    <ScrollView>
                        <View className="flex flex-col">
                            {customers?.map(customer =>
                                <View key={customer.id} className="flex flex-row border-b-2 border-gray-300">
                                    <View className="w-20 h-20 bg-gray-200 flex flex-row justify-center items-center"><Text><FontAwesomeIcon size={30} icon={faUserClock} /></Text></View>
                                    <View className="w-60 h-20 bg-gray-200"><Text className="text-start mt-6 text-lg" style={{fontFamily: 'RobotoRegular'}}>{customer.name}</Text></View>
                                    <View className="w-60 h-20 bg-gray-200"><Text className="text-center mt-6 text-lg" style={{fontFamily: 'RobotoRegular'}}>{customer.check_in_time}</Text></View>
                                </View>
                            )}
                        </View>
                    </ScrollView>                    
                </View>
                <View className="mt-6">
                    <TouchableOpacity
                        className="flex flex-row gap-2 border-2 border-yellow-500 bg-yellow-500 items-center capitalize text-white text-center px-8 py-3 rounded-lg"
                        onPress={() => navigation.navigate('Home')}
                    >
                        <Text className="text-xl" style={{fontFamily: 'LatoBlack'}}>Check In</Text>
                        <FontAwesomeIcon className="text-white" icon={faRightToBracket} />
                    </TouchableOpacity>
                </View>                
            </ImageBackground>
        </View>
    );
}