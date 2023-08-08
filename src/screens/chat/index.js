import React, { useState, useEffect, useRef } from "react";
import { View, Text, Image, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

import LinearGradient from "react-native-linear-gradient";
import styles from "./styles";

import Arrow from '../assets/arrow-left.png'
import Enviar from '../assets/enviar.png'

const Chat = ({ route }) => {
    const navigation = useNavigation()

    const { userId, userImage, userName, roomId } = route.params
    const [loading, setLoading] = useState(true)
    const [conversa, setConversa] = useState()
    const [message, setMessage] = useState()
    const scrollViewRef = useRef(null);

    const getRoom = () => {
        var config = {
            method: 'get',
            url: `https://rcw33xmhy9.execute-api.us-east-1.amazonaws.com/prd/api/chat/${roomId}/messages`,
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Basic U2VydmljZXNMYW1iZGFfTGVhcFN0eWxlOiMyMDIzQFNlcnZpY2VzTGFtYmRhX0xlYXBTdHlsZSR0aW1lbGluZQ=='
            }
        };

        axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    //console.log(response.data.messages)
                    const regex = /(\d{2}:\d{2})/;

                    /*const formattedMessages = response.data.messages.map(message => {
                        const match = regex.exec(message.createdAt);
                        const hora = match ? match[1] : "Hora não encontrada";

                        return {
                            ...message,
                            createdAt: hora
                        };
                    });*/

                    const formattedMessages = response.data.messages.map(message => {
                        const date = new Date(message.createdAt);
                        const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
                        const match = regex.exec(message.createdAt);
                        const hora = match ? match[1] : "Hora não encontrada";

                        return {
                            ...message,
                            createdAt: formattedDate,
                            hour: hora
                        };
                    });

                    const messagesByDate = {};
                    formattedMessages.forEach(message => {
                        if (!messagesByDate[message.createdAt]) {
                            messagesByDate[message.createdAt] = [];
                        }
                        messagesByDate[message.createdAt].push(message);
                    });

                    setConversa(formattedMessages)
                    setLoading(false)
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const setTextMessage = () => {
        var data = JSON.stringify({ "user": `${userId}`, "text": `${message}` });
        var config = {
            method: 'post',
            url: `https://rcw33xmhy9.execute-api.us-east-1.amazonaws.com/prd/api/chat/${roomId}/sendMessage`,
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Basic U2VydmljZXNMYW1iZGFfTGVhcFN0eWxlOiMyMDIzQFNlcnZpY2VzTGFtYmRhX0xlYXBTdHlsZSR0aW1lbGluZQ==',
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                setMessage('')
                scrollToEnd()
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const scrollToEnd = () => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({ animated: true });
        }
    };

    useEffect(() => {
        getRoom()
    }, [])

    useEffect(() => {
        const intervalId = setInterval(getRoom, 1000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <LinearGradient colors={styles.backgroundGradient} style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('LogIn')}>
                    <Image
                        source={Arrow}
                        resizeMode="contain"
                        style={{ width: 20, height: 20, tintColor: '#fff', marginLeft: 10, marginRight: 20 }}
                    />
                </TouchableOpacity>
                <Image
                    source={{ uri: userImage }}
                    resizeMode="contain"
                    style={styles.userLogo}
                />
                <View style={styles.titleHeader}>
                    <Text style={styles.textHeader}>{userName ? userName : 'Leap Style'}</Text>
                    <Text style={[styles.textHeader, { color: '#1ecb00' }]}>Online</Text>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} ref={scrollViewRef} onContentSizeChange={() => scrollToEnd()} >
                {!loading &&
                    conversa.map((result) => (
                        <>
                            <Text style={{ color: '#fff', textAlign: 'center', marginVertical: 10 }}>{result.createdAt}</Text>
                            <LinearGradient
                                colors={result.user._id === userId ? styles.cardYouGradient : styles.cardHeGradient}
                                style={result.user._id === userId ? styles.cardYou : styles.cardHe}
                                start={{ x: 1, y: 0 }}
                            >
                                <Text style={styles.textCard}>{result.text}</Text>
                                <Text style={styles.hourTextCard}>{result.hour}</Text>
                            </LinearGradient>
                        </>
                    ))
                }
            </ScrollView>

            <View style={styles.containerInput}>
                <TextInput
                    style={styles.inputText}
                    placeholder="Insira seu texto"
                    placeholderTextColor={'#737373'}
                    onChangeText={setMessage}
                />

                <TouchableOpacity onPress={() => setTextMessage()}>
                    <Image
                        source={Enviar}
                        resizeMode="container"
                        style={{ width: 25, height: 25, tintColor: '#fc8e04' }}
                    />
                </TouchableOpacity>
            </View>
        </LinearGradient>
    )
}

export default Chat