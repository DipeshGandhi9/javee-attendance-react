import { API_URL, FETCH_EMPLOYEE, FETCH_EMPLOYEES , REMOVE_FETCH_EMPLOYEE ,UPDATE_FETCH_EMPLOYEE} from '../src/store/constants.js';

export const loadEmployeeInfo = () => dispach => {
  fetch(API_URL + 'employees' , { method: 'GET' })
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

export const addEmployeeInfo = (employee,cb) => dispach => {
    fetch(API_URL + 'employee' , { method: 'POST',  headers: {'Content-Type':'application/json'}, 
    body: JSON.stringify(employee)})
      .then(response => response.json())
      .then(json => {
        dispach({
          type: FETCH_EMPLOYEE,
          payload: json
        });
      })
      .catch(eror => {
        dispach({
          type: FETCH_EMPLOYEE,
          payload: {}
        });
      });
  }

  export const deleteEmployeeInfo = id => dispach => {
    fetch(API_URL + 'employee/' + id , { method: 'DELETE' })
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

  export const updateEmployeeInfo =(employee) => dispach => {
    fetch(API_URL + 'employee/' + employee.id , { method: 'PUT'  , body : JSON.stringify(employee),
    headers: {'Content-Type': 'application/json'},credentials : 'same-origin'})
      .then(response => response)
      .then(json => {
        dispach({
          type: UPDATE_FETCH_EMPLOYEE,
          payload: employee
        });
      })
      .catch(eror => {
        dispach({
          type: UPDATE_FETCH_EMPLOYEE,
          payload: []
        });
      });
  }

  