import React from "react";
import renderer from "react-test-renderer";

import { BaseButton, SnippetPreviewButton, IconButton } from "../components/Button";
import { edit } from "../../../style-guide/svg";

test( "the BaseButton matches the snapshot", () => {
	const component = renderer.create(
		<BaseButton>ButtonValue</BaseButton>
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );

test( "BaseButton executes callback", () => {
	const component = renderer.create(
		<BaseButton onClick={
			() => {
				return "clicked";
			}
		}>ButtonValue</BaseButton>
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();

	tree.props.onClick();

	tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );

test( "the SnippetPreviewButton matches the snapshot", () => {
	const component = renderer.create(
		<SnippetPreviewButton>ButtonValue</SnippetPreviewButton>
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );

test( "SnippetPreviewButton executes callback", () => {
	const component = renderer.create(
		<SnippetPreviewButton onClick={
			() => {
				return "clicked";
			}
		}>ButtonValue</SnippetPreviewButton>
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();

	tree.props.onClick();

	tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );

test( "the IconButton matches the snapshot", () => {
	const component = renderer.create(
		<IconButton icon={ edit } iconColor="black" />
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );

test( "the IconButton with text matches the snapshot", () => {
	const component = renderer.create(
		<IconButton icon={ edit } iconColor="black">Click</IconButton>
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );
