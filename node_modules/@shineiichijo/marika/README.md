<div align=center>
<a href="https://github.com/ShineiIchijo/Marika"><img src="https://wallpapermemory.com/uploads/816/marika-tachibana-wallpaper-hd-1920x1080-323797.jpg" alt="chitoge" border="0"></a>

# Marika

[![NPM](https://img.shields.io/badge/Available%20On-NPM-lightgrey.svg?logo=npm&logoColor=339933&labelColor=white&style=flat-square)](https://www.npmjs.com/package/@shineiichijo/marika)

A promise based API wrapper for the unofficial [MyAnimeList API](https://jikan.moe/)

</div>

---

## Installation

```sh
npm i @shineiichijo/marika

yarn add @shineiichijo/marika
```

## 🚀 Importing

```ts
import { Anime, Character, Manga } from "@shineiichijo/marika"; // const { Anime, Character, Manga } = require("@shineiichijo/marika")
const animeClient = new Anime();
const charaClient = new Character();
const mangaClient = new Manga();
```

### 💙 Anime Methods

```ts
await animeClient.getRandomAnime(); //will return random anime with info

await animeClient.getAnimeById(id); //will return the info of the given anime id

await animeClient.getAnimeFullById(id) //will return the complete info of the given anime id

await animeClient.getAnimeCharacters(id); //will return characters of the given anime id

await animeClient.getAnimeStaff(id); //will return staff list for the given anime id

await animeClient.getAnimeEpisodes(id); //will return episodes list of the given anime id. You can also query the page. Example: await animeClient.getAnimeEpisodes(id, { query: page_number })

await animeClient.getAnimeEpisodeById(id, { query: episode_number }); //will return the info of the given anime id episode

await animeClient.getAnimeNews(id); //will return the list of anime news for the given anime id. You can also query the page. Example: await animeClient.getAnimeNews(id, { query: page_number })

await animeClient.getAnimeForum(id); //will return the forum of the given anime id. You can also select the filter. Example: await animeClient.getAnimeForum(id, { filter: "episode" }). You can check the filters here - https://github.com/ShineiIchijo/Marika/blob/main/src/typings/searchOptions.ts#L85

await animeClient.getAnimeVideos(id); //will return the list of videos for the given anime id

await animeClient.getAnimePictures(id); //will return pictures of the given anime id

await animeClient.getAnimeStats(id); //will return the stats for the given anime id

await animeClient.getAnimeRecommendations(id); //will return recommendations of the given anime id

await animeClient.getAnimeMoreInfo(id); //will return more info for the given anime id

await animeClient.getAnimeUserUpdates(id); //will return user updates of the given anime id. You can also query the page. Example: await animeClient.getAnimeUserUpdates(id, { query: page_number })

await animeClient.getAnimeReviews(id); //will return reviews of the given anime id. You can also query the page. Example: await animeClient.getAnimeReviews(id, { query: page_number })

await animeClient.getAnimeRelations(id); //will return relations of the given anime id

await animeClient.getAnimeThemes(id); //will return themes of the given anime id

await animeClient.getAnimeExternals(id); //will return externals of the given anime id

await animeClient.searchAnime(query); //will search the given anime title. You can pass several options. You can check it out at here - https://github.com/ShineiIchijo/Marika/blob/main/src/typings/searchOptions.ts#L1

await animeClient.getTopAnime(); //will return list for the ranking of anime in MyAnimeList. You can also query the page. Example - await animeClient.getTopAnime({ query: page_number })
```

### 💚 Manga Methods

```ts
await mangaClient.getRandomManga(); //will return random manga with info

await mangaClient.getMangaById(id); //will return the info of the given manga id

await mangaClient.getMangaCharacters(id); //will return characters of the given manga id

await mangaClient.getMangaNews(id); //will return news of the given manga id. You can also query the page. Example: await mangaClient.getMangaNews(id, { query: page_number })

await mangaClient.getMangaTopics(id); //will return topics of the given Manga ID

await mangaClient.getMangaPictures(id); //will return pictures of the given manga id

await mangaClient.getMangaStats(id); //will return the stats for the given manga id

await mangaClient.getMangaMoreInfo(id); //will return more info for the given manga id

await mangaClient.getMangaRecommendations(id); //will rerturn recommendations of the given manga id

await mangaClient.getMangaUserUpdates(id); //will return user updates of the given manga id. You can also query the page. Example: await mangaClient.getMangaUserUpdates(id, { query: page_number })

await mangaClient.getMangaReviews(id); //will return reviews of the given manga id. You can also query the page. Example: await mangaClient.getMangaReviews(id, { query: page_number })

await mangaClient.getMangaRelations(id); //will return relations of the given manga id

await mangaClient.getMangaExternal(id); //will return external of the given manga id

await mangaClient.searchManga(query); //will search the given manga. You can pass several options. You can check it out at here - https://github.com/ShineiIchijo/Marika/blob/main/src/typings/searchOptions.ts#L27

await mangaClient.getTopManga(); //will return list for ranking of manga in MyAnimeList. You can also query the page. Example - await mangaClient.getTopManga({ query: page_number })
```

### 🤍 Character Methods

```ts
await charaClient.getRandomCharacter(); //will return random anime character with info

await charaClient.getCharacterById(id); //will return the info for the given character id

await charaClient.getCharacterManga(id); //will return the manga for the given character id

await charaClient.getCharacterAnime(id); //will return the anime for the given character id

await charaClient.getCharacterVoiceActors(id); //will return the voice actors of the given character id

await charaClient.getCharacterPictures(id); //will return pictures of the given character id

await charaClient.searchCharacter(query); //will search the given character. You can also pass several options. You can check it out at here - https://github.com/ShineiIchijo/Marika/blob/main/src/typings/searchOptions.ts#L19

await charaClient.getTopCharacters(); //will return ranking of characters in MyAnimeList. You can also query the page. Example - await charaClient.getTopCharacters({ query: page_number })
```
