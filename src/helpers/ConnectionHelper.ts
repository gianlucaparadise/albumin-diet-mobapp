import { GetMyAlbumsResponse, GetMyTagsResponse } from "albumin-diet-types";
import { LoginHelper } from "./LoginHelper";

const BASE_PATH = 'http://localhost:3000';
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

	public async getTags() {
		const url = this.getUrl(`/api/me/tag`);
		const request = new Request(url);

		const response = await this.send<GetMyTagsResponse>(request);

		return response;
	}
}