import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Routes from 'app-init/Routes';
import IntlProviderContainer from 'ui/locale/IntlProviderContainer';

class App extends Component {
  componentDidMount() {
    const { setupLanguage, lang } = this.props;
    setupLanguage(lang);
  }

  render() {
    return (
      <IntlProviderContainer>
        <Routes />
      </IntlProviderContainer>
    );
  }
}

App.propTypes = {
  setupLanguage: PropTypes.func.isRequired,
  lang: PropTypes.string,
};

App.defaultProps = {
  lang: 'en',
};

export default App;
