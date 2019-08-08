import { mapStateToProps, mapDispatchToProps } from 'ui/content-model/AddContentModelFormContainer';

describe('content-model/AddContentModelFormContainer', () => {
  it('maps stateprops property', () => {
    const props = mapStateToProps();
    expect(props).toHaveProperty('contentTypes');
  });

  it('maps dispatch property', () => {
    const props = mapDispatchToProps({}, { intl: {}, history: {} });
    expect(props).toHaveProperty('onSubmit');
  });
});
