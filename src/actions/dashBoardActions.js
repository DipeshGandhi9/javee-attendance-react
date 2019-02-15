import Cookies from 'universal-cookie';

import { API_URL, TOTAL_EMPLOYEES, PRESENT_EMPLOYEES_LIST, PRESENT_EMPLOYEES, LEAVE_EMPLOYEES } from '../store/constants.js';

const cookies = new Cookies();
const token = "Bearer " + cookies.get('token');

export const getTotalEmployee = () => dispach => {

    fetch(API_URL + 'api/totalEmployees', { method: 'GET', headers: { "Authorization": token } })
        .then(response => response.json())
        .then(total => {
            dispach({
                type: TOTAL_EMPLOYEES,
                payload: total
            });
        })
        .catch(eror => {
            dispach({
                type: TOTAL_EMPLOYEES,
                payload: null
            });
        });
}

export const getPresentEmployeeList = (date) => dispach => {

    fetch(API_URL + `api/dashboard/presentEmployees/{date}?date=${date}`, { method: 'GET', headers: { "Authorization": token } })
        .then(response => response.json())
        .then(json => {
            dispach({
                type: PRESENT_EMPLOYEES_LIST,
                payload: json
            });
        })
        .catch(eror => {
            dispach({
                type: PRESENT_EMPLOYEES_LIST,
                payload: []
            });
        });
}

export const getPresentEmployee = (date) => dispach => {

    fetch(API_URL + `api/dashboard/presentCount/{date}?date=${date}`,
        { method: 'GET', headers: { "Authorization": token } })
        .then(response => response.json())
        .then(total => {
            dispach({
                type: PRESENT_EMPLOYEES,
                payload: total
            });
        })
        .catch(eror => {
            dispach({
                type: PRESENT_EMPLOYEES,
                payload: null
            });
        });
}

export const getLeaveEmployee = (date) => dispach => {

    fetch(API_URL + `api/dashboard/leaveCount/{date}?date=${date}`,
        { method: 'GET', headers: { "Authorization": token } })
        .then(response => response.json())
        .then(total => {
            dispach({
                type: LEAVE_EMPLOYEES,
                payload: total
            });
        })
        .catch(eror => {
            dispach({
                type: LEAVE_EMPLOYEES,
                payload: null
            });
        });
}
