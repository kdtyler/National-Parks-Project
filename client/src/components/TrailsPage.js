import React, { useState } from 'react';
import TrailsPageComponent from './TrailsPageComponent';
import {
    //Collapse,
   // Navbar,
   // NavbarToggler,
    //NavbarBrand,
    //Nav,
    ///NavItem,
    //NavLink,
    //UncontrolledDropdown,
    //Dropdown,
    //DropdownToggle,
    //DropdownMenu,
    //DropdownItem,
    Jumbotron,
    Media
  } from 'reactstrap';
  import '../App.css';

  import Dropdown from 'react-bootstrap/Dropdown';



export default class TrailsPage extends React.Component{

    constructor(props) {
		super(props);

        this.state = {
            parks : [],
            current_park : "National Park",
            current_max_dif : "Max Difficulty",
            current_max_elev_gain : "Max Elevation Gain",
            current_max_dist : "Max Distance",
            currernt_min_rating : "Min Rating",
            trails : []
        }
    }

    handleClickPark = (e) => {
        //console.log('this is: ', e.target.innerHTML);
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

    handleClickDiff = (e) => {
        //console.log('this is: ', e.target.innerHTML);
        if(e.target.innerHTML == 'Reset'){
            this.setState({
                current_max_dif : "Max Difficulty"
            }, () => {
                this.query_trails();
            })
        } else {
            this.setState({
                current_max_dif : e.target.innerHTML
            }, () => {
                this.query_trails();
            })
        }
    }

    handleClickDist = (e) => {
        //console.log('this is: ', e.target.innerHTML);
        if(e.target.innerHTML == 'Reset'){
            this.setState({
                current_max_dist : "Max Distance"
            }, () => {
                this.query_trails();
            })
        } else {
            this.setState({
                current_max_dist : e.target.innerHTML
            }, () => {
                this.query_trails();
            })
        }
    }

    handleClickElev = (e) => {
        //console.log('this is: ', e.target.innerHTML);
        if(e.target.innerHTML == 'Reset'){
            this.setState({
                current_max_elev_gain : "Max Elevation Gain"
            }, () => {
                this.query_trails();
            })
        } else {
            this.setState({
                current_max_elev_gain : e.target.innerHTML
            }, () => {
                this.query_trails();
            })
        }

        
    }

    handleClickRate = (e) => {
        //console.log('this is: ', e.target.innerHTML);
        if(e.target.innerHTML == 'Reset'){
            this.setState({
                currernt_min_rating: "Min Rating"
            }, () => {
                this.query_trails();
            })
        } else {
            this.setState({
                currernt_min_rating : e.target.innerHTML
            }, () => {
                this.query_trails();
            })
        }

    }


    componentDidMount() {

        let park_query = "http://localhost:8081/parksNames";

        fetch(park_query, {
			method: "GET"
		}).then(res => {
			return res.json();
		}, err => {
			console.log(err);
		}).then(parkList => { //friendsList is res.json()
            let allParks = parkList.map((park, i) =>
                <Dropdown.Item onClick={(e) => this.handleClickPark(e)}>{park.Park_Name}</Dropdown.Item>
            );
            this.setState({
                parks : allParks,
            });
		});


        this.query_trails();

    }

    query_trails(){
        var trail_query = "http://localhost:8081/trails/";
        trail_query += this.state.current_park.replace(/ /g,"_") + '/';
        trail_query += this.state.current_max_dif.replace(/ /g,"_") + '/';
        trail_query += this.state.current_max_dist.replace(/ /g,"_") + '/';
        trail_query += this.state.current_max_elev_gain.replace(/ /g,"_") + '/';
        trail_query += this.state.currernt_min_rating.replace(/ /g,"_");

        fetch(trail_query, {
			method: "GET"
		}).then(res => {
			return res.json();
		}, err => {
			console.log(err);
		}).then(trailList => { //friendsList is res.json()
            console.log(trailList)
            let allTrails = trailList.map((trail, i) =>
                <TrailsPageComponent key = {trail.AllTrails_trail_id}
                                     park={trail.Park_Name}
                                     name={trail.name}
                                     city={trail.city_name}
                                     state={trail.state_name}
                                     populatiry={trail.populatrity}
                                     length={trail.length}
                                     elev={trail.elevation_gain}
                                     diff={trail.difficulty_rating}
                                     rate = {trail.avg_rating}
                                     lat={trail.latitude}
                                     long={trail.longitude}/>
            );
            this.setState({
                trails : allTrails
            });
		});

        
    }

    render() {

        return(
            <div>
                <Jumbotron className="jumbotron-trails-search">
                    <div className = "jumbotron-trails-search-filters">
                        <h1>Search for Trails</h1>
                        <p>Use the filters below to find your perfect trail!</p>
                        <p>Filter on National Park:</p>

                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                {this.state.current_park}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {this.state.parks}
                                <Dropdown.Divider />
                                <Dropdown.Item onClick={(e) => this.handleClickPark(e)}>Reset</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <p></p>
                    
                        <p>Filter on Max Difficulty</p>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                {this.state.current_max_dif}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={(e) => this.handleClickDiff(e)}>1</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickDiff(e)}>2</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickDiff(e)}>3</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickDiff(e)}>4</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickDiff(e)}>5</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item onClick={(e) => this.handleClickDiff(e)}>Reset</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <p></p>
                        <p>Filter on Max Distance (miles)</p>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                {this.state.current_max_dist}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={(e) => this.handleClickDist(e)}>1</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickDist(e)}>2</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickDist(e)}>3</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickDist(e)}>4</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickDist(e)}>5</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickDist(e)}>6</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickDist(e)}>7</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickDist(e)}>8</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickDist(e)}>9</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickDist(e)}>10</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickDist(e)}>15</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickDist(e)}>20</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item onClick={(e) => this.handleClickDist(e)}>Reset</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <p></p>
                        <p>Filter on Max Elevation Gain (feet)</p>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                {this.state.current_max_elev_gain}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={(e) => this.handleClickElev(e)}>500</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickElev(e)}>1000</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickElev(e)}>2000</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickElev(e)}>3000</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickElev(e)}>4000</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item onClick={(e) => this.handleClickElev(e)}>Reset</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                        <p></p>
                        <p>Filter on Min Rating</p>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                {this.state.currernt_min_rating}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={(e) => this.handleClickRate(e)}>1</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickRate(e)}>2</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickRate(e)}>3</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickRate(e)}>4</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleClickRate(e)}>5</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item onClick={(e) => this.handleClickRate(e)}>Reset</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </Jumbotron>
                
                <Media list className="container">
                    {this.state.trails}
                </Media>
            </div>

        )}

}