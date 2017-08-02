import React from "react";
import ReactDOM from "react-dom";

import Wizard from "./composites/OnboardingWizard/OnboardingWizard";
import Config from "./composites/OnboardingWizard/config/production-config";
import SearchResultsEditor from "./composites/SearchResultEditor/SearchResultEditor";
import apiConfig from "./composites/OnboardingWizard/config/api-config";
import Loader from "./composites/basic/Loader";

// Required to make Material UI work with touch screens.
import injectTapEventPlugin from "react-tap-event-plugin";
import HelpCenter from "./composites/HelpCenter/HelpCenter";

function cloneDeep( object ) {
	return JSON.parse( JSON.stringify( object ) );
}

class App extends React.Component {

	constructor() {
		super();

		injectTapEventPlugin();

		this.state = {
			activeComponent: "helpcenter",
		};
	}

	getContent() {
		var content;

		switch ( this.state.activeComponent ) {
			case "search-results-editor":
				content = <SearchResultsEditor />;
				break;

			case "loader":
				content = <Loader />;
				break;

			case "helpcenter":
				content = <HelpCenter/>;
				break;

			case "wizard":
			default:
				let config = cloneDeep( Config );

				// @todo: Add customComponents manually, because cloneDeep is clearing the value of it. Should be solved.
				config.customComponents = Config.customComponents;
				config.endpoint = apiConfig;

				content = <Wizard {...config} />;
				break;
		}

		return content;
	}

	navigate( activeComponent, event ) {
		this.setState({
			activeComponent: activeComponent
		});
	}

	getMenu() {
		return (
			<nav style={ {padding: "0 0 1rem 0", textAlign: "center", borderBottom: "1px solid #ddd" } }>
				<button type="button" onClick={this.navigate.bind( this, "wizard" )}>Wizard</button>
				<button type="button" onClick={this.navigate.bind( this, "search-results-editor" )}>Search results editor</button>
				<button type="button" onClick={this.navigate.bind( this, "loader" )}>Loader</button>
				<button type="button" onClick={this.navigate.bind( this, "helpcenter" )}>Help Center</button>
			</nav>
		);
	}

	render() {
		return (
			<div style={ { boxSizing: "border-box" } }>
				{this.getMenu()}
				{this.getContent()}
			</div>
		);
	}
}

ReactDOM.render( <App />, document.getElementById( 'container' ) );
