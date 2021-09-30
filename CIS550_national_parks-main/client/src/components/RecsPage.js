import React, { useState } from 'react';
import TrailsPageComponent from './TrailsPageComponent';
import Park from './Park';
import {
    Button,
    FormGroup,
    Label,
    Input,
    FormText,
    Form,
    Jumbotron,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    NavItem,
    NavLink
  } from 'reactstrap';
  import '../App.css';
  import '../style/RecsPage.css';

  import Dropdown from 'react-bootstrap/Dropdown';



export default class RecsPage extends React.Component{

    constructor(props) {
		super(props);

        this.state = {
            parks : [],
            current_state: "Select",
            current_visit: "Select",
            current_tpa: "Select",
            current_activity: "Select",
            current_animal: "Select",
            current_endangered: "Select",
            park_results : [],

            park_att_acreage: "Acreage",
            current_park : "National Park",
            current_max_dif : "Max Difficulty",
            current_max_elev_gain : "Max Elevation Gain",
            current_max_dist : "Max Distance",
            currernt_min_rating : "Min Rating",
            trails : []

        }
    }

    //state
    handleClickState = (e) => {
        if(e.target.innerHTML == 'Reset'){
            this.setState({
                current_state : "Select"
            }, () => {
            })
        } else {
            this.setState({
                current_state : e.target.innerHTML
            }, () => {
            })
        }
    }

    //Avg Annual Visitors
    handleClickVisit = (e) => {
        if(e.target.innerHTML == 'Reset'){
            this.setState({
                current_visit : "Select"
            }, () => {
            })
        } else {
            this.setState({
                current_visit : e.target.innerHTML
            }, () => {
            })
        }
    }
    //trails per acre
    handleClickTPA = (e) => {
        if(e.target.innerHTML == 'Reset'){
            this.setState({
                current_tpa : "Select"
            }, () => {
            })
        } else {
            this.setState({
                current_tpa : e.target.innerHTML
            }, () => {
            })
        }
    }

    //Activities
    handleClickActivity = (e) => {
        console.log('this is: ', e.target.innerHTML);
        if(e.target.innerHTML == 'Reset'){
            this.setState({
                current_activity : 'Select'
            }, () => {
            })
        } else {
            this.setState({
                current_activity : e.target.innerHTML
            }, () => {
            })
        }
    }

    handleAnimalNameChange = (e) => {
        console.log('this is: ', e.target.value);
        if(e.target.value == ''){
            this.setState({
                current_animal : 'Select'
            }, () => {
            })
        } else {
            this.setState({
                current_animal : e.target.value
            }, () => {
            })
        }
    }

    handleClickReset = (e) => {
        console.log('this is: ', e.target.value);

        this.setState({
            parks : [],
            current_state: "Select",
            current_visit: "Select",
            current_tpa: "Select",
            current_activity: "Select",
            current_animal: "Select",
            current_endangered: "Select",
            park_results : [],
        }, () => {
            this.query_recs();
        })
    }

    handleClickPark = (e) => {
        if(e.target.innerHTML == 'Reset'){
            this.setState({
                current_park : "National Park"
            }, () => {
                this.query_trails();
            })
        } else {
            this.setState({
                current_park : e.target.innerHTML
            }, () => {
                this.query_trails();
            })
        }
    }

    submitSearch = (e) => {
        console.log("submitSearch()");
        this.query_recs();
    }

    componentDidMount() {
        this.query_recs();

    }

    query_recs(){
        var recs_query = "http://localhost:8081/recs/";
        recs_query += this.state.current_state.replace(/ /g,"_") + '/';
        recs_query += this.state.current_visit.replace(/ /g,"_") + '/';
        recs_query += this.state.current_tpa.replace(/ /g,"_") + '/';
        recs_query += this.state.current_activity.replace(/ /g,"_") + '/';
        recs_query += this.state.current_animal.replace(/ /g,"_");

        console.log('query_recs(): ' + recs_query);
        fetch(recs_query, {
                    method: "GET"
                }).then(res => {
                    return res.json();
                }, err => {
                    console.log(err);
                }).then(parkList => { 
                    console.log(parkList)
                    let allParks = parkList.map((park, i) =>
                        <div className="park-result" title="title">
                            <a href={'/park/' + park.Code} target="_self">
                                {park.Park_Name}
                            </a>
			            </div>
                    );
                    this.setState({
                        park_results : allParks
                    });
                });
    
    }

