import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, ScrollView, TextInput, Image } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'

import styles from './styles'

import Logo from '../assets/logo.jpeg'

const ListUsers = ({ route }) => {

    const navigation = useNavigation()
    const { userId, name } = route.params
    const [loading, setLoading] = useState(true)

    const [conversa, setConversa] = useState([])


    const listChat = () => {
        var config = {
            method: 'get',
            url: `https://rcw33xmhy9.execute-api.us-east-1.amazonaws.com/prd/api/chat/${userId}/myrooms`,
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Basic U2VydmljZXNMYW1iZGFfTGVhcFN0eWxlOiMyMDIzQFNlcnZpY2VzTGFtYmRhX0xlYXBTdHlsZSR0aW1lbGluZQ=='
            }
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                if (response.status === 200) {
                    setConversa(response.data.rooms)
                    setLoading(false)
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    useEffect(() => {
        listChat()
    }, [userId])

    return (
        <LinearGradient colors={styles.backgroundGradient} style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={Logo}
                    resizeMode="contain"
                    style={styles.userLogo}
                />
                <View style={styles.titleHeader}>
                    <Text style={styles.textHeader}>{name}</Text>
                    <Text style={[styles.textHeader, { color: '#1ecb00' }]}>Online</Text>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} >
                {!loading &&
                    conversa.map((result) => (
                        <TouchableOpacity
                            style={styles.userContent}
                            onPress={() => navigation.navigate('Chat', {
                                userId: userId,
                                userImage: 'https://cdn-icons-png.flaticon.com/512/219/219969.png',
                                userName: result.user1.name === name ? result.user2.name : result.user1.name,
                                roomId: result._id
                            })}
                        >
                            <Image
                                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/219/219969.png' }}
                                resizeMode='contain'
                                style={{ width: 40, height: 40, borderRadius: 100 }}
                            />
                            <Text style={styles.userText}>{result.user1.name === name ? result.user2.name : result.user1.name} {`(Pedido #${result.idPedido})`}</Text>
                        </TouchableOpacity>
                    ))
                }
            </ScrollView>
        </LinearGradient>
    )
}

export default ListUsers;