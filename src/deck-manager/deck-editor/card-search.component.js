import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { overArgs, partial } from 'lodash';
import { Observable } from 'rx';
import SearchInput from 'src/common/search-input.component.js';

import { input } from 'styleHub';

export default class CardSearch extends React.Component {
	constructor() {
		super();
		this.state = {
			switched: false,
		}
	}
	componentDidMount() {
		Observable.fromEvent(this.input.refs.input, 'keydown')
		.filter(e => e.keyCode == 13)
		.pluck("target", "value")
		.subscribe(this.props.searchForCard);
	}
	componentWillUnmount() {

	}
	render() {
		return (
			<div>
				<div className={css(styles.searchInputBox)}>
					<SearchInput
						ref={input => this.input = input}
						value={this.props.cardSearch || ""}
						onChange={overArgs(this.props.updateCardSearch, e => e.target.value)} />
				</div>
				<div className={css(styles.cardBox)}>
					{this.props.searchedCard.transform &&
						<div
							onClick={() => {
								this.setState({switched: !this.state.switched})
							}}
							className={css(styles.transformIcon)}>
							<i className="fa fa-refresh"></i>
						</div>
					}
					<img
						className={styles.card}
						style={{borderRadius: "12px"}}
						src={(this.state.switched && this.props.searchedCard.transform)
							? this.props.searchedCard.transform.image_url
							: this.props.searchedCard.image_url}/>
				</div>
			</div>
		)
	}
}

const styles = StyleSheet.create({
	searchInputBox: {
		width: "240px",
		paddingBottom: "18px",
	},
	transformIcon: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: "18px",
		color: "black",
		background: "#bbb",
		position: "absolute",
		bottom: "-18px",
		left: "-18px",
		fontSize: "24px",
		width: "36px",
		height: "36px",
		cursor: "pointer",
	},
	cardBox: {
		position: "relative",
		display: "flex",
		justifyContent: "center",
	},
	card: {
		borderRadius: "12px",
		boxShadow: "1px 1px 1px #555",
	}
});
