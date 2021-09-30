import React from 'react';
import { Jumbotron, Form , Row, Col, Button} from 'react-bootstrap';
import { Container } from 'reactstrap';


export default class SearchPage2 extends React.Component{

    constructor(props) {
		super(props);

        this.state=({
            zip : "",
            distance : "",
            zipcodes : [],
            lat : 0,
            long : 0,
            parks : []
        })

        

	}

    onSubmit = (e) => {
        console.log(this.state.zip);
        console.log(this.state.distance);

        if(this.state.zipcodes.indexOf(parseInt(this.state.zip)) !== -1){
            let query_zip = "http://localhost:8081/lat_long/" + this.state.zip;

            fetch(query_zip, {
                method: "GET"
            }).then(res => {
                return res.json();
            }, err => {
                console.log(err);
            }).then(zip => {
                this.setState({
                    lat : zip[0].lat,
                    long : zip[0].long
                }, () => {
                    console.log(this.state.lat);
                    console.log(this.state.long);
                    let dissimilar_query = "http://localhost:8081/dissimilar_parks/" + this.state.lat + "/" + this.state.long + "/" + this.state.distance;

                    let query = dissimilar_query.replace(/-/g, '%2D');

                    fetch(query, {
                        method: "GET"
                    }).then(res => {
                        return res.json();
                    }, err => {
                        console.log(err);
                    }).then(parks => { 
                        let dissim_parks = parks.map((park, i) => {
                            if(i % 2 === 1){
                                return (
                                <Row>
                                    <Container className="container p-3 my-3 bg-primary text-white">
                                        <h4>
                                         {park.park_1} and {park.park_2}
                                        </h4>
                                        <p>
                                        {park.park_1} is {park.park_1_dist.toFixed(1)} miles from you and {park.park_2} is {park.park_2_dist.toFixed(1)} miles from you. {park.park_1} has {park.park_1_spec} species and {park.park_2} has {park.park_2_spec} species. They only have {park.count_similar} species in common giving them a dissimilarity rating of {park.sim_metric}.
                                        </p>
                                    </Container>
                                </Row>)
                            }
                            
                        });
                        
                        this.setState({
                            parks : dissim_parks
                        });
                    });



                });
            });

            


            
        } else {
            alert("zip code does not exists in our database ")
        }

        e.preventDefault();
    }



    componentDidMount(){

        let zip_query = "http://localhost:8081/zipcodes";

        fetch(zip_query, {
			method: "GET"
		}).then(res => {
			return res.json();
		}, err => {
			console.log(err);
		}).then(zipList => { 
            let allZips = zipList.map((zip, i) =>
                zip.zipcode
            );
            this.setState({
                zipcodes : allZips
            });
		});
    }


    render() {
        
        return(
            <div className = "container">
                <Jumbotron className="jumbotron-wildlife-search">
                        <div className = "jumbotron-wildlife-search-text-container">
                            <h1 style={{color : 'white'}}>Search for Wildlife</h1>
                            <p style={{color : 'white'}}>Want to find two parks within a certain distance from you with different wildlife?</p>
                            <p style={{color : 'white'}}>Enter your zipcode and how many miles you're willing to travel. 
                                We'll output the five pairs of parks with the most contrasting wild life. If nothing comes up, try to increase your distance.</p>
                        </div>
                </Jumbotron>

                <div className="container">
                
                    <Form onSubmit={this.handleSubmit}>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Distance from zipcode</Form.Label>
                                    <Form.Control value={this.state.distance} onChange={e => this.setState({distance : e.target.value})} placeholder="distance in miles" />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Zipcode (excluding leading zeros)</Form.Label>
                                    <Form.Control value={this.state.zip} onChange={e => this.setState({zip : e.target.value})} placeholder="zipcode" />
                                </Form.Group>
                            </Col>
                            
                        </Row>
                        <Row>
                            <Button type="submit" onClick={this.onSubmit}>Submit</Button>
                        </Row>
                    </Form>
                </div>  
                <div className="container">
                    {this.state.parks}                    
                </div>   
            </div>
        )}

}

/*
                                    <Form.Control value={this.state.zip} as="select" onChange={e => this.setState({zip : e.target.value})}>
                                        {this.state.zipcodes}
                                    </Form.Control>
                                    */

/*

 <div class="container">
                    <SelectSearch
                            className="option"
                            value ={this.state.zip}
                            options={list}
                            search
                            emptyMessage={() => <div style={{ textAlign: 'center', fontSize: '0.8em'}}>Not found renderer</div>}
                            placeholder="Choose your zipcode"/>
                </div>

                */