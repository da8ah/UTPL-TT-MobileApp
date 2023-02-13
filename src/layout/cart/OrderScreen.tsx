import { useNavigation } from "@react-navigation/native";
import { BillingDetails, CardForm, CardFormView, StripeProvider, useConfirmPayment } from "@stripe/stripe-react-native";
import { Button, Icon, Layout, Modal, Text } from "@ui-kitten/components";
import { useEffect, useState } from "react";
import { ActivityIndicator, KeyboardAvoidingView, StyleSheet } from "react-native";
import Card from "../../core/entities/Card";
import cartViMo from "../../viewmodel/CartViMo";
import clientViMo from "../../viewmodel/ClientViMo";
import { RootStackParamList } from "../NavigationTypes";

const styles = StyleSheet.create({
	common: {
		width: "100%",
		justifyContent: "space-evenly",
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
	cartStatus: { flex: 1, width: "100%", flexDirection: "row", justifyContent: "space-around", alignItems: "center" },
	body: { flex: 6, width: "100%", justifyContent: "space-between", paddingVertical: 20 },
	statusLayouts: { backgroundColor: "transparent", alignItems: "center", paddingVertical: 5 },
	statusProperties: { textAlign: "center", fontSize: 12, fontWeight: "bold" },
	paymentCardForm: {
		height: 300,
		alignItems: "center",
		justifyContent: "center",
	},
	paymentCardContent: {
		backgroundColor: "white",
		color: "black",
	},
});

const OrderScreen = () => {
	const [modalVisibility, setModalVisibility] = useState(false);
	const [modalChildren, setModalChildren] = useState<JSX.Element>();

	const [publishableKey, setPublishableKey] = useState<string | null>(null);

	const tryToGetKey = async () => {
		await cartViMo.queryPublishableKey();
		setPublishableKey(cartViMo.getSPK());
	};

	useEffect(() => {}, [publishableKey]);

	useEffect(() => {
		tryToGetKey();
		return () => setPublishableKey(null);
	}, []);

	return (
		<Layout style={[styles.common, styles.container]}>
			<OrderHeader />
			{!publishableKey ? (
				<Layout style={[styles.common, { flex: 8 }]}>
					<ActivityIndicator />
				</Layout>
			) : (
				<StripeProvider publishableKey={publishableKey}>
					<OrderStatus />
					<OrderBody setModalVisibility={setModalVisibility} setModalChildren={setModalChildren} />
				</StripeProvider>
			)}
			<Modal visible={modalVisibility} style={{ width: "70%" }} backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }} children={modalChildren} />
		</Layout>
	);
};

export default OrderScreen;

const ModalSaveConfirmation = (props: {
	codeStatus: string | null;
	goBack: () => void;
	setModalVisibility: (value: boolean) => void;
}) => {
	let title;
	let message;
	let icon;
	let buttonStatus;

	switch (props.codeStatus) {
		case ":400":
			title = "Pago generado con errores";
			message = "(Verifique los datos)";
			icon = <Icon name="alert-triangle-outline" fill="gold" height="30" width="30" />;
			buttonStatus = "warning";
			break;
		case "400":
			title = "Pago generado con errores";
			message = "(Intente generar el pago nuevamente)";
			icon = <Icon name="alert-triangle-outline" fill="gold" height="30" width="30" />;
			buttonStatus = "warning";
			break;
		case "4001":
			title = "Falló la operación";
			message = "(El pago no pudo ser procesado)";
			icon = <Icon name="alert-triangle-outline" fill="gold" height="30" width="30" />;
			buttonStatus = "warning";
			break;
		case "4002":
			title = "Transacción no registrada";
			message = "(El pago se procesó pero no se registró)";
			icon = <Icon name="alert-triangle-outline" fill="gold" height="30" width="30" />;
			buttonStatus = "danger";
			break;
		case "200":
			title = "Pago realizado con éxito";
			message = "(Volviendo al Inicio)";
			icon = <Icon name="checkmark-circle-outline" fill="darkgreen" height="30" width="30" />;
			buttonStatus = "success";
			break;
		default:
			title = "Fuera de servicio";
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
					if (props.goBack && props.codeStatus !== ":400") props.goBack();
				}}
			>
				Ok
			</Button>
		</Layout>
	);
};

