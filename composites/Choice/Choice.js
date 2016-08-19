import React from "react";
import Input from '../../forms/Input';
import Label from '../../forms/Label';

/**
 * Represents a choice interface, like a group of radio buttons or a select button. Initially it should render a
 * group of radio buttons. We might add other representations later on.
 *
 * @param {Object} props The properties.
 * @returns {JSX} The choice component.
 * @constructor
 */
const Choice = ( props ) => {
	let choices = props.properties.choices;
	let fieldKeys = Object.keys( choices );
	let fieldName = props.fieldName;

	return (
		<div>
			<h2>{props.properties.label}</h2>

			{fieldKeys.map( function( choiceName, index ) {
				let choice = choices[ choiceName ];
				let id = choiceName + "-" + index;
				let checked = ( props.data === choiceName ) ? "checked" : "";

				return (
					<div key={index}>
						<Input name={fieldName} type="radio" label={choice.label} onChange={props.onChange}
						       value={choiceName} optionalAttributes={{
							id,
							checked
						}}/>
						<Label for={id}>{choice.label}</Label>
					</div>
				);
			} )}
		</div>
	);
};

Choice.propTypes = {
	component: React.PropTypes.string,
	data: React.PropTypes.string,
	properties: React.PropTypes.object,
	"default": React.PropTypes.string,
	fieldName: React.PropTypes.string.isRequired,
	onChange: React.PropTypes.func,
};

Choice.defaultProps = {
	component: "",
	data: "",
	properties: {
		label: "",
		choices: {},
	},
	"default": "",
};

export default Choice;
