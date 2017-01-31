import React from 'react';
import CardSearch from './card-search.component.js';
import Loading from 'src/common/loader-animation.component.js';
import Cards from './cards.component.js';
import { css, StyleSheet } from 'aphrodite';
import { standardButton } from 'styleHub';
import { cardConsolidate } from 'src/card/card.helpers.js';
import { sortBy, partial } from 'lodash';
import { orderUp, applyFilters } from 'src/card/order-filter.helpers.js';

export default class DeckEditor extends React.Component {
	render() {
		return (
			<div className={css(styles.deckEditor)}>
				<div className={css(styles.cardSearchSection)}>
					<div className={css(styles.status)}>
						{this.props.deckEditor.status}
					</div>
					<div className={css(styles.center)}>
						<CardSearch
							searchedCard={this.props.deckEditor.searchedCard}
							searchForCard={this.props.actions.searchForCard}
							cardSearch={this.props.deckEditor.cardSearch}
							updateCardSearch={this.props.actions.updateCardSearch}/>
					</div>
					{this.props.deckEditor.searchedCard.name &&
						<button
							className={css(styles.plusButton)}
							onClick={partial(this.props.actions.addCardToDeck, this.props.deckEditor.searchedCard)}>
							Add to Deck
						</button>}
				</div>
				<Cards
					changeOrder={this.props.actions.changeCardOrdering}
					firstOrder={this.props.deckEditor.firstOrder}
					secondOrder={this.props.deckEditor.secondOrder}
					deck={this.props.deckEditor.currentDeck}
					removeCard={this.props.actions.removeCardFromDeck}
					addCard={this.props.actions.addCardToDeck}
					cards={organize(this.props)}/>
			</div>
		)
	}
}

function organize(props) {
	const cards = props.deckEditor.currentDeck.cards;
	const { firstOrder, secondOrder, filters } = props.deckEditor;
	const filtered = applyFilters(cards, filters);
	const sorted = orderUp(filtered, firstOrder, secondOrder);
	return cardConsolidate(sorted);
}

const styles = StyleSheet.create({
	deckEditor: {
		display: "flex",
	},
	status: {
		marginBottom: "6px",
	},
	cardSearchSection: {
		display: "inline-block",
	},
	center: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
	},
	addButtons: {
		display: "flex",
		justifyContent: "space-around",
	},
	plusButton: {
		...standardButton,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: "3px",
		margin: "12px auto",
	}
});
