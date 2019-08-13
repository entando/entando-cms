import { mapStateToProps, mapDispatchToProps } from 'ui/content-model/ContentModelListContainer';

const state = {
  contentModel: {
    list: [],
  },
};

describe('content-model/ContentModelListContainer', () => {
  it('maps stateprops property', () => {
    const props = mapStateToProps(state);
    expect(props).toHaveProperty('contentModels');
  });

  it('maps dispatch property', () => {
    const props = mapDispatchToProps({});
    expect(props).toHaveProperty('onDidMount');
  });
});
