import { Component } from 'react';
import { withRouter } from 'react-router-dom';

// take from React Router documentation to make sure it scrolls to top each time a new component is rendered
// https://reacttraining.com/react-router/web/guides/scroll-restoration/scroll-to-top
class ScrollToTop extends Component {
	componentDidUpdate(prevProps) {
		if (this.props.location !== prevProps.location) {
			window.scrollTo(0, 0);
		}
	}

	render() {
		return this.props.children;
	}
}

export default withRouter(ScrollToTop);
