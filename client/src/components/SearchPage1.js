import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/SearchPage.css';



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

export default class SearchPage1 extends React.Component {
	constructor(props) {
		super(props);

		// State maintained by this React component is the selected movie name,
		// and the list of recommended movies.
		this.state = {
			year: "Select Decade",
			recParks: []
		}

		this.handleParkNameChange = this.handleDecadeChange.bind(this);
		this.submitPark = this.submitPark.bind(this);
	}

	handleDecadeChange(e) {
		console.log('handleParkNameChange:' + e.target.innerHTML);
		this.setState({
			year: e.target.innerHTML
		});
	}

	/* ---- Q2 (Recommendations) ---- */
	// Hint: Name of movie submitted is contained in `this.state.movieName`.
	submitPark() {
		console.log("submitPark()");
		console.log("this.state.movieName: " + this.state.year);
		fetch("http://localhost:8081/search1/" + this.state.year,
		{
			method: "GET"
		}).then(res => {
			return res.json();
		}, err => {
			console.log(err);
		}).then(recsList => { //friendsList is res.json()
			console.log(recsList); //displays your JSON object in the console
			let recDivs = recsList.map((park, i) => 
				// <div className="header" title="title">
                // 	<h6>{park.unit_name}</h6>
				// 	<h6>{park.avg_visitors}</h6>
				// </div>
				<div className="header-container">
					<div className="headers">
						<div className="header">{park.unit_name}</div>
						<div className="header">{park.avg_visitors}</div>
					</div>
				</div>
			);

			//This saves our HTML representation of the data into the state, which we can call in our render function
			this.setState({
				recParks: recDivs
			});
		});
	}
	

	
	render() {

		return (
			<div className="SearchPage1">
			    <div className="container recommendations-container">
			    	<div className="jumbotron-year-top">
			    		<div className="h2">Top 10 Most Visited Parks Visitors By Decade</div>
			    		<br></br>
			    		<div className="input-container">
							<Dropdown>
								<Dropdown.Toggle variant="success" id="dropdown-basic">
									{this.state.year}
								</Dropdown.Toggle>
								<Dropdown.Menu>
									<Dropdown.Item onClick={(e) => this.handleDecadeChange(e)}>1900</Dropdown.Item>
									<Dropdown.Item onClick={(e) => this.handleDecadeChange(e)}>1910</Dropdown.Item>
									<Dropdown.Item onClick={(e) => this.handleDecadeChange(e)}>1920</Dropdown.Item>
									<Dropdown.Item onClick={(e) => this.handleDecadeChange(e)}>1930</Dropdown.Item>
									<Dropdown.Item onClick={(e) => this.handleDecadeChange(e)}>1940</Dropdown.Item>
									<Dropdown.Item onClick={(e) => this.handleDecadeChange(e)}>1950</Dropdown.Item>
									<Dropdown.Item onClick={(e) => this.handleDecadeChange(e)}>1960</Dropdown.Item>
									<Dropdown.Item onClick={(e) => this.handleDecadeChange(e)}>1970</Dropdown.Item>
									<Dropdown.Item onClick={(e) => this.handleDecadeChange(e)}>1980</Dropdown.Item>
									<Dropdown.Item onClick={(e) => this.handleDecadeChange(e)}>1990</Dropdown.Item>
									<Dropdown.Item onClick={(e) => this.handleDecadeChange(e)}>2000</Dropdown.Item>
									<Dropdown.Item onClick={(e) => this.handleDecadeChange(e)}>2010</Dropdown.Item>
									<Dropdown.Divider />
									<Dropdown.Item onClick={(e) => this.handleDecadeChange(e)}>Reset</Dropdown.Item>
								</Dropdown.Menu>
                        	</Dropdown>
			    			<button id="submitMovieBtn" className="submit-btn" 
                            onClick={this.submitPark}>Submit</button>
			    		</div>
					</div>
					<br/>
					<div className="header-container">
						<div className="headers">
							<div className="header"><strong>Park Name</strong></div>
							<div className="header"><strong>Average Visitors</strong></div>
						</div>
					</div>
					<div className="results-container" id="results">
						{this.state.recParks}
					</div>
			    </div>
		    </div>
		);
	}
}