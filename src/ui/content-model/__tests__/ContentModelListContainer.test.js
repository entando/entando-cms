import { mapStateToProps, mapDispatchToProps } from 'ui/content-model/ContentModelListContainer';

const state = {
  apps: {
    cms: {
      contentModel: {
        list: [],
      },
    },
  },
  loading: {},
  pagination: {
    global: {
      page: 1,
      pageSize: 10,
      lastPage: 1,
      totalItems: 0,
    },
  },
};

describe('content-model/ContentModelListContainer', () => {
  it('maps stateprops property', () => {
    const props = mapStateToProps(state);
    expect(props).toHaveProperty('contentModels');
  });

  it('maps dispatch property', () => {
    const props = mapDispatchToProps({}, { intl: {} });
    expect(props).toHaveProperty('onDidMount');
    expect(props).toHaveProperty('onClickDelete');
  });
});
