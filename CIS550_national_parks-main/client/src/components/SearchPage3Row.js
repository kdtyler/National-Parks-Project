import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class SearchPage3Row extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="parkSpeciesResults">
				<div className="SpeciesName">{this.props.Species_Name}</div>
			</div>
		);
	}
}
