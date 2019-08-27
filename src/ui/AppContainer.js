import { connect } from 'react-redux';
import { setLanguage } from 'state/locale/actions';
import App from 'ui/App';

export const mapDispatchToProps = dispatch => ({
  setupLanguage: lang => dispatch(setLanguage(lang)),
});

const AppContainer = connect(null, mapDispatchToProps)(App);

export default AppContainer;
