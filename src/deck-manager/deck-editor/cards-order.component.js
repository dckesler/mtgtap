import React from 'react';
import { css, StyleSheet } from 'aphrodite';
import { overArgs, partial } from 'lodash';
import SelectList from 'src/common/select-list.component.js';

export default function CardsOrders(props) {
	return (
		<div className={css(styles.selectList)}>
			<SelectList
				value={props.firstOrder}
				select={partial(props.changeOrder, "firstOrder")}
				options={[
					{value: "color", label: "Color"},
					{value: "converted_mana_cost", label: "CMC"},
					{value: "name", label: "Name"}
				]}/>
		</div>
	)
}

const styles = StyleSheet.create({
	selectList: {
		width: "100px",
	}
})
