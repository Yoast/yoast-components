/* External dependencies */
import styled from "styled-components";

/* Internal dependencies */
import { MAX_WIDTH, COLOR_TITLE } from "./constants";

const Title = styled.div`
	color: ${ COLOR_TITLE };
	text-decoration: none;
	font-size: 18px;
	line-height: 1.2;
	font-weight: normal;
	margin: 0;

	display: inline-block;
	overflow: hidden;
	max-width: ${ MAX_WIDTH }px;
	vertical-align: top;
	text-overflow: ellipsis;
`;

export default Title;
