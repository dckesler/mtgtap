import React from 'react';
import { partial } from 'lodash';
import { css, StyleSheet } from 'aphrodite';

export default function LifeTotal(props) {
	return (
		<div className={css(styles.lifeCounter)}>
			<h1>{props.lifeTotal}</h1>
			<div>
				<div onClick={partial(props.lifeChange, 1)}>
					<i className={`fa fa-plus`}></i>
				</div>
				<div onClick={partial(props.lifeChange, -1)}>
					<i className={`fa fa-minus`}></i>
				</div>
			</div>
		</div>
	)
}

const styles = StyleSheet.create({
	lifeCounter: {
		bottom: 0,
		right: 0,
		position: "absolute",
		zIndex: "1000",
	},
});
