import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import * as React from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';

export default function AdminScreen({ navigation }) {
    const [customers, setCustomers] = React.useState([{ id: 1, name: 'Khanh', time_in: '31/10/2023 09:09' },
    { id: 2, name: 'Tai', time_in: '31/10/2023 08:08' }]);

    async function getCustomers() {
        console.log('rerender');
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
    }, [])

    return (
        <SafeAreaView className="flex flex-col justify-center items-center mt-10">
            <Text className="text-5xl font-bold">Waiting List</Text>
            <Text className="text-xl mt-2">Estimated time: 11-20 minutes</Text>
            <View className="flex flex-row justify-center grid grid-cols-2 mt-8">
                <View className="w-60 h-20 bg-slate-800"><Text className="text-center text-white mt-6 text-xl font-bold">Name</Text></View>
                <View className="w-60 h-20 bg-slate-800"><Text className="text-center text-white mt-6 text-xl font-bold">Check In Time</Text></View>
            </View>
            <View className="flex flex-col">
                {customers.map(customer =>
                    <View key={customer.id} className="flex flex-row border-b-2 border-gray-300">
                        <View className="w-60 h-20 bg-gray-200"><Text className="text-center mt-6 text-lg">{customer.name}</Text></View>
                        <View className="w-60 h-20 bg-gray-200"><Text className="text-center mt-6 text-lg">{customer.time_in}</Text></View>
                    </View>
                )}
            </View>
            <View className="mt-6">
                <TouchableOpacity
                    className="flex flex-row gap-2 border-2 border-yellow-500 bg-yellow-500 items-center capitalize text-white text-center px-12 py-3 rounded"
                    onPress={() => navigation.navigate('Home')}
                >
                    <Text className="text-xl">Check In</Text>
                    <FontAwesomeIcon icon={faRightToBracket} />
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
}