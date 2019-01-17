import * as types from './constants';

const initialState = {
    employee: {},
    employees: [],
    employeeTaleHeaders: {
        'id' : "Sr No.",
        'firstName': 'First Name',
        'lastName': 'Last Name',
        'address': 'Address',
        'gender': 'Gender',
        'email': 'Email',
        'contact': 'Phone Number',
        'edit': 'Edit',
        'delete': 'Delete'
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_EMPLOYEE:
            return {
                ...state,
                employee: action.payload,
            };
        case types.FETCH_EMPLOYEES:
            return {
                ...state,
                employees: action.payload,
            };
        case types.REMOVE_FETCH_EMPLOYEE:
        return {
            ...state,
            employees: state.employees.filter(employee =>
                employee.id !== action.payload)
            };
        case types.UPDATE_FETCH_EMPLOYEE:
        return {
            ...state,
            employees: state.employees.map(employee =>{
                if(employee.id === parseInt(action.payload.id,10)){
                 employee = action.payload
                }
                return employee;
            })
        };
        default:
            return state;
    }
};

export default reducer;
