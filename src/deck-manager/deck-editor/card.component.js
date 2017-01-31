import React from 'react';
import {css, StyleSheet } from 'aphrodite';

export default class Card extends React.Component {
	constructor() {
		super();
		this.state = {
			switched: false,
		}
	}
	render() {
		return (
			<div className={css(styles.cardBox)}>
				{this.props.card.transform &&
					<div
						onClick={() => {
							this.setState({switched: !this.state.switched})
						}}
						className={css(styles.transformIcon)}>
						<i className="fa fa-refresh"></i>
					</div>
				}
				<img
					className={css(styles.image)}
					src={(this.state.switched && this.props.card.transform)
						? this.props.card.transform.image_url
						: this.props.card.image_url} />
			</div>
		)
	}
	
}

const styles = StyleSheet.create({
	cardBox: {
		width: "100%",
		position: "relative",
	},
	image: {
		width: "100%",
		borderRadius: "9px",
		boxShadow: "1px 1px 1px #444",
	},
	transformIcon: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: "18px",
		color: "black",
		background: "#bbb",
		position: "absolute",
		bottom: "-12px",
		left: "-12px",
		fontSize: "18px",
		width: "30px",
		height: "30px",
		cursor: "pointer",
	},
});
