
import { authHeader } from '../../helpers/authHeader';
import { async } from 'q';
import{URL_LIST, API_KEY, BACKEND_SHOWINGS, BACKEND_LINK, BACKEND_SEATS, BACKEND_BOOKING, BACKEND_ADDSHOWING, BACKEND_GETMOVIES, BACKEND_GETLOUNGES, BACKEND_ADDMOVIE, BACKEND_REMOVEMOVIE} from '../../helpers/const';

export const movieService={
    getcurrentPop,
    getMoveShowings,
    getEmptySeats,
    addShowing,
    getAllMovies,
    getAllLounges,
    addMovie,
    deleteMovie
};

async function deleteMovie(title){
    const data = {
        "movieName" : title
    }
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json; charset=UTF-8'},
        body: JSON.stringify(data)
    }
    var response = await fetch(BACKEND_LINK + BACKEND_REMOVEMOVIE, requestOptions);
    return response;
}

async function addMovie(title){
    const data = {
        "movieName" : title
    }
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json; charset=UTF-8'},
        body: JSON.stringify(data)
    }
    var response = await fetch(BACKEND_LINK + BACKEND_ADDMOVIE, requestOptions);
    return response;
}

async function getAllLounges(){
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json; charset=UTF-8'}
    }
    var response = await fetch(BACKEND_LINK + BACKEND_GETLOUNGES, requestOptions);
    var data = await response.json();
    
    var vals = handleBackendLounges(await data)

    return vals;
}


async function getAllMovies(){
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json; charset=UTF-8'}
    }
    var response = await fetch(BACKEND_LINK + BACKEND_GETMOVIES, requestOptions);
    var data = await response.json();

    var vals = handleBackendMovies(await data)

    return vals;
}

async function addShowing(date, title, lounge){
    const data = {
        "MovieShowingTime" : date,
        "MovieName" : title,
        "loungeId" : lounge,
    }
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json; charset=UTF-8'},
        body: JSON.stringify(data)
    }
    var response = await fetch(BACKEND_LINK + BACKEND_ADDSHOWING, requestOptions);
    return response;
}

async function getcurrentPop(){
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json; charset=UTF-8'}
    }
    var response = await fetch(URL_LIST +`?primary_release_date.gte=2019-07-15&primary_release_date.lte=2019-10-31` + API_KEY, requestOptions);
    var data = await response.json();
    var vals = handleData(await data)

    return vals;

}
async function getMoveShowings(movieTitle){ // needs to get objects in structure of {[date: *date*, time:  *time*], [...],...}  
const info =  {"MovieName" : movieTitle}
const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json; charset=UTF-8'},
        body : JSON.stringify(info)
    }
    var response = await fetch(BACKEND_LINK  + BACKEND_SHOWINGS, requestOptions);
    var data = await response.json();
    var vals = handleMovieDates(data)

    return vals;
}
async function getEmptySeats(dateAndLounge){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=UTF-8'},
        body: JSON.stringify(dateAndLounge)
    }
    var response = await fetch(BACKEND_LINK  + BACKEND_SEATS, requestOptions);
    var data = await response.json();
    var vals = []
    for (var i = 0; i<data.Row.length; i++){
        var seat;

        seat = data.Row[i] + data.SeatNumber[i]
        vals.push(seat)
    }
    return vals
}

async function handleBackendLounges(data){
    var vals = await data
    data = vals

    var lounges = [];
    for(var i = 0; i < data.length; i++){
        var lounge = {
            "loungeId" : ""
        }
        lounge.loungeId = data[i].loungeId

        lounges.push(lounge)
    }
    return lounges;
}
async function handleBackendMovies(data){
    var vals = await data
    data = vals

    var movies = [];
    for(var i = 0; i < data.length; i++){
        var movie = {
            "movieName" : ""
        }
        movie.movieName = data[i].movieName
        movies.push(movie)
    }

    return movies;

}
function handleMovieDates(data){
    var vals = data;
    data = vals;
    var dates = [];
    const err = "API calls quota exceeded! maximum admitted 1 per Second."
    if(data !== err){
    for(var i = 0; i < data.length; i++){
        
        var fullDate = data[i];
        var showingDate = {
            "date" : fullDate.substring(0,10),
            "time" : fullDate.substring(11,fullDate.length)
        }

        dates.push(showingDate)
    }
    return dates
}
    return dates
}
async function handleData(data) {
    var vals = await data.results
    data = vals
    var movies = []; // make array
    var movie = {
        "id" : "",
        "title" : "",
        "description" : "",
        "release_date" : "",
        "popularity" : "",
        "language" : "",
        "poster_path" : ""
    }

    for(var i = 0; i < data.length; i++){
        var movie = {
            "id" : "",
            "title" : "",
            "description" : "",
            "release_date" : "",
            "vote_average" : "",
            "popularity" : "",
            "language" : "",
            "poster_path" : ""
        }
        movie.id = data[i].id;
        movie.title = data[i].original_title;
        movie.description = data[i].overview;
        movie.release_date = data[i].release_date;
        movie.vote_average = data[i].vote_average;
        movie.popularity = data[i].popularity;
        movie.language = data[i].original_language;
        movie.poster_path = data[i].poster_path;
        movies.push(movie)
    }
    return movies;
}

async function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json; charset=UTF-8'}
    };
        var response = await fetch(`https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2019-07-15&primary_release_date.lte=2019-10-31&api_key=485fee96bd9bd1e10302361fd8fb10cc`);
        var data = await response.json();
        
        

    return fetch(`https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2019-07-15&primary_release_date.lte=2019-10-31&api_key=485fee96bd9bd1e10302361fd8fb10cc`);
}

async function getNewPopMovies(){
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json; charset=UTF-8'}
    };
    var response = await fetch(`https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2019-07-15&primary_release_date.lte=2019-10-31&api_key=485fee96bd9bd1e10302361fd8fb10cc`);
    var data = await response.json();
    if(data!== null){
        data = data.results;
    }
    return data;
}
