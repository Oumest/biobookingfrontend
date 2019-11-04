
import { authHeader } from '../../helpers/authHeader';
import { async } from 'q';
import {BACKEND_LOG, BACKEND_REG, BACKEND_LINK} from '../../helpers/const'

export const userService={
    login,
    logout,
    register,
    getAll
};

async function register(username, password, phoneNumber, email){
    const data = {
        "email" : email,
        "AccountName" : username,
        "AccountPassword" : password,
        "PhoneNumber" : phoneNumber
    }
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json; charset=UTF-8'},
        body: JSON.stringify(data)
    }
    var response = await fetch(BACKEND_LINK + BACKEND_REG, requestOptions).then(handleReg).then(setTimeout(function(){login(username, password)}, 1000))
    
    return response;
}

function login(username, password){
    const data = {
        "AccountName" : username,
        "AccountPassword" : password
    }
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        body: JSON.stringify(data)
    };
    return fetch(BACKEND_LINK + BACKEND_LOG, requestOptions)
        .then(handleResponse)
        .then(user => {
            // login successful if there's a user in the response
            if (user) {
                var token = user
                // store user details and basic auth credentials in local storage 
                // to keep user logged in between page refreshes
                var user = {"username" : username, "password" : password, "token" : user}
                localStorage.setItem('user', JSON.stringify(user));

            }

            window.location.reload(true);
            return user;
        });
}
function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    window.location.reload(true)
}

async function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json; charset=UTF-8'}
    };
        var response = await fetch(`https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2019-07-15&primary_release_date.lte=2019-10-31&api_key=485fee96bd9bd1e10302361fd8fb10cc`);
        var data = await response.json();

        for( var i = 0; i< data.results.length -1; i++){
            console.log(data.results[i].original_title)
        }

    return fetch(`https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2019-07-15&primary_release_date.lte=2019-10-31&api_key=485fee96bd9bd1e10302361fd8fb10cc`).then(response=> console.log(response.json));
}

function handleReg(response){
    return response.text().then(text => {
        var data = text;
        if (!response.ok){
            console.log("user already exists")
        }
        else if(response.ok){
            console.log("created successfully...")
        }
    });

}

function handleResponse(response) {
    
    const regResp = "There is already an account with that name!"
    console.log(response)
    return response.text().then(text => {
        var data = text;
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                console.log(response)
                console.log("bad info");
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        else if(data === regResp){
            console.log("user already exists")
        }
        else if(response.ok){
            if(response.status === 200){
                if(data === regResp){
                    console.log("already exists")
                }
                if(data){
                    return data
                }
                // handle user token here. Now response.text() returns nothing, thus handling with response code
            }
        }

        return data;
    });
}