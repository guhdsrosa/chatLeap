import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    //backgroundGradient: ['#191015', '#330d22'],
    backgroundGradient: ['#fff', '#fff'],

    header: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingHorizontal: 30,
        paddingVertical: 20,
        marginBottom: 5,
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
        marginLeft: 15
    },

    textHeader: {
        color: '#000',
        fontSize: 14
    },

    userText: {
        color: '#000',
        fontSize: 13,
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