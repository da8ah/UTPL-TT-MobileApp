import { useNavigation } from "@react-navigation/native";
import { Button, Icon, Input, Layout, Text } from "@ui-kitten/components";
import { TouchableWithoutFeedback } from "@ui-kitten/components/devsupport";
import { useEffect, useState } from "react";
import { Keyboard, KeyboardAvoidingView, StyleSheet } from "react-native";
import { RootStackParamList } from "../NavigationTypes";

const transparent = "transparent";
const styles = StyleSheet.create({
	common: {
		width: "100%",
		justifyContent: "space-evenly",
		alignItems: "center",
		textAlign: "center",
	},
	container: { flex: 1 },
	header: {
		backgroundColor: "dimgrey",
		flex: 1,
		paddingVertical: 20,
		marginTop: 30,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
	},
	body: { flex: 8, justifyContent: "flex-start", paddingTop: 20 },
	imageLayout: { backgroundColor: transparent, alignContent: "center" },
	image: {
		maxWidth: "100%",
		height: 170,
		resizeMode: "contain",
	},
	inputLayout: { width: "70%", height: 40, maxHeight: 40, flexDirection: "row", justifyContent: "center" },
	inputTitle: { backgroundColor: "gainsboro", width: "30%", justifyContent: "center", alignItems: "center" },
	input: {
		width: "80%",
		borderRadius: 0,
		borderWidth: 0,
		borderBottomWidth: 2,
		borderBottomColor: "gainsboro",
	},
	buttonLayout: { width: "100%", alignItems: "center", marginVertical: 30 },
	button: { width: "70%" },
});

const SignUpScreen = () => (
	<Layout style={[styles.common, styles.container]}>
		<SignInHeader />
		<SignInBody />
	</Layout>
);

export default SignUpScreen;

const SignInHeader = () => {
	// rome-ignore lint/suspicious/noExplicitAny: <explanation>
	const navigation: any = useNavigation<RootStackParamList>();

	const GoBackIcon = () => <Icon name="arrow-circle-left-outline" fill="white" height="30" width="30" />;
	const TrashIcon = () => <Icon name="trash-2-outline" fill="dimgrey" height="25" width="25" />;
	return (
		<Layout style={[styles.common, styles.header]}>
			<Text category='h5' style={{ color: "white", fontFamily: "serif" }}>
				Regístrate
			</Text>
			<Layout style={{ backgroundColor: "transparent", width: "100%", flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }}>
				<Button
					size="small"
					status="success"
					accessoryLeft={GoBackIcon}
					style={{ borderRadius: 100 }}
					onPress={() => {
						navigation.goBack();
					}}
				/>
				<Text category="h1" status="success" style={{ fontStyle: "italic" }}>
					BOOKSTORE
				</Text>
				<Button
					size="tiny"
					status="basic"
					accessoryLeft={TrashIcon}
					style={{ height: 40, width: 40, borderRadius: 100 }}
					//  onPress={() => clearInputs()}
				/>
			</Layout>
		</Layout>
	);
};

// rome-ignore lint/suspicious/noExplicitAny: <explanation>
const InputWithPassword = (props: { setPassword: any }) => {
	const [inputValue, setInputValue] = useState<string>();
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
			textContentType="password"
			style={styles.input}
			value={inputValue}
			accessoryRight={PasswordVisibilityIcon}
			secureTextEntry={secureTextEntry}
			onChangeText={(nextValue) => {
				setInputValue(nextValue);
				props.setPassword(nextValue);
			}}
		/>
	);
};

