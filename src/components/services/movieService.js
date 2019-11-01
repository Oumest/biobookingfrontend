
import { authHeader } from '../../helpers/authHeader';
import { async } from 'q';
import{URL_LIST, API_KEY} from '../../helpers/const';

export const movieService={
    getcurrentPop
};

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
async function handleData(data) {
    var vals = await data.results
    data = vals
    console.log(data)
    var movies = []; // make array
    console.log("done")
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
        console.log(data.results)
        for( var i = 0; i< data.results.length -1; i++){
            console.log(data.results[i].original_title)
        }

    return fetch(`https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2019-07-15&primary_release_date.lte=2019-10-31&api_key=485fee96bd9bd1e10302361fd8fb10cc`).then(response=> console.log(response.json));
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
