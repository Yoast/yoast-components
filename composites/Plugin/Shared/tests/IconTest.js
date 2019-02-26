import React from "react";
import renderer from "react-test-renderer";

import Icon from "../../../../packages/components/src/icons/Icon";
import YoastSeoIcon from "../../../../packages/components/src/icons/YoastSeoIcon";

test( "the Icon without props matches the snapshot", () => {
	const component = renderer.create(
		<Icon icon={ YoastSeoIcon } />
	);

	const tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );

test( "the Icon with props matches the snapshot", () => {
	const component = renderer.create(
		<Icon icon={ YoastSeoIcon } color="red" width="200px" height="200px" />
	);

	const tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );
