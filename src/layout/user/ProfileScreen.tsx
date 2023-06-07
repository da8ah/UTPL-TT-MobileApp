import { useNavigation } from "@react-navigation/native";
import { Button, Card, Icon, Layout, Text } from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import clientViMo from "../../viewmodel/ClientViMo";
import { RootStackParamList } from "../NavigationTypes";

const styles = StyleSheet.create({
	common: {
		width: "100%",
		justifyContent: "center",
		textAlign: "center",
	},
	buttonLayout: { backgroundColor: "transparent", flexDirection: "row", justifyContent: "space-around", alignItems: "center" },
	cardPropsRow: { backgroundColor: "transparent", flexDirection: "row", alignItems: "center", marginHorizontal: -15 },
	cardKeys: {
		width: "35%",
		fontSize: 10,
		textTransform: "uppercase",
	},
	cardValues: {
		width: "65%",
		height: 20,
		fontSize: 15,
	},
});

const ProfileScreen = () => {
	// rome-ignore lint/suspicious/noExplicitAny: <explanation>
	const navigation: any = useNavigation<RootStackParamList>();
	const client = clientViMo.getClient();

	const cuenta = {
		usuario: client.getUser(),
		nombre: client.getName(),
		email: client.getEmail(),
		móvil: client.getMobile(),
		clave: "********",
	};
	const cuentaChildren: JSX.Element[] = Object.entries(cuenta).map(([key, value], index) => (
		<Layout key={`clientProp${index}`} style={styles.cardPropsRow}>
			<Text style={styles.cardKeys}>{key}</Text>
			<Text style={styles.cardValues} numberOfLines={1} ellipsizeMode="middle">
				{value}
			</Text>
		</Layout>
	));

	const facturacion = {
		Destinatario: client.getBillingInfo()?.getToWhom(),
		CI: client.getBillingInfo()?.getCi(),
		Provincia: client.getBillingInfo()?.getProvincia(),
		Ciudad: client.getBillingInfo()?.getCiudad(),
		"Número de casa": client.getBillingInfo()?.getNumCasa(),
		Calles: client.getBillingInfo()?.getCalles(),
	};
	const facturacionChildren: JSX.Element[] = Object.entries(facturacion).map(([key, value], index) => (
		<Layout key={`billingInfoProp${index}`} style={styles.cardPropsRow}>
			<Text style={styles.cardKeys}>{key}</Text>
			<Text style={styles.cardValues} numberOfLines={1} ellipsizeMode="middle">
				{value}
			</Text>
		</Layout>
	));

	const CardIcon = () => <Icon name="credit-card" fill="darkgrey" height="50" width="50" />;
	const BagIcon = () => <Icon name="shopping-bag" fill="darkgrey" height="50" width="50" />;
	const CardHeader = (props: { title: string }) => (
		<Text style={{ backgroundColor: "black", color: "white", padding: 2, paddingLeft: 20 }}>{props.title}</Text>
	);
	const ButtonIcon = () => <Icon name="log-out" fill="white" height="20" width="20" rotation={180} />;

	return (
		<Layout style={{ flex: 1, justifyContent: "space-evenly", alignItems: "center", paddingTop: 35 }}>
			<Layout style={{ alignItems: "center" }}>
				<Icon name="person-outline" fill="black" height="100" width="100" />
				<Text style={{ fontSize: 30, fontFamily: "serif", fontStyle: "italic", textAlign: "center", textTransform: "uppercase" }}>
					{cuenta.usuario}
				</Text>
			</Layout>
			<Layout style={[styles.common, styles.buttonLayout]}>
				<Button size="tiny" status="basic" accessoryLeft={CardIcon} style={{ borderRadius: 100 }} />
				<Button size="tiny" status="basic" accessoryLeft={BagIcon} style={{ borderRadius: 100 }} />
			</Layout>
			<Card key="client" header={<CardHeader title="Cuenta" />} style={{ width: "80%", borderRadius: 20 }}>
				{cuentaChildren}
			</Card>
			<Card key="billingInfo" header={<CardHeader title="Facturación" />} style={{ width: "80%", borderRadius: 20 }}>
				{facturacionChildren}
			</Card>
			<Layout style={[styles.common, { alignItems: "center" }]}>
				<Button
					style={{ width: "70%" }}
					size="medium"
					status="danger"
					accessoryRight={ButtonIcon}
					onPress={() => {
						clientViMo.logout();
						navigation.navigate("Home");
					}}
				>
					Cerrar Sesión
				</Button>
			</Layout>
		</Layout>
	);
};

export default ProfileScreen;
