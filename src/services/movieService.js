
import axios from 'axios';
import uniqid from 'uniqid';
import utils from './utils'
import swal from "sweetalert";

const API_KEY = '4a023895';
let MOVIES = null;
var KEYWORD = 'sea';

function getMovies(numberOfPage) {
    if (MOVIES === null || numberOfPage >= 1) {
        return axios.get(`https://www.omdbapi.com/?s=${KEYWORD}&page=${numberOfPage}&type=movie&apikey=${API_KEY}`)
            .then(res => {
                if (res.data.Error === "Too many results.") {
                    swal("Too many results. Try to be more specific").then(() => {
                        return;
                    })
                } else if (res.data.Error === "Movie not found!") {
                    swal("Movie not found!").then(() => {
                        return;
                    })
                }
                else {
                    MOVIES = [];
                    var prms = [];
                    res.data.Search.forEach(movie => {
                        prms.push(_getMovieById(movie.imdbID)
                            .then(data => MOVIES.push(data)
                            ))
                    })
                    return Promise.all(prms).then(() => {
                        const sortedMovies = utils.sortMovieList(MOVIES)
                        return Promise.resolve(sortedMovies)
                    })
                }
            })
    } else return Promise.resolve(MOVIES);
}

function updateKeyWord(key) {
    KEYWORD = key;
    MOVIES = null;
    return getMovies();
}

function _getMovieById(id) {
    return axios.get(`https://www.omdbapi.com/?i=${id}&page=2&apikey=${API_KEY}`)
        .then(res => {
            return res.data
        }).then(movie => {
            return {
                "id": movie.imdbID,
                "Title": movie.Title,
                "Year": movie.Year,
                "Genre": (movie.Genre).split(',').splice(0, 3),
                "Runtime": (movie.Runtime).replace(/\D/g, ''),
                "Director": (movie.Director).split(','),
                "Poster": movie.Poster,
                "Plot": movie.Plot
            }
        })
}
function saveMovie(movie) {
    return movie.id ? _updateMovie(movie) : _addMovie(movie);
}

function deleteMovie(id) {
    return swal({
        title: "Are you sure you want to delete this movie?",
        icon: "warning",
        buttons: ["Cancel", "Delete"],
        dangerMode: true,
        className: "swal-warning"
    }).then(willDelete => {
        if (willDelete) {
            return new Promise((resolve, reject) => {
                const idx = MOVIES.findIndex(movie => movie.id === id)
                if (idx !== -1) {
                    MOVIES.splice(idx, 1);
                    return resolve();
                }
            }).then(() => {
                swal("Your movie has been deleted!", {
                    icon: "success",
                    timer: 2000,
                    className: "swal-text",
                    button: false
                });
            });
        } else swal.close();
    });
}

function _updateMovie(movie) {
    return new Promise((resolve, reject) => {
        const idx = MOVIES.findIndex(m => movie.id === m.id);
        _checkDuplicate(movie);
        MOVIES[idx] = movie;
        resolve(movie);
    })
}

function _addMovie(movie) {
    return new Promise((resolve, reject) => {
        movie.id = uniqid();
        movie.Poster = 'images/noImage.png';
        const movieToSave = _checkDuplicate(movie);
        if (movieToSave) return;
        else {
            MOVIES.push(movie);
            resolve(movie);
        }
    })
}

function _checkDuplicate(movieToSave) {
    var duplicate = false;
    MOVIES.some(movie => {
        if (movieToSave.Title.toLowerCase() === movie.Title.toLowerCase() &&
            movieToSave.id !== movie.id) {
            duplicate = true;
            swal("This movie already exist!");
            return duplicate;
        }
        else {
            return swal("Your movie has been added!", {
                icon: "success",
                timer: 2000,
                className: "swal-text",
                button: false
            });
        }
    });
    return duplicate;
}

export default {
    getMovies,
    updateKeyWord,
    saveMovie,
    deleteMovie
}