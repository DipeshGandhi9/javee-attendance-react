import Cookies from 'universal-cookie';

import { API_URL, LOAD_DASHBOARD } from '../store/constants.js';

const cookies = new Cookies();
const token = "Bearer " + cookies.get('token');

export const loadDashBoard = (date) => dispach => {

    fetch(API_URL + 'api/dashboard/', {
        method: 'POST',  headers: { 'Content-Type': 'application/json', 'Authorization': token },
        body: JSON.stringify(date)
    })
        .then(response => response.json())
        .then(json => {
            dispach({
                type: LOAD_DASHBOARD,
                payload: json
            });
        })
        .catch(eror => {
            dispach({
                type: LOAD_DASHBOARD,
                payload: []
            });
        });
}

