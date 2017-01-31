import React from 'react';
import { css, StyleSheet } from 'aphrodite';
import { partial } from 'lodash';
import { pullDeckColors, pullDeckDevotion } from 'src/card/card.helpers.js';

import ColorBar from 'src/card/color-bar.component.js';

export default function Deck({deck}) {
	return (
		<div className={css(styles.deckBox)}>
			<div className={css(styles.deckHeader)}>
				{deck.name}
			</div>
			<span>Cards: {deck.cards.length}</span>
			{!!deck.cards.length &&
				[<div key="color">
					<div>Deck Color</div>
					<div className={css(styles.colorBar)}>
						<ColorBar name={deck.name} colorFunc={pullDeckColors} cards={deck.cards}/>
					</div>
				</div>,
				<div key="devotion">
					<div>Deck Devotion</div>
					<div className={css(styles.colorBar)}>
						<ColorBar name={deck.name} colorFunc={pullDeckDevotion} cards={deck.cards}/>
					</div>
				</div>]
			}
		</div>
	)
}

const styles = StyleSheet.create({
	deckHeader: {
		textAlign: "center",
		margin: "6px 0",
		fontSize: "24px",
	},
	colorBar: {
		width: "100%",
		height: "18px",
	},
});
