import fetch from 'node-fetch'; 
import spotifydl from '../lib/spotify.js';
let handler = async (m, { conn, text }) => {
    if (!text) {
        console.log('No song name provided.'); 
        throw `*Please enter a song name*`;
    }

    try {
        
        
        const apiUrl = `https://api.lolhuman.xyz/api/spotifysearch?apikey=${lolkeysapi}&query=${encodeURIComponent(text)}`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
            console.log('Error searching for song:', response.statusText);
            throw 'Error searching for song';
        }

        const data = await response.json();

        if (!data.result || data.result.length === 0) {
            console.log('No search results found for the song:', text);
            throw 'No search results found for the song';
        }

        
        const firstResult = data.result[0];

        
        const songLink = firstResult.link;

       
        const { data: spotifyData, coverimage, audio } = await spotifydl(songLink);

        if (!spotifyData || !coverimage || !audio) {
            console.log('Invalid Spotify data received:', spotifyData); 
            throw 'Invalid Spotify data received';
        }

        const { name, artists, album_name, link } = spotifyData;

        const spotifyi = `🎵 Now Playing\n⊱ ──── {♪} ──── ⊰\n🎶 *Title:* ${name}\n🎤 *Artist(s):* ${artists.join(', ')}\n💿 *Album:* ${album_name}\n🌐 *URL:* ${songLink}
        `;
        

        
        conn.sendFile(m.chat, audio, `${name}.mp3`, spotifyi, m);

        
        conn.sendFile(m.chat, coverimage, 'spotify_cover.jpg', spotifyi, m);
    } catch (error) {
        console.error('Error fetching Spotify data:', error); 
        throw '*Error*';
    }
};

handler.command = /^(spotify|song)$/i;
export default handler;
