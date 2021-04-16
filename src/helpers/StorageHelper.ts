import AsyncStorage from '@react-native-community/async-storage';

const SUPER_STORE_KEY = '@AlbuminDietStorage';

/**
 * Singleton helper class to access storage
 */
export class StorageHelper {
  private static _instance: StorageHelper;

  private constructor() {}

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public async getToken(): Promise<string> {
    let value = await this.getByKey('token');
    return value;
  }

  public async setToken(value: string | null): Promise<void> {
    await this.setByKey('token', value);
  }

  /**
   * This loads from AsyncStorage.
   * This will never throw an exception.
   * @param key Key where to load the value from
   */
  private async getByKey(key: string): Promise<string> {
    // TODO: use hashmap to cache values

    const defaultValue = '';
    try {
      let value = await AsyncStorage.getItem(`${SUPER_STORE_KEY}:${key}`);
      return value || defaultValue;
    } catch (ex) {
      console.error(`Error while loading - key: ${key}`);
      console.error(ex);
      return defaultValue;
    }
  }

  /**
   * The saved into AsyncStorage.
   * This will never throw an exception.
   * @param key Key where to save the value
   * @param value Value to save or `null` to remove it
   */
  private async setByKey(key: string, value: string | null): Promise<void> {
    // TODO: use hashmap to cache values

    try {
      if (value) {
        await AsyncStorage.setItem(`${SUPER_STORE_KEY}:${key}`, value);
      } else {
        // When I receive `null` as input, I remove the item
        await AsyncStorage.removeItem(`${SUPER_STORE_KEY}:${key}`);
      }
    } catch (ex) {
      console.error(`Error while saving - key: ${key} - value: ${value}`);
      console.error(ex);
    }
  }
}
