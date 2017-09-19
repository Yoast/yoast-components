import React from "react";
import renderer from "react-test-renderer";

import WordPressFeed from "../components/WordPressFeed";

test( "the WordPressFeed matches the snapshot", () => {
	const feed = {
		link: "https://www.yoast.com",
		title: "Feed title",
		items: [
			{
				title: "WordPress SEO",
				link: "https://www.yoast.com/1",
				description: "Some arbitrary description any blog post could have",
			},
			{
				title: "WordPress SEO",
				link: "https://www.yoast.com/2",
				description: "Some arbitrary description any blog post could have",
			},
		],
	};

	const component = renderer.create(
		<WordPressFeed
			feed={ feed }
			/>
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );
