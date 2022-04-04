import { createAppContainer } from "react-navigation"
import { createStackNavigator } from 'react-navigation-stack'
import SignIn from '../screens/Guest/SignIn'
import Welcome from '../screens/Guest/Welcome'
import Signature from '../screens/Guest/Signature'
import Signature1 from '../screens/Guest/Signature_1'
import Signature2 from '../screens/Guest/Signature_2'
import Signature3 from '../screens/Guest/Signature_3'
import Signature4 from '../screens/Guest/Signature_4'
import Signature5 from '../screens/Guest/Signature_5'
import RegisterDash from '../screens/Guest/RegisterDash'
import Register from '../screens/Guest/Register'
import ForgotPass from '../screens/Guest/ForgotPass'

/**
 * Guest Navigator
 */
const Navigator = createStackNavigator(
	{
		WelcomeScreen: {
			screen: Welcome,
			navigationOptions: { headerShown: false },
		},
		SignInScreen: {
			screen: SignIn,
			navigationOptions: { headerShown: false },
		},
		SignatureScreen: {
			screen: Signature,
			navigationOptions: { headerShown: false },
		},
		Signature1Screen: {
			screen: Signature1,
			navigationOptions: { headerShown: false },
		},
		Signature2Screen: {
			screen: Signature2,
			navigationOptions: { headerShown: false },
		},
		Signature3Screen: {
			screen: Signature3,
			navigationOptions: { headerShown: false },
		},
		Signature4Screen: {
			screen: Signature4,
			navigationOptions: { headerShown: false },
		},
		Signature5Screen: {
			screen: Signature5,
			navigationOptions: { headerShown: false },
		},
		RegisterDashScreen: {
			screen: RegisterDash,
			navigationOptions: { headerShown: false },
		},
		RegisterScreen: {
			screen: Register,
			navigationOptions: { headerShown: false },
		},
		ForgotPassScreen: {
			screen: ForgotPass,
			navigationOptions: { headerShown: false },
		},
	},
	{
		initialRouteName: 'WelcomeScreen'
	}
)

export default createAppContainer(Navigator)