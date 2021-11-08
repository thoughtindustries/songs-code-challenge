import 'bootstrap/dist/css/bootstrap.css';
import { useRouter } from 'next/router';
import { useState, useEffect} from 'react';
import Songs from '../../components/songs';
import Header from '../../components/header';

export async function getServerSideProps({ params }) {
  let [pageOrInitialSearch, page] = params.q || [];
  if (page) {
    page = parseInt(page, 10);
  } else if (parseInt(pageOrInitialSearch, 10) > 0) {
    page = parseInt(pageOrInitialSearch, 10);
    pageOrInitialSearch = null;
  }
  

  return {
    props: {
      initialSearch: pageOrInitialSearch || null, 
      page: page || 1
    }
  };
}

export default function App({ initialSearch, page }) {
  const router = useRouter();

  const [searchedWord, setSearch] = useState("");

  const performSearch = newSearch => {
  newSearch = newSearch.replace(/\//g, ''); // remove forward slashes from search
  console.log(newSearch)
   router.replace({ pathname: `/${newSearch }` });
  };
 
  useEffect(() => {
     performSearch(searchedWord)
  }, [searchedWord])
    // imported useState and useEffect from react
    // perform search with state variable created using useState inside use effect
    // when component is first rendered we perform search with state variable.
    // state variable passed as dependency to useEffect, watching for updated made to state.
    // we pass setSearch as a prop to Header in order dynamically set the search variable.

  return (
    <main>
      <Header performSearch={performSearch} search={searchedWord} setSearch={setSearch}  />
      <div className="py-5 bg-light">
        <div className="container">
          <Songs search={initialSearch} page={page} />
        </div>
      </div>
    </main>
  );
}
