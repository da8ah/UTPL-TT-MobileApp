import { useNavigation } from "@react-navigation/native";
import { Button, Icon, Input, Layout, Modal, Text } from "@ui-kitten/components";
import { TouchableWithoutFeedback } from "@ui-kitten/components/devsupport";
import { useEffect, useState } from "react";
import { Keyboard, KeyboardAvoidingView, StyleSheet } from "react-native";
import BillingInfo from "../../core/entities/BillingInfo";
import Client from "../../core/entities/Client";
import { InputValidator } from "../../core/entities/utils";
import signUpViMo, { SignUpObserver } from "../../viewmodel/SignUpViMo";
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
		<SignUpHeader />
		<SignUpBody />
	</Layout>
);

export default SignUpScreen;

const SignUpHeader = () => {
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
					onPress={() => signUpViMo.clearInputs()}
				/>
			</Layout>
		</Layout>
	);
};

// rome-ignore lint/suspicious/noExplicitAny: <explanation>
const InputWithPassword = (props: { password: any; setPassword: any }) => {
	const [secureTextEntry, setSecureTextEntry] = useState(true);
	const [passwordCheck, setPasswordCheck] = useState<boolean>(true);

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
			style={[styles.input, { borderRightWidth: 2, borderEndColor: !passwordCheck ? "red" : "mediumspringgreen" }]}
			accessoryRight={PasswordVisibilityIcon}
			secureTextEntry={secureTextEntry}
			value={props.password}
			onChangeText={(nextValue) => {
				props.setPassword(nextValue);
				const passworPattern = /^[\w\W\s]{5,}$/;
				setPasswordCheck(new RegExp(passworPattern).test(nextValue));
			}}
		/>
	);
};

