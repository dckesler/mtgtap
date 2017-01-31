import React from 'react';
import { StyleSheet, css } from 'aphrodite';

import { outlineBox, invisibleInput } from 'styleHub';

export default class SearchInput extends React.Component {
	constructor() {
		super();
		this.state = {
			focused: false,
		}
	}
	render() {
		return (
			<div className={css(styles.searchBox)}>
				<div className={css(styles.searchIcon)}>
					<i className="fa fa-search"></i>
				</div>
				<input
					{...this.props}
					ref={'input'}
					className={`${css(styles.searchInput)} ${(this.props.className || "")}`}
					onBlur={(e) => {
						if (this.props.onBlur) this.props.onBlur(e);
						this.setState({focused: false})
					}}
					onFocus={(e) => {
						if (this.props.onFocus) this.props.onFocus(e);
						this.setState({focused: true})
					}}/>
			</div>
		)
	}
}

const styles = StyleSheet.create({
	searchBox: {
		...outlineBox,
		padding: "3px",
		display: "flex",
	},
	searchIcon: {
		background: "rgba(0,0,0,0)",
		color: "#bbb",
		fontSize: "18px",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		width: "10%",
	},
	searchInput: {
		...invisibleInput,
		width: "90%"
	}
})
