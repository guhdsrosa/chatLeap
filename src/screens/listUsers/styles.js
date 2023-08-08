import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    backgroundGradient: ['#191015', '#330d22'],
    //backgroundGradient: ['#fff', '#fff'],

    header: {
        flexDirection: 'row',
        backgroundColor: '#1f1f1f',
        paddingHorizontal: 30,
        paddingVertical: 20,
        alignItems: 'center'
    },

    userLogo: {
        width: 50,
        height: 50,
        borderRadius: 10
    },

    titleHeader: {
        marginLeft: 15
    },

    textHeader: {
        color: '#fff',
        fontSize: 16
    },

    userText: {
        color: '#fff',
        //color: '#000',
        fontSize: 17,
        paddingVertical: 10,
        paddingHorizontal: 20
    },

    userContent: {
        //backgroundColor: '#fff',
        //borderBottomWidth: 1
        marginVertical: 5,
        flexDirection: 'row',
        paddingHorizontal: 10,
        alignItems: 'center'
    }
})

export default styles