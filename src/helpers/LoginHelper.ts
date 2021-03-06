import { StorageHelper } from './StorageHelper';
import { SendTokenResponse } from 'albumin-diet-types';
import { MyUrlFactory } from './MyUrlFactory';

export class LoginHelper {
  private static _instance: LoginHelper;

  private constructor() {}

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  /**
   * Url to start Login Flow
   */
  public get loginUrl() {
    return MyUrlFactory.Instance.getUrl('login');
  }

  /**
   * Returns `true` when input url is login callback and you need to call FinishLogin
   * @param url Url to check
   */
  public isLoginCallback(url?: string) {
    return url && url.indexOf('/auth/spotify/callback') !== -1;
  }

  /**
   * This checks if there is a saved token
   */
  public async isLoggedIn() {
    try {
      const token = await StorageHelper.Instance.getToken();
      return token ? true : false;
    } catch (ex) {
      console.error('Error while getting token');
      console.error(ex);
      return false;
    }
  }

  /**
   * This extracts and save the login token
   * @param url Login callback url
   */
  public async finishLogin(url: string) {
    let response = await fetch(url);
    console.log(response);
    if (response.status !== 200) {
      throw new Error(`Repsonse Error: ${response.status}`);
    }

    let body: SendTokenResponse = await response.json();
    await StorageHelper.Instance.setToken(body.token); // I save the token
  }

  /**
   * Extracts the token from the headers and saves it
   * @param headers Response headers
   */
  public async refreshToken(headers: Headers) {
    if (!headers.has('x-auth-token')) {
      return;
    }

    const token = headers.get('x-auth-token');
    if (!token) {
      return;
    }

    await StorageHelper.Instance.setToken(token);
  }

  /**
   * Deletes current token
   */
  public async logout() {
    await StorageHelper.Instance.setToken(null); // I remove the token
  }

  /**
   * Returns current user's token
   */
  public async getToken() {
    return await StorageHelper.Instance.getToken();
  }
}
