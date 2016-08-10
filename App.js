import React from 'react';
import ReactDOM from 'react-dom';

import Input from  './forms/Input';
import ScreenReaderText from './a11y/ScreenReaderText';
import ScreenReaderShortcut from './a11y/ScreenReaderShortcut';

class App extends React.Component {
	render() {
		return (
			<div>
				<ScreenReaderShortcut anchor="hello">
					Jump to main content
				</ScreenReaderShortcut>
				<a href="http://example.org">Demo text and some
				<ScreenReaderText>
				test 123
				</ScreenReaderText></a>
			</div>
		)
	}
};

ReactDOM.render( <App />, document.getElementById( 'container' ) );
