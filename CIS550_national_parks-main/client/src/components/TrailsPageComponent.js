import React from 'react';
import { Media, List } from 'reactstrap'
import '../App.css'

export default class TrailsPageComponent extends React.Component{

    constructor(props) {
		super(props);

        this.state = {
            park : props.park,
            name : props.name,
            city : props.city,
            state : props.state,
            populatiry : props.populatiry,
            length : (parseFloat(props.length)/5280).toFixed(2),
            elev : props.elev,
            diff : props.diff,
            rate : props.rate,
            lat : props.lat,
            long : props.long
        }


	}

    componentDidMount() {

        this.setState({
            park : this.props.park,
            name : this.props.name,
            city : this.props.city,
            state : this.props.state,
            populatiry : this.props.populatiry,
            length : (parseFloat(this.props.length)/5280).toFixed(2),
            elev : this.props.elev,
            diff : this.props.diff,
            rate : this.props.rate,
            lat : this.props.lat,
            long : this.props.long
        })


    }

    render() {
        return(

            <Media className="trails">
            <Media body>
              <Media heading style={{color:"white"}}>
                {this.state.name}
              </Media>
                <List>
                  <li style={{color:"white"}}>Park: {this.state.park}</li>
                  <li style={{color:"white"}}>Location: {this.state.city}, {this.state.state}</li>
                  <li style={{color:"white"}}>Latitude, Longitude: {this.state.lat}, {this.state.long}</li>
                  <li style={{color:"white"}}>Length: {this.state.length}</li>
                  <li style={{color:"white"}}>Elevation Gain: {this.state.elev}</li>
                  <li style={{color:"white"}}>Difficulty: {this.state.diff}</li>
                  <li style={{color:"white"}}>Rating: {this.state.rate}</li>
                </List>
              </Media>
            </Media>

        )}

}