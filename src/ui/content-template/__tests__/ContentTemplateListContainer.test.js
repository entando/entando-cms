import { mapStateToProps, mapDispatchToProps } from 'ui/content-template/ContentTemplateListContainer';

const state = {
  apps: {
    cms: {
      contentTemplate: {
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

describe('content-template/ContentTemplateListContainer', () => {
  it('maps stateprops property', () => {
    const props = mapStateToProps(state);
    expect(props).toHaveProperty('contentTemplates');
  });

  it('maps dispatch property', () => {
    const props = mapDispatchToProps({}, { intl: {} });
    expect(props).toHaveProperty('onDidMount');
    expect(props).toHaveProperty('onClickDelete');
  });
});
