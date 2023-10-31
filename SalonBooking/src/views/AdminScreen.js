import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import * as React from 'react';
import { View, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import logo from "../../assets/images/logo.jpg";

export default function AdminScreen({ navigation }) {
    const ref = React.useRef(null);
    const [customers, setCustomers] = React.useState([{ id: 1, name: 'Khanh', time_in: '31/10/2023 09:09' },
    { id: 2, name: 'Tai', time_in: '31/10/2023 08:08' }]);

    async function getCustomers() {
        console.log('rerender with ref');
        try {
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            };
            await fetch("http://127.0.0.1:8080/api/checking", requestOptions).then(
                (response) => {
                    response.json().then((data) => {
                        console.log(data.data);
                        setCustomers(data.data);
                    });
                }
            );
        } catch (error) {
            console.error(error);
        }
    }
    React.useEffect(() => {
        getCustomers()
        console.log(customers);
        // ref.current = setInterval(getCustomers, 60 * 1000);
        // return () => {
        //     if(ref.current){
        //       clearInterval(ref.current)
        //     }
        //   }
    }, [])

    return (
        <SafeAreaView className="flex flex-col justify-center items-center mt-10">
            <Image className="w-28 h-28" source={logo} />
            <Text className="text-3xl font-bold mt-2" style={{fontFamily: 'RobotoBold'}}>Waiting List</Text>
            <View className="flex flex-row justify-center grid grid-cols-2 mt-8">
                <View className="w-60 h-20 bg-slate-800"><Text className="text-center text-white mt-6 text-xl" style={{fontFamily: 'RobotoBoldItalic'}}>Name</Text></View>
                <View className="w-60 h-20 bg-slate-800"><Text className="text-center text-white mt-6 text-xl" style={{fontFamily: 'RobotoBoldItalic'}}>Check In Time</Text></View>
            </View>
            <View className="flex flex-col">
                {customers?.map(customer =>
                    <View key={customer.id} className="flex flex-row border-b-2 border-gray-300">
                        <View className="w-60 h-20 bg-gray-200"><Text className="text-center mt-6 text-lg" style={{fontFamily: 'RobotoRegular'}}>{customer.name}</Text></View>
                        <View className="w-60 h-20 bg-gray-200"><Text className="text-center mt-6 text-lg" style={{fontFamily: 'RobotoRegular'}}>{customer.time_in}</Text></View>
                    </View>
                )}
            </View>
            <View className="mt-6">
                <TouchableOpacity
                    className="flex flex-row gap-2 border-2 border-yellow-500 bg-yellow-500 items-center capitalize text-white text-center px-12 py-3 rounded"
                    onPress={() => navigation.navigate('Home')}
                >
                    <Text className="text-xl" style={{fontFamily: 'LatoBlack'}}>Check In</Text>
                    <FontAwesomeIcon icon={faRightToBracket} />
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
}