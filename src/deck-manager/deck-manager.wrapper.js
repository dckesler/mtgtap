import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DeckManager from './deck-manager.component.js';
import * as actions from './deck-manager.actions.js';

@connect(state => ({
	deckManager: state.deckManager,
	deckEditor: state.deckEditor,
}))
export default class DeckManagerWrapper extends React.Component {
	render() {
		const boundActions = bindActionCreators(actions, this.props.dispatch);
		return (
			<DeckManager {...this.props} actions={boundActions} />
		)
	}
}
