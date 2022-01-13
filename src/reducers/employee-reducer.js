//Reducer will communicate and change the state value. 
import * as ActionTypes from '../actions/actions-types'

const initialState = {
    employees: [
        // { LocationID: 'Mum', Name: 'Nikhil EV', Age: 31, Designation: 'Manager', Department: 'MSTC', Location: 'Mumbai', EmpCode: 'EMP1' },
        // { LocationID: 'AMB', Name: 'Arun Lal', Age: 33, Designation: 'Deputy Manager', Department: 'HR', Location: 'Ambernath', EmpCode: 'EMP2' },
        // { LocationID: 'del', Name: 'Arun Lal', Age: 33, Designation: 'Deputy Manager', Department: 'HR', Location: 'Ambernath', EmpCode: 'EMP3' }
    ],
    employee:undefined
}

function employeeReducer(state = initialState, action) {
    const { type, payload } = action

    switch (type) {
        case ActionTypes.GET_EMPLOYEES:
            return {...state,employees:payload};
        case ActionTypes.GET_EMPLOYEE:
                return {...state,employee:payload};
        case ActionTypes.ADD_EMPLOYEE:
            return { ...state, employees: [...state.employees, payload] };

        case ActionTypes.DELETE_EMPLOYEE:
            console.log(payload);
            console.log(state.employees);
            let dItem = state.employees.find(item => item.LocationID == payload.locId && item.EmpCode == payload.eCode);
            console.log(dItem);
           return { ...state, employees: state.employees.filter((item)=> dItem!=item) };
        default:
            return state;
    }

    // switch (action.type) {
    //     case ActionTypes.GET_EMPLOYEES:
    //         //Need to be replaced. Because it will replace all members of state if using 'state = action.payload'
    //         return state = { ...state, employees: action.payload }
    //     default:
    //         return state;

    // }
}

export default employeeReducer;