import Cookies from 'universal-cookie';

import { API_URL, GET_ALL_ATTENDANCE, ADD_TIMEIN_ATTENDANCE, ADD_TIMEOUT_ATTENDANCE, UPDATE_ATTENDANCE, GET_FILTER_ATTENDANCE } from '../store/constants.js';

const cookies = new Cookies();
const token = "Bearer " + cookies.get('token');

export const loadAttendance = () => dispach => {

  fetch(API_URL + 'api/attendance/', { method: 'GET', headers: { "Authorization": token } })
    .then(response => response.json())
    .then(json => {
      dispach({
        type: GET_ALL_ATTENDANCE,
        payload: json
      });
    })
    .catch(eror => {
      window.open("/", "_SELF");
      dispach({
        type: GET_ALL_ATTENDANCE,
        payload: []
      });
    });
}

export const addTimeInAttendance = (attendance) => dispach => {

  fetch(API_URL + 'api/attendance/timein/' + attendance.employee.id, {
    method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': token },
    body: JSON.stringify(attendance)
  })
    .then(response => response.json())
    .then(json => {
      dispach({
        type: ADD_TIMEIN_ATTENDANCE,
        payload: attendance
      });
    })
    .catch(eror => {
      dispach({
        type: ADD_TIMEIN_ATTENDANCE,
        payload: {}
      });
    });
}

export const addTimeOutAttendance = (attendance) => dispach => {

  fetch(API_URL + 'api/attendance/timeout/' + attendance.employee.id, {
    method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': token },
    body: JSON.stringify(attendance)
  })
    .then(response => response.json())
    .then(json => {
      dispach({
        type: ADD_TIMEOUT_ATTENDANCE,
        payload: attendance
      });
    })
    .catch(eror => {
      dispach({
        type: ADD_TIMEOUT_ATTENDANCE,
        payload: {}
      });
    });
}

export const updateAttendance = (attendance, cb) => dispach => {

  fetch(API_URL + 'api/attendance/' + attendance.employee.id, {
    method: 'PUT', body: JSON.stringify(attendance),
    headers: { 'Content-Type': 'application/json', "Authorization": token }, credentials: 'same-origin'
  })
    .then(response => response.json())
    .then(json => {
      dispach({
        type: UPDATE_ATTENDANCE,
        payload: attendance
      });
      if (typeof cb === "function") {
        cb();
      }
    })
    .catch(eror => {
      dispach({
        type: UPDATE_ATTENDANCE,
        payload: []
      });
      if (typeof cb === "function") {
        cb(eror);
      }
    });
}

export const loadFilterAttendance = (attendance) => dispach => {

  fetch(API_URL + "api/attendance/filter", {
    method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': token },
    body: JSON.stringify(attendance)
  })
    .then(response => response.json())
    .then(json => {
      dispach({
        type: GET_FILTER_ATTENDANCE,
        payload: json
      });
    })
    .catch(eror => {
      dispach({
        type: GET_FILTER_ATTENDANCE,
        payload: []
      });
    });
}

