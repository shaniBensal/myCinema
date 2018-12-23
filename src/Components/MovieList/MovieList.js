import React from 'react';
import MoviePreview from '../MoviePreview/MoviePreview'
// import './MovieList.css'

const remove = (onRemoveMovie, movieId) => {
    onRemoveMovie(movieId);
};
const showModal = (onShowModal, movie) => {
    onShowModal(movie);
};

const MovieList = (props) => {
    const moviePreview = props.movies.map((movie) => {
        return (
            <li key={movie.id} className="movie-list-item list-item">
                <MoviePreview movie={movie}
                    onRemove={movieId => remove(props.onRemoveMovie, movieId)}
                    onShowModal={movie => showModal(props.onShowModal, movie)} />
            </li>
        )
    });

    return (
        <div className="movie-list">
            {props.movies ? <ul className="flex flex-wrap justify-center">
                {moviePreview} </ul> : <div> No Results Found</div>}
        </div>
    );
}

export default MovieList;