const SignUpBody = () => {
	// rome-ignore lint/suspicious/noExplicitAny: <explanation>
	const navigation: any = useNavigation<RootStackParamList>();

	const [isKeyboardActive, setKeyboardActiveStatus] = useState(false);
	const [modalVisibility, setModalVisibility] = useState(false);
	const [modalChildren, setModalChildren] = useState<JSX.Element>();

	const [userCheck, setUserCheck] = useState<boolean>(true);
	const [nameCheck, setNameCheck] = useState<boolean>(true);
	const [emailCheck, setEmailCheck] = useState<boolean>(true);
	const [mobileCheck, setMobileCheck] = useState<boolean>(true);
	const [toWhomCheck, setToWhomCheck] = useState<boolean>(true);
	const [ciCheck, setCiCheck] = useState<boolean>(true);
	const [provinciaCheck, setProvinciaCheck] = useState<boolean>(true);
	const [ciudadCheck, setCiudadCheck] = useState<boolean>(true);
	const [numCasaCheck, setNumCasaCheck] = useState<boolean>(true);
	const [callesCheck, setCallesCheck] = useState<boolean>(true);

	const [user, setUser] = useState<string>("da8ah.tiber");
	const [name, setName] = useState<string>("Danilo Ochoa Hidalgo");
	const [email, setEmail] = useState<string>("danilo.ochoa.hidalgo@email.com");
	const [mobile, setMobile] = useState<string>("+593000000001");
	const [password, setPassword] = useState<string>("tibernuncamuere");

	const [toWhom, setToWhom] = useState<string>("Danilo Ochoa Hidalgo");
	const [ci, setCi] = useState<string>("1000000001");
	const [provincia, setProvincia] = useState<string>("Loja");
	const [ciudad, setCiudad] = useState<string>("Loja");
	const [numCasa, setNumCasa] = useState<string>("000");
	const [calles, setCalles] = useState<string>("Principal y Secundaria");

	const clearInputs: SignUpObserver = () => {
		setUserCheck(true);
		setNameCheck(true);
		setEmailCheck(true);
		setMobileCheck(true);
		setToWhomCheck(true);
		setCiCheck(true);
		setProvinciaCheck(true);
		setCiudadCheck(true);
		setNumCasaCheck(true);
		setCallesCheck(true);

		setUser("");
		setName("");
		setEmail("");
		setMobile("");
		setPassword("");
		setToWhom("");
		setCi("");
		setProvincia("");
		setCiudad("");
		setNumCasa("");
		setCalles("");
	};

	useEffect(() => {
		const hideSubscription = Keyboard.addListener("keyboardDidHide", () => setKeyboardActiveStatus(false));
		return () => {
			hideSubscription.remove();
		};
	}, [Keyboard]);

	useEffect(() => {
		signUpViMo.attach(clearInputs);
		return () => signUpViMo.detach();
	}, []);

	const ButtonIcon = () => <Icon name="save" fill="white" height="20" width="20" />;
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
						<Input
							style={[styles.input, { borderRightWidth: 2, borderEndColor: !userCheck ? "red" : "mediumspringgreen" }]}
							value={user}
							onChangeText={(user) => {
								setUser(user);
								const userPattern = /^[A-Za-z]((\_|\.)?[A-Za-z0-9]){5,19}$/;
								setUserCheck(new RegExp(userPattern).test(user.trimEnd()));
							}}
						/>
					</Layout>
					<Layout style={styles.inputLayout}>
						<Layout style={[styles.inputTitle]}>
							<Text adjustsFontSizeToFit style={{ color: "black" }}>
								NOMBRE
							</Text>
						</Layout>
						<Input
							style={[styles.input, { borderRightWidth: 2, borderEndColor: !nameCheck ? "red" : "mediumspringgreen" }]}
							value={name}
							onChangeText={(name) => {
								setName(name);
								const namePattern = /^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ]{1,15}(\s[A-Za-zÁáÉéÍíÓóÚúÜüÑñ]{1,15}){1,4}$/;
								setNameCheck(new RegExp(namePattern).test(name.trimEnd()));
							}}
						/>
					</Layout>
					<Layout style={styles.inputLayout}>
						<Layout style={[styles.inputTitle]}>
							<Text adjustsFontSizeToFit style={{ color: "black" }}>
								EMAIL
							</Text>
						</Layout>
						<Input
							style={[styles.input, { borderRightWidth: 2, borderEndColor: !emailCheck ? "red" : "mediumspringgreen" }]}
							value={email}
							onChangeText={(email) => {
								setEmail(email);
								const emailPattern = /^([\w\.\-]+){1,3}@([\w\-]+)((\.(\w){2,3})+)$/;
								setEmailCheck(new RegExp(emailPattern).test(email.trimEnd()));
							}}
						/>
					</Layout>
					<Layout style={styles.inputLayout}>
						<Layout style={[styles.inputTitle]}>
							<Text adjustsFontSizeToFit style={{ color: "black" }}>
								MÓVIL
							</Text>
						</Layout>
						<Input
							style={[styles.input, { borderRightWidth: 2, borderEndColor: !mobileCheck ? "red" : "mediumspringgreen" }]}
							value={mobile}
							onChangeText={(mobile) => {
								setMobile(mobile);
								const mobilePattern = /^(\+593)?\s?(\d{10}|\d{9})$/;
								setMobileCheck(new RegExp(mobilePattern).test(mobile.trimEnd()));
							}}
						/>
					</Layout>
					<Layout style={styles.inputLayout}>
						<Layout style={[styles.inputTitle, { borderBottomLeftRadius: 10 }]}>
							<Text adjustsFontSizeToFit style={{ color: "black" }}>
								CLAVE
							</Text>
						</Layout>
						<InputWithPassword password={password} setPassword={setPassword} />
					</Layout>
				</Layout>
				<Layout style={[styles.inputLayout, { marginTop: !isKeyboardActive ? 20 : 2 }]}>
					<Layout style={[styles.inputTitle, { borderTopLeftRadius: 10 }]}>
						<Text adjustsFontSizeToFit style={{ color: "black", fontSize: 15 }}>
							Destinatario
						</Text>
					</Layout>
					<Input
						style={[styles.input, { borderRightWidth: 2, borderEndColor: !toWhomCheck ? "red" : "mediumspringgreen" }]}
						value={toWhom}
						onChangeText={(toWhom) => {
							setToWhom(toWhom);
							const toWhomPattern = /^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ]{1,15}(\s[A-Za-zÁáÉéÍíÓóÚúÜüÑñ]{1,15}){1,4}$/;
							setToWhomCheck(new RegExp(toWhomPattern).test(toWhom.trimEnd()));
						}}
						onFocus={() => setKeyboardActiveStatus(false)}
					/>
				</Layout>
				<Layout style={styles.inputLayout}>
					<Layout style={[styles.inputTitle]}>
						<Text adjustsFontSizeToFit style={{ color: "black", fontSize: 15 }}>
							CI
						</Text>
					</Layout>
					<Input
						style={[styles.input, { borderRightWidth: 2, borderEndColor: !ciCheck ? "red" : "mediumspringgreen" }]}
						value={ci}
						onChangeText={(ci) => {
							setCi(ci);
							const ciPattern = /^\d{10}$/;
							setCiCheck(new RegExp(ciPattern).test(ci.trimEnd()));
						}}
					/>
				</Layout>
				<Layout style={styles.inputLayout}>
					<Layout style={[styles.inputTitle]}>
						<Text adjustsFontSizeToFit style={{ color: "black", fontSize: 15 }}>
							Provincia
						</Text>
					</Layout>
					<Input
						style={[styles.input, { borderRightWidth: 2, borderEndColor: !provinciaCheck ? "red" : "mediumspringgreen" }]}
						value={provincia}
						onChangeText={(provincia) => {
							setProvincia(provincia);
							const provinciaPattern = /^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ]{1,15}(\.)?(\s[A-Za-zÁáÉéÍíÓóÚúÜüÑñ]{1,15}){0,4}$/;
							setProvinciaCheck(new RegExp(provinciaPattern).test(provincia.trimEnd()));
						}}
						onFocus={() => setKeyboardActiveStatus(true)}
					/>
				</Layout>
				<Layout style={styles.inputLayout}>
					<Layout style={[styles.inputTitle]}>
						<Text adjustsFontSizeToFit style={{ color: "black", fontSize: 15 }}>
							Ciudad
						</Text>
					</Layout>
					<Input
						style={[styles.input, { borderRightWidth: 2, borderEndColor: !ciudadCheck ? "red" : "mediumspringgreen" }]}
						value={ciudad}
						onChangeText={(ciudad) => {
							setCiudad(ciudad);
							const ciudadPattern = /^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ]{1,15}(\.)?(\s[A-Za-zÁáÉéÍíÓóÚúÜüÑñ]{1,15}){0,4}$/;
							setCiudadCheck(new RegExp(ciudadPattern).test(ciudad.trimEnd()));
						}}
						onFocus={() => setKeyboardActiveStatus(true)}
					/>
				</Layout>
				<Layout style={styles.inputLayout}>
					<Layout style={[styles.inputTitle]}>
						<Text adjustsFontSizeToFit style={{ color: "black", fontSize: 15 }}>
							Número de casa
						</Text>
					</Layout>
					<Input
						style={[styles.input, { borderRightWidth: 2, borderEndColor: !numCasaCheck ? "red" : "mediumspringgreen" }]}
						value={numCasa}
						onChangeText={(numCasa) => {
							setNumCasa(numCasa);
							const numCasaPattern = /^\d((\-|\s)?\d){1,10}$/;
							setNumCasaCheck(new RegExp(numCasaPattern).test(numCasa.trimEnd()));
						}}
						onFocus={() => setKeyboardActiveStatus(true)}
					/>
				</Layout>
				<Layout style={styles.inputLayout}>
					<Layout style={[styles.inputTitle, { borderBottomLeftRadius: 10 }]}>
						<Text adjustsFontSizeToFit style={{ color: "black", fontSize: 15 }}>
							Calles
						</Text>
					</Layout>
					<Input
						style={[styles.input, { borderRightWidth: 2, borderEndColor: !callesCheck ? "red" : "mediumspringgreen" }]}
						value={calles}
						onChangeText={(calles) => {
							setCalles(calles);
							const callesPattern = /^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ0-9]{1,15}((\.|\-|\,)?\s?[A-Za-zÁáÉéÍíÓóÚúÜüÑñ0-9]{1,15}){3,10}$/;
							setCallesCheck(new RegExp(callesPattern).test(calles.trimEnd()));
						}}
						onFocus={() => setKeyboardActiveStatus(true)}
					/>
				</Layout>
			</KeyboardAvoidingView>
			<Layout style={styles.buttonLayout}>
				<Button
					style={styles.button}
					status="success"
					accessoryRight={ButtonIcon}
					onPress={async () => {
						const client = new Client(user?.trimEnd(), name?.trimEnd(), email?.trimEnd(), mobile?.trimEnd(), password);
						client.setBillingInfo(
							new BillingInfo(toWhom?.trimEnd(), ci?.trimEnd(), provincia?.trimEnd(), ciudad?.trimEnd(), numCasa?.trimEnd(), calles?.trimEnd()),
						);
						const resultado = await signUpViMo.signup(client);
						setModalChildren(
							<ModalSaveConfirmation codeStatus={resultado} goBackOnSuccess={navigation.goBack} setModalVisibility={setModalVisibility} />,
						);
						setModalVisibility(true);
					}}
				>
					GUARDAR
				</Button>
			</Layout>
			<Modal
				visible={modalVisibility}
				style={{ width: "70%" }}
				backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
				onBackdropPress={() => setModalVisibility(false)}
				children={modalChildren}
			/>
		</Layout>
	);
};

