import { Button, Icon, Input, Layout, Text } from "@ui-kitten/components";
import { TouchableWithoutFeedback } from "@ui-kitten/components/devsupport";
import { useState } from "react";
import { KeyboardAvoidingView, StyleSheet } from "react-native";

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
		flex: 1,
		backgroundColor: "tomato",
		color: "white",
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

const SignInHeader = () => (
	<Layout style={[styles.common, styles.header]}>
		<Text category='h5' style={{ color: "white", fontFamily: "serif" }}>
			¡Bienvenidos!
		</Text>
		<Text category="h1" status="basic" style={{ fontStyle: "italic" }}>
			BOOKSTORE
		</Text>
	</Layout>
);

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
			selectionColor='black'
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

const ButtonIcon = () => <Icon name="log-in" fill="white" height="20" width="20" />;
const SignInBody = () => {
	const [user, setUser] = useState<string>();
	const [password, setPassword] = useState<string>();

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
					<Input selectionColor='black' style={styles.input} onChangeText={(newUser) => setUser(newUser)} />
				</Layout>
				<Layout style={styles.inputLayout}>
					<Layout style={[styles.inputTitle, { borderBottomLeftRadius: 10 }]}>
						<Text adjustsFontSizeToFit style={{ color: "white" }}>
							CLAVE
						</Text>
					</Layout>
					<InputWithPassword setPassword={setPassword} />
				</Layout>
				<Layout style={styles.buttonLayout}>
					<Button
						style={styles.button}
						status="danger"
						accessoryRight={ButtonIcon}
						onPress={async () => {
							// await adminViMo.login(new Admin(user?.trim(), undefined, undefined, undefined, password));
							// if (adminViMo.getAdmin()?.getUser() !== undefined) props.setAuth(true);
						}}
					>
						INICIAR SESIÓN
					</Button>
				</Layout>
			</KeyboardAvoidingView>
		</Layout>
	);
};
