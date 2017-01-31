import React from 'react';
import { bindActionCreators } from 'redux';
import CardView from '../components/card-view.component.js';
import Graveyard from '../components/graveyard.component.js';
import Library from '../components/library.component.js';
import Life from '../components/life-total.component.js';
import Exile from '../components/exile.component.js';
import Board from '../components/board.component.js';
import CardSearcher from '../components/card-searcher.component.js';
import { StyleSheet, css } from 'aphrodite';
import { getBoardLimits } from '../components/card-placement.helper.js';
import { connect } from 'react-redux';
import * as actions from './test-game.actions.js';
import { partial } from 'lodash';

@connect(state => ({
	hand: state.testGame.hand,
	graveyard: state.testGame.graveyard,
	exile: state.testGame.exile,
	board: state.testGame.board,
	cardView: state.testGame.cardView,
	library: state.testGame.library,
	playingDeck: state.testGame.playingDeck,
	lifeTotal: state.testGame.lifeTotal,
	cardSearcher: state.testGame.cardSearcher,
}))
export default class TestGamePlay extends React.Component {
	componentWillMount() {
		if (!this.props.playingDeck || this.props.playingDeck.name !== this.props.params.deck)
			this.props.dispatch(actions.startTestGame(this.props.params.deck));
	}
	render() {
		const boundActions = bindActionCreators(actions, this.props.dispatch);
		const { props } = this;
		if (!props.library) return <h1>Loading</h1>
		return (
			<div className={css(styles.playArea)}>
				<Exile
					changeCardView={partial(boundActions.toggleCardSearcher, true, "exile")}
					cards={props.exile} />
				<Graveyard
					changeCardView={partial(boundActions.toggleCardSearcher, true, "graveyard")}
					cards={props.graveyard} />
				<Library
					changeCardView={partial(boundActions.toggleCardSearcher, true, "library")}
					shuffleDeck={boundActions.shuffleDeck}
					drawCard={boundActions.drawCard}
					cards={props.library} />
				<CardView
					toLibrary={boundActions.toLibrary}
					cardStateMove={boundActions.cardStateMove}
					cardReposition={boundActions.cardReposition}
					moveCardToBoard={boundActions.moveCardToBoard}
					cards={props[props.cardView]}
					view={props.cardView}/>
				<Life
					lifeChange={boundActions.lifeChange}
					lifeTotal={props.lifeTotal} />
				<Board
					toLibrary={boundActions.toLibrary}
					tapCard={boundActions.tapCard}
					transformCard={boundActions.transformCard}
					cardStateMove={boundActions.cardStateMove}
					cardReposition={boundActions.cardReposition}
					moveCardToBoard={boundActions.moveCardToBoard}
					cards={props.board} />
				{this.props.cardSearcher &&
					<CardSearcher
						close={partial(boundActions.toggleCardSearcher, false, "hand")}
						toLibrary={boundActions.toLibrary}
						cardStateMove={boundActions.cardStateMove}
						cardReposition={boundActions.cardReposition}
						moveCardToBoard={boundActions.moveCardToBoard}
						view={props.cardView}
						cards={props[props.cardView]} />
				}
			</div>
		)
	}
}

const boardLimits = getBoardLimits();

const styles = StyleSheet.create({
	playArea: {
		position: "absolute",
		left: `${boardLimits.left}px`,
		top: `${boardLimits.top}px`,
		right: 0,
		bottom: 0,
	}
});
