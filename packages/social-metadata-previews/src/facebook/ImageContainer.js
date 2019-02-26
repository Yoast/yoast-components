/* External dependencies */
import styled from "styled-components";

/* Internal dependencies */
import colors from "../../../../style-guide/colors.json";

const ImageContainer = styled.div`
	position: relative;
	height: ${ props => props.dimensions.height };
	width: ${ props => props.dimensions.width };
	overflow: hidden;
	background-color: ${ colors.$color_white };
`;

export default ImageContainer;
