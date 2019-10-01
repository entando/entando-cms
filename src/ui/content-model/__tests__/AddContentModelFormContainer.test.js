import { mapStateToProps, mapDispatchToProps } from 'ui/content-model/AddContentModelFormContainer';

const state = {
  apps: {
    cms: {
      contentType: {
        list: [],
      },
    },
  },
};

describe('content-model/AddContentModelFormContainer', () => {
  it('maps stateprops property', () => {
    const props = mapStateToProps(state);
    expect(props).toHaveProperty('contentTypes');
  });

  it('maps dispatch property', () => {
    const props = mapDispatchToProps({}, { intl: {}, history: {} });
    expect(props).toHaveProperty('onSubmit');
    expect(props).toHaveProperty('onDidMount');
  });
});
