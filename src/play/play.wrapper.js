import React from 'react';
import styles from './play.styles.js';
import { css } from 'aphrodite';
import SideBar from './play-sidebar.component.js';
import { connect } from 'react-redux';


@connect(state => ({
	testGameDeck: state.testGame.playingDeck,
}))
export default class PlayWrapper extends React.Component {
	render() {
		return (
			<div>
				<SideBar
					testGameDeck={this.props.testGameDeck}/>
				{this.props.children}
			</div>
		)
	}
}

