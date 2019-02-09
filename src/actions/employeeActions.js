import Cookies from 'universal-cookie';

import { API_URL, FETCH_EMPLOYEE, FETCH_EMPLOYEES, REMOVE_FETCH_EMPLOYEE, UPDATE_FETCH_EMPLOYEE } from '../store/constants.js';

const cookies = new Cookies();
const token = "Bearer " + cookies.get('token');

export const loadEmployeeInfo = () => dispach => {
  fetch(API_URL + 'api/employees', { method: 'GET', headers: { "Authorization": token } })
    .then(response => response.json())
    .then(json => {
      dispach({
        type: FETCH_EMPLOYEES,
        payload: json
      });
    })
    .catch(eror => {
      dispach({
        type: FETCH_EMPLOYEES,
        payload: []
      });
    });
}

export const addEmployeeInfo = (employee, cb) => dispach => {
  fetch(API_URL + 'api/employee/', {
    method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': token },
    body: JSON.stringify(employee)
  })
    .then(response => response.json())
    .then(json => {
      dispach({
        type: FETCH_EMPLOYEE,
        payload: json
      });
      if (typeof cb === "function") {
        cb();
      }
    })
    .catch(eror => {
      dispach({
        type: FETCH_EMPLOYEE,
        payload: {}
      });
      if (typeof cb === "function") {
        cb(eror);
      }
    });
}

export const deleteEmployeeInfo = id => dispach => {
  fetch(API_URL + 'api/employee/' + id, { method: 'DELETE', headers: { "Authorization": token } })
    .then(response => response.json())
    .then(json => {
      dispach({
        type: REMOVE_FETCH_EMPLOYEE,
        payload: id
      });
    })
    .catch(eror => {
      dispach({
        type: REMOVE_FETCH_EMPLOYEE,
        payload: null
      });
    });
}

export const updateEmployeeInfo = (employee, cb) => dispach => {
  fetch(API_URL + 'api/employee/' + employee.id, {
    method: 'PUT', body: JSON.stringify(employee),
    headers: { 'Content-Type': 'application/json', "Authorization": token }, credentials: 'same-origin'
  })
    .then(response => response)
    .then(json => {
      dispach({
        type: UPDATE_FETCH_EMPLOYEE,
        payload: employee
      });
      if (typeof cb === "function") {
        cb();
      }
    })
    .catch(eror => {
      dispach({
        type: UPDATE_FETCH_EMPLOYEE,
        payload: []
      });
      if (typeof cb === "function") {
        cb(eror);
      }
    });
}
