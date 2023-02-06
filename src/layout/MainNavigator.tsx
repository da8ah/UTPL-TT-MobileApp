import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInScreen from "./auth/SignInScreen";
import CartScreen from "./cart/CartScreen";
import BooksScreen from "./home/BooksScreen";
import HomeScreen from "./home/HomeScreen";
import { RootStackParamList } from "./NavigationTypes";
import ProfileScreen from "./user/ProfileScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainNavigator = () => (
	<NavigationContainer>
		<Stack.Navigator
			initialRouteName="Home"
			screenOptions={{
				headerShown: false,
				presentation: "modal",
				gestureEnabled: true,
				gestureDirection: "vertical",
				animationTypeForReplace: "pop",
			}}
		>
			<Stack.Group>
				<Stack.Screen name="Home" component={HomeScreen} />
				<Stack.Screen name="Books" component={BooksScreen} options={{ animation: "slide_from_bottom" }} />
				<Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: true, animation: "slide_from_left" }} />
			</Stack.Group>
			<Stack.Group>
				<Stack.Screen name="Cart" component={CartScreen} options={{ animation: "slide_from_bottom" }} />
				{/* <Stack.Screen name="Order" component={OrderScreen} /> */}
			</Stack.Group>
			<Stack.Group>
				{/* <Stack.Screen name="SignIn" component={SignInScreen} /> */}
				{/* <Stack.Screen name="SignUp" component={SignUpScreen} /> */}
			</Stack.Group>
		</Stack.Navigator>
	</NavigationContainer>
);

export default MainNavigator;