const OrderHeader = () => {
	// rome-ignore lint/suspicious/noExplicitAny: <explanation>
	const navigation: any = useNavigation<RootStackParamList>();

	const GoBackIcon = () => <Icon name="arrow-circle-left-outline" fill="white" height="30" width="30" />;
	const BagIcon = () => <Icon name="shopping-bag-outline" fill="dimgrey" height="25" width="25" />;
	return (
		<Layout style={[styles.common, styles.header]}>
			<Text category="h1" status="success" style={{ fontStyle: "italic" }}>
				BOOKSTORE
			</Text>
			<Layout style={{ backgroundColor: "transparent", width: "100%", flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
				<Button
					size="small"
					status="success"
					accessoryLeft={GoBackIcon}
					style={{ borderRadius: 100 }}
					onPress={() => {
						navigation.goBack();
					}}
				/>
				<Text category='h5' style={{ color: "white", textTransform: "uppercase" }}>
					Su Pedido
				</Text>
				<Button size="tiny" status="basic" accessoryLeft={BagIcon} style={{ height: 40, width: 40, borderRadius: 100 }} />
			</Layout>
		</Layout>
	);
};

const OrderStatus = () => {
	const cart = cartViMo.getCart();
	const descuento = cart?.getDiscountCalc() || 0;
	const iva = cart?.getIvaCalc() || 0;
	const subtotal = cart?.getSubtotal() || 0;
	const total = cart?.getTotalPrice() || 0;
	const fecha = new Date().toLocaleDateString("ec");

	return (
		<Layout style={styles.cartStatus}>
			<Layout style={[styles.statusLayouts, { width: "20%" }]}>
				<Text style={{ fontWeight: "bold" }}>Fecha</Text>
				<Text>{fecha}</Text>
			</Layout>
			<Layout style={[styles.statusLayouts]}>
				<Text style={[styles.statusProperties]}>Subtotal</Text>
				<Text style={[styles.statusProperties, { fontSize: 13 }]}>{subtotal.toFixed(2)}</Text>
			</Layout>
			<Layout style={[styles.statusLayouts]}>
				<Text style={[styles.statusProperties]}>IVA</Text>
				<Text style={[styles.statusProperties, { color: "darkred" }]}>+{iva.toFixed(2)}</Text>
			</Layout>
			<Layout style={[styles.statusLayouts]}>
				<Text style={[styles.statusProperties]}>Descuento</Text>
				<Text style={[styles.statusProperties, { color: "darkgreen" }]}>-{descuento.toFixed(2)}</Text>
			</Layout>
			<Layout style={[styles.statusLayouts, { backgroundColor: "orange", width: "25%", borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }]}>
				<Text style={[styles.statusProperties, { width: "100%", fontSize: 18 }]}>TOTAL</Text>
				<Text style={[styles.statusProperties, { width: "100%", fontSize: 18 }]}>$ {total.toFixed(2)}</Text>
			</Layout>
		</Layout>
	);
};

const OrderBody = (props: { setModalVisibility: (visibility: boolean) => void; setModalChildren: (children: JSX.Element) => void }) => {
	// rome-ignore lint/suspicious/noExplicitAny: <explanation>
	const navigation: any = useNavigation<RootStackParamList>();

	const [isPress, setPressState] = useState(false);
	const [confirmDisabled, setConfirmDisabledState] = useState<boolean>(true);
	const { confirmPayment } = useConfirmPayment();

	const validateCardInputs = (cardDetails: CardFormView.Details) => {
		const postalCode = cardDetails.postalCode;
		const postalCodeRegEx: RegExp = /^\d{6}$/;
		if (postalCode) return postalCodeRegEx.test(postalCode);
		else return false;
	};

	const UnlockIcon = () => <Icon name="unlock" fill="white" height="30" width="30" />;
	const LockIcon = () => <Icon name="lock" fill="white" height="30" width="30" />;
	return (
		<KeyboardAvoidingView style={styles.body}>
			<CardForm
				autofocus={true}
				style={styles.paymentCardForm}
				cardStyle={styles.paymentCardContent}
				onFormComplete={(cardDetails) => {
					const completed = cardDetails.complete;
					if (completed && validateCardInputs(cardDetails)) {
						setConfirmDisabledState(false);
						clientViMo
							.getClient()
							.setCards([
								new Card(
									clientViMo.getClient().getName(),
									cardDetails.last4,
									undefined,
									`${cardDetails.expiryMonth}/${cardDetails.expiryYear - 2000}`,
								),
							]);
					} else setConfirmDisabledState(true);
				}}
			/>
			<Layout style={{ alignItems: "center" }}>
				<Button
					disabled={confirmDisabled}
					style={{ width: "90%" }}
					status={!isPress ? "warning" : "success"}
					accessoryLeft={!(isPress || confirmDisabled) ? UnlockIcon : LockIcon}
					onPressIn={() => setPressState(true)}
					onPressOut={() => {
						if (!confirmDisabled) setPressState(false);
					}}
					onLongPress={async () => {
						setConfirmDisabledState(true);
						const resultado = await cartViMo.sendPaymentToServer();
						if (resultado?.clientSecret) {
							const billingDetails: BillingDetails = {
								name: clientViMo.getClient().getName(),
								email: clientViMo.getClient().getEmail(),
								phone: clientViMo.getClient().getMobile(),
							};
							const { error, paymentIntent } = await confirmPayment(resultado.clientSecret, {
								paymentMethodType: "Card",
								paymentMethodData: {
									billingDetails,
								},
							});
							if (error) resultado.codeStatus = "4001";
							if (paymentIntent) {
								resultado.codeStatus = (await cartViMo.sendTransactionToServer()) || "4002";
							}
						}
						props.setModalChildren(
							<ModalSaveConfirmation
								codeStatus={resultado?.codeStatus || null}
								goBack={navigation.pop}
								setModalVisibility={props.setModalVisibility}
							/>,
						);
						props.setModalVisibility(true);
					}}
				>
					CONFIRM PAYMENT
				</Button>
			</Layout>
		</KeyboardAvoidingView>
	);
};
