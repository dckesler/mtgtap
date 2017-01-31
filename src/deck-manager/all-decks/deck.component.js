import React from 'react';
import { css, StyleSheet } from 'aphrodite';
import { standardButton, warningButton } from 'styleHub';
import { partial } from 'lodash';
import { pullDeckColors } from 'src/card/card.helpers.js';

import ColorBar from 'src/card/color-bar.component.js';
import ExpandedDetails from './expanded-details.component.js';
import CommonDeck from 'src/card/deck.component.js';

export default class Deck extends React.Component {
	constructor() {
		super();
		this.state = {
			deleting: false,
			expanded: false,
		}
	}
	render() {
		const { deck } = this.props;
		return (
			<div className={css(styles.deckBox)}>
				<CommonDeck deck={deck} />
				<div className={css(styles.buttons)}>
					{this.state.deleting && "You sure?"}
					<div>
						{!this.state.deleting
							? <a
									href={`#/deck-manager/edit/${deck.name}`}
									className={css(styles.editButton)}>
									Edit
								</a>
							: <div
									className={css(styles.editButton)}
									onClick={() => this.setState({deleting: false})}>
									Cancel
								</div>}
						{this.state.deleting
							? <a
									className={css(styles.deleteButton)}
									onClick={partial(this.props.delete, deck.name)}>
									Delete It!	
								</a>
							: <a
									className={css(styles.deleteButton)}
									onClick={() => this.setState({deleting: true})}>
									Delete
								</a>}
					</div>
				</div>
			</div>
		)
	}
}

const styles = StyleSheet.create({
	deckBox: {
		color: "#CCC",
		padding: "12px",
		border: "1px solid #CCC",
		transition: "height 1s",
		position: "relative",
	},
	expander: {
		position: "absolute",
		top: "6px",
		right: "6px",
		fontSize: "18px",
		textShadow: "1px 1px 2px #444",
		color: "#CCC",
		transition: "font-size 0.6s",
		cursor: "pointer",
		":hover": {
			color: "#DDD",
			fontSize: "21px",
		}
	},
	editButton: {
		...standardButton,
		marginTop: "6px",
		marginRight: "6px",
	},
	deleteButton: {
		...warningButton,
	},
	buttons: {
		display: "flex",
		flexDirection: "column",
	}
});
