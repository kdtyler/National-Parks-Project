import React from 'react';
import Table from 'react-bootstrap/Table'

export default class Park extends React.Component{

    constructor(props) {
		super(props);

        console.log(this.props)

		this.state = {
			parkcode: this.props.match.params.code,
            parkname: "",
            parkdesc: "",
            parkimg: "",
            parkstate: "",
            Trails: [],
            TrailsDifficulty: [],
            TrailsLength: [],
            endangeredSpecies: [],
            endangeredSpeciesSciName: [],
            endangeredSpeciesNativeness: []
        }
	}

    componentDidMount() {

        fetch("http://localhost:8081/park/" + this.state.parkcode,
		{
			method: "GET"
		}).then(res => {
			return res.json();
		}, err => {
			console.log(err);
		}).then(parkdets => { 
			this.setState({
				parkname: parkdets[0].Park_Name
			});
            this.setState({
				parkdesc: parkdets[0].Description
			});
            this.setState({
				parkimg: parkdets[0].Image
			});
            this.setState({
				parkstate: parkdets[0].state
			});
		});

        fetch("http://localhost:8081/park/" + this.state.parkcode + "/top5Trails",
		{
			method: "GET"
		}).then(res => {
			return res.json();
		}, err => {
			console.log(err);
		}).then(trails => { 
            let trailDivs = trails.map((trail, i) => 
                <div>
                    <p>{trail.name}</p>
                </div>
            );

            let trailDifficultyDivs = trails.map((trail, i) => 
                <div>
                    <p>{trail.difficulty_rating}</p>
                </div>
            );

            let trailLengthDivs = trails.map((trail, i) => 
                <div>
                    <p>{trail.length}</p>
                </div>
            );

			this.setState({
                Trails: trailDivs,
                TrailsDifficulty: trailDifficultyDivs,
                TrailsLength: trailLengthDivs
			});
		});

        fetch("http://localhost:8081/park/" + this.state.parkcode + "/endangeredSpecies",
		{
			method: "GET"
		}).then(res => {
			return res.json();
		}, err => {
			console.log(err);
		}).then(endangeredSpecies => {
            let endangeredSpeciesDivs = endangeredSpecies.map((endangered, i) => 
                <div>
                    <p>{endangered.common_name}</p>
                </div>
			);

            let endangeredSpeciesSciNameDivs = endangeredSpecies.map((endangered, i) => 
                <div>
                    <p>{endangered.sci_name}</p>
                </div>
			);

            let endangeredSpeciesNativenessDivs = endangeredSpecies.map((endangered, i) => 
                <div>
                    <p>{endangered.nativeness}</p>
                </div>
			);

			this.setState({
                endangeredSpecies: endangeredSpeciesDivs,
                endangeredSpeciesSciName: endangeredSpeciesSciNameDivs,
                endangeredSpeciesNativeness: endangeredSpeciesNativenessDivs
			});
		});
    }

    render() {
        return(
            <body style={{backgroundColor: "antiquewhite"}}>
                <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"></link>

                <div class="w3-container w3-center">
                    <h1>
                        <b>{this.state.parkname} <br></br></b>
                    </h1>
                    <h3>
                        {this.state.parkstate}
                    </h3>
                </div>
                <p>
                </p>
                <div class="w3-container w3-center"> 
                    <img src={this.state.parkimg} class="w3-round" alt="Test" width="1000"></img>
                </div> 
                <p>
                    <br></br>
                    <h2><b>Description </b> <br></br></h2>
                    {this.state.parkdesc}
                </p>
                <p>
                    <b>Top 5 Most Popular Trails</b> <br></br>
                    <div style={{backgroundColor: "white"}, {width: "50%"}}>
                        <Table striped bordered hover size="sm" >
                            <thead>
                                <tr class='w3-dark-grey'>
                                    <th>Trail</th>
                                    <th>Difficulty</th>
                                    <th>Length (miles)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class='w3-light-grey'>
                                    <td>{this.state.Trails}</td>
                                    <td>{this.state.TrailsDifficulty}</td>
                                    <td>{this.state.TrailsLength}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </p>
                <br></br>
                <p>
                    <b>Endangered Species</b> <br></br>
                    <div style={{backgroundColor: "white"}, {width: "50%"}}>
                        <Table striped bordered hover size="sm" >
                            <thead>
                                <tr class='w3-dark-grey'>
                                    <th>Common Name</th>
                                    <th>Scientific Name</th>
                                    <th>Nativeness</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class='w3-light-grey'>
                                    <td>{this.state.endangeredSpecies}</td>
                                    <td>{this.state.endangeredSpeciesSciName}</td>
                                    <td>{this.state.endangeredSpeciesNativeness}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </p>
            </body>
        )}
}