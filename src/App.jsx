import React, { useEffect, useState } from 'react'
import useDebounce from './hooks/useDebounce';
import Search from './components/Search'
import Spinner from './components/Spinner';
import MovieCard from './components/MovieCard';
import Trending from './components/Trending';
import { getTrendingMovies, updateSearchCount } from './appwrite';
// API Informations
const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS ={
  method: "GET",
  headers:{
    accept:'application/json',
    Authorization:`Bearer ${API_KEY}`
  }
} 

const App = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [searchTerm,setSearchTerm] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedValue= useDebounce(searchTerm,700);
  //fetching movies from TMDB API
  const fetchMovies = async(query='')=>{
    setIsLoading(true);
    setErrorMessage('');
    try{
      // sort movies descending order depend on the popularity
      const endpoint =query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc` 
      const response= await fetch (endpoint, API_OPTIONS)
      if(! response.ok ){
        throw new Error ('Failed to fetch the movies');
      }
      const data = await response.json();
      if(data.Response === 'False'){
        setErrorMessage(data.Error || 'Failed to fetch movies');
        setMovieList([]);
        return;
      }
      setMovieList(data.results || [])
      if(query && data.results.length>0){
        await updateSearchCount(query, data.results[0]);
      }
    }
    catch(error){
      console.error(`Error fetching movies: ${error}`)
      setErrorMessage('Error fetching movies. Please try again later.')
    }finally{
      setIsLoading(false)
    }
  }

  //fetching trending movies from the database
  const loadTrendingMovies = async ()=>{
    try{
      const movies = await getTrendingMovies();
      setTrendingMovies(movies); 
    }catch(error){
      console.error(`Error fetching trending movies: ${error}`);
    }
  }

  //fetching movies once you load the website, and after searching
  useEffect(()=>{
    fetchMovies(debouncedValue);
  },[debouncedValue] );

  useEffect(()=>{
    loadTrendingMovies();
  },[] );

  return (
    <main>
      <div className='pattern'/>
      <div className='wrapper'>
        <header>  
          <img src="./hero.png" alt="Hero Banner" />
          <h1>
            Find <span className='text-gradient'>Movies</span> You'll Enjoy Without the Hassle
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        </header>

        {trendingMovies.length>0 && 
        (
        <section className='trending'>
          <h2>Trending Movies</h2>
          <ul>
          {trendingMovies.map((movie, index)=>(
            <li key={movie.$id}>
              <p>{index + 1}</p>
              <img src={movie.poster_url} alt={movie.title} />
            </li>
          ))}
          </ul>
        <Trending />
        </section>
        )
        }
    <section className='all-movies'>
      <h2 className='mt-[50px]'>All Movies</h2>
      {isLoading? (<Spinner/>):errorMessage? (<p className='text-red-500'>{errorMessage}</p>):(
        <ul>{movieList.map((movie)=>(
          <MovieCard movie={movie} key ={movie.id}/>
        ))}</ul>
      ) }
    </section>
      </div>
    </main>
  )
}

export default App 