import reducer from 'state/content-type/reducer';
import {
  setContentTypeList,
  removeContentType,
  removeAttribute,
  setSelectedContentType,
  setSelectedAttributeContentType,
  setContentTypeAttributes,
  setSelectedAttribute,
  setContentTypeReferenceStatus,
} from 'state/content-type/actions';
import {
  GET_CONTENT_TYPE_RESPONSE_OK,
  CONTENT_TYPES_OK_PAGE,
  CONTENT_TYPES_ATTRIBUTES,
  CONTENT_TYPE_ATTRIBUTE,
  CONTENT_TYPE_REFERENCES_STATUS,
} from 'testutils/mocks/contentType';

const contentTypesList = ['ABC', 'DEF'];

const STATE_REMOVE_ATTRIBUTE = {
  code: 'AAA',
  attributes: [{ type: 'text', code: 'attrCode' }, { type: 'text', code: 'attrCode1' }],
};

describe('state/content-type/reducer', () => {
  let state = reducer();
  let newState;

  it('should return an object', () => {
    expect(typeof state).toBe('object');
  });

  describe('after action SET_DATA_TYPES', () => {
    beforeEach(() => {
      newState = reducer(state, setContentTypeList(CONTENT_TYPES_OK_PAGE.payload));
    });

    it('should define the ContentType payload', () => {
      expect(newState.list).toMatchObject(contentTypesList);
    });
  });

  describe('afert action REMOVE_CONTENT_TYPE', () => {
    it('should define the new state', () => {
      state = { list: ['AAA'] };
      newState = reducer(state, removeContentType('AAA'));
      expect(newState.list).toMatchObject([]);
    });
  });

  describe('after action REMOVE_ATTRIBUTE', () => {
    it('should define the new state', () => {
      newState = reducer(
        { selected: STATE_REMOVE_ATTRIBUTE },
        removeAttribute('AAA', 'attrCode'),
      );
      expect(newState.selected).toMatchObject({
        code: 'AAA',
        attributes: [{ type: 'text', code: 'attrCode1' }],
      });
    });
  });

  describe('after action SET_SELECTED_DATA_TYPE', () => {
    beforeEach(() => {
      newState = reducer(state, setSelectedContentType(GET_CONTENT_TYPE_RESPONSE_OK));
    });

    it('should define the selected payload', () => {
      expect(newState).toHaveProperty('selected');
      expect(newState.selected).toBe(GET_CONTENT_TYPE_RESPONSE_OK);
    });
  });

  describe('after action SET_SELECTED_ATTRIBUTE_FOR_CONTENTTYPE', () => {
    beforeEach(() => {
      newState = reducer(state, setSelectedContentType(GET_CONTENT_TYPE_RESPONSE_OK));
    });

    it('should define the attributeSelected payload', () => {
      expect(newState).toHaveProperty('selected');
      newState = reducer(
        newState,
        setSelectedAttributeContentType(GET_CONTENT_TYPE_RESPONSE_OK.attributes[0]),
      );
      expect(newState).toHaveProperty('selected.attributeSelected', GET_CONTENT_TYPE_RESPONSE_OK.attributes[0]);
    });
  });

  describe('after action SET_ATTRIBUTES', () => {
    beforeEach(() => {
      newState = reducer(state, setContentTypeAttributes(CONTENT_TYPES_ATTRIBUTES));
    });

    it('should define the attributes payload', () => {
      expect(newState).toHaveProperty('attributes');
      expect(newState).toHaveProperty('attributes.list');
      expect(newState.attributes.list).toMatchObject(CONTENT_TYPES_ATTRIBUTES);
    });
  });

  describe('after action SET_SELECTED_ATTRIBUTE', () => {
    beforeEach(() => {
      newState = reducer(state, setSelectedAttribute(CONTENT_TYPE_ATTRIBUTE));
    });

    it('should define the selected payload', () => {
      expect(newState).toHaveProperty('attributes');
      expect(newState).toHaveProperty('attributes.selected');
      expect(newState.attributes.selected).toMatchObject(CONTENT_TYPE_ATTRIBUTE);
    });
  });

  describe('after action SET_DATA_TYPE_REFERENCE_STATUS', () => {
    beforeEach(() => {
      newState = reducer(state, setContentTypeReferenceStatus(CONTENT_TYPE_REFERENCES_STATUS));
    });

    it('should define the references.status payload', () => {
      expect(newState).toHaveProperty('references');
      expect(newState).toHaveProperty('references.status');
      expect(newState.references.status).toMatchObject(CONTENT_TYPE_REFERENCES_STATUS);
    });
  });
});
