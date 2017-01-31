import React from 'react';
import { css, StyleSheet } from 'aphrodite';
import { overArgs, partial, map } from 'lodash';
import { addFilter, updateFilter, removeFilter, clearFilter } from './deck-editor.actions.js';

export default function CardsFilter(props) {
	return (
		<div className={styles.filtersBox}>
			{map(
				props.filters,
				(filters, key) => {
					filters.map((filter, index) => {
						const Comp = filters[key];
						return (
							<Comp func={partial(updateFilter, index)} />
						)
					})
				}).reduce((total, arr) => [...total, ...arr], [])}
		</div>
	)
}

const styles = StyleSheet.create({
	filtersBox: {
	},
});

const filters = {
	Type,
	Subtype,
	Text,
	CMC,
	Color,
};

function Type(props) {
	return (
		<div>
			<select
				value={props.value}
				onChange={overArgs(props.func, e => e.target.value)}>
				<option value={"Land"}>Land</option>
				<option value={"Creature"}>Creature</option>
				<option value={"Artifact"}>Artifact</option>
				<option value={"Enchantment"}>Enchantment</option>
				<option value={"Planeswalker"}>Planeswalker</option>
				<option value={"Instant"}>Instant</option>
				<option value={"Sorcery"}>Sorcery</option>
			</select>
		</div>
	)
}

function Subtype(props) {
	return (
		<div>
			<input
				placeholder={"Subtype"}
				onChange={overArgs(props.func, e => e.target.value)}
				value={props.value}/>
		</div>
	)
}

function Text(props) {
	return (
		<div>
			<input
				placeholder={"Text"}
				onChange={overArgs(props.func, e => e.target.value)}
				value={props.value}/>
		</div>
	)
}

class CMC extends React.Component {
	render() {
		const { props } = this.props;
		return (
			<div>
				<select
					ref={select => this.select = select}
					value={props.value.sign}
					onChange={this.filter.bind(this)}>
					<option value={'lte'}>&=#8804;</option>
					<option value={'e'}>=</option>
					<option value={'gte'}>&=#8805;</option>
				</select>
				<input
					ref={input => this.input = input}
					placeholder={"CMC"}
					onChange={this.filter.bind(this)}
					value={props.value.value}/>
			</div>
		)
	}
	filter() {
		if (this.select.value && this.input.value)
			this.props.func({sign: this.select.value, value: this.input.value});
	}
}

function Color(props) {
	return (
		<div>
			<select onChange={overArgs(props.func, e => e.target.value)}>
				<option value={"W"}>White</option>
				<option value={"U"}>Blue</option>
				<option value={"B"}>Black</option>
				<option value={"R"}>Red</option>
				<option value={"G"}>Green</option>
				<option value={"C"}>Colorless</option>
			</select>
		</div>
	)
}
