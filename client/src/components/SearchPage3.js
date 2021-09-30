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
    NavLink,
    // Table
  } from 'reactstrap';
import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import SearchPage3Row from './SearchPage3Row';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/SearchPage.css';
import '../App.css';
export default class SearchPage3 extends React.Component{

	constructor(props) {
		super(props);

		// State maintained by this React component is the selected movie name,
		// and the list of recommended movies.
		this.state = {
			parkName: "Select Park Name",
            animalClass: "Select Animal Category",
			recParks: []
		}

		this.handleParkNameChange = this.handleParkNameChange.bind(this);
        this.handleAnimalClassChange = this.handleAnimalClassChange.bind(this);
		this.submitPark = this.submitPark.bind(this);
	}

	handleParkNameChange(e) {
		console.log('handleParkNameChange:' + e.target.innerHTML);
        if(e.target.innerHTML == 'Reset'){
            this.setState({
                parkName: "Select Park Name"
            });
        } else {
		    this.setState({
			    parkName: e.target.innerHTML
		    });
        }
	}

    handleAnimalClassChange(e) {
        console.log('handleAnimalClassChange:' + e.target.innerHTML);
        if(e.target.innerHTML == 'Reset'){
            this.setState({
                animalClass: "Select Animal Category"
            });
        } else {
		    this.setState({
			    animalClass: e.target.innerHTML
		    });
        }
    }

    submitPark() {
		console.log("submitPark()");
		console.log("this.state.parkName: " + this.state.parkName);
        console.log("this.state.animalClass: " + this.state.animalClass);
		fetch("http://localhost:8081/parkSpecies/" + this.state.parkName + "/" + this.state.animalClass,
		{
			method: "GET"
		}).then(res => {
			return res.json();
		}, err => {
			console.log(err);
		}).then(recsList => { //friendsList is res.json()
			console.log(recsList); //displays your JSON object in the console
			let recDivs = recsList.map((rec, i) => 
				/*this must match matching CSS sheet*/
				<SearchPage3Row Species_Name={rec.Species_Name} />
			);

			//This saves our HTML representation of the data into the state, which we can call in our render function
			this.setState({
				recParks: recDivs
			});
		});
	}

    render() {
        return(
            <div className="SearchPage3">
                <div className="container species-container">
                    <div className="jumbotron-wildlife">
                    <br />
                    <h1 class="wildlife-header-1">Wildlife Explorer</h1>
                    <h6 class="wildlife-header-2">This displays all the animals of a certain class found in a given park.</h6>
                    <br />
                    <div className="wildlife-input-container">
                        <Dropdown>
							<Dropdown.Toggle variant="success" id="dropdown-basic">
								{this.state.parkName}
							</Dropdown.Toggle>
							<Dropdown.Menu>
								<Dropdown.Item onClick={(e) => this.handleParkNameChange(e)}>Acadia National Park</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleParkNameChange(e)}>Arches National Park</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleParkNameChange(e)}>Badlands National Park</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleParkNameChange(e)}>Big Bend National Park</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleParkNameChange(e)}>Biscayne National Park</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleParkNameChange(e)}>Black Canyon of the Gunnison National Park</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleParkNameChange(e)}>Bryce Canyon National Park</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleParkNameChange(e)}>Capitol Reef National Park</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleParkNameChange(e)}>Carlsbad Caverns National Park</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleParkNameChange(e)}>Channel Islands National Park</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleParkNameChange(e)}>Congaree National Park</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleParkNameChange(e)}>Crater Lake National Park</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleParkNameChange(e)}>Cuyahoga Valley National Park</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleParkNameChange(e)}>Death Valley National Park</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleParkNameChange(e)}>Denali National Park and Preserve</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleParkNameChange(e)}>Everglades National Park</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleParkNameChange(e)}>Gates Of The Arctic National Park and Preserve</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleParkNameChange(e)}>Gateway Arch National Park</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleParkNameChange(e)}>Glacier Bay National Park and Preserve</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleParkNameChange(e)}>Glacier National Park</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleParkNameChange(e)}>Grand Canyon National Park</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleParkNameChange(e)}>Grand Teton National Park</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleParkNameChange(e)}>Biscayne National Park</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleParkNameChange(e)}>Guadalupe Mountains National Park</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleParkNameChange(e)}>Hawaii Volcanoes National Park</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleParkNameChange(e)}>Indiana Dunes National Park</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleParkNameChange(e)}>Isle Royale National Park</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleParkNameChange(e)}>Joshua Tree National Park</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleParkNameChange(e)}>Katmai National Park and Preserve</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleParkNameChange(e)}>Kenai Fjords National Park</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleParkNameChange(e)}>Kobuk Valley National Park</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleParkNameChange(e)}>Lake Clark National Park and Preserve</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleParkNameChange(e)}>Lassen Volcanic National Park</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleParkNameChange(e)}>Mammoth Cave National Park</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleParkNameChange(e)}>Mesa Verde National Park</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleParkNameChange(e)}>Mount Rainier National Park</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleParkNameChange(e)}>North Cascades National Park</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleParkNameChange(e)}>Olympic National Park</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleParkNameChange(e)}>Petrified Forest National Park</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleParkNameChange(e)}>Pinnacles National Park</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleParkNameChange(e)}>Redwood National Park</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleParkNameChange(e)}>Rocky Mountain National Park</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleParkNameChange(e)}>Saguaro National Park</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleParkNameChange(e)}>Sequoia and Kings Canyon National Parks</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleParkNameChange(e)}>Shenandoah National Park</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleParkNameChange(e)}>Theodore Roosevelt National Park</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleParkNameChange(e)}>Voyageurs National Park</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleParkNameChange(e)}>Wind Cave National Park</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleParkNameChange(e)}>Wrangell - St Elias National Park and Preserve</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleParkNameChange(e)}>Yellowstone National Park</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleParkNameChange(e)}>Yosemite National Park</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleParkNameChange(e)}>Zion National Park</Dropdown.Item>
								<Dropdown.Divider />
								<Dropdown.Item onClick={(e) => this.handleParkNameChange(e)}>Reset</Dropdown.Item>
							</Dropdown.Menu>
                        </Dropdown>

                        <br />

                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                {this.state.animalClass}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={(e) => this.handleAnimalClassChange(e)}>Algae</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleAnimalClassChange(e)}>Amphibian</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleAnimalClassChange(e)}>Bird</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleAnimalClassChange(e)}>Crab/Lobster/Shrimp</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleAnimalClassChange(e)}>Fish</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleAnimalClassChange(e)}>Insect</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleAnimalClassChange(e)}>Invertebrate</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleAnimalClassChange(e)}>Mammal</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleAnimalClassChange(e)}>Reptile</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleAnimalClassChange(e)}>Slug/Snail</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleAnimalClassChange(e)}>Spider /Scorpion</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.handleAnimalClassChange(e)}>Vascular Plant</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item onClick={(e) => this.handleAnimalClassChange(e)}>Reset</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                        <br />

                        <button id="submitBtn" className="submit-btn" 
                        onClick={this.submitPark}>Submit</button>
                    </div>
                    </div>
                        <br />
                        <br />
                        <Table striped bordered hover size="sm" >
                            <thead>
                                <tr class='w3-dark-grey'>
                                    <th>Matching Species</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{this.state.recParks}</td>
                                </tr>
                            </tbody>
                        </Table>
                </div>
                    
                </div>
        )}

}