import Cookies from 'universal-cookie';

import {API_URL, GET_ALL_ATTENDANCE ,ADD_ATTENDANCE} from '../store/constants.js';

const cookies = new Cookies();

const token = "Bearer " + cookies.get('token');
console.log(token);

export const loadAttendanceInfo = () => dispach => {
    fetch(API_URL + 'api/attendance/', { method: 'GET' , headers: { "Authorization": token }})
      .then(response => response.json())
      .then(json => {
        console.log(json);
        dispach({
          type: GET_ALL_ATTENDANCE,
          payload: json
        });
      })
      .catch(eror => {
        dispach({
          type: GET_ALL_ATTENDANCE,
          payload: []
        });
      });
  }

  export const addAttendanceInfo = (attendance) => dispach => {
    fetch(API_URL + 'api/attendance/', {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': token },
      body: JSON.stringify(attendance)
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
        dispach({
          type: ADD_ATTENDANCE,
          payload: json
        }); 
      })
      .catch(eror => {
        dispach({
          type: ADD_ATTENDANCE,
          payload: {}
        });
      });
  }