import React from "react";
import ReactDOM from "react-dom";

import Wizard from "./composites/OnboardingWizard/OnboardingWizard";
import Config from "./composites/OnboardingWizard/config/config";

class App extends React.Component {
	constructor() {
		super();

		this.state = {};
	}

	render() {
		return ( <Wizard {...Config} />	);
	}
}

ReactDOM.render( <App />, document.getElementById( 'container' ) );

export default App;
