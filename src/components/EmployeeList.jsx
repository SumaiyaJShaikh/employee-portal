import React, { useContext } from "react"
import { Table } from "react-bootstrap";
import { EmployeeContext } from "./Home";
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom'
import { Trash } from 'react-bootstrap-icons';
import {bindActionCreators} from "redux";
import {deleteEmployee} from '../actions/action-creators'
import {connect} from "react-redux";

function EmployeeList({deleteEmployee}) {

    const { data } = useContext(EmployeeContext);

    function handleDelete(locId, eCode, e) {
        console.log(locId, eCode);
       // const{errors,employee}=this.state;
        //this.props.deleteEmployee(locId,eCode);
        if(window.confirm('Do u want to delete this employee')){
        deleteEmployee(locId,eCode);
        }
    }
    return (
        <React.Fragment>
            <Link to="/employees/create" className="btn btn-success">Add Employee</Link>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Location ID</th>
                        <th>Emp. Code</th>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Designation</th>
                        <th>Department</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.LocationID}</td>
                                    <td>{item.EmpCode}</td>
                                    <td>{item.Name}</td>
                                    <td>{item.Location}</td>
                                    <td>{item.Designation}</td>
                                    <td>{item.Department}</td>
                                    <td>
                                        <Link to={`/employees/Loc/${item.LocationID}/ecode/${item.EmpCode}`}>Details</Link>
                                    </td>
                                    <td><Trash className="trash-style" onClick={(e) => handleDelete(item.LocationID, item.EmpCode, e)}></Trash></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </React.Fragment>
    );
}

function mapDispatchToProps(dispatch){
    let actionMap={
        deleteEmployee
    }
    return bindActionCreators(actionMap,dispatch);

}


export default connect(null,mapDispatchToProps)(EmployeeList);