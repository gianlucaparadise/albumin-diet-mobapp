import { GetMyAlbumsResponse, GetMyTagsResponse, UserAlbumsResponse, TagOnAlbumRequest, GetAlbumResponse, TaggedAlbum, UserAlbum } from "albumin-diet-types";
import { LoginHelper } from "./LoginHelper";
import { MyUrlFactory } from "./MyUrlFactory";
import { loadTags } from "../redux/thunks/tag.thunk";
import { store } from "../../App";
import { addToListeningList, removeFromListeningList } from "../redux/thunks/listening-list.thunk";
import { removeFromMyAlbums } from "../redux/thunks/my-albums.thunk";

export class ConnectionHelper {
	private static _instance: ConnectionHelper;

	private constructor() { }

	public static get Instance() {
		return this._instance || (this._instance = new this());
	}

	private async send<T>(request: Request) {
		const token = await LoginHelper.Instance.getToken();

		request.headers.set('Authorization', `Bearer ${token}`);
		request.headers.set('Content-Type', `application/json`);

		const result = await fetch(request);

		if (result.status < 200 || result.status > 299) {
			let responseString = await result.text();
			throw new Error(`HTTP error: ${result.status} response: ${responseString}`);
		}

		LoginHelper.Instance.refreshToken(result.headers);
		const responseBody: T = await result.json();
		return responseBody;
	}

	public async getAlbums(tags: string[] | null = null, showUntagged: boolean, offset = 0, limit = 20): Promise<GetMyAlbumsResponse> {
		let params = '';
		if (tags) {
			params += `&tags=${encodeURIComponent(JSON.stringify(tags))}`;
		}
		if (showUntagged) {
			params += `&untagged=true`;
		}
		if (offset) {
			params += `&offset=${offset}`;
		}
		if (limit) {
			params += `&limit=${limit}`;
		}

		const url = MyUrlFactory.Instance.getUrl('albums', params);
		const request = new Request(url);

		const result = await this.send<GetMyAlbumsResponse>(request);

		return result;
	}

	getAlbum(spotifyAlbumId: string): Promise<GetAlbumResponse> {
		const url = MyUrlFactory.Instance.getUrl('album', spotifyAlbumId);
		const request = new Request(url);

		const response = this.send<GetAlbumResponse>(request);
		return response;
	}

	/**
	 * Add the input album to current user's favorites
	 * @param spotifyAlbumId Album to save
	 */
	async saveAlbum(spotifyAlbumId: string) {
		const url = MyUrlFactory.Instance.getUrl(`album`);

		const requestBody = { album: { spotifyId: spotifyAlbumId } };
		const requestInit: RequestInit = {
			method: 'PUT',
			body: JSON.stringify(requestBody),
		};
		const request = new Request(url, requestInit);

		const result = await this.send<object>(request);
		return result;
	}

	/**
	 * Remove the input album from current user's favorites
	 * @param spotifyAlbumId Album to unsave
	 */
	async unsaveAlbum(spotifyAlbumId: string) {
		const url = MyUrlFactory.Instance.getUrl(`album`);

		const requestBody = { album: { spotifyId: spotifyAlbumId } };
		const requestInit: RequestInit = {
			method: 'DELETE',
			body: JSON.stringify(requestBody),
		};
		const request = new Request(url, requestInit);

		const result = await this.send<object>(request);
		store.dispatch(removeFromMyAlbums(spotifyAlbumId));
		return result;
	}

	/**
	 * Retrieve the list of the tags for the current user. Use TagManager if you want subscription updates.
	 */
	public async getTags(): Promise<GetMyTagsResponse> {
		const url = MyUrlFactory.Instance.getUrl('tag');
		const request = new Request(url);

		const response = await this.send<GetMyTagsResponse>(request);

		return response;
	}

	/**
	 * Add a tag to the input album. Use TagManager if you want subscription updates.
	 * @param tag Tag name to add
	 * @param albumSpotifyId Tagged album
	 */
	async addTagToAlbum(tag: string, albumSpotifyId: string) {
		const url = MyUrlFactory.Instance.getUrl('tag');

		const requestBody: TagOnAlbumRequest = { tag: { name: tag }, album: { spotifyId: albumSpotifyId } };
		const requestInit: RequestInit = {
			method: 'POST',
			body: JSON.stringify(requestBody),
		};
		const request = new Request(url, requestInit);

		const result = await this.send<object>(request);
		this.refreshTags();
		return result;
	}

	/**
	 * Delete a tag from the input album. Use TagManager if you want subscription updates.
	 * @param tag Tag name to remove
	 * @param albumSpotifyId Tagged album
	 */
	async deleteTagFromAlbum(tag: string, albumSpotifyId: string) {
		const url = MyUrlFactory.Instance.getUrl('tag');

		const requestBody: TagOnAlbumRequest = { tag: { name: tag }, album: { spotifyId: albumSpotifyId } };
		const requestInit: RequestInit = {
			method: 'DELETE',
			body: JSON.stringify(requestBody),
		};
		const request = new Request(url, requestInit);

		const result = await this.send<object>(request);
		this.refreshTags();
		return result;
	}

	refreshTags() {
		// TODO: to be fully converted to Redux
		store.dispatch(loadTags());
	}

	async getListeningList(offset = 0, limit = 20): Promise<UserAlbumsResponse> {
		let params = '';
		if (offset) {
			params += `&offset=${encodeURIComponent(offset.toString())}`;
		}
		if (limit) {
			params += `&limit=${limit.toString()}`;
		}

		const url = MyUrlFactory.Instance.getUrl('listening-list', params);
		const request = new Request(url);

		const result = await this.send<UserAlbumsResponse>(request);

		return result;
	}

	/**
	 * Add the input album to current user's listening list
	 * @param spotifyAlbumId Album to save
	 */
	async addToListeningList(albumDescriptor: UserAlbum) {
		// TODO: to be fully converted to Redux
		const url = MyUrlFactory.Instance.getUrl(`listening-list`);

		const requestBody = { album: { spotifyId: albumDescriptor.album.id } };
		const requestInit: RequestInit = {
			method: 'POST',
			body: JSON.stringify(requestBody)
		};
		const request = new Request(url, requestInit);

		const result = await this.send(request);
		store.dispatch(addToListeningList(albumDescriptor));
		return result;
	}

	/**
	 * Remove the input album from current user's listening list
	 * @param spotifyAlbumId Album to unsave
	 */
	async deleteFromListeningList(albumSpotifyId: string) {
		// TODO: to be fully converted to Redux
		const url = MyUrlFactory.Instance.getUrl(`listening-list`);

		const requestBody = { album: { spotifyId: albumSpotifyId } };
		const requestInit: RequestInit = {
			method: 'DELETE',
			body: JSON.stringify(requestBody)
		};
		const request = new Request(url, requestInit);

		const result = await this.send(request);
		store.dispatch(removeFromListeningList(albumSpotifyId));
		return result;
	}

	async searchAlbums(keywords: string, offset = 0, limit = 20): Promise<UserAlbumsResponse> {
		let params = '';
		if (keywords) {
			params += `&q=${encodeURIComponent(keywords)}`;
		}
		if (offset) {
			params += `&offset=${offset.toString()}`;
		}
		if (limit) {
			params += `&limit=${limit.toString()}`;
		}

		const url = MyUrlFactory.Instance.getUrl('search', params);
		const request = new Request(url);

		const result = await this.send<UserAlbumsResponse>(request);

		return result;
	}
}