import React from "react";
import Input from "../../../forms/Input";
import Label from "../../../forms/Label";
import htmlDecoder from "../helpers/htmlDecoder";
import Explanation from "./Explanation";

/**
 * Represents a choice interface, like a group of radio buttons or a select button. It could render a
 * group of radio buttons (default) or a selectbox
 *
 * @param {Object} props The properties.
 * @returns {JSX} The choice component.
 * @constructor
 */
const Choice = ( props ) => {
	let choices = props.properties.choices;
	let fieldKeys = Object.keys( choices );
	let fieldName = props.name;
	let type = props.properties.type;

	if ( typeof type === "undefined" ) {
		type = "radio";
	}
	let wrapperClass = "yoast-wizard-input-" + type;

	let fieldSet = () => {
		let field;

		if ( type === "select" ) {
			field =
				<fieldset className={"yoast-wizard-input-select-" + fieldName}>
					<select defaultValue={props.value} name={fieldName}
					        className={props.optionClassName} onChange={props.onChange}>
						{fieldKeys.map( ( choiceName, index ) => {
							let choice = choices[ choiceName ];

							return (
								<option value={choiceName} key={index}>
									{htmlDecoder( choice.label )}
								</option>
							);
						} )}
					</select>
				</fieldset>
			;
		} else {
			field =
				<fieldset className={"yoast-wizard-input-radio-" + fieldName}>
					{fieldKeys.map( ( choiceName, index ) => {
						let choice = choices[ choiceName ];
						let id = `${fieldName}-${index}`;
						// If the value for the choice field equals the name for this choice, the choice is checked.
						let checked = ( props.value === choiceName );

						return (
							<div className={props.optionClassName + " " + choiceName} key={index}>
								<Input name={fieldName} type="radio" label={choice.label} onChange={props.onChange}
								       value={choiceName} optionalAttributes={ { id, checked } }
								/>
								<Label for={id}
								       optionalAttributes={ { "aria-label": choice.screenReaderText } }>{htmlDecoder( choice.label )}</Label>
							</div>
						);
					} )}
				</fieldset>
			;
		}

		return field;
	};

	return (
		<div className={wrapperClass}>
			<p className="yoast-wizard-field-description">{props.properties.label}</p>
			{fieldSet()}
			<Explanation text={props.properties.explanation}/>
		</div>
	);
};

Choice.propTypes = {
	component: React.PropTypes.string,
	type: React.PropTypes.string,
	value: React.PropTypes.string,
	properties: React.PropTypes.object,
	"default": React.PropTypes.string,
	name: React.PropTypes.string.isRequired,
	onChange: React.PropTypes.func,
	className: React.PropTypes.string,
	optionClassName: React.PropTypes.string,
};

Choice.defaultProps = {
	component: "",
	type: "radio",
	value: "",
	properties: {
		label: "",
		choices: {},
	},
	"default": "",
};

export default Choice;
