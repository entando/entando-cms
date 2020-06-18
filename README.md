# Entando CMS

This project contains the `App Builder` screens for the CMS app of Entando.

For more information and documentation visit:  https://dev.entando.org, or https://forum.entando.org. Or for the latest news or product information please visit the main website: https://www.entando.com.

Information below is for building and running locally directly from source.

---

# Developer Prerequesites

It is recommended to install `npm-install-peers` (`npm i -g npm-install-peers`) to install peer dependencies. So when you install npm dependencies, you can only install at one command: `npm i && npm-install-peers` - this will download all your dependencies specified in `package.json` including the `peerDependencies`. This is to enable standalone mode during development phases. Take note that whenever you install a new npm module, this will erase all the peer dependencies, so you have to re-run `npm-install-peers` after installing.

# Configuration example

Put following config into `.env.local` file to configure your app for local development:
```
NODE_PATH=src/
REACT_APP_DOMAIN=http://tests.serv.run/entando-sample
REACT_APP_USE_MOCKS=false
REACT_APP_CLIENT_ID=appbuilder
REACT_APP_CLIENT_SECRET=appbuilder_secret
```

# Integration with app-builder

The screens won't be currently integrated within app builder until the integration story has been completed.
In the meanwhile all the development must be done in isolation with the app rendering straight away just the main screen of the CMS app.

`@entando/apimanager` and other libraries that will be shared with app-builder have to be loaded inside the project as `peer dependencies`.

The menu itself must not be present in the screens, as it will appear within the app-builder, but the paths must be respected using `react-router-dom`.

---

# Code Styling Rules

here follow the rules when it comes to code styling.

## Linting
Several linting standards have been applied to the project. On the git `pre-commit` hook all the linters are being run through the project.
It is possible to disable a specific linting rule for one row of a file, but the linter should never been disabled for the entire file nor the entirety of the linter should be disabled for the given line.

A good instance in which it is recommended to disable the linter on a file is when doing a named export in a file that currently only posses one export (i.e. `types` files in states).

## Testing

A code coverage of 90% should be applied to any file that is not part of the UI. This includes eventual helpers, states related files, etc...

To test the code coverage, use command `npm run coverage` and see the results after testing or if you want to see more details of the test, locate the `coverage/lcov-report` to browse detailed results.

## General recommendations

The blue print project only carries the bare minimum essentials.
Anything that is UI related should be located within the UI directory, and then subdivided in sub directories based on their domain.
Common files (i.e. form inputs wrappers) should be located within the `src/ui/common` directory.

Any app init related functionality should be located in its own file within the `src/app-init` directory (i.e. fontawesome setup).
The `index.js` should be only be importing init related files, css files and so forth.

`Sass` is a requirement. The project is already setup to accommodate sass and linting rules have already been predefined. All of them should be located within the `src/sass` directory.

Images should be located within the images directory. It is highly recommended to use `svg` files whenever possible. Files located in this directory can also be imported directly by the sass files.

Any helper should be located within the `src/helpers` directory. Helpers exclusively for unit tests should be located in `testutils/helpers.js` file. Browse the file for existing test helpers such as the router, i18n, mock store, etc.

Mock objects for your API wrappers (see `api` folder) and unit tests should be located within `testutils/mocks` folder. See folder for examples.

Imports should always be absolute, and not relative.

`Magic Words` and `Magic Numbers` are not allowed.

## Redux State

reducers should be imported in the root reducer and be sorted alphabetically in the `combineReducers` arguments.
Each state is made up of 4 files:

### types.js
contains constants used to define the action types. Each constant value should be following the given pattern:

```js
export const ADD_MESSAGE = 'messages/add-message';
```

the first part of the constant value should always be the name of the reducer itself.

### actions.js
contains both actions and thunks. Thunks are meant to be located at the bottom of the file, while normal actions are at the top.

Thunks tests should always be checking that all the given actions within the thunk are being called with the correct arguments and in the right order:

```js
import { createMockStore } from 'testutils/helpers';

const INITIAL_STATE = {};

const store = createMockStore(INITIAL_STATE);

it('fetchDigitalExchanges calls setDigitalExchanges and setPage actions', (done) => {
  store.dispatch(fetchDigitalExchanges()).then(() => {
    const actions = store.getActions();
    expect(actions).toHaveLength(4);
    expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
    expect(actions[1]).toHaveProperty('type', SET_DIGITAL_EXCHANGES);
    expect(actions[2]).toHaveProperty('type', SET_PAGE);
    expect(actions[3]).toHaveProperty('type', TOGGLE_LOADING);
    done();
  }).catch(done.fail);
});
```

### reducer.js
reducers can be devided in several reducers using the `combineReducers` method before exporting. This is recommended when the state itself is extremely complex.
Each reducer should also always return a default.

### selectors.js
selectors should always be generated using reselect to ensure memoization.

## Containers
Containers should always be separate from the UI component that they wrap, and they should always be located within the same directory of the UI component. The naming convention that we use here is that the Container is always named after the UI componet with the `Container` suffix.

```js
import { connect } from 'react-redux';

import { getApis, getPlugins } from 'state/dashboard/selectors';
import { fetchIntegration } from 'state/dashboard/actions';
import Integrations from 'ui/dashboard/Integrations';

export const mapDispatchToProps = dispatch => ({
  onDidMount: () => dispatch(fetchIntegration()),
});

export const mapStateToProps = state => (
  {
    apis: getApis(state),
    plugins: getPlugins(state),
  }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Integrations);

```

it is allowed to named export the `mapStateToProps` and `mapDispatchToProps` constants for testing purposes but it should be avoided.

## Forms testing
redux form is pre-installed in the project and can be used when necessary.
Forms created with it should be tested properly to check both whether a certain field is present and if any validation rules are applied to it.

```js
import { shallow } from 'enzyme';

describe('SettingsFormBody', () => {
  const component = shallow(<SettingsFormBody />);

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('contains the name field', () => {
    const element = component.find('Field[name="name"]');
    expect(element.exists()).toBe(true);
    const props = element.props();
    expect(props).toHaveProperty('validate', [required, maxLength50]);
    expect(props).toHaveProperty('component', RenderTextInput);
  });

  it('contains the url field', () => {
    const element = component.find('Field[name="url"]');
    expect(element.exists()).toBe(true);
    const props = element.props();
    expect(props).toHaveProperty('validate', [required]);
    expect(props).toHaveProperty('component', RenderTextInput);
  });

  it('contains the key field', () => {
    const element = component.find('Field[name="key"]');
    expect(element.exists()).toBe(true);
    const props = element.props();
    expect(props).toHaveProperty('validate', [required]);
    expect(props).toHaveProperty('component', RenderTextInput);
  });

  it('contains the timeout field', () => {
    const element = component.find('Field[name="timeout"]');
    expect(element.exists()).toBe(true);
    const props = element.props();
    expect(props).toHaveProperty('validate', [required, isNumber]);
    expect(props).toHaveProperty('component', RenderTextInput);
  });

  it('contains the active field', () => {
    const element = component.find('Field[name="active"]');
    expect(element.exists()).toBe(true);
    const props = element.props();
    expect(props).toHaveProperty('component', SwitchRenderer);
  });

});
```
