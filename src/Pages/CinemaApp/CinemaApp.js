import React, { Component } from 'react';
import PopUp from '../../Components/PopUp/PopUp';
import MovieList from '../../Components/MovieList/MovieList'
import NavBar from '../../Components/NavBar/NavBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './CinemaApp.css'

import { connect } from 'react-redux';
import { getMovies, updateKeyWord, deleteMovie } from '../../store/Actions';

const mapStateToProps = state => {
    return {
        movies: state.movies
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getMovies: numberOfPage => dispatch(getMovies(numberOfPage)),
        updateKeyWord: keyWord => dispatch(updateKeyWord(keyWord)),
        deleteMovie: movieId => dispatch(deleteMovie(movieId))
    };
}

class CinemaApp extends Component {

    state = {
        showModal: null,
        movies: [],
        filter: '',
        newSearch: null
    }

    componentWillMount() {
        this.getMovies(1);
    }

    getMovies = numberOfPage => {
        this.props.getMovies(numberOfPage);
        this.setState({
            movies: this.props.movies
        })
    }

    deleteMovie = movieId => {
        this.props.deleteMovie(movieId).then(() => {
            this.getMovies()
        })
    }

    updateSearchWord = event => {
        let key = event.target.value;
        key = key.replace(/[^a-zA-Z ]/g, "");
        key = key.toLowerCase()
            .split(' ')
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');
        this.setState({
            filter: key
        });
    }

    searchMovie = () => {
        this.props.updateKeyWord(this.state.filter)
        this.setState({
            movies: this.props.movies,
            newSearch: this.state.filter
        })
    }
    openModal = (movie) => {
        this.setState({
            showModal: movie
        })
    }

    addNewMovie = () => {
        let movie = {
            Title: '',
            Year: '',
            Genre: [''],
            Runtime: '',
            Director: '',
            Plot: '',
            modal: 'edit'
        }
        this.openModal(movie);
    }

    closeModal = () => {
        this.setState({ showModal: null })
    }

    getOtherPage = (numberOfPage) => {
        this.getMovies(numberOfPage)
    }

    render() {
        let movies = this.props.movies;
        return (
            <React.Fragment>
                <NavBar onInputChange={event => this.updateSearchWord(event)}
                    onSubmit={() => this.searchMovie()}/>
                <div className="pages-btn flex justify-center">
                    <button onClick={() => this.getOtherPage('1')}>1</button>
                    <button onClick={() => this.getOtherPage('2')}>2</button>
                    <button onClick={() => this.getOtherPage('3')}>3</button>
                    <button onClick={this.addNewMovie}><FontAwesomeIcon icon="plus" title="add movie" /></button>

                </div>
                {this.state.showModal ?
                    <PopUp movie={this.state.showModal} onCloseModal={() => this.closeModal()} />
                    : ''
                }
                {this.state.newSearch ? <p>Your Results for: {this.state.newSearch}</p> : null}
                <MovieList movies={movies}
                    onShowModal={movie => this.openModal(movie)}
                    onRemoveMovie={movieId => this.deleteMovie(movieId)} />
            </React.Fragment>
        )
    }
}
const Cinema = connect(
    mapStateToProps,
    mapDispatchToProps
)(CinemaApp);
export default Cinema;
