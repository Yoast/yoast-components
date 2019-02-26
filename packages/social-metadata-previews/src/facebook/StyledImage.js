/* External dependencies */
import styled from "styled-components";

const StyledImage = styled.img`
	width: ${ props => props.imageProperties.width }px;
	height: ${ props => props.imageProperties.height }px;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

export default StyledImage;
