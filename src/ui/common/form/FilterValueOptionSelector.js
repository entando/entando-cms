import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { FormattedMessage, FormattedHTMLMessage, intlShape } from 'react-intl';
import { Collapse } from 'react-collapse';

import RadioInput from 'ui/common/form/RenderRadioInput';

import {
  TEXT_FILTERABLE_ATTRIBUTES,
  DATE_FILTERABLE_ATTRIBUTES,
  BOOL_FILTERABLE_ATTRIBUTES,
} from 'state/content-type/selectors';

const TEXT_FILTERABLE = 'text_filterable_type';
const DATE_FILTERABLE = 'date_filterable_type';
const BOOL_FILTERABLE = 'boolean_filterable_type';

const HAS_VALUE = 'valuePresence';
const HAS_NO_VALUE = 'valueAbsence';
const BY_VALUE_ONLY = 'valueOnly';
const BY_VALUE_PARTIAL = 'valuePartial';
const BY_RANGE = 'valueRange';

class FilterValueOptionSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterableType: '',
      expanded: false,
      optionSelected: '',
    };
    this.handleHeadlineClick = this.handleHeadlineClick.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { attributeFilterChoices: prevAttr } = prevProps;
    const { attributeFilterChoices: attr, value: { attributeFilter } } = this.props;
    if (attr && attributeFilter && (prevAttr.length !== attr.length)) {
      const filterableType = this.determineFilterableType();
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        filterableType,
        optionSelected: this.determineOptionSelected(filterableType),
      });
    }
  }

  getAttributeType() {
    const { value } = this.props;
    const { key } = value;
    const { attributeFilterChoices } = this.props;
    const selectedAttributeType = attributeFilterChoices.find(attribute => attribute.code === key);
    return get(selectedAttributeType, 'type', '');
  }

  determineFilterableType() {
    const type = this.getAttributeType();
    if (TEXT_FILTERABLE_ATTRIBUTES.includes(type)) {
      return TEXT_FILTERABLE;
    }
    if (DATE_FILTERABLE_ATTRIBUTES.includes(type)) {
      return DATE_FILTERABLE;
    }
    if (BOOL_FILTERABLE_ATTRIBUTES.includes(type)) {
      return BOOL_FILTERABLE;
    }
    return '';
  }

  determineOptionSelected(filterableType) {
    const { value: propValue } = this.props;
    const {
      value,
      start,
      end,
      nullValue,
    } = propValue;
    if (value) {
      return filterableType === TEXT_FILTERABLE ? BY_VALUE_PARTIAL : BY_VALUE_ONLY;
    }
    if (start || end) {
      return BY_RANGE;
    }
    if (nullValue) {
      return HAS_NO_VALUE;
    }
    return HAS_VALUE;
  }

  handleHeadlineClick() {
    const { expanded } = this.state;
    this.setState({ expanded: !expanded });
  }

  renderLabelWithSort(node) {
    const { value } = this.props;
    const { order } = value;
    return (
      <Fragment>
        {node}{order && (
          <FormattedMessage id={`widget.form.filterable.sort${order}`} />
        )}
      </Fragment>
    );
  }

  renderLabelValue() {
    const { value, intl } = this.props;
    const { key, attributeFilter } = value;
    const { optionSelected, filterableType } = this.state;
    if (!attributeFilter) {
      return this.renderLabelWithSort(
        <FormattedMessage
          id={`widget.form.filteropt.${key === 'created' ? 'creationDate' : 'lastModify'}`}
        />,
      );
    }
    const {
      value: filterValue,
      start,
      end,
      valueDateDelay,
      startDateDelay,
      endDateDelay,
      likeOption,
    } = value;

    if (filterableType === BOOL_FILTERABLE) {
      if (filterValue !== null) {
        return this.renderLabelWithSort(
          <FormattedHTMLMessage
            id="widget.form.filterable.valueOnly"
            values={{ value: filterValue ? 'true' : 'false' }}
          />,
        );
      }
      return this.renderLabelWithSort(null);
    }

    switch (optionSelected) {
      case BY_VALUE_ONLY:
        return this.renderLabelWithSort(
          <Fragment>
            <FormattedHTMLMessage
              id="widget.form.filterable.valueOnly"
              values={{ value: filterValue }}
            />
            {valueDateDelay && (
              <FormattedHTMLMessage
                id="widget.form.filterable.valueDateDelay"
                values={{ delay: valueDateDelay }}
              />
            )}
          </Fragment>,
        );
      case BY_VALUE_PARTIAL: {
        const partial = likeOption
          && intl.formatMessage({ id: 'widget.form.filterable.valuePartialPhrase' });
        return this.renderLabelWithSort(
          <FormattedHTMLMessage
            id="widget.form.filterable.valuePartial"
            values={{ value: filterValue, partial }}
          />,
        );
      }
      case BY_RANGE: {
        const fromMsg = start && (
          <Fragment>
            <FormattedHTMLMessage
              id="widget.form.filterable.valueRangeStart"
              values={{ start }}
            />
            {startDateDelay && (
              <FormattedHTMLMessage
                id="widget.form.filterable.valueDateDelay"
                values={{ delay: startDateDelay }}
              />
            )}
          </Fragment>
        );
        const toMsg = end && (
          <Fragment>
            <FormattedHTMLMessage
              id="widget.form.filterable.valueRangeEnd"
              values={{ end }}
            />
            {endDateDelay && (
              <FormattedHTMLMessage
                id="widget.form.filterable.valueDateDelay"
                values={{ delay: endDateDelay }}
              />
            )}
          </Fragment>
        );
        return this.renderLabelWithSort(
          <Fragment>{fromMsg} {toMsg}</Fragment>,
        );
      }
      case HAS_NO_VALUE:
        return this.renderLabelWithSort(
          <FormattedMessage id="widget.form.filterable.valueAbsence" />,
        );
      default:
        return this.renderLabelWithSort(
          <FormattedMessage id="widget.form.filterable.valuePresence" />,
        );
    }
  }

  renderSelectOptions(options, keyCode = 'value') {
    const { intl } = this.props;
    return options
      .map(item => (
        <option key={`opt-${item[keyCode]}`} value={item[keyCode]}>
          {item.name || intl.formatMessage({ id: item.nameId })}
        </option>
      ));
  }

  renderBooleanFilterValueOptions() {
    const { intl, value: propValue } = this.props;
    const { value: filterValue } = propValue;
    const boolChoices = [
      {
        id: 'true',
        label: intl.formatMessage({ id: 'cms.label.yes' }),
      },
      {
        id: 'false',
        label: intl.formatMessage({ id: 'cms.label.no' }),
      },
      {
        id: 'all',
        label: intl.formatMessage({ id: 'cms.label.all' }),
      },
    ];
    const boolValue = filterValue ? 'true' : 'false';
    const value = filterValue === null ? 'both' : boolValue;
    return (
      <Fragment>
        <h5><FormattedMessage id="widget.form.options" /></h5>
        <RadioInput
          input={{ name: 'value', type: 'radio', value, onChange: () => {} }}
          hasLabel={false}
          toggleElement={boolChoices}
          meta={{ touched: false, error: false }}
        />
      </Fragment>
    );
  }

  renderFilterValueOptions() {
    const { value: propValue } = this.props;
    const { value } = propValue;
    const { filterableType, optionSelected } = this.state;
    const filterChoices = [
      { value: HAS_VALUE, nameId: 'widget.form.filterable.labelPresence' },
      { value: HAS_NO_VALUE, nameId: 'widget.form.filterable.labelAbsence' },
      (
        filterableType === TEXT_FILTERABLE ? (
          { value: BY_VALUE_PARTIAL, nameId: 'widget.form.filterable.labelPartial' }
        ) : (
          { value: BY_VALUE_ONLY, nameId: 'widget.form.filterable.labelOnly' }
        )
      ),
      { value: BY_RANGE, nameId: 'widget.form.filterable.labelRange' },
    ];

    return (
      <Fragment>
        <h5><FormattedMessage id="widget.form.options" /></h5>
        <select
          value={optionSelected}
          defaultValue={optionSelected}
          className="form-control"
        >
          {this.renderSelectOptions(filterChoices)}
        </select>
        {optionSelected === BY_VALUE_ONLY && (
          <input value={value} />
        )}
      </Fragment>
    );
  }

  renderAttributeFilter() {
    const { filterableType } = this.state;
    if (filterableType === BOOL_FILTERABLE) {
      return this.renderBooleanFilterValueOptions();
    }
    return this.renderFilterValueOptions();
  }

  render() {
    const { expanded } = this.state;
    const { value: propValue, intl } = this.props;
    const { order, attributeFilter, key } = propValue;

    const sortFilters = [
      {
        id: '',
        label: intl.formatMessage({ id: 'app.enumerator.none' }),
      },
      {
        id: 'ASC',
        label: intl.formatMessage({ id: 'widget.form.asc' }),
      },
      {
        id: 'DESC',
        label: intl.formatMessage({ id: 'widget.form.desc' }),
      },
    ];

    if (!key) {
      return null;
    }

    return (
      <Fragment>
        <legend className="FilterValueOptionSelector__top">
          <div
            onClick={this.handleHeadlineClick}
            onKeyDown={this.handleHeadlineClick}
            role="button"
            tabIndex={0}
            className="FilterValueOptionSelector__top-select"
          >
            <div className="FilterValueOptionSelector__top-caption">
              {this.renderLabelValue()}
            </div>
            <span
              className={`icon fa fa-chevron-${expanded ? 'up' : 'down'} FilterValueOptionSelector__collapse-button`}
            />
          </div>
        </legend>
        <Collapse isOpened={expanded}>
          <div className="FilterValueOptionSelector__settings">
            {attributeFilter && this.renderAttributeFilter()}
            <h5><FormattedMessage id="widget.form.order" /></h5>
            <RadioInput
              input={{ name: 'order', type: 'radio', value: order, onChange: () => {} }}
              hasLabel={false}
              toggleElement={sortFilters}
              meta={{ touched: false, error: false }}
            />
          </div>
        </Collapse>
      </Fragment>
    );
  }
}

FilterValueOptionSelector.propTypes = {
  intl: intlShape.isRequired,
  value: PropTypes.shape({
    value: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string,
    ]),
    start: PropTypes.string,
    end: PropTypes.string,
    nullValue: PropTypes.bool,
    key: PropTypes.string,
    attributeFilter: PropTypes.bool,
    likeOption: PropTypes.bool,
    order: PropTypes.string,
    valueDateDelay: PropTypes.string,
    startDateDelay: PropTypes.string,
    endDateDelay: PropTypes.string,
  }),
  attributeFilterChoices: PropTypes.arrayOf(PropTypes.shape({})),
};

FilterValueOptionSelector.defaultProps = {
  value: {},
  attributeFilterChoices: [],
};

export default FilterValueOptionSelector;
