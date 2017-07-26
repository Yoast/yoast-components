import * as React from "react";

class IFrame extends React.Component {
	constructor( props ) {
		super( props );
	}

	render() {
		return ( <iframe {...this.props} />	);
	}
}

export default IFrame;
