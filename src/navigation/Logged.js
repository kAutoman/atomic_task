import { createAppContainer } from "react-navigation"
import { createDrawerNavigator } from "react-navigation-drawer"
import { createStackNavigator } from 'react-navigation-stack'
import Home from '../screens/Logged/Home'
import Chat from '../screens/Logged/Chat'
import ChatRoom from '../screens/Logged/Chat/room'
import ChatBot from '../screens/Logged/ChatBot'
import Descubre from '../screens/Logged/Descubre'
import DescubreLanding from '../screens/Logged/Descubre/Landing'
import SaludList from '../screens/Logged/Descubre/Salud'
import SaludDetail from '../screens/Logged/Descubre/SaludDetail'
import Perfil from '../screens/Logged/Perfil'
import Blog from '../screens/Logged/Blog'
import BlogPage1 from '../screens/Logged/Blog/blog1'
import BlogPage2 from '../screens/Logged/Blog/blog2'
import BlogPage3 from '../screens/Logged/Blog/blog3'
import Normas from '../screens/Logged/Perfil/Normas'
import Account from '../screens/Logged/Perfil/Account'
import Valorar from '../screens/Logged/Perfil/valorar'
import ChangePass from '../screens/Logged/Perfil/ChangePass'
import Logout from '../screens/Logged/Perfil/Logout'
import DescubreList from '../screens/Logged/Descubre/list'
import HomeCardDetail from '../screens/Logged/Home/detail'
import DescubreDetail from '../screens/Logged/Descubre/detail'
import Crecimiento from '../screens/Logged/Descubre/Crecimiento'
import Deposito from '../screens/Logged/Descubre/Deposito'
import Payment from '../screens/Logged/Descubre/Payment'
import CreateTask from '../screens/Logged/Descubre/CreateTask'
import PaymentSetting from '../screens/Logged/Descubre/PaymentSetting'
import CrecimientoDetail from '../screens/Logged/Descubre/CrecimientoDetail'
import Alarms from '../screens/Logged/Alarms'
import AlarmsAdd from '../screens/Logged/Alarms/Addalarm'
import Challenge from '../screens/Logged/Challenge'
import Challenge1 from '../screens/Logged/Challenge/challenge1'
import Challenge2 from '../screens/Logged/Challenge/challenge2'
import Confirms from "../screens/Logged/Confirms"
import ConfirmDetail from "../screens/Logged/Confirms/detail"
import ConfirmControl from "../screens/Logged/Confirms/control"
import Deadline from "../screens/Logged/Deadline/index"
import Investline from "../screens/Logged/Descubre/invest"
import StoreIndex from "../screens/Logged/Store/index"
import ProductsScreen from "../screens/Logged/Store/products"
import ServicesScreen from "../screens/Logged/Store/services"
import SideMenu from './SideMenu'
import { LAYOUT } from "../constants"
import CompareServiceScreen from '../screens/Logged/Store/compareService'
import CompareProductsScreen from '../screens/Logged/Store/compareProducts'
import QuestionsScreen from '../screens/Logged/Bot/Questions'
import EditQuestionScreen from '../screens/Logged/Bot/EditQuestion'
import MarketManageScreen from '../screens/Logged/Market/MarketManage'
import EditStockScreen from '../screens/Logged/Market/EditStock'
import ShopHistoryScreen from '../screens/Logged/Store/history'

/**
 * Home Navigator
 */
