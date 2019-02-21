import Cookies from 'universal-cookie';
import jwt_decode from 'jwt-decode';

import { API_URL, FETCH_USERS, FETCH_USER, REMOVE_FETCH_USER, UPDATE_FETCH_USER } from '../store/constants.js';

const cookies = new Cookies();
const token = "Bearer " + cookies.get('token');

export const loadUserInfo = () => dispach => {

  fetch(API_URL + 'api/users/', { method: 'GET', headers: { "Authorization": token } })
    .then(response => response.json())
    .then(json => {
      dispach({
        type: FETCH_USERS,
        payload: json
      });
    })
    .catch(eror => {
     // window.open("/", "_SELF");
      dispach({
        type: FETCH_USERS,
        payload: []
      });
    });
}


export const addUserInfo = (user, cb) => dispach => {

  fetch(API_URL + 'api/user/', {
    method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': token },
    body: JSON.stringify(user)
  })
    .then(response => response.json())
    .then(json => {
      dispach({
        type: FETCH_USER,
        payload: json
      });
      if (typeof cb === "function") {
        cb();
      }
    })
    .catch(eror => {
      dispach({
        type: FETCH_USER,
        payload: {}
      });
      if (typeof cb === "function") {
        cb(eror);
      }
    });
}

export const deleteUserInfo = id => dispach => {

  fetch(API_URL + 'api/user/' + id, { method: 'DELETE', headers: { "Authorization": token } })
    .then(response => response)
    .then(json => {
      dispach({
        type: REMOVE_FETCH_USER,
        payload: id
      });
    })
    .catch(eror => {
      dispach({
        type: REMOVE_FETCH_USER,
        payload: null
      });
    });
}

export const updateUserInfo = (user, cb) => dispach => {

  fetch(API_URL + 'api/user/' + user.id, {
    method: 'PUT', body: JSON.stringify(user),
    headers: { 'Content-Type': 'application/json', "Authorization": token }, credentials: 'same-origin'
  })
    .then(response => response)
    .then(json => {
      dispach({
        type: UPDATE_FETCH_USER,
        payload: user
      });
      if (typeof cb === "function") {
        cb();
      }
    })
    .catch(eror => {
      dispach({
        type: UPDATE_FETCH_USER,
        payload: []
      });
      if (typeof cb === "function") {
        cb(eror);
      }
    });
}

export const authUser = (userName, password, cb) => dispach => {

  fetch(API_URL + 'authenticate', {
    method: 'POST', body: JSON.stringify({ userName, password }),
    headers: { 'Content-Type': 'application/json' }, credentials: 'same-origin'
  })
    .then(response => response.json())
    .then(json => {
      cookies.set('userName', userName);
      cookies.set('token', json.accessToken, { expires: new Date(Date.now() + 8.64e+7) });
      var decodeToken = jwt_decode(cookies.get('token'));
      cookies.set('role', decodeToken.role);
      if(decodeToken.role === "ADMIN"){
        if (typeof cb === "function") {
          cb();
        }
      }
      if (decodeToken.role === "EMPLOYEE") {
        fetch(API_URL + 'api/user/loggedin', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json', "Authorization": "Bearer " + json.accessToken }, credentials: 'same-origin'
        })
          .then(response => response.json())
          .then(json => {
            cookies.remove('employeeId');
            cookies.set('employeeId', json.employee.id);
            if (typeof cb === "function") {
              cb();
            }
          })
          .catch(eror => {
            if (typeof cb === "function") {
              cb(eror);
            }
          });
      }
    });
}
