import React, { useState } from "react";
import { View, Text, Image, ScrollView, TextInput, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import styles from "./styles";

import Logo from '../assets/logo.jpeg'
import Enviar from '../assets/enviar.png'

const Chat = () => {

    const [conversa, setConversa] = useState([
        { user: "1", hours: "12:00", text: "Quis pariatur dolore dolore sit." },
        { user: "1", hours: "12:10", text: "Fugiat quis culpa consequat sunt amet." },
        { user: "1", hours: "12:15", text: "Laboris cupidatat labore sunt dolore non est occaecat irure cupidatat nostrud." },
        { user: "2", hours: "12:30", text: "Aute labore ad non qui ullamco irure elit." },
        { user: "1", hours: "12:32", text: "Qui sint irure dolor nisi cillum occaecat ut proident cupidatat aliqua minim ipsum." },
        { user: "2", hours: "12:33", text: "Occaecat sint reprehenderit labore magna laboris nostrud nostrud irure minim Lorem ex laborum." },
        { user: "1", hours: "12:40", text: "Duis eu fugiat ea dolore commodo culpa." },
        { user: "2", hours: "12:40", text: "Aliqua do tempor proident sint Lorem mollit est ipsum eiusmod officia nulla." },
        { user: "2", hours: "12:43", text: "Nulla ad est quis qui veniam dolor elit elit non nostrud ut." },
        { user: "2", hours: "12:45", text: "Mollit consectetur adipisicing aute labore voluptate eiusmod proident sunt fugiat dolor exercitation ut dolore ex." },
        { user: "1", hours: "12:48", text: "Deserunt aliqua in labore sunt nostrud est officia commodo eiusmod fugiat nulla ullamco incididunt." },
        { user: "2", hours: "12:50", text: "Id deserunt id commodo exercitation nulla cupidatat enim dolore enim velit." },
        { user: "1", hours: "12:52", text: "Lorem nostrud magna dolor enim commodo eu ipsum deserunt mollit sit nulla enim nostrud consectetur." },
        { user: "2", hours: "12:55", text: "Consequat aute irure anim ut voluptate Lorem." },
        { user: "1", hours: "12:57", text: "Ad ut quis reprehenderit incididunt." },
    ])

    return (
        <LinearGradient colors={styles.backgroundGradient} style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={Logo}
                    resizeMode="contain"
                    style={styles.userLogo}
                />
                <View style={styles.titleHeader}>
                    <Text style={styles.textHeader}>Leap Style</Text>
                    <Text style={[styles.textHeader, { color: '#1ecb00' }]}>Online</Text>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} >
                <Text style={{ color: '#fff', textAlign: 'center', marginVertical: 10 }}>Hoje</Text>
                {conversa.map((result) => (
                    <LinearGradient
                        colors={result.user === "1" ? styles.cardYouGradient : styles.cardHeGradient}
                        style={result.user === "1" ? styles.cardYou : styles.cardHe}
                        start={{ x: 1, y: 0 }}
                    >
                        <Text style={styles.textCard}>{result.text}</Text>
                        <Text style={styles.hourTextCard}>{result.hours}</Text>
                    </LinearGradient>
                ))}
            </ScrollView>

            <View style={styles.containerInput}>
                <TextInput
                    style={styles.inputText}
                    placeholder="Insira seu texto"
                    placeholderTextColor={'#737373'}
                />

                <TouchableOpacity style={{}}>
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