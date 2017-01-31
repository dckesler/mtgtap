import React, { PropTypes } from 'react';
import { partial, find } from 'lodash';
import { css, StyleSheet } from 'aphrodite';
import { dark, lessDark, grey, lightGrey, darkGrey } from 'styleHub';

export default class SelectList extends React.Component {
	static propTypes = {
		options: PropTypes.arrayOf(PropTypes.shape({
			label: PropTypes.string,
			value: PropTypes.string.isRequired,
		})).isRequired,
		select: PropTypes.func.isRequired,	
	}

	constructor() {
		super();
		this.state = {
			expanded: false,
			handleClose: this.handleClose.bind(this),
		};
	}

	componentWillUnmount() {
		document.body.removeEventListener("click", this.state.handleClose);
	}

	render() {
		return (
			<div className={css(styles.everything)}>
				<div
					onClick={this.handleOpen.bind(this)}
					className={css(styles.selectStuff)}>
					<span>
						{find(this.props.options, option => option.value === this.props.value).label}
					</span>
					<i className={`fa fa-chevron-down`}></i>
				</div>
				{this.state.expanded && 
					<div
						className={css(styles.optionBox)}>
						{this.props.options.map(option => {
							return (
								<div
									key={option.value}
									style={{
										background: option.value === this.props.value
											? darkGrey
											: grey
									}}
									onMouseDown={e => {
										e.stopPropagation();
										this.props.select(option.value);
										this.handleClose.call(this);
									}}
									className={css(styles.option)}>
									{option.label || option.value}
								</div>
							)
						})}
					</div>
				}
			</div>
		)
	}

	handleOpen(e) {
		document.body.addEventListener("click", this.state.handleClose);
		this.setState({
			expanded: true,
		})
	}

	handleClose() {
		this.setState({
			expanded: false,
		}, () => {
			document.body.removeEventListener("click", this.state.handleClose);
		});
	}
	
}


const styles = StyleSheet.create({
	everything: {
		position: "relative",
		color: dark,
		background: grey,
		zIndex: "100",
	},
	selectStuff: {
		display: "flex",
		padding: "12px",
		justifyContent: "space-between",
	},
	optionBox: {
		width: "100%",
		position: "absolute",
		top: "100%",
		left: 0,
	},
	option: {
		padding: "12px",
		":hover": {
			background: lightGrey,
		}
	}
});