    render() {

        return(
            <div class = "MacroDiv">
                <Jumbotron className="jumbotron-recs">
                    <h1 class="recs-header">National Park Explorer</h1>
                    <h6 class="recs-header">Input your preferences to find the best National Park to visit!</h6>
                    <br/>

                    <div class = "PreferencesContainer">
                        <h6 class="recs-header">State</h6>
                            <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                {this.state.current_state}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={(e) => this.handleClickState(e)}>AL</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickState(e)}>AK</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickState(e)}>AZ</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickState(e)}>AR</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickState(e)}>CA</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickState(e)}>CO</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickState(e)}>CT</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickState(e)}>DE</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickState(e)}>FL</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickState(e)}>GA</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickState(e)}>HI</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickState(e)}>ID</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickState(e)}>IL</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickState(e)}>IN</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickState(e)}>IA</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickState(e)}>KS</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickState(e)}>KY</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickState(e)}>LA</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickState(e)}>ME</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickState(e)}>MD</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickState(e)}>MA</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickState(e)}>MI</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickState(e)}>MN</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickState(e)}>MS</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickState(e)}>MO</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickState(e)}>MT</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickState(e)}>NE</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickState(e)}>NV</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickState(e)}>NH</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickState(e)}>NJ</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickState(e)}>NM</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickState(e)}>NY</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickState(e)}>NC</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickState(e)}>ND</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickState(e)}>OH</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickState(e)}>OK</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickState(e)}>OR</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickState(e)}>PA</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickState(e)}>RI</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickState(e)}>SC</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickState(e)}>SD</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickState(e)}>TN</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickState(e)}>TX</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickState(e)}>UT</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickState(e)}>VT</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickState(e)}>VA</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickState(e)}>WA</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickState(e)}>WV</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickState(e)}>WI</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickState(e)}>WY</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item onClick={(e) => this.handleClickState(e)}>Reset</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <br/>

                        <h6 class="recs-header">Min Average Annual Visitors</h6>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                {this.state.current_visit}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={(e) => this.handleClickVisit(e)}>0</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickVisit(e)}>10000</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickVisit(e)}>100000</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickVisit(e)}>500000</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickVisit(e)}>1000000</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickVisit(e)}>2000000</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item onClick={(e) => this.handleClickVisit(e)}>Reset</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                        <br/>
                        <h6 class="recs-header">Min Trails per 10,000 Acres</h6>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                {this.state.current_tpa}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={(e) => this.handleClickTPA(e)}>0</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickTPA(e)}>1</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickTPA(e)}>2</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickTPA(e)}>5</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickTPA(e)}>10</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickTPA(e)}>25</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickTPA(e)}>50</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item onClick={(e) => this.handleClickTPA(e)}>Reset</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                        <br/>
                        <h6 class="recs-header">Activities</h6>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                {this.state.current_activity}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={(e) => this.handleClickActivity(e)}>backpacking</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickActivity(e)}>bike-touring</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickActivity(e)}>birding</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickActivity(e)}>camping</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickActivity(e)}>cross-county-skiing</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickActivity(e)}>fishing</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickActivity(e)}>fly-fishing</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickActivity(e)}>hiking</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickActivity(e)}>horseback-riding</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickActivity(e)}>ice-climbing</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickActivity(e)}>mountain-biking</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickActivity(e)}>nature-trips</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickActivity(e)}>off-road-driving</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickActivity(e)}>paddle-sports</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickActivity(e)}>road-biking</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickActivity(e)}>rock-climbing</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickActivity(e)}>scenic-driving</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickActivity(e)}>sea-kayaking</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickActivity(e)}>skiing</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickActivity(e)}>snowboarding</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickActivity(e)}>surfing</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickActivity(e)}>walking</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickActivity(e)}>whitewater-kayaking</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item onClick={(e) => this.handleClickActivity(e)}>Reset</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                        <br/>
                        <h6 class="recs-header">Animals or Plants</h6>
                        <div>
                            <input type='text' placeholder={this.state.current_animal} onChange={this.handleAnimalNameChange} 
                            id="movieName" className="movie-input"/>
                        </div>
                            
                        <br/>
                        <div className="flex-dropdown">
                            <button className="submit-btn" id="decadesSubmitBtn" onClick={this.submitSearch}>Submit</button>
                            <button className="reset-btn" id="decadesSubmitBtn" onClick={this.handleClickReset}>Reset</button>
                        </div>
                    </div>
                </Jumbotron>

                <div className="recs-results">
                    {this.state.park_results}
                </div>
            </div>

        )}

}