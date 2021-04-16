import { BACKEND_ENVIRONMENT } from 'react-native-dotenv';
import UrlFactory, { UrlConfig } from 'urlfactory-js';
import { Platform } from 'react-native';

const urlConfig: UrlConfig = require('../../config/urls/urls.config.json');
let backendEnvironment: string = BACKEND_ENVIRONMENT;
if (backendEnvironment === 'LOCAL') {
  // Android emulator is on a virtual machine, this is why it needs a different host
  backendEnvironment = `${backendEnvironment}-${Platform.OS}`.toUpperCase();
}

console.log(`Backend: ${backendEnvironment}`);

const urlFactory = new UrlFactory(urlConfig, backendEnvironment);

export class MyUrlFactory {
  private static _instance: MyUrlFactory;

  private constructor() {}

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  getUrl(urlKey: string, ...params: any[]): string {
    return urlFactory.getUrl(urlKey, ...params);
  }
}
