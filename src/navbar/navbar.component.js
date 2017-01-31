import React from 'react';
import { css } from 'aphrodite';
import styles from './navbar.styles.js';

export default class NavBar extends React.Component {
	render() {
		return (
			<div className={`${css(styles.navbar)}`}>
				<a className={css(styles.logo)}>
					<div className={css(styles.logoTitle)}>MTG Tap</div>
					<img 
						className={css(styles.logoImage)}
						src={`images/MTGTapLogo.png`}/>
				</a>
				<a
					className={css(styles.link)}
					href={`#/deck-manager`}>Deck Manager</a>
				<a
					className={css(styles.link)}
					href={`#/play`}>Play</a>
			</div>
		)
	}
}