const Navigator = createStackNavigator(
	{
		HomeScreen: {
			screen: Home,
			navigationOptions: { headerShown: false },
		},
		HomeCardDetailScreen: {//error upload image
			screen: HomeCardDetail,
			navigationOptions: { headerShown: false },
		},
		DescubreScreen: {
			screen: Descubre,
			navigationOptions: { headerShown: false },
		},
		DescubreListScreen: {//error
			screen: DescubreList,
			navigationOptions: { headerShown: false },
		},
		DescubreDetailScreen: {//error
			screen: DescubreDetail,
			navigationOptions: { headerShown: false },
		},
		PerfilScreen: {
			screen: Perfil,
			navigationOptions: { headerShown: false },
		},
		NormasScreen: {
			screen: Normas,
			navigationOptions: { headerShown: false },
		},
		LogoutScreen: {
			screen: Logout,
			navigationOptions: { headerShown: false },
		},
		ChatScreen: {
			screen: Chat,
			navigationOptions: { headerShown: false },
		},
		ChatBotScreen: {
			screen: ChatBot,
			navigationOptions: { headerShown: false },
		},
		ChatRoomScreen: {
			screen: ChatRoom,
			navigationOptions: { headerShown: false },
		},
		BlogScreen: {
			screen: Blog,
			navigationOptions: { headerShown: false },
		},
		BlogPage1Screen: {
			screen: BlogPage1,
			navigationOptions: { headerShown: false },
		},
		BlogPage2Screen: {
			screen: BlogPage2,
			navigationOptions: { headerShown: false },
		},
		BlogPage3Screen: {
			screen: BlogPage3,
			navigationOptions: { headerShown: false },
		},
		SaludListScreen: {
			screen: SaludList,
			navigationOptions: { headerShown: false },
		},
		CrecimientoScreen: {	//personal increse to create a goal and make a task 
			screen: Crecimiento,
			navigationOptions: { headerShown: false },
		},
		SaludDetailScreen: {
			screen: SaludDetail,
			navigationOptions: { headerShown: false },
		},
		DescubreLandingScreen: {
			screen: DescubreLanding,
			navigationOptions: { headerShown: false },
		},
		CrecimientoDetailScreen: {//exit button need to change y position			Choose a new skill that you want to learn and you keep informing us every week
			screen: CrecimientoDetail,
			navigationOptions: { headerShown: false },
		},
		DepositoScreen: {
			screen: Deposito,
			navigationOptions: { headerShown: false },
		},
		PaymentScreen: {
			screen: Payment,
			navigationOptions: { headerShown: false },
		},
		PaymentSettingScreen: {
			screen: PaymentSetting,
			navigationOptions: { headerShown: false },
		},
		AddalarmScreen: {
			screen: AlarmsAdd,
			navigationOptions: { headerShown: false },
		},
    	CreateTaskScreen: {
			screen: CreateTask,
			navigationOptions: { headerShown: false },
		},
		AccountScreen: {
			screen: Account,
			navigationOptions: { headerShown: false },
		},
		ChangePassScreen: {
			screen: ChangePass,
			navigationOptions: { headerShown: false },
		},
		AlarmsScreen: {
			screen: Alarms,
			navigationOptions: { headerShown: false },
		},
		AlarmsAddScreen: {
			screen: AlarmsAdd,
			navigationOptions: { headerShown: false },
		},
		ValorarScreen: {		//Penalties for non-compliance
			screen: Valorar,
			navigationOptions: { headerShown: false },
		},
		ConfirmsScreen: {
			screen: Confirms,
			navigationOptions: { headerShown: false },
		},
		ConfirmDetailScreen: {
			screen: ConfirmDetail,
			navigationOptions: { headerShown: false },
		},
		ConfirmControlScreen: {
			screen: ConfirmControl,
			navigationOptions: { headerShown: false },
		},
    	// ConfirmDetailScreen2: {
		// 	screen: ConfirmDetail2,
		// 	navigationOptions: { headerShown: false },
		// },
		DeadlineScreen: {//need to add exit button
			screen: Deadline,
			navigationOptions: { headerShown: false },
		},
		InvestScreen: {
			screen: Investline,
			navigationOptions: { headerShown: false },
		},
		ChallengeScreen: {
			screen: Challenge,
			navigationOptions: { headerShown: false },
		},
		Challenge1Screen: {
			screen: Challenge1,
			navigationOptions: { headerShown: false },
		},
		Challenge2Screen: {
			screen: Challenge2,
			navigationOptions: { headerShown: false },
		},
		StoreScreen: {
			screen: StoreIndex,
			navigationOptions: { headerShown: false },
		},
		ServicesScreen: {
			screen: ServicesScreen,
			navigationOptions: { headerShown: false },
		},
		ProductsScreen: {
			screen: ProductsScreen,
			navigationOptions: { headerShown: false },
		},
		CompareServiceScreen : {
			screen : CompareServiceScreen,
			navigationOptions : {headerShown: false}
		},
		CompareProductsScreen : {
			screen : CompareProductsScreen,
			navigationOptions : {headerShown: false}
		},
		QuestionsScreen : {
			screen : QuestionsScreen,
			navigationOptions : {headerShown : false}
		},
		EditQuestionScreen : {
			screen : EditQuestionScreen,
			navigationOptions : {headerShown : false}
		},
		MarketManageScreen : {
			screen : MarketManageScreen,
			navigationOptions : {headerShown : false}
		},
		EditStockScreen : {
			screen : EditStockScreen,
			navigationOptions : {headerShown : false}
		},
		ShopHistoryScreen : {
			screen : ShopHistoryScreen,
			navigationOptions : {headerShown : false}
		}
	},
	{
		initialRouteName: 'HomeScreen'
	}
)

const RootStack = createDrawerNavigator({
	Home: {
		screen: Navigator,
	},
}, {
	contentComponent: SideMenu,
	drawerWidth: LAYOUT.window.width * .7,
	drawerOpenRoute: 'DrawerOpen',
	drawerCloseRoute: 'DrawerClose',
	drawerToggleRoute: 'DrawerToggle',
	drawerBackgroundColor: '#00000000'
}
)

export default createAppContainer(RootStack)