import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    backgroundGradient: ['#191015', '#330d22'],

    header: {
        flexDirection: 'row',
        backgroundColor: '#1f1f1f',
        paddingHorizontal: 0,
        paddingVertical: 20,
        alignItems: 'center'
    },

    userLogo: {
        width: 50,
        height: 50,
        borderRadius: 100
    },

    titleHeader: {
        marginLeft: 15
    },

    textHeader: {
        color: '#fff',
        fontSize: 16
    },

    cardYou: {
        marginVertical: 5,
        marginLeft: '25%',
        marginRight: 5,
        padding: 10,
        borderRadius: 10
    },

    cardHe: {
        marginVertical: 5,
        marginRight: '25%',
        marginLeft: 5,
        padding: 10,
        borderRadius: 10,
    },

    cardYouGradient: ['#e2037b', '#fc8e04'],
    cardHeGradient: ['#1f1f1f', '#1f1f1f'],

    textCard: {
        color: '#fff',
        fontSize: 15,
        paddingBottom: 12
    },

    hourTextCard: {
        position: 'absolute',
        color: '#d8d8d8',
        right: 6,
        bottom: 5,
        fontSize: 13
    },

    containerInput: {
        backgroundColor: '#1f1f1f',
        flexDirection: 'row',
        alignItems: 'center'
    },

    inputText: {
        backgroundColor: '#272526',
        marginVertical: 10,
        borderRadius: 10,
        marginLeft: 10,
        marginRight: 10,
        paddingHorizontal: 10,
        minWidth: 330,
        color: '#fff'
    },
})

export default styles