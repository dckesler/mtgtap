import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { partial } from 'lodash';
import { dark, moreDark } from 'styleHub';

export default function CardPlayOptions(props) {
	return (
		<div
			className={!props.isTapped ? css(styles.optionBox) : css(styles.tappedStyles)}>
			<div
				className={css(styles.option)}
				onClick={partial(props.tapCard, !props.isTapped, props.index)}>
				<img
					style={{width: "75%"}}
					src={`images/${props.isTapped ? "Untap" : "Tap"}.png`}/>
			</div>
			{props.transformable &&
				<div
					onClick={partial(props.transformCard, !props.isTransformed, props.index)}
					className={css(styles.option)}>
					<i
						style={props.isTransformed ? {transform: "rotate(90deg)"} : {}}
						className={"fa fa-refresh"}></i>
				</div>
			}
		</div>
	)
}

const styles = StyleSheet.create({
	optionBox: {
		position: "absolute",
		top: "24px",
		left: 0,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	tappedStyles: {
		position: "absolute",
		bottom: 0,
		left: 0,
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
	},
	option: { 
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		width: "21px",
		borderRadius: "11px",
		background: moreDark,
		marginBottom: "6px",
		cursor: "pointer",
		":hover": {
			background: dark,
		}
	}
})
