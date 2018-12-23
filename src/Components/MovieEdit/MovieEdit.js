import React, { Component } from 'react';

import { connect } from 'react-redux';
import { saveMovie } from '../../store/Actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import swal from "sweetalert";

import './MovieEdit.css';

const mapDispatchToProps = dispatch => {
    return {
        saveMovie: movie => dispatch(saveMovie(movie))
    };
}

class MovieEdit extends Component {
    state = {
        movie: this.props.movie
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = event.target.value;
        const field = target.name;
        const newMovie = { ...this.state.movie };
        newMovie[field] = value;
        this.setState({
            movie: newMovie
        });
    }

    handleSubmit = (event) => {
        const movie = this.state.movie;
        if ((movie.Genre).length === 1) {
            if (movie.Genre[0] === ' ' || movie.Genre[0] === '') {
                swal("Fill All The Fields!", {
                    icon: "warning",
                    timer: 2000,
                    className: "swal-text",
                    button: false
                }); return;
            }
        }
        if (this._validateMovie()) {
            this.props.saveMovie(movie).then(() => {
                this.closeWindow(event, this.props.onCloseModal)
            })
        } else swal("Fill All The Fields!", {
            icon: "warning",
            timer: 2000,
            className: "swal-text",
            button: false
        }); return;
    }

    closeWindow = (event, onCloseModal) => {
        onCloseModal(event)
    }

    _validateMovie = () => {
        let movie = this.state.movie;
        for (var key in movie) {
            if (movie[key] === '' || movie[key] === ' ') {
                swal("Fill All The Fields!", {
                    icon: "warning",
                    timer: 78000,
                    className: "swal-text",
                    button: false
                }); return false;
            }
        }
        if (movie.Year < 1900) {
            swal("Choose Another Year!")
            return false;
        }
        return true
    }

    handleGenreChange = (event, index) => {
        const value = event.target.value;
        if (value === ' ' || value === '') {
            this.removeGenere(event, index);
        } else {
            const newMovie = { ...this.state.movie };
            newMovie.Genre[index] = value;
            this.setState({
                movie: newMovie
            });
        }
    }

    addInput = event => {
        event.preventDefault();
        const newMovie = { ...this.state.movie };
        const lastIdx = (newMovie.Genre).length;
        newMovie.Genre[lastIdx + 1] = 'Add New Genre';
        this.setState({
            movie: newMovie
        });
    }

    removeGenere = (event, index) => {
        event.preventDefault();
        if ((this.state.movie.Genre).length !== 1) {
            const newMovie = { ...this.state.movie };
            (newMovie.Genre).splice(index, 1);
            this.setState({
                movie: newMovie
            });
        } else return;
    }

    render() {
        const movie = this.state.movie;
        let genreId = ['A', 'B', 'C']
        let genres = (movie.Genre).map((genre, index) => {
            return (
                <div key={genreId[index]}>
                    <input type="text"
                        className="edit-input"
                        onChange={event => this.handleGenreChange(event, index)} value={genre} />
                    <label onClick={event => this.removeGenere(event, index)}><FontAwesomeIcon icon="trash" title="trash" />
                    </label>
                </div>
            );
        });
        return (
            <div className="edit-cmp flex flex-column">
                <h2 className="edit-title">{movie.id ? 'Edit Movie' : 'Add Movie'}</h2>
                <form onSubmit={event => this.handleSubmit(event)}>

                    <div className="same-line flex justify-space-around">
                        <div className="flex flex-column">
                            <label className="edit-title">Movie Title:</label>
                            <input className="edit-input" type="text" name="Title" defaultValue={movie.Title}
                                onChange={this.handleInputChange} placeholder="Title" /></div>
                        <div className="flex flex-column">
                            <label className="edit-title">Director:</label>
                            <input className="edit-input" type="text" name="Director" defaultValue={movie.Director}
                                onChange={this.handleInputChange} placeholder="Director" /></div>
                    </div>

                    <div className="same-line flex justify-space-around">
                        <div className="flex flex-column">
                            <label className="edit-title"> Year Released:</label>
                            <input className="edit-input" type="text" name="Year" defaultValue={movie.Year}
                                onChange={this.handleInputChange} placeholder="Year" /></div>
                        <div className="flex flex-column">
                            <label className="edit-title">Runtime:</label>
                            <input className="edit-input" type="number" name="Runtime" defaultValue={movie.Runtime}
                                onChange={this.handleInputChange} placeholder="Runtime" /></div>
                    </div>

                    <div className="flex flex-column">
                        <label className="edit-title"> Genre List:</label>
                        <div className="flex genre-input">
                            {genres}
                            {(movie.Genre).length < 3 ?
                                <label onClick={this.addInput}><FontAwesomeIcon icon="plus" title="plus" /></label>
                                : null}
                        </div>
                    </div>
                    <div className="flex flex-column">
                        <label className="edit-title"> Plot:</label>
                        <textarea type="text" name="Plot"
                            value={movie.Plot} onChange={this.handleInputChange} placeholder="Plot" />
                    </div>


                    <button className="submit-btn" type="submit">Submit</button>
                </form>
            </div >
        )
    }
}

const EditCMP = connect(
    null,
    mapDispatchToProps
)(MovieEdit);
export default EditCMP;


