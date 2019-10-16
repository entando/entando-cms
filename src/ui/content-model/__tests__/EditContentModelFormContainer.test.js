import {
  mapStateToProps,
  mapDispatchToProps,
} from 'ui/content-model/EditContentModelFormContainer';

const state = {
  contentType: {
    list: [
      {
        code: 'WEh',
        name: 'yo',
      },
      {
        code: 'MOO',
        name: 'to',
      },
    ],
  },
  contentModel: {
    opened: {
      id: 1,
      contentType: 'WEh',
      descr: 'b',
    },
  },
};

describe('content-model/EditContentModelFormContainer', () => {
  it('maps stateprops property', () => {
    const props = mapStateToProps(state);
    expect(props).toHaveProperty('contentTypes');
    expect(props).toHaveProperty('mode');
    expect(props.mode).toBe('edit');
    expect(props).toHaveProperty('initialValues');
    expect(props.initialValues).toEqual({
      id: 1,
      contentType: { code: 'WEh', name: 'yo' },
      descr: 'b',
    });
  });

  it('maps dispatch property', () => {
    const props = mapDispatchToProps({}, { intl: {}, history: {}, match: { params: 1 } });
    expect(props).toHaveProperty('onSubmit');
    expect(props).toHaveProperty('onDidMount');
  });
});
