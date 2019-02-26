/* External dependencies */
import styled from "styled-components";

/* Internal dependencies */
import colors from "../../../../style-guide/colors.json";

const ErrorImage = styled.p`
	display: flex;
	justify-content: center;
	align-items: center;
	box-sizing: border-box;
	width: 500px;
	height: 261px;
	max-width: 100%;
	margin: 0;
	padding: 1em;
	text-align: center;
	font-size: 1rem;
	color: ${ colors.$color_white };
	background-color: ${ colors.$color_red };
`;

export default ErrorImage;
