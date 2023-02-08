import * as SecureStore from "expo-secure-store";

export class LocalSecureStorage {
	private static localSecureStorage: LocalSecureStorage | null = null;

	// SINGLETON
	private constructor() {}

	public static getInstance(): LocalSecureStorage | null {
		if (!this.localSecureStorage) this.localSecureStorage = new LocalSecureStorage();
		return this.localSecureStorage;
	}

	public async createData(data: { key: string; value: string }): Promise<boolean | null> {
		if (!(await SecureStore.isAvailableAsync())) return null;

		try {
			if (!(data.key && data.value)) return false;
			await SecureStore.setItemAsync(data.key, data.value);
			return true;
		} catch (error) {
			console.error(error);
			return null;
		}
	}
	public async readData(data: { key: string }): Promise<string | null> {
		if (!((await SecureStore.isAvailableAsync()) && data.key)) return null;

		try {
			const item = await SecureStore.getItemAsync(data.key);
			return item;
		} catch (error) {
			console.error(error);
			return null;
		}
	}
	public async deleteData(data: { key: string }): Promise<boolean | null> {
		if (!(await SecureStore.isAvailableAsync())) return null;

		try {
			await SecureStore.deleteItemAsync(data.key);
			return true;
		} catch (error) {
			console.error(error);
			return null;
		}
	}
}

export default LocalSecureStorage.getInstance();
