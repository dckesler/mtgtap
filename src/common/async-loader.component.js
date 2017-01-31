import React from 'react';

export default function Loader(props) {
	return (
		<div>
			{props.asyncChecks.reduce((bool, func) => bool && func(props), true)
				? props.children
				: <div>Loading...</div>
			}
		</div>
	)
}
