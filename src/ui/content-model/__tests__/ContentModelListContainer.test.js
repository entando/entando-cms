import { mapStateToProps, mapDispatchToProps } from 'ui/content-model/ContentModelListContainer';

const state = {
  contentModel: {
    list: [],
  },
  loading: {},
};

describe('content-model/ContentModelListContainer', () => {
  it('maps stateprops property', () => {
    const props = mapStateToProps(state);
    expect(props).toHaveProperty('contentModels');
  });

  it('maps dispatch property', () => {
    const props = mapDispatchToProps({}, { intl: {} });
    expect(props).toHaveProperty('onDidMount');
    expect(props).toHaveProperty('onConfirmDelete');
  });
});
