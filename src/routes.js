import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, Link, hashHistory } from 'react-router';
import createHashHistory from 'history/lib/createHashHistory';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import deckManagerReducer from './deck-manager/deck-manager.reducer.js';
import deckEditorReducer from './deck-manager/deck-editor/deck-editor.reducer.js';
import allDeckReducer from './deck-manager/all-decks/all-decks.reducer.js';
import testGameReducer from './play/test-game/test-game.reducer.js';

import page404 from './common/page404.component.js';
import App from './app.js';

import DeckManager from './deck-manager/deck-manager.wrapper.js';
import DeckEditor from './deck-manager/deck-editor/deck-editor.wrapper.js';
import AllDecks from './deck-manager/all-decks/all-decks.wrapper.js';

import PlayComponent from './play/play.wrapper.js';
import TestGame from './play/test-game/test-game.wrapper.js';
import TestGamePick from './play/test-game/test-game-deck-pick.component.js';
import TestGamePlay from './play/test-game/test-game-play.component.js';
import SoloGame from './play/solo-game/solo-game.wrapper.js';

const reducer = combineReducers({
	deckManager: deckManagerReducer,
	deckEditor: deckEditorReducer,
	allDecks: allDeckReducer,
	testGame: testGameReducer,
});

const store = window.__redux__ = createStore(
	reducer,
	applyMiddleware(thunk),
);

export default class Root extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<Router history={hashHistory}>
					<Route path="/" component={App}>
						<Route path="deck-manager" component={DeckManager}>
							<Route path="edit/thispath" component={page404}/>
							<Route path="edit/:deckname" component={DeckEditor}/>
							<Route path="all-decks" component={AllDecks}/>
						</Route>
						<Route path="play" component={PlayComponent}>
							<Route path="test-game" component={TestGame}>
								<Route path="pick" component={TestGamePick}/>
								<Route path="with/:deck" component={TestGamePlay}/>
							</Route>
							<Route path="solo-game" component={SoloGame}>
								<Route path="pick" />
								<Route path="with/:deckOne/and/:deckTwo" />
							</Route>
						</Route>
						<Route path="*" component={page404}/>
					</Route>
				</Router>
			</Provider>
		)
	}
}

ReactDom.render(<Root />, document.getElementById("app"));
