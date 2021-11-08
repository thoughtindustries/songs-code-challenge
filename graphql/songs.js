import songs from '../songs.json';
import { MeiliSearch } from 'meilisearch';

const client = new MeiliSearch({ host: 'http://0.0.0.0:7700/'});

// catch errors and handle async nature of malisearch
const initMeili= async () => {
  try {
    
    const songClientIndex = await client.index('song');
    await songClientIndex.addDocuments(songs)
    // searching for (Finally // beautiful stranger) gives us un-accurate results removing '/' as a valid search parameter
    const newSettings = {
      stopWords: [
        '/',
      ]
    };
    
    await songClientIndex.updateSettings(newSettings); 
     
  } catch (e) {
    console.error(e);
    console.log("Meili error: ", e.message);
  }
};
initMeili();



export default {
  Query: {
    async Songs(root, { page, search }) {
      const PER_PAGE = 15;
      const offsetStart = PER_PAGE * (page - 1);
      const offsetEnd = offsetStart + PER_PAGE;
      let matchingSongs = await client.index('song').search(search, {limit: 50});
      matchingSongs = matchingSongs.hits;
       

      return {
        songs: matchingSongs.slice(offsetStart, offsetEnd),
        pageInfo: {
          per_page: PER_PAGE,
          total: matchingSongs.length,
          has_more: offsetEnd < matchingSongs.length,
          current_page: page // current_page property had no value.
        }
      };
    }
  }
};
