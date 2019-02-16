import Cookies from 'universal-cookie';

import { API_URL, FETCH_ORGANIZATIONS, FETCH_ORGANIZATION, REMOVE_FETCH_ORGANIZATION, UPDATE_FETCH_ORGANIZATION } from '../store/constants.js';

const cookies = new Cookies();
const token = "Bearer " + cookies.get('token');

export const loadOrganizationInfo = () => dispach => {

  fetch(API_URL + 'api/organizations', { method: 'GET', headers: { "Authorization": token } })
    .then(response => response.json())
    .then(json => {
      dispach({
        type: FETCH_ORGANIZATIONS,
        payload: json
      });
    })
    .catch(eror => {
      window.open("/", "_SELF");
      dispach({
        type: FETCH_ORGANIZATIONS,
        payload: []
      });
    });
}

export const addOrganizationInfo = (organization, cb) => dispach => {

  fetch(API_URL + 'api/organization/', {
    method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': token },
    body: JSON.stringify(organization)
  })
    .then(response => response.json())
    .then(json => {
      dispach({
        type: FETCH_ORGANIZATION,
        payload: json
      });
      if (typeof cb === "function") {
        cb();
      }
    })
    .catch(eror => {
      dispach({
        type: FETCH_ORGANIZATION,
        payload: {}
      });
      if (typeof cb === "function") {
        cb(eror);
      }
    });
}

export const deleteOrganizationInfo = id => dispach => {

  fetch(API_URL + 'api/organization/' + id, { method: 'DELETE', headers: { "Authorization": token } })
    .then(response => response.json())
    .then(json => {
      dispach({
        type: REMOVE_FETCH_ORGANIZATION,
        payload: id
      });
    })
    .catch(eror => {
      dispach({
        type: REMOVE_FETCH_ORGANIZATION,
        payload: null
      });
    });
}

export const updateOrganizationInfo = (organization, cb) => dispach => {

  fetch(API_URL + 'api/organization/' + organization.id, {
    method: 'PUT', body: JSON.stringify(organization),
    headers: { 'Content-Type': 'application/json', "Authorization": token }, credentials: 'same-origin'
  })
    .then(response => response)
    .then(json => {
      dispach({
        type: UPDATE_FETCH_ORGANIZATION,
        payload: organization
      });
      if (typeof cb === "function") {
        cb();
      }
    })
    .catch(eror => {
      dispach({
        type: UPDATE_FETCH_ORGANIZATION,
        payload: []
      });
      if (typeof cb === "function") {
        cb(eror);
      }
    });
}