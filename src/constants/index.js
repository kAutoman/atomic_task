import { StyleSheet } from "react-native"
import { ColorAndroid } from "react-native/Libraries/StyleSheet/PlatformColorValueTypesAndroid"
import { padding } from "styled-system"
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
    AcceptChallegeButton: {
        fontSize: 22,
        fontWeight: "bold",
    },
    PaymentBlog: {
        width: "100%",
        paddingVertical: 15,
        paddingHorizontal: 0,
        borderWidth: 2,
        borderRadius: 30,
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
    },
    
    ChallengeNoButton: {
        borderRadius: 12,        
        backgroundColor: "#C4C4C4",
        width:50,
        height:50,
        alignItems:"center",
        justifyContent:"center"
        
    },
    ChallengeNoButtonSelected: {
        borderRadius: 12,        
        backgroundColor: "#25D482",
        width:50,
        height:50,
        alignItems:"center",
        justifyContent:"center"
        
    },
    ChallengeBtnContainer: {
        paddingTop:20,        
        paddingHorizontal:20,        
        flex: 1,
        flexDirection: 'row',
        flexWrap: "wrap",
        alignItems: 'center',
        justifyContent: "space-evenly",

    },
    Challenge21Button: {
        borderRadius: 12,
        backgroundColor: COLOR.base,        
        alignItems:"center",
        justifyContent:"center",
        padding:30,
    },
    Challenge21Item: {        
        backgroundColor: COLOR.base,
        alignItems:"center",
        justifyContent:"center",
        padding:10,
        width:300,
        height:50,
    },
    ChallengeItemContainer: {         
        flex: 1,
        flexDirection: 'column',        
        alignItems: 'center',                
        justifyContent: "space-evenly",
        height:"60%",
    },
    ChallengeCheckBox: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    ContainerStore: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: 10

    },
    ComprarButton: {             
        borderBottomLeftRadius:16,   
        borderBottomRightRadius:16,   
        backgroundColor: "black",
        justifyContent: "center",
        marginTop:5,
        height: 50
    },
    ProductComprarButton: {             
        borderBottomLeftRadius:16,   
        borderBottomRightRadius:16,   
        backgroundColor: "black",
        justifyContent: "center",
        marginTop:5,
        height: 50
    },
    TouchButton: {
        alignItems: "center",
        backgroundColor: "white",
        paddingVertical:0,
        paddingHorizontal:10,
        borderRadius:44,
        flexDirection:"row",
        borderWidth:1,
        paddingTop:10,
        flexWrap:"nowrap"
    },
    weekdayPicker:{
        padding:10
    },
    dayPicker:{
        margin:5
    }
})
