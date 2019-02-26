/* External dependencies */
import styled from "styled-components";

/* Internal dependencies */
import { MAX_WIDTH } from "./constants";

const MobileContainer = styled.div`
	border-bottom: 1px hidden #fff;
	border-radius: 2px;
	box-shadow: 0 1px 2px rgba(0,0,0,.2);
	font-family: Arial, Roboto-Regular, HelveticaNeue, sans-serif;
	max-width: ${ MAX_WIDTH }px;
	box-sizing: border-box;
	font-size: 14px;
`;

export default MobileContainer;
