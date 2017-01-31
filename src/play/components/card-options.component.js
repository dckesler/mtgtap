import React from 'react';
import { partial } from 'lodash';
import { StyleSheet, css } from 'aphrodite';
import { dark, moreDark } from 'styleHub';

export default class CardOptions extends React.Component {
	constructor() {
		super();
		this.state = {
			libraryExpanded: false,
		}
	}
	render() {
		const { props } = this;
		return (
			<div className={css(styles.optionBox)}>
				{props.view !== "graveyard" &&
					<div
						onClick={partial(props.cardStateMove, "graveyard")}
						className={css(styles.option)}>
						<img
							style={{width: "100%"}}
							src={'images/Graveyard.png'} />
					</div>
				}
				{props.view !== "exile" &&
					<div
						onClick={partial(props.cardStateMove, "exile")}
						className={css(styles.option)}>
						<img
							style={{width: "100%"}}
							src={'images/Exile.png'} />
					</div>
				}
				{props.view !== "hand" && 
					<div
						onClick={partial(props.cardStateMove, "hand")}
						className={css(styles.option)}>
						<img
							style={{width: "100%"}}
							src={'images/Hand.png'} />
					</div>
				}
				{props.view !== "library" &&
					<div
						onMouseOver={() => this.setState({libraryExpanded: true})}
						onMouseLeave={() => this.setState({libraryExpanded: false})}
						className={css(styles.option)}>
						<img
							style={{width: "100%"}}
							src={'images/Library.png'} />
						{this.state.libraryExpanded &&
							<div className={css(styles.subOptions)}>
								<div
									onClick={partial(props.toLibrary, true)}
									className={css(styles.subOption)}>
									Top
								</div>
								<div
									onClick={partial(props.toLibrary, false)}
									className={css(styles.subOption)}>
									Bottom
								</div>
							</div>
						}
					</div>
				}
			</div>
		)
	}
}

const styles = StyleSheet.create({
	optionBox: {
		position: "absolute",
		top: "24px",
		right: 0,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		width: "18px",
	},
	option: { 
		width: "100%",
		position: "relative",
		borderRadius: "5px",
		display: "flex",
		alignItems: "center",
		background: moreDark,
		marginBottom: "6px",
		cursor: "pointer",
		":hover": {
			background: dark,
		}
	},
	subOptions: {
		padding: "0 6px",
		display: "flex",
		flexDirection: "column",
		position: "absolute",
		left: "70%",
	},
	subOption: {
		fontSize: "18px",
		background: "rgba(1, 1, 1, 0.7)",
		zIndex: 10,
		":hover": {
			color: "#DDD",
			background: "rgba(1, 1, 1, 0.8)",
		}
	}
})