const ButtonIcon = () => <Icon name="save" fill="white" height="20" width="20" />;
const SignInBody = () => {
	const [isKeyboardActive, setKeyboardActiveStatus] = useState(false);
	const [user, setUser] = useState<string>();
	const [password, setPassword] = useState<string>();

	useEffect(() => {
		const hideSubscription = Keyboard.addListener("keyboardDidHide", () => setKeyboardActiveStatus(false));
		return () => {
			hideSubscription.remove();
		};
	}, [Keyboard]);

	return (
		<Layout style={[styles.common, styles.body]}>
			<Layout style={[styles.common, { display: !isKeyboardActive ? "flex" : "none", marginVertical: 10 }]}>
				<Icon name="person-add" fill="dimgrey" height="70" width="70" />
			</Layout>
			<KeyboardAvoidingView behavior="position" style={[styles.common]}>
				<Layout style={[styles.common, { display: !isKeyboardActive ? "flex" : "none" }]}>
					<Layout style={styles.inputLayout}>
						<Layout style={[styles.inputTitle, { borderTopLeftRadius: 10 }]}>
							<Text adjustsFontSizeToFit style={{ color: "black" }}>
								USUARIO
							</Text>
						</Layout>
						<Input style={styles.input} onChangeText={(newUser) => setUser(newUser)} />
					</Layout>
					<Layout style={styles.inputLayout}>
						<Layout style={[styles.inputTitle]}>
							<Text adjustsFontSizeToFit style={{ color: "black" }}>
								NOMBRE
							</Text>
						</Layout>
						<Input style={styles.input} onChangeText={(newUser) => setUser(newUser)} />
					</Layout>
					<Layout style={styles.inputLayout}>
						<Layout style={[styles.inputTitle]}>
							<Text adjustsFontSizeToFit style={{ color: "black" }}>
								EMAIL
							</Text>
						</Layout>
						<Input style={styles.input} onChangeText={(newUser) => setUser(newUser)} />
					</Layout>
					<Layout style={styles.inputLayout}>
						<Layout style={[styles.inputTitle]}>
							<Text adjustsFontSizeToFit style={{ color: "black" }}>
								MÓVIL
							</Text>
						</Layout>
						<Input style={styles.input} onChangeText={(newUser) => setUser(newUser)} />
					</Layout>
					<Layout style={styles.inputLayout}>
						<Layout style={[styles.inputTitle, { borderBottomLeftRadius: 10 }]}>
							<Text adjustsFontSizeToFit style={{ color: "black" }}>
								CLAVE
							</Text>
						</Layout>
						<InputWithPassword setPassword={setPassword} />
					</Layout>
				</Layout>
				<Layout style={[styles.inputLayout, { marginTop: !isKeyboardActive ? 20 : 2 }]}>
					<Layout style={[styles.inputTitle, { borderTopLeftRadius: 10 }]}>
						<Text adjustsFontSizeToFit style={{ color: "black", fontSize: 15 }}>
							Destinatario
						</Text>
					</Layout>
					<Input style={styles.input} onChangeText={(newUser) => setUser(newUser)} onFocus={() => setKeyboardActiveStatus(false)} />
				</Layout>
				<Layout style={styles.inputLayout}>
					<Layout style={[styles.inputTitle]}>
						<Text adjustsFontSizeToFit style={{ color: "black", fontSize: 15 }}>
							CI
						</Text>
					</Layout>
					<Input style={styles.input} onChangeText={(newUser) => setUser(newUser)} />
				</Layout>
				<Layout style={styles.inputLayout}>
					<Layout style={[styles.inputTitle]}>
						<Text adjustsFontSizeToFit style={{ color: "black", fontSize: 15 }}>
							Provincia
						</Text>
					</Layout>
					<Input style={styles.input} onChangeText={(newUser) => setUser(newUser)} onFocus={() => setKeyboardActiveStatus(true)} />
				</Layout>
				<Layout style={styles.inputLayout}>
					<Layout style={[styles.inputTitle]}>
						<Text adjustsFontSizeToFit style={{ color: "black", fontSize: 15 }}>
							Ciudad
						</Text>
					</Layout>
					<Input style={styles.input} onChangeText={(newUser) => setUser(newUser)} onFocus={() => setKeyboardActiveStatus(true)} />
				</Layout>
				<Layout style={styles.inputLayout}>
					<Layout style={[styles.inputTitle]}>
						<Text adjustsFontSizeToFit style={{ color: "black", fontSize: 15 }}>
							Número de casa
						</Text>
					</Layout>
					<Input style={styles.input} onChangeText={(newUser) => setUser(newUser)} onFocus={() => setKeyboardActiveStatus(true)} />
				</Layout>
				<Layout style={styles.inputLayout}>
					<Layout style={[styles.inputTitle, { borderBottomLeftRadius: 10 }]}>
						<Text adjustsFontSizeToFit style={{ color: "black", fontSize: 15 }}>
							Calles
						</Text>
					</Layout>
					<Input style={styles.input} onChangeText={(newUser) => setUser(newUser)} onFocus={() => setKeyboardActiveStatus(true)} />
				</Layout>
			</KeyboardAvoidingView>
			<Layout style={styles.buttonLayout}>
				<Button
					style={styles.button}
					status="success"
					accessoryRight={ButtonIcon}
					onPress={async () => {
						// await adminViMo.login(new Admin(user?.trim(), undefined, undefined, undefined, password));
						// if (adminViMo.getAdmin()?.getUser() !== undefined) props.setAuth(true);
					}}
				>
					GUARDAR
				</Button>
			</Layout>
		</Layout>
	);
};
