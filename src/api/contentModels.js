import { makeRequest, METHODS } from '@entando/apimanager';
import { GET_CONTENT_MODELS_RESPONSE_OK } from 'testutils/mocks/contentModel';

const contentModelsPath = '/api/plugins/cms/contentmodels';

// eslint-disable-next-line import/prefer-default-export
export const getContentModels = (page = { page: 1, pageSize: 10 }, params = '') => (
  makeRequest(
    {
      uri: `${contentModelsPath}${params}`,
      method: METHODS.GET,
      mockResponse: GET_CONTENT_MODELS_RESPONSE_OK,
      contentType: 'application/json',
      useAuthentication: true,
      errors: () => [],
    },
    page,
  )
);

export const postContentModel = contModelObject => makeRequest({
  uri: contentModelsPath,
  body: contModelObject,
  method: METHODS.POST,
  mockResponse: GET_CONTENT_MODELS_RESPONSE_OK[0],
  useAuthentication: true,
});

export const getContentModel = id => (
  makeRequest(
    {
      uri: `${contentModelsPath}/${id}`,
      method: METHODS.GET,
      mockResponse: GET_CONTENT_MODELS_RESPONSE_OK[0],
      contentType: 'application/json',
      useAuthentication: true,
    },
  )
);

export const putContentModel = contModelObject => makeRequest({
  uri: `${contentModelsPath}/${contModelObject.id}`,
  body: contModelObject,
  method: METHODS.PUT,
  mockResponse: GET_CONTENT_MODELS_RESPONSE_OK[0],
  useAuthentication: true,
});

export const deleteContentModel = id => makeRequest({
  uri: `${contentModelsPath}/${id}`,
  method: METHODS.DELETE,
  mockResponse: { code: '<contenTModelId>' },
  useAuthentication: true,
});
