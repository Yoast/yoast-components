/* External dependencies */
import styled from "styled-components";

/* Internal dependencies */
import breakpoints from "../../../../style-guide/responsive-breakpoints.json";

const DismissButton = styled.button`
	flex: 0 0 40px;
	height: 40px;
	border: 0;
	margin: 0 0 0 10px;
	padding: 0;
	background: transparent;
	cursor: pointer;

	@media screen and ( max-width: ${ breakpoints.mobile } ) {
		width: 40px;
		position: absolute;
		top: 5px;
		right: 5px;
		margin: 0;
	}
`;

export default DismissButton;
