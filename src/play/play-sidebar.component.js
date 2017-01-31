import React from 'react';
import { css, StyleSheet } from 'aphrodite';
import styles from './play.styles.js';

export default function PlaySideBar(props) {
	return (
		<div className={css(styles.sideBar)}>
			<div className={css(styles.sideBarCategory)}>
				<div>Test Game</div>
				<div className={css(styles.links)}>
					{props.testGameDeck &&
						<a
							href={`#/play/test-game/with/${props.testGameDeck.name}`}
							className={css(styles.sideBarLink)}>
							<div className={css(styles.sideBarLink)}>
								Current Game With
								<br/>
								{<span className={css(styles.deckName)}>{props.testGameDeck.name}</span>}
							</div>
						</a>
					}
					<a
						href={`#/play/test-game/pick`}
						className={css(styles.sideBarLink)}>
						<div className={css(styles.sideBarLink)}>
							Create Test Game
						</div>
					</a>
				</div>
			</div>
			<div className={css(styles.sideBarCategory)}>
				<div>Solo Game</div>
				<div className={css(styles.links)}>
					{props.soloGameDeck &&
						<a
							href={`#/play/test-game/with/${props.testGameDeck.name}`}
							className={css(styles.sideBarLink)}>
							<div className={css(styles.sideBarLink)}>
								Current Game With
								<br/>
								{<span className={css(styles.deckName)}>{props.soloGameDeckOne.name}</span>} 
								and
								<br/>
								{<span className={css(styles.deckName)}>{props.soloGameDeckTwo}</span>}
							</div>
						</a>
					}
					<a
						href={`#/play/test-game/pick`}
						className={css(styles.sideBarLink)}>
						<div className={css(styles.sideBarLink)}>
							Create Solo Game
						</div>
					</a>
				</div>
			</div>
		</div>
	)
}
