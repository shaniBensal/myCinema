import { GET_MOVIES } from './Action-types';
import { SAVE_MOVIE } from './Action-types';
import { DELETE_MOVIE } from './Action-types';
import { UPDATE_KEY } from './Action-types';
import MovieService from '../services/movieService';

export const getMovies = numberOfPage => ({
    type: GET_MOVIES,
    payload: MovieService.getMovies(numberOfPage)
})

export const updateKeyWord = keyWord => ({
    type: UPDATE_KEY,
    payload: MovieService.updateKeyWord(keyWord)
})

export const saveMovie = movie => ({
    type: SAVE_MOVIE,
    payload: MovieService.saveMovie(movie)
})
export const deleteMovie = movieId => ({
    type: DELETE_MOVIE,
    payload: MovieService.deleteMovie(movieId)
});





