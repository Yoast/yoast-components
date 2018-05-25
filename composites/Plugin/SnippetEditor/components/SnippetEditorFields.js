/* External dependencies */
import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import uniqueId from "lodash/uniqueId";
import { __ } from "@wordpress/i18n";

/* Internal dependencies */
import ReplacementVariableEditor from "./ReplacementVariableEditor";
import ProgressBar from "../../SnippetPreview/components/ProgressBar";
import { lengthProgressShape, replacementVariablesShape } from "../constants";
import colors from "../../../../style-guide/colors";

const angleRight = ( color ) => "data:image/svg+xml;charset=utf8," + encodeURIComponent(
	'<svg width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">' +
	'<path fill="' + color + '" d="M1152 896q0 26-19 45l-448 448q-19 19-45 19t-45-19-19-45v-896q0-26 19-45t45-19 45 19l448 448q19 19 19 45z" />' +
	"</svg>"
);

/**
 * Returns the color of the caret for an InputContainer based on the props.
 *
 * @param {Object} props The props for this InputContainer.
 * @returns {string} The color the caret should have.
 */
function getCaretColor( props ) {
	switch ( true ) {
		case props.isActive:
			return colors.$color_snippet_focus;

		case props.isHovered:
			return colors.$color_snippet_hover;

		default:
			return "transparent";
	}
}

/*
 * The caret is defined in this CSS because we cannot mount/unmount Draft.js.
 *
 * For some reason if you wrap the InputContainer with `.extend` or `styled()`
 * the ReplacementVariableEditor in the children will unmount and mount on every focus.
 * This means that Draft.js cannot keep track of the browser selection. Which
 * breaks the editor completely. We circumvent this by settings the caret styles
 * conditionally.
 */
const InputContainer = styled.div.attrs( {
} )`
	padding: 3px 5px;
	border: 1px solid ${ ( props ) => props.isActive ? "#5b9dd9" : "#ddd" };
	box-shadow: ${ ( props ) => props.isActive ? "0 0 2px rgba(30,140,190,.8);" : "inset 0 1px 2px rgba(0,0,0,.07)" };
	background-color: #fff;
	color: #32373c;
	outline: 0;
	transition: 50ms border-color ease-in-out;
	position: relative;
	font-family: Arial, Roboto-Regular, HelveticaNeue, sans-serif;
	font-size: 14px;
	margin-top: 5px;
	cursor: text;

	&::before {
		display: block;
		position: absolute;
		top: -1px;
		left: -25px;
		width: 24px;
		height: 24px;
		background-image: url( ${ ( props ) => angleRight( getCaretColor( props ) ) });
		background-size: 25px;
		content: "";
	}
`;

const SlugInput = styled.input`
	border: none;
	width: 100%;
	height: inherit;
	line-height: inherit;
	font-family: inherit;
	font-size: inherit;
	color: inherit;

	&:focus {
		outline: 0;
	}
`;

const InputContainerDescription = InputContainer.extend`
	min-height: 60px;
	padding: 2px 6px;
	line-height: 19.6px;
`;

const FormSection = styled.div`
	margin: 32px 0 0;
`;

const StyledEditor = styled.section`
	padding: 10px 20px 0 20px;
`;

const SimulatedLabel = styled.div`
	cursor: pointer;
	font-size: 16px;
	font-family: Arial, Roboto-Regular, HelveticaNeue, sans-serif;
`;

const ReplacementVariableExplanation = styled.p`
	margin: 16px 0;
	font-size: 13px;
`;

class SnippetEditorFields extends React.Component {
	/**
	 * Constructs the snippet editor fields.
	 *
	 * @param {Object}   props                             The props for the editor
	 *                                                     fields.
	 * @param {Object}   props.replacementVariables        The replacement variables
	 *                                                     for this editor.
	 * @param {Object}   props.data                        The initial editor data.
	 * @param {string}   props.data.title                  The initial title.
	 * @param {string}   props.data.slug                   The initial slug.
	 * @param {string}   props.data.description            The initial description.
	 * @param {Function} props.onChange                    Called when the data
	 *                                                     changes.
	 * @param {Function} props.onFocus                     Called when a field is
	 *                                                     focused.
	 * @param {Object}   props.titleLengthProgress       The values for the title
	 *                                                     length assessment.
	 * @param {Object}   props.descriptionLengthProgress The values for the
	 *                                                     description length
	 *                                                     assessment.
	 * @param {string}   props.activeField                 The field that is
	 *                                                     currently active.
	 * @param {string}   props.hoveredField                The field that is
	 *                                                     currently hovered.
	 *
	 *
	 * @returns {void}
	 */
	constructor( props ) {
		super( props );

		this.elements = {
			title: null,
			slug: null,
			description: null,
		};

		this.uniqueId = uniqueId( "snippet-editor-field-" );

		this.setRef = this.setRef.bind( this );
	}

	/**
	 * Sets ref for field editor.
	 *
	 * @param {string} field The field for this ref.
	 * @param {Object} ref The Draft.js react element.
	 *
	 * @returns {void}
	 */
	setRef( field, ref ) {
		this.elements[ field ] = ref;
	}

	/**
	 * Makes sure the focus is correct after mounting the editor fields.
	 *
	 * @returns {void}
	 */
	componentDidMount() {
		this.focusOnActiveFieldChange( null );
	}

