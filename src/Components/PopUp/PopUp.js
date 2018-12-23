import React from 'react';
import './PopUp.css';
import MovieEdit from '../MovieEdit/MovieEdit'

const closeModal = (event, onCloseModal) => {
    onCloseModal(event)
}

const PopUp = (props) => {
    let movie = props.movie
    let modalToOpen = props.movie.modal;
    let plot;
    if (movie.Plot !== '') plot = movie.Plot;
    else plot = 'No Plot for display'

    return (
        <div className='popup'>
            <div className='popup_inner'>
                <button className="close-window" onClick={event => closeModal(event, props.onCloseModal)}>X</button>
                {
                    modalToOpen === 'info' ? <div>
                        <h2>{movie.Title}</h2>
                        <img src={movie.Poster} alt="movie-poster"/>
                        <p>{plot}</p></div> :
                        <MovieEdit movie={movie} onCloseModal={event => closeModal(event, props.onCloseModal)} />
                }
            </div>
        </div>
    )
}

export default PopUp;
