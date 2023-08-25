import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    backgroundGradient: ['#fff', '#fff'],

    header: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingHorizontal: 0,
        paddingVertical: 20,
        alignItems: 'center',

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },

    userLogo: {
        width: 40,
        height: 40,
        borderRadius: 100
    },

    titleHeader: {
        marginLeft: 14
    },

    textHeader: {
        color: '#000',
        fontSize: 14
    },

    cardYou: {
        marginVertical: 5,
        marginLeft: '25%',
        marginRight: 5,
        padding: 15,
        borderWidth: 1,
        borderColor: '#cccccc',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20
    },

    cardHe: {
        marginVertical: 5,
        marginRight: '25%',
        marginLeft: 5,
        padding: 15,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20
    },

    cardYouGradient: ['#fff', '#fff'],
    cardHeGradient: ['#f5f5f5', '#f5f5f5'],

    textCard: {
        color: '#686868',
        fontSize: 15,
        paddingBottom: 12
    },

    hourTextCard: {
        position: 'absolute',
        color: '#b4b4b4',
        right: 10,
        bottom: 7,
        fontSize: 13
    },

    containerInput: {
        backgroundColor: '#fff',
        width: '100%',
        position: 'absolute',
        bottom: 0
    },

    inputText: {
        backgroundColor: '#f5f5f5',
        marginVertical: 10,
        borderRadius: 10,
        marginLeft: 10,
        marginRight: 70,
        paddingHorizontal: 10,
        color: '#686868'
    },
})

export default styles