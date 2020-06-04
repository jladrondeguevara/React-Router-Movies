import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieList from './Movies/MovieList';
import Movie from './Movies/Movie';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import SavedList from './Movies/SavedList';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const getMovies = () => {
      axios
        .get('http://localhost:5000/api/movies')
        .then(response => {
          setMovieList(response.data);
        })
        .catch(error => {
          console.error('Server Error', error);
        });
    }
    getMovies();
  }, []);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  return (
    <div>
      <SavedList list={savedList} />
      <div>
          <Route path='/' render={props => {
            props = movieList;
            return <div><MovieList movies = {props}/></div>
          }}/>
          {/* <Route path='/' component = {<MovieList movies = {movieList}/>}/> */}
          {/* {console.log("this is the data: ", movieList)} */}
          {/* <MovieList movies = {movieList}/> */}
          <Route path='/movies/:id' render={props => {
            const {id} = props.match.params;
            return <div><Movie props = {id}/></div>
          }}/>

          <Link to='/movies'>Movies</Link>
      </div>
    </div>
  );
};

export default App;
