import React from 'react';
import { css, StyleSheet } from 'aphrodite';
import Card from './card.component.js';
import { blackButton } from "styleHub";
import { partial } from 'lodash';
import DeckStats from './deck-stats.component.js';
import CardsFilter from './cards-filter.component.js';
import CardsOrder from './cards-order.component.js';

export default function Cards(props) {
	return (
		<div style={{width: "100%"}}>
			{!!props.deck.cards.length && 
				<div className={css(styles.headBox)}>
					<DeckStats deck={props.deck}/>
					<CardsFilter />
					<CardsOrder
						changeOrder={props.changeOrder}
						filters={props.filters}
						firstOrder={props.firstOrder}/>
				</div>
			}
			<div className={css(styles.cardBox)}>
				{props.cards.map(card => {
					return (
						<div
							className={css(styles.card)}
							key={card.card.name}>
							<Card card={card.card} />
							<span className={css(styles.amount)}>Amount In Deck: {card.deckAmount}</span>
							<div className={css(styles.buttonBox)}>
								<button
									onClick={partial(props.addCard, card.card)}
									className={css(styles.button)}>
									Add Another
								</button>
								<button
									onClick={partial(props.removeCard, card.card)}
									className={css(styles.button)}>
									Take One Away
								</button>
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}

const styles = StyleSheet.create({
	cardBox: {
		display: "flex",
		flexWrap: "wrap",
		textAlign: "center",
	},
	headBox: {
		margin: "0 18px",
	},
	card: {
		margin: "6px",
		width: "175px",
	},
	amount: {
		textAlign: "center",
	},
	buttonBox: {
		display: "flex",
		width: "100%",
		justifyContent: "space-around",
	},
	button: {
		...blackButton,
		fontSize: "10px",
		flexShrink: 1,
		margin: "4px",
	}

});
