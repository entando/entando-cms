import {
  mapStateToProps,
  mapDispatchToProps,
} from 'ui/edit-content/content-attributes/ContentAttributesContainer';

const state = {
  apps: {
    cms: {
      contentType: {
        selected: {
          attributes: [
            { code: 'Title', type: 'Text' },
          ],
        },
      },
      contents: {
        selected: {
          attributes: [
            { code: 'Title', value: 'Test title' },
          ],
        },
      },
    },
  },
};

describe('edit-content/content-attributes/ContentAttributesContainer', () => {
  it('mapStateToProps should return correct object', () => {
    const props = mapStateToProps(state, { attributes: [{ code: 'Title', value: 'Test title' }] });
    const expectedState = [{
      code: 'Title',
      type: 'Text',
      value: 'Test title',
    }];
    expect(props).toHaveProperty('attributes', expectedState);
  });

  it('mapDispatchToProps should return correct object with functions that call dispatch', () => {
    const dispatchMock = jest.fn();
    const props = mapDispatchToProps(dispatchMock, { typeCode: 'TES' });
    expect(props).toHaveProperty('onDidMount');
    props.onDidMount();
    expect(dispatchMock).toHaveBeenCalled();
  });
});
