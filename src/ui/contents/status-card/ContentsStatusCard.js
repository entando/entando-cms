import React, { Component } from 'react';
import { DonutChart } from 'patternfly-react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

const generateContentsStatusReport = contents => contents.reduce((acc, curr) => {
  const { onLine, status } = curr;
  if (onLine) {
    if (status.toLowerCase() === 'public') {
      return { ...acc, published: acc.published + 1 };
    }
    return { ...acc, ready: acc.ready + 1 };
  }
  return { ...acc, unpublished: acc.unpublished + 1 };
}, { unpublished: 0, ready: 0, published: 0 });

class ContentsStatusCard extends Component {
  componentDidMount() {
    const { onDidMount } = this.props;
    onDidMount();
  }

  render() {
    const { contents } = this.props;
    const { unpublished, ready, published } = generateContentsStatusReport(contents);
    const columns = [
      ['Approved', published],
      ['Work', unpublished],
      ['Approved with changes', ready],
    ];
    return (
      <div className="PageStatus">
        <h2>
          <FormattedMessage
            id="cms.contents.contentStatus"
            defaultMessage="Content Status"
          />
        </h2>
        <DonutChart
          id="donunt-chart-3"
          data={{
            colors: { Approved: '#6ca100', Work: '#72767b', 'Approved with changes': '#f0ab00' },
            columns,
            type: 'donut',
          }}
          title={{ type: 'total', secondary: 'contents' }}
          legend={{ show: true, position: 'right' }}
          tooltip={{
            format: {
              value: v => v,
            },
          }}
        />
      </div>
    );
  }
}

ContentsStatusCard.propTypes = {
  onDidMount: PropTypes.func,
  contents: PropTypes.arrayOf(PropTypes.shape({})),
};

ContentsStatusCard.defaultProps = {
  onDidMount: () => {},
  contents: [],
};

export default ContentsStatusCard;
