import { StyleSheet } from "react-native"
import { COLOR } from "./Color"
export * from './Color'
export * from './Images'
export * from './Layout'
export * from './Root'
export * from './firebase'

/**
 * basic styles
 */
export const Styles = StyleSheet.create({
    LogoText: {
        fontSize: 15,
        textAlign: "center",
        fontWeight: "normal"
    },
    WelcomeText: {
        fontSize: 36,
        textAlign: "center",
        fontWeight: "bold",
        color: COLOR.base
    },
    DeadlineText: {
        fontSize: 20,
        textAlign: "center",
        fontWeight: "bold",
        color: COLOR.white
    },
    WelcomeLabelText: {
        fontSize: 21,
        textAlign: "center",
        fontWeight: "normal",
        color: COLOR.base
    },
    SignatureText: {
        fontSize: 35,
        textAlign: "center",
        fontWeight: "bold",
        color: COLOR.white
    },
    WelcomeButton: {
        fontSize: 22,
        fontWeight: "bold",
    },
    PaymentBlog: {
        width: "100%",
        padding: 15,
        borderWidth: 2,
        borderRadius: 10,
        alignSelf: "center",
        marginVertical: 15
    },
    GuestText: {
        fontSize: 40,
        textAlign: "center",
        fontWeight: "bold",
    },
    LoginInput: {
        borderRadius: 15,
        borderColor: "black",
    },
    DeadlineView: {
        backgroundColor: "black",        
        flex: 1,
        justifyContent: "center", 
        height: 50
    }    
})
