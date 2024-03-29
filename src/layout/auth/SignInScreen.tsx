import { useNavigation } from "@react-navigation/native";
import { Button, Icon, Input, Layout, Text } from "@ui-kitten/components";
import { TouchableWithoutFeedback } from "@ui-kitten/components/devsupport";
import { useState } from "react";
import { KeyboardAvoidingView, StyleSheet } from "react-native";
import Client from "../../core/entities/Client";
import cartViMo from "../../viewmodel/CartViMo";
import clientViMo from "../../viewmodel/ClientViMo";
import { RootStackParamList } from "../NavigationTypes";

const transparent = "transparent";
const styles = StyleSheet.create({
	common: {
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		textAlign: "center",
	},
	container: { flex: 1 },
	header: {
		backgroundColor: "black",
		flex: 1,
		paddingVertical: 20,
		marginTop: 30,
	},
	body: { flex: 8, justifyContent: "flex-start", paddingTop: 20 },
	imageLayout: { backgroundColor: transparent, alignContent: "center" },
	image: {
		maxWidth: "100%",
		height: 170,
		resizeMode: "contain",
	},
	inputLayout: { width: "70%", height: 40, maxHeight: 40, flexDirection: "row", justifyContent: "center", marginVertical: 10 },
	inputTitle: { backgroundColor: "black", width: "30%", justifyContent: "center", alignItems: "center" },
	input: {
		width: "80%",
		borderRadius: 0,
		borderWidth: 0,
		borderBottomWidth: 2,
		borderBottomColor: "black",
	},
	buttonLayout: { width: "100%", alignItems: "center", marginVertical: 30 },
	button: { width: "70%" },
});

const SignInScreen = () => (
	<Layout style={[styles.common, styles.container]}>
		<SignInHeader />
		<SignInBody />
	</Layout>
);

export default SignInScreen;

const SignInHeader = () => {
	// rome-ignore lint/suspicious/noExplicitAny: <explanation>
	const navigation: any = useNavigation<RootStackParamList>();

	const CloseIcon = () => <Icon name="close" fill="white" height="30" width="30" />;
	const PlusIcon = () => <Icon name="plus" fill="white" height="30" width="30" />;
	return (
		<Layout style={[styles.common, styles.header]}>
			<Text category='h5' style={{ color: "white", fontFamily: "serif" }}>
				Ingresa a tu Cuenta
			</Text>
			<Layout style={{ backgroundColor: "transparent", width: "100%", flexDirection: "row", justifyContent: "space-evenly" }}>
				<Button
					size="small"
					status="danger"
					accessoryLeft={CloseIcon}
					style={{ borderRadius: 100 }}
					onPress={() => {
						navigation.goBack();
					}}
				/>
				<Text category="h1" status="info" style={{ fontStyle: "italic" }}>
					BOOKSTORE
				</Text>
				<Button size="small" status="info" accessoryLeft={PlusIcon} style={{ borderRadius: 100 }} onPress={() => navigation.navigate("SignUp")} />
			</Layout>
		</Layout>
	);
};

// rome-ignore lint/suspicious/noExplicitAny: <explanation>
const InputWithPassword = (props: { password: string; setPassword: any }) => {
	const [secureTextEntry, setSecureTextEntry] = useState(true);

	const togglePasswordVisibility = () => {
		setSecureTextEntry(!secureTextEntry);
	};

	const PasswordVisibilityIcon = () => (
		<TouchableWithoutFeedback onPress={togglePasswordVisibility}>
			<Icon name={secureTextEntry ? "eye-off" : "eye"} fill="black" height="20" width="20" />
		</TouchableWithoutFeedback>
	);

	return (
		<Input
			selectionColor='black'
			textContentType="password"
			style={styles.input}
			value={props.password}
			accessoryRight={PasswordVisibilityIcon}
			secureTextEntry={secureTextEntry}
			onChangeText={(nextValue) => {
				props.setPassword(nextValue);
			}}
		/>
	);
};

const ButtonIcon = () => <Icon name="log-in" fill="white" height="20" width="20" />;
const SignInBody = () => {
	// rome-ignore lint/suspicious/noExplicitAny: <explanation>
	const navigation: any = useNavigation<RootStackParamList>();
	const [user, setUser] = useState<string>();
	const [password, setPassword] = useState<string>("");

	return (
		<Layout style={[styles.common, styles.body]}>
			<Layout style={[styles.common, { marginVertical: 20 }]}>
				<Icon name="people" fill="black" height="100" width="100" />
			</Layout>
			<KeyboardAvoidingView style={{ width: "100%", alignItems: "center" }} behavior="padding">
				<Layout style={styles.inputLayout}>
					<Layout style={[styles.inputTitle, { borderTopLeftRadius: 10 }]}>
						<Text adjustsFontSizeToFit style={{ color: "white" }}>
							USUARIO
						</Text>
					</Layout>
					<Input selectionColor='black' style={styles.input} value={user} onChangeText={(newUser) => setUser(newUser)} />
				</Layout>
				<Layout style={styles.inputLayout}>
					<Layout style={[styles.inputTitle, { borderBottomLeftRadius: 10 }]}>
						<Text adjustsFontSizeToFit style={{ color: "white" }}>
							CLAVE
						</Text>
					</Layout>
					<InputWithPassword password={password} setPassword={setPassword} />
				</Layout>
				<Layout style={styles.buttonLayout}>
					<Button
						style={styles.button}
						status="info"
						accessoryRight={ButtonIcon}
						onPress={async () => {
							await clientViMo.login(new Client(user?.trim(), undefined, undefined, undefined, password));
							if (clientViMo.isAuth() && cartViMo.wasCalledFromCart()) {
								cartViMo.setCallFromCart(false);
								navigation.navigate("Order");
							} else if (clientViMo.isAuth()) navigation.navigate("Profile");
						}}
					>
						INICIAR SESIÓN
					</Button>
				</Layout>
			</KeyboardAvoidingView>
		</Layout>
	);
};
