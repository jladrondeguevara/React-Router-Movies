import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieList from './Movies/MovieList';
import Movie from './Movies/Movie';
import {BrowserRouter, Route, Link} from 'react-router-dom';

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
        <Router>
          <Route path='/' render={props => {
            // const {props} = props;
            return <div><MovieList props = {props}/></div>
          }}/>
          <Route path='/movies/:id' render={props => {
            const {id} = props.match.params;
            return <div><Movie props = {id}/></div>
          }}/>

          <Link to='/movies'>Movies</Link>
        </Router>
      </div>
    </div>
  );
};

export default App;