const ModalSaveConfirmation = (props: {
	codeStatus: string | null;
	goBackOnSuccess: () => void;
	setModalVisibility: (value: boolean) => void;
}) => {
	let title;
	let message;
	let icon;
	let buttonStatus;

	switch (props.codeStatus) {
		case ":400":
			title = "Registro no creado";
			message = "(Verifique que los datos sean correctos)";
			icon = <Icon name="alert-triangle-outline" fill="gold" height="30" width="30" />;
			buttonStatus = "warning";
			break;
		case "400":
			title = "Registro no creado";
			message = "(Verifique que los datos sean correctos)";
			icon = <Icon name="alert-triangle-outline" fill="gold" height="30" width="30" />;
			buttonStatus = "warning";
			break;
		case "303":
			title = "Registro no creado";
			message = "(El usuario o email ya existen)";
			icon = <Icon name="alert-triangle-outline" fill="gold" height="30" width="30" />;
			buttonStatus = "danger";
			break;
		case "201":
			title = "Registro Creado";
			message = "(Volviendo al Inicio de Sesión)";
			icon = <Icon name="checkmark-circle-outline" fill="darkgreen" height="30" width="30" />;
			buttonStatus = "success";
			break;
		default:
			title = "Registro no creado";
			message = "(Servidor no disponible, intente más tarde)";
			icon = <Icon name="alert-triangle-outline" fill="gold" height="30" width="30" />;
			buttonStatus = "danger";
			break;
	}

	return (
		<Layout style={{ alignItems: "center", padding: 20, borderRadius: 20 }}>
			<Layout style={{ width: "100%", alignItems: "center", marginTop: 10 }}>
				<Text style={{ textTransform: "uppercase" }}>{title}</Text>
				{icon}
				<Text style={{ fontSize: 12, marginVertical: 5 }}>{message}</Text>
			</Layout>
			<Button
				size="small"
				status={buttonStatus}
				style={{ width: "50%", marginTop: 10 }}
				onPress={() => {
					props.setModalVisibility(false);
					if (props.codeStatus === "201") props.goBackOnSuccess();
				}}
			>
				Ok
			</Button>
		</Layout>
	);
};
