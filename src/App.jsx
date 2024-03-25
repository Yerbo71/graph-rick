import './App.css'
import {BrowserRouter,Routes,Route} from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import MainPage from "./pages/MainPage.jsx";
import PerInfoPage from "./pages/PerInfoPage.jsx";
import EpisodesPage from "./pages/EpisodesPages.jsx";
import PerEpisodePage from "./pages/PerEpisodePage.jsx";
function App() {

  const client = new ApolloClient({
    uri: 'https://rickandmortyapi.com/graphql',
    cache: new InMemoryCache(),
  });

  return (
      <BrowserRouter>
          <ApolloProvider client={client}>
              <Routes>
                  <Route path="/" element={<MainPage/>}/>
                  <Route path="/:id" element={<PerInfoPage/>}/>
                  <Route path="/episodes" element={<EpisodesPage/>}/>
                  <Route path="/episodes/:id" element={<PerEpisodePage/>}/>
              </Routes>
          </ApolloProvider>
      </BrowserRouter>
  )
}

export default App
