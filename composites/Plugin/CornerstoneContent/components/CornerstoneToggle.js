import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Toggle from "../../Shared/components/Toggle";
import { __ } from "@wordpress/i18n";

const Cornerstone = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 5px;

	label { 
		margin-right: 10px;
		flex: 1;
	}
`;

class CornerstoneToggle extends React.Component {
	/**
	 * Renders the CornerstoneToggle component.
	 *
	 * @returns {ReactElement} the CornerstoneToggle component.
	 */
	render() {
		return (
			<Cornerstone>
				<Toggle
					id="cornerstone_toggle"
					ariaLabel={ __( "Mark this post as cornerstone content", "yoast-components" ) }
					labelText={ __( "Mark this as cornerstone content.", "yoast-components" ) }
					isEnabled={ this.props.isEnabled }
					onSetToggleState={ this.props.onToggle }
					onToggleDisabled={ this.props.onToggleDisabled }
				/>
			</Cornerstone>
		);
	}
}

CornerstoneToggle.propTypes = {
	isEnabled: PropTypes.bool,
	onSetToggleState: PropTypes.func,
	onToggle: PropTypes.func,
	disable: PropTypes.bool,
	onToggleDisabled: PropTypes.func,
};

export default CornerstoneToggle;
