import Spotify from "spotify-web-api-js";

const spotifyApi = new Spotify();

export function setAccessToken(accessToken) {
	spotifyApi.setAccessToken(accessToken);
}

export async function getUserPlaylists() {
	//returns an array of objects with playlist name (like "Favorite Smashing Pumpkins jamz")
	//and the id of the playlist. Use this to feed the playlists selection list
	try {
		const playlistsResponse = await spotifyApi.getUserPlaylists();
		//playlistsResponse.items are the actual playlist objects
		const playlists = playlistsResponse.items.map((playlistObject) => {
			const { id, name } = playlistObject;
			return { id, playlistName: name };
		});
		return playlists;
	} catch (err) {
		console.error("Error: Attempting to get user playlists", err);
		console.error(err.stack);
		return [{ id: null, playlistName: "Can't Download your Playlists!" }];
	}
}

export async function getLatestSongs() {
	try {
		const latestSongs = await spotifyApi.getMyRecentlyPlayedTracks({ limit: 40 });
		return latestSongs;
	} catch (err) {
		console.error("Error: Attempting to get user playlists", err);
		console.error(err.stack);
		return [{ id: null, playlistName: "Can't Download your Playlists!" }];
	}
}

export async function getFavArtists() {
	try {
		const favArtists = await spotifyApi.getMyTopArtists({ limit: 5 });
		return favArtists;
	} catch (err) {
		console.error("Error: Attempting to get user's favorite artists", err);
		console.error(err.stack);
		return [{ id: null, playlistName: "Can't Download your Fav Artists!" }];
	}
}

export async function getRelatedArtists(id) {
	try {
		const similarArtists = await spotifyApi.getArtistRelatedArtists(id);
		return similarArtists;
	} catch (err) {
		console.error("Error: Attempting to get user's favorite artists", err);
		console.error(err.stack);
		return [{ id: null, playlistName: "Can't Download your Fav Artists!" }];
	}
}

export async function getProfilePic() {
	try {
		const result = await spotifyApi.getMe();
		return result;
	} catch (err) {
		console.error("Error: Attempting to get user's profile", err);
		console.error(err.stack);
		return [{ id: null, playlistName: "Can't Download your Profile!" }];
	}
}

export async function getTopTracks(id) {
	try {
		const result = await spotifyApi.getArtistTopTracks(id, 'IN');
		return result;
	} catch (err) {
		console.error("Error: Attempting to get artist's top tracks", err);
		console.error(err.stack);
		return [{ id: null, playlistName: "Can't Download artist's top tracks!" }];
	}
}

export async function getUserTopTracks(range) {
	try {
		const result = await spotifyApi.getMyTopTracks({ limit: 45, time_range: range });
		return result;
	} catch (err) {
		console.error("Error: Attempting to get user's top tracks", err);
		console.error(err.stack);
		return [{ id: null, playlistName: "Can't Download user's top tracks!" }];
	}
}
