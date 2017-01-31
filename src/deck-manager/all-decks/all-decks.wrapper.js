import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AllDecks from './all-decks.component.js';
import * as actions from './all-decks.actions.js';

@connect(state => ({
	allDecks: state.allDecks,
}))
export default class AllDeckWrapper extends React.Component {
	componentWillMount() {
		this.props.dispatch(actions.getUserDecksAction());
	}
	render() {
		const boundActions = bindActionCreators(actions, this.props.dispatch);
		return (
			<AllDecks {...this.props} actions={boundActions}/>
		)
	}
}
