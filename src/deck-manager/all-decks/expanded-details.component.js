import React from 'react';
import { css, StyleSheet } from 'aphrodite';
import ColorBar from 'src/card/color-bar.component.js';
import { pullDeckDevotion } from 'src/card/card.helpers.js';

export default function ExpandedDetails(props) {
	if (!props.expanded) return null;
	return (
		<div>
			<span>Deck Devotion</span>
			<div className={css(styles.devotionBox)}>
				<ColorBar
					colorFunc={pullDeckDevotion}
					cards={props.deck.cards}/>
			</div>

			<div></div>
			<div></div>
		</div>
	)
}

const styles = StyleSheet.create({
	devotionBox: {
		width: "100%",
		height: "18px",
	}
})
