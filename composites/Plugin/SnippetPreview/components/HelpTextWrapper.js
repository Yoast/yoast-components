// External dependencies
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import uniqueId from "lodash/uniqueId";

// Internal dependencies
import HelpText from "../../Shared/components/HelpText";
import colors from "../../../../style-guide/colors.json";
import { Button } from "../../Shared/components/Button";
import SvgIcon from "../../Shared/components/SvgIcon";
import { rgba } from "../../../../style-guide/helpers";
import { getHeight } from "../../../../utils/dom";

const HelpTextContainer = styled.div`
	max-width: 600px;
	font-weight: normal;
	margin: 0 20px 0 25px;
`;

const HelpTextPanel = styled.div`
	display: ${ props => props.isHidden ? "none" : "block" };
	max-width: ${ props => props.panelMaxWidth };
	transition: max-height 0.2s ease;
	overflow: hidden;
	max-height: ${ props => props.panelMaxHeight };
`;

const HelpTextButton = styled( Button )`
	min-width: 14px;
	min-height: 14px;
	width: 30px;
	height: 30px;
	border-radius: 50%;
	border: 1px solid transparent;
	box-shadow: none;
	display: block;
	margin: -44px -10px 10px 0;
	background-color: transparent;
	float: right;
	padding: 3px 0 0 6px;
	&:hover {
		color: ${ colors.$color_blue };
	}
	&:focus {
		border: 1px solid ${ colors.$color_blue };
		outline: none;
		box-shadow: 0 0 3px ${ rgba( colors.$color_blue_dark, .8 ) };

		svg {
			fill: ${ colors.$color_blue };
			color: ${ colors.$color_blue };
		}
	}
	&:active {
		box-shadow: none;
	}
`;

const StyledSvg = styled( SvgIcon )`
	vertical-align: center;
	position: relative;
	&:hover {
		fill: ${ colors.$color_blue };
	}
`;

class HelpTextWrapper extends React.Component {
	/**
	 * Constructs the component and sets its initial state.
	 *
	 * @param {Object} props The props to use for this component.
	 */
	constructor( props ) {
		super( props );

		this.state = {
			isHidden: true,
			isExpanded: false,
			panelMaxHeight: "0",
		};

		this.uniqueId = uniqueId( "yoast-help-" );

		this.onButtonClick = this.onButtonClick.bind( this );
		this.setMaxHeight = this.setMaxHeight.bind( this );
		this.resetMaxHeight = this.resetMaxHeight.bind( this );
		this.expandPanel = this.expandPanel.bind( this );
		this.collapsePanel = this.collapsePanel.bind( this );
		this.onTransitionEnd = this.onTransitionEnd.bind( this );
		this.setHelpPanelRef = this.setHelpPanelRef.bind( this );
	}

	/**
	 * Handles the click event on the toggle button.
	 *
	 * @returns {void}
	 */
	onButtonClick() {
		if ( this.state.isExpanded ) {
			this.collapsePanel();
		} else {
			this.expandPanel();
		}
	}

	/**
	 * Sets the Help panel height to a value in pixels.
	 *
	 * @returns {void}
	 */
	setMaxHeight() {
		const height = getHeight( this.helpTextPanel );

		this.setState( {
			panelMaxHeight: height + "px",
		} );
	}

	/**
	 * Resets the Help panel max height to "0".
	 *
	 * @returns {void}
	 */
	resetMaxHeight() {
		this.setState( {
			panelMaxHeight: "0",
		} );
	}

	/**
	 * Unhides and expands the Help panel.
	 *
	 * @returns {void}
	 */
	expandPanel() {
		this.setState( {
			isHidden: false,
			isExpanded: true,
		} );
	}

	/**
	 * Collapses the Help panel.
	 *
	 * @returns {void}
	 */
	collapsePanel() {
		this.setState( {
			isExpanded: false,
		} );
	}

	/**
	 * Toggles the max-height values after an update has occurred.
	 *
	 * @param {Object} prevProps The previous props.
	 * @param {Object} prevState The previous state.
	 * @returns {void}
	 */
	componentDidUpdate( prevProps, prevState ) {
		// When the Help panel is opening we set its max-height value in pixels.
		if ( ! prevState.isExpanded && this.state.isExpanded ) {
			this.setMaxHeight();
		}

		/*
		 * When the Help panel is closing, we first set the max-height to a value
		 * in pixels and then to "0" so the CSS animation can run.
		 */
		if ( prevState.isExpanded && ! this.state.isExpanded ) {
			this.setMaxHeight();
			setTimeout( () => {
				this.resetMaxHeight();
			}, 50 );
		}
	}

	/**
	 * Handles the relevant state properties when the CSS transition has completed.
	 *
	 * @returns {void}
	 */
	onTransitionEnd() {
		// Hides the Help panel at the end of the closing animation.
		if ( this.state.panelMaxHeight === "0" ) {
			this.setState( {
				isHidden: true,
			} );
		} else {
			// Removes the Help panel max-height at the end of the opening animation.
			this.setState( {
				panelMaxHeight: "none",
			} );
		}
	}

	/**
	 * Sets the Help panel element reference for later use.
	 *
	 * @param {Object} panelElement The Help panel element.
	 *
	 * @returns {void}
	 */
	setHelpPanelRef( panelElement ) {
		this.helpTextPanel = panelElement;
	}

	/**
	 * Renders the help text wrapper.
	 *
	 * @returns {ReactElement} The rendered help text wrapper.
	 */
	render() {
		const helpPanelId = `${ this.uniqueId }-panel`;

		return (
			<HelpTextContainer
				className={ this.props.className }
			>
				<HelpTextButton
					className={ this.props.className + "__button" }
					onClick={ this.onButtonClick }
					aria-expanded={ this.state.isExpanded }
					aria-controls={ helpPanelId }
					aria-label={ this.props.helpTextButtonLabel }
				>
					<StyledSvg
						size="16px"
						color={ colors.$color_grey_text }
						icon="question-circle"
					/>
				</HelpTextButton>
				<HelpTextPanel
					id={ helpPanelId }
					className={ this.props.className + "__panel" }
					onTransitionEnd={ this.onTransitionEnd }
					innerRef={ this.setHelpPanelRef }
					panelMaxHeight={ this.state.panelMaxHeight }
					isHidden={ this.state.isHidden }
					panelMaxWidth={ this.props.panelMaxWidth }
				>
					<HelpText text={ this.props.helpText } />
				</HelpTextPanel>
			</HelpTextContainer>
		);
	}
}

HelpTextWrapper.propTypes = {
	className: PropTypes.string,
	helpTextButtonLabel: PropTypes.string.isRequired,
	panelMaxWidth: PropTypes.string,
	helpText: PropTypes.oneOfType( [
		PropTypes.string,
		PropTypes.array,
	] ),
};

HelpTextWrapper.defaultProps = {
	className: "yoast-help",
	panelMaxWidth: null,
	helpText: "",
};

export default HelpTextWrapper;
