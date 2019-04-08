import { GetMyAlbumsResponse, GetMyTagsResponse, UserAlbumsResponse } from "albumin-diet-types";
import { LoginHelper } from "./LoginHelper";
import { Platform } from "react-native";

// Android emulator is on a virtual machine, this is why it needs a different host
const BASE_PATH = Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000';
// const BASE_PATH = 'https://albumin-diet-engine.herokuapp.com';

export class ConnectionHelper {
	private static _instance: ConnectionHelper;

	private constructor() { }

	public static get Instance() {
		return this._instance || (this._instance = new this());
	}

	// todo: use a url provider
	private getUrl(endpoint: string): string {
		const engineBaseUrl = BASE_PATH;
		return engineBaseUrl + endpoint;
	}

	private async send<T>(request: Request) {
		const token = await LoginHelper.Instance.getToken();

		request.headers.append('Authorization', `Bearer ${token}`);

		const result = await fetch(request);

		LoginHelper.Instance.refreshToken(result.headers);

		const resposeBody: T = await result.json();
		return resposeBody;
	}

	public async getAlbums(tags: string[] | null = null, showUntagged: boolean, offset = 0, limit = 20): Promise<GetMyAlbumsResponse> {
		let params = '';
		if (tags) {
			params += `tags=${encodeURIComponent(JSON.stringify(tags))}`;
		}
		if (showUntagged) {
			params += `untagged=true`;
		}
		if (offset) {
			params += `offset=${offset}`;
		}
		if (limit) {
			params += `limit=${limit}`;
		}

		const url = this.getUrl(`/api/me/album?${params}`);
		const request = new Request(url);

		const result = await this.send<GetMyAlbumsResponse>(request);

		return result;
	}

	public async getTags(): Promise<GetMyTagsResponse> {
		const url = this.getUrl(`/api/me/tag`);
		const request = new Request(url);

		const response = await this.send<GetMyTagsResponse>(request);

		return response;
	}

	async getListeningList(offset = 0, limit = 20): Promise<UserAlbumsResponse> {
		let params = '';
		if (offset) {
			params += `offset=${encodeURIComponent(offset.toString())}`;
		}
		if (limit) {
			params += `limit=${limit.toString()}`;
		}

		const url = this.getUrl(`/api/me/listening-list?${params}`);
		const request = new Request(url);

		const result = await this.send<UserAlbumsResponse>(request);

		return result;
	}
}