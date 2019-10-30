
import { authHeader } from '../../helpers/authHeader';

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
    var response = await fetch(`http://localhost:50610/register`, requestOptions).then(handleResponse).then(login(username, password))
    return response;/// still getting Enter a valid email error...
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
    return fetch(`http://localhost:50610/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // login successful if there's a user in the response
            if (user) {
                // store user details and basic auth credentials in local storage 
                // to keep user logged in between page refreshes
                user.username = username;
                user.password = password;
                user.authdata = window.btoa(username + ':' + password);
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
        var response = await fetch(`http://localhost:50610/api/useraccounts`);
        var data = await response.json();

    return fetch(`http://localhost:50610/api/useraccounts`).then(response=> console.log(response.json));
}

function handleResponse(response) {
    const regResp = "There is already an account with that name!"
    return response.text().then(text => {
        var data = text;
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
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
                // handle user token here. Now response.text() returns nothing, thus handling with response code
                data = {authdata : ""}
            }
        }

        return data;
    });
}