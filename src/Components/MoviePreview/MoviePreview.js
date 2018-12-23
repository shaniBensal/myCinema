import React from 'react';

import './MoviePreview.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const remove = (event, onRemove, movieId) => {
    event.preventDefault();
    onRemove(movieId);
};

const showModal = (onShowModal, event, movie, modal) => {    
    event.preventDefault();
    let movieTosend = { ...movie, modal: modal }
    onShowModal(movieTosend);
}

const MoviePreview = (props) => {
    let poster;
    if (props.movie.Poster === 'N/A' || !props.movie.Poster) poster = 'images/noImage.png';
    else poster = props.movie.Poster;
    return (
        <div className="item-preview flex justify-center align-items-center">
            <div className="flex flex-column">
                <ul className='movie-details margin-zero padding-zero'>
                    <li className="list-item">
                        <h2>{props.movie.Title.substring(0, 36)}</h2>
                    </li>
                    <div className="poster flex justify-center">
                        <img src={poster} alt="movie-poster" />
                    </div>
                    <li className="list-item">
                        Director: {props.movie.Director[0]}
                    </li>
                    <li className="list-item">
                        Year: {props.movie.Year}
                    </li>
                    <li className="list-item">
                        Length (min): {props.movie.Runtime}
                    </li>
                    <li className="list-item category">
                        <ul className="flex flex-wrap margin-zero padding-zero">
                            {props.movie.Genre.map(type => (
                                <li className="genre" key={type}>{type}</li>
                            ))}
                        </ul>
                    </li>
                </ul>
                <div className="flex justify-space-between">
                    <label onClick={event => showModal(props.onShowModal, event, props.movie, 'info')}><FontAwesomeIcon icon="info" title="plot" /></label>
                    <label onClick={event => showModal(props.onShowModal, event, props.movie, 'edit')}><FontAwesomeIcon icon="edit" title="edit" /></label>
                    <label onClick={event => remove(event, props.onRemove, props.movie.id)}>
                        <FontAwesomeIcon icon="trash" title="trash" />
                    </label>
                </div>
            </div>
        </div>
    )
}

export default MoviePreview;