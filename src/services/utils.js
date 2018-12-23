function sortMovieList(movieList) {
    return movieList.sort((a, b) => {
        var timeA = a.Runtime.toLowerCase();
        var timeB = b.Runtime.toLowerCase();
        if (timeA < timeB) return -1;
        if (timeA > timeB) return 1;
        return 0;
    })
}

export default{
    sortMovieList
}