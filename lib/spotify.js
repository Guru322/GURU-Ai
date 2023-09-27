import { Spotify } from 'spotifydl-core'; // Import the Spotify class
import canvacord from 'canvacord';

const credentials = {
    clientId: 'acc6302297e040aeb6e4ac1fbdfd62c3',
    clientSecret: '0e8439a1280a43aba9a5bc0a16f3f009',
};

const spotify = new Spotify(credentials);

const spotifydl = async (url) => {
    try {
        const res = await spotify.getTrack(url);
        const card = new canvacord.Spotify()
            .setAuthor(res.artists.join(', '))
            .setAlbum(res.album_name)
            .setStartTimestamp(40000)
            .setEndTimestamp(179000)
            .setBackground('COLOR', '#A30000')
            .setImage(res.cover_url)
            .setTitle(res.name);

        const coverimage = await card.build();
        const audio = await spotify.downloadTrack(url);

        return { data: res, coverimage, audio };
    } catch (error) {
        return { error: 'Failed' };
    }
};

export default spotifydl;