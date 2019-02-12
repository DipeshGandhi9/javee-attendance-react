import * as types from './constants';

const initialState = {
    userList: [],
    newUsers: [],
    user: {},
    userTaleHeaders: {
        'id': "Id",
        "employeeName": "Employee Name",
        "userName": "User Name",
        "role": "Role",
        "department": "Department",
        'edit': 'Edit',
        'delete': 'Delete'
    },
    employee: {},
    employees: [],
    employeeTaleHeaders: {
        'id': "Sr No.",
        'firstName': 'First Name',
        'lastName': 'Last Name',
        'address': 'Address',
        'gender': 'Gender',
        'email': 'Email',
        'contact': 'Phone Number',
        'edit': 'Edit',
        'delete': 'Delete'
    },
    attendance: {},
    attendances: [],
    attendancesHeaders: {
        'date': 'Date',
        'employeeName': 'Employee Name',
        'timeIn': 'Time In',
        'timeOut': 'Time Out'
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        //--Employee--//
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
                employees: state.employees.map(employee => {
                    if (employee.id === parseInt(action.payload.id, 10)) {
                        employee = action.payload
                    }
                    return employee;
                })
            };

        //--User--//
        case types.FETCH_USERS:
            return {
                ...state,
                userList: action.payload,
            };
        case types.FETCH_USER:
            return {
                ...state,
                user: action.payload,
            };
        case types.FETCH_NEW_USERS:
            return {
                ...state,
                newUsers: action.payload,
            };
        case types.REMOVE_FETCH_USER:
            return {
                ...state,
                userList: state.userList.filter(user =>
                    user.id !== action.payload)
            };
        case types.UPDATE_FETCH_USER:
            return {
                ...state,
                userList: state.userList.map(user => {
                    if (user.id === parseInt(action.payload.id, 10)) {
                        user = action.payload
                    }
                    return user;
                })
            };


        //--Attendance--//  
        case types.GET_ALL_ATTENDANCE:
            return {
                ...state,
                attendances: action.payload,
            };
        case types.ADD_TIMEOUT_ATTENDANCE:
            return {
                ...state,
                attendance: action.payload,
            };
        case types.ADD_TIMEIN_ATTENDANCE:
            return {
                ...state,
                attendance: action.payload,
            };
        case types.UPDATE_ATTENDANCE:
            return {
                ...state,
                attendances: state.attendances.map(attendance => {
                    if (attendance.id === parseInt(action.payload.id, 10)) {
                        attendance = action.payload
                    }
                    return attendance;
                })
            };

        default:
            return state;
    }
};

export default reducer;
