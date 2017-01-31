import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import NavBar from './navbar/navbar.component.js';


@DragDropContext(HTML5Backend)
export default class App extends React.Component {
	constructor() {
		super();
	}
	render() {
		return (
			<div className={css(styles.app)}>
				<NavBar />
				{this.props.children}
			</div>
		)
	}
}

const styles = StyleSheet.create({
	app: {
		paddingTop: "66px"
	}
})
