import { connect } from 'react-redux';
import { get } from 'lodash';
import { injectIntl, defineMessages } from 'react-intl';
import { setSearchAttribute, filterContentModelBySearch, setSearchKeyword } from 'state/content-model/actions';
import {
  getContentModelSearchAttribute,
  getContentModelSearchKeyword,
} from 'state/content-model/selectors';

import ContentModelSearchForm from 'ui/content-model/ContentModelSearchForm';

const optionMap = [
  {
    label: 'cms.contentmodel.searchFilter.valueName',
    value: 'descr',
  },
  {
    label: 'cms.contentmodel.form.code',
    value: 'contentType',
  },
];

const msgMap = optionMap.reduce((acc, { label, value }) => ({
  ...acc,
  [value]: { id: label },
}), {});

export const mapStateToProps = (state, { intl }) => {
  const msgs = defineMessages(msgMap);
  const selectOptions = optionMap.map((option) => {
    msgMap[option.value].label = intl.formatMessage(msgs[option.value]);
    return {
      ...option,
      label: msgMap[option.value].label,
    };
  });
  const value = getContentModelSearchAttribute(state);
  return {
    searchTerm: getContentModelSearchKeyword(state),
    selectOptions,
    selectedAttribute: {
      value,
      label: get(msgMap, `${value}.label`, ''),
    },
  };
};

export const mapDispatchToProps = dispatch => ({
  onDidMount: () => {
    dispatch(setSearchKeyword(''));
    dispatch(setSearchAttribute('descr'));
  },
  onChangeSearchType: evkey => (
    dispatch(setSearchAttribute(optionMap[evkey - 1].value))
  ),
  onSubmit: ({ keyword }) => {
    dispatch(filterContentModelBySearch(keyword));
  },
});

const ContentModelSearchFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {
    pure: false,
  },
)(ContentModelSearchForm);

export default injectIntl(ContentModelSearchFormContainer);
