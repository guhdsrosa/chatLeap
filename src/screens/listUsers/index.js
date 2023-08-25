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
    const [userPhoto, setUserPhoto] = useState(null)
    const [conversa, setConversa] = useState([])


    const listChat = () => {
        var config = {
            method: 'get',
            url: `https://flrouf4u09.execute-api.us-east-1.amazonaws.com/prd/api/chat/${userId}/myrooms`,
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Basic U2VydmljZXNMYW1iZGFfTGVhcFN0eWxlOiMyMDIzQFNlcnZpY2VzTGFtYmRhX0xlYXBTdHlsZSR0aW1lbGluZQ=='
            }
        };

        axios(config)
            .then(function (response) {
                //console.log(JSON.stringify(response.data.rooms));
                if (response.status === 200) {
                    setConversa(response.data.rooms)
                    setUserPhoto(response.data.rooms[0].user1.name === name ? response.data.rooms[0].user1.urlFoto : response.data.rooms[0].user2.urlFoto)
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
                {!loading &&
                    <>
                        <Image
                            source={{ uri: userPhoto }}
                            resizeMode='contain'
                            style={styles.userLogo}
                        />
                        <View style={styles.titleHeader}>
                            <Text style={styles.textHeader}>{name}</Text>
                        </View>
                    </>
                }
            </View>

            <ScrollView showsVerticalScrollIndicator={false} >
                {!loading &&
                    conversa.map((result, i) => (
                        <TouchableOpacity
                            style={styles.userContent}
                            onPress={() => navigation.navigate('Chat', {
                                userId: userId,
                                userImage: result.user1.name === name ? result.user2.urlFoto : result.user1.urlFoto,
                                userName: result.user1.name === name ? result.user2.name : result.user1.name,
                                roomId: result._id
                            })}
                            key={i}
                        >
                            <Image
                                source={{ uri: result.user1.name === name ? result.user2.urlFoto : result.user1.urlFoto }}
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