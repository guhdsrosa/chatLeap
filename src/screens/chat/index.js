import React, { useState, useEffect, useRef } from "react";
import { View, Text, Image, ScrollView, TextInput, TouchableOpacity, FlatList } from "react-native";
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
    const [conversa, setConversa] = useState(null)
    const [message, setMessage] = useState()
    const scrollViewRef = useRef(null);

    const getRoom = () => {
        var config = {
            method: 'get',
            url: `https://flrouf4u09.execute-api.us-east-1.amazonaws.com/prd/api/chat/${roomId}/messages`,
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Basic U2VydmljZXNMYW1iZGFfTGVhcFN0eWxlOiMyMDIzQFNlcnZpY2VzTGFtYmRhX0xlYXBTdHlsZSR0aW1lbGluZQ=='
            }
        };

        axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    setConversa(response.data.messages)
                    setLoading(false)
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const setTextMessage = () => {
        if(message !== ''){
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
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        source={Arrow}
                        resizeMode="contain"
                        style={{ width: 17, height: 17, tintColor: '#d40b36', marginLeft: 10, marginRight: 20 }}
                    />
                </TouchableOpacity>
                <Image
                    source={{ uri: userImage }}
                    resizeMode="contain"
                    style={styles.userLogo}
                />
                <View style={styles.titleHeader}>
                    <Text style={styles.textHeader}>{userName ? userName : 'Leap Style'}</Text>
                    <Text style={[styles.textHeader, { color: '#b2b2b2' }]}>Online</Text>
                </View>
            </View>

            <View style={{paddingBottom: 150}}>
                {!loading &&
                    <FlatList
                        data={conversa}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                        ref={scrollViewRef}
                        onContentSizeChange={() => scrollToEnd()}
                        renderItem={({ item }) => (
                            <View style={{marginHorizontal: 5}}>
                                <Text style={{ color: '#b2b2b2', textAlign: 'center', marginVertical: 10 }}>{`${item.day.toString().padStart(2, '0')}/${item.month.toString().padStart(2, '0')}/${item.year}`}</Text>
                                {item.messages.map(message => (
                                    <LinearGradient
                                        colors={message.user?._id === userId ? styles.cardYouGradient : styles.cardHeGradient}
                                        style={message.user?._id === userId ? styles.cardYou : styles.cardHe}
                                        start={{ x: 1, y: 0 }}
                                        key={message._id}
                                    >
                                        <Text style={styles.textCard}>{`${message.text}`}</Text>
                                        <Text style={styles.hourTextCard}>{message.createdAt.substring(11, 16)}</Text>
                                    </LinearGradient>
                                ))}
                            </View>
                        )}
                    />

                }
            </View>

            <View style={styles.containerInput}>
                <TextInput
                    style={styles.inputText}
                    placeholder="Insira seu texto"
                    placeholderTextColor={'#686868'}
                    onChangeText={setMessage}
                    value={message}
                />

                <View style={{position: 'absolute', right: 0, marginVertical: 20, marginHorizontal: 20}}>
                    <TouchableOpacity onPress={() => setTextMessage()}>
                        <Image
                            source={Enviar}
                            resizeMode="contain"
                            style={{ width: 30, height: 30, tintColor: '#d40b36'}}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </LinearGradient>
    )
}

export default Chat