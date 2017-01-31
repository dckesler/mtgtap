import React from 'react';

export default class TestGame extends React.Component {
	componentWillReceiveProps(nextProps) {
		console.log("old", this.props);
		console.log("new", nextProps);
	}
	render() {
		return (
			<div>
				{this.props.children}
			</div>
		)
	}
}
