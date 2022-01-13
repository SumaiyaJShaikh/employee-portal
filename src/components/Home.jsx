import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { getEmployees } from "../services/employee-services";
import EmployeeList from "./EmployeeList";
import SearchBar from "./SearchBar";


export const EmployeeContext = React.createContext();

class Home extends Component {

    constructor(props) {
        super(props);
        // console.log(props);
        this.state = {
            employees: props.employees,
            filteredResult: props.employees
        }

        this.handleSearch = this.handleSearch.bind(this);
    }

    static getDerivedStateFromProps(newProps,oldstate){
        if(newProps.employees.length!=oldstate.employees.length){
        console.log("props changed",newProps);
        return{
            employees:newProps.employees,
            filteredResult:newProps.employees
       }
    }
    }

    async componentDidMount() {
        // let employees = await getEmployees()
        //     .catch(err => console.log("Error in fetching Data"))

        // this.setState({ employees, filteredResult: employees });


    }

    handleSearch(searchText) {
        console.log(this.state.employees);

        if (searchText && searchText.length > 0) {
            searchText = searchText.toUpperCase();
            let searchResult = this.state.employees.filter((item) => item.Name.toUpperCase().indexOf(searchText) >= 0 || item.Location.toUpperCase().indexOf(searchText) >= 0);
            this.setState({ filteredResult: searchResult });
        }
        else {
            this.setState({ filteredResult: this.state.employees });
        }

    }

    render() {
        return <EmployeeContext.Provider value={{ employees: this.state.employees, data: this.state.filteredResult, doSearch: this.handleSearch }}>
            <Container>
                <Row>
                    <Col>
                        <h2>Home</h2>
                        <SearchBar />
                        <EmployeeList />
                    </Col>
                </Row>
            </Container>
        </EmployeeContext.Provider>
    }
}

function mapStateToProps(globalState){
    //Property of component:AppReduxState.reducerMapperName
    return{
        employees: globalState.employeeState.employees
    }    
}

// function mapDispatchToProps(dispatch){

// }

// //Redux functionality, to connect react with redux
// //1)
// export default connect(mapStateToProps)(Home);

//2)
let connector = connect(mapStateToProps);
export default connector(Home);
