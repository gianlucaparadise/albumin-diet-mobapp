import { EventObserver } from "../observer-pattern/EventObserver";
import { ITag } from "albumin-diet-types";
import { ConnectionHelper } from "./ConnectionHelper";

/**
 * This helps tag handling
 */
export class TagManager {
    private static _instance: TagManager;

    private constructor() { }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }

    private $tags: EventObserver<ITag[]> = new EventObserver<ITag[]>();

    private async refreshTags() {
        try {
            const response = await ConnectionHelper.Instance.getTags();
            this.$tags.broadcast(response.data);
        } catch (error) {
            console.error('Error while refreshing the tag: ');
            console.error(error);
        }
    }

    /**
	 * Return an observer to the list of the tags for the current user.
	 */
	public get tags(): EventObserver<ITag[]> {
        this.refreshTags();
        return this.$tags;
    }

    /**
	 * Add a tag to the input album and raise the observer.
	 * @param tag Tag name to add
	 * @param albumSpotifyId Tagged album
	 */
	async addTagToAlbum(tag: string, albumSpotifyId: string) {
        const result = await ConnectionHelper.Instance.addTagToAlbum(tag, albumSpotifyId);
        this.refreshTags();
        return result;
    }

    /**
	 * Delete a tag from the input album and raise the observer.
	 * @param tag Tag name to remove
	 * @param albumSpotifyId Tagged album
	 */
	async deleteTagFromAlbum(tag: string, albumSpotifyId: string) {
        const result = await ConnectionHelper.Instance.deleteTagFromAlbum(tag, albumSpotifyId);
        this.refreshTags();
        return result;
    }
}