	/**
	 * Makes sure the focus is correct after updating the editor fields.
	 *
	 * @param {Object} prevProps The previously received props.
	 *
	 * @returns {void}
	 */
	componentDidUpdate( prevProps ) {
		this.focusOnActiveFieldChange( prevProps.activeField );
	}

	/**
	 * Focuses the currently active field if it wasn't previously active.
	 *
	 * @param {string} prevActiveField The previously active field.
	 *
	 * @returns {void}
	 */
	focusOnActiveFieldChange( prevActiveField ) {
		const { activeField } = this.props;

		if ( activeField !== prevActiveField ) {
			const activeElement = this.elements[ activeField ];
			activeElement.focus();
		}
	}

	/**
	 * Renders the snippet editor.
	 *
	 * @returns {ReactElement} The snippet editor element.
	 */
	render() {
		const {
			activeField,
			hoveredField,
			replacementVariables,
			replacementVariablesExplanation,
			titleLengthProgress,
			descriptionLengthProgress,
			onFocus,
			onChange,
			data: {
				title,
				slug,
				description,
			},
		} = this.props;

		const titleLabelId = `${ this.uniqueId }-title`;
		const slugLabelId = `${ this.uniqueId }-slug`;
		const descriptionLabelId = `${ this.uniqueId }-description`;

		return (
			<StyledEditor>
				<FormSection>
					<SimulatedLabel
						id={ titleLabelId }
						onClick={ () => onFocus( "title" ) } >
						{ __( "SEO title", "yoast-components" ) }
					</SimulatedLabel>
					<InputContainer
						onClick={ () => this.elements.title.focus() }
						isActive={ activeField === "title" }
						isHovered={ hoveredField === "title" }>
						<ReplacementVariableEditor
							content={ title }
							onChange={ content => onChange( "title", content ) }
							onFocus={ () => onFocus( "title" ) }
							replacementVariables={ replacementVariables }
							ref={ ( ref ) => this.setRef( "title", ref ) }
							ariaLabelledBy={ titleLabelId }
						/>
					</InputContainer>
					<ProgressBar
						max={ titleLengthProgress.max }
						value={ titleLengthProgress.actual }
						progressColor={ this.getProgressColor( titleLengthProgress.score ) }
					/>
				</FormSection>
				<FormSection>
					<SimulatedLabel
						id={ slugLabelId }
						onClick={ () => onFocus( "slug" ) } >
						{ __( "Slug", "yoast-components" ) }
					</SimulatedLabel>
					<InputContainer
						onClick={ () => this.elements.slug.focus() }
						isActive={ activeField === "slug" }
						isHovered={ hoveredField === "slug" }>
						<SlugInput
							value={ slug }
							onChange={ event => onChange( "slug", event.target.value ) }
							onFocus={ () => onFocus( "slug" ) }
							innerRef={ ref => this.setRef( "slug", ref ) }
							aria-labelledby={ this.uniqueId + "-slug" }
						/>
					</InputContainer>
				</FormSection>
				<FormSection>
					<SimulatedLabel
						id={ descriptionLabelId }
						onClick={ () => onFocus( "description" ) } >
						{ __( "Meta description", "yoast-components" ) }
					</SimulatedLabel>
					<InputContainerDescription
						onClick={ () => this.elements.description.focus() }
						isActive={ activeField === "description" }
						isHovered={ hoveredField === "description" }>
						<ReplacementVariableEditor
							content={ description }
							onChange={ content => onChange( "description", content ) }
							onFocus={ () => onFocus( "description" ) }
							replacementVariables={ replacementVariables }
							ref={ ( ref ) => this.setRef( "description", ref ) }
							ariaLabelledBy={ descriptionLabelId }
						/>
					</InputContainerDescription>
					<ProgressBar
						max={ descriptionLengthProgress.max }
						value={ descriptionLengthProgress.actual }
						progressColor={ this.getProgressColor( descriptionLengthProgress.score ) }
					/>
					<ReplacementVariableExplanation>{ replacementVariablesExplanation }</ReplacementVariableExplanation>
				</FormSection>
			</StyledEditor>
		);
	}

	/**
	 * Returns the progress color for a given score.
	 *
	 * @param {number} score The score to determine a color for.
	 *
	 * @returns {string} A hex color.
	 */
	getProgressColor( score ) {
		if ( score >= 7 ) {
			return colors.$color_good;
		}

		if ( score >= 5 ) {
			return colors.$color_ok;
		}

		return colors.$color_bad;
	}
}

SnippetEditorFields.propTypes = {
	replacementVariables: replacementVariablesShape,
	onChange: PropTypes.func.isRequired,
	onFocus: PropTypes.func,
	data: PropTypes.shape( {
		title: PropTypes.string.isRequired,
		slug: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
	} ).isRequired,
	activeField: PropTypes.oneOf( [ "title", "slug", "description" ] ),
	hoveredField: PropTypes.oneOf( [ "title", "slug", "description" ] ),
	titleLengthProgress: lengthProgressShape,
	descriptionLengthProgress: lengthProgressShape,
	replacementVariablesExplanation: PropTypes.string,
};

SnippetEditorFields.defaultProps = {
	replacementVariables: [],
	onFocus: () => {},
	titleLengthProgress: {
		max: 600,
		actual: 0,
		score: 0,
	},
	descriptionLengthProgress: {
		max: 156,
		actual: 0,
		score: 0,
	},
	replacementVariablesExplanation: __( "Type '%' to add snippet variables. " +
		"See the 'Help' tab on this page to see all available variables.", "yoast-components" ),
};

export default SnippetEditorFields;
