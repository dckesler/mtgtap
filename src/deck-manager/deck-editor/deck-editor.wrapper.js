import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './deck-editor.actions.js';

import DeckEditor from './deck-editor.component.js';
import AsyncLoader from '../../common/async-loader.component.js';

const asyncChecks = [
	function(props) {
		return props.deckEditor.currentDeck;
	}
]
@connect(state => ({
	deckEditor: state.deckEditor,
}))
export default class DeckEditorWrapper extends React.Component {
	componentWillMount() {
		this.props.dispatch(actions.getDeck(this.props.params.deckname));
	}
	render() {
		const boundActions = bindActionCreators(actions, this.props.dispatch);
		return (
			<AsyncLoader {...this.props} asyncChecks={asyncChecks}>
				<DeckEditor
					actions={boundActions}
					{...this.props}/>
			</AsyncLoader>
		)
	}
}
