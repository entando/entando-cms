import React from 'react';
import { FormattedMessage } from 'react-intl';

const ContentModelList = () => (
  <table className="table table-striped table-bordered table-hover ContentModelList__table">
    <thead>
      <tr>
        <th width="20%"><FormattedMessage id="cms.contentmodel.list.contentTypeHeader" /></th>
        <th width="70%"><FormattedMessage id="cms.contentmodel.list.contentModelNameHeader" /></th>
        <th width="10%" className="text-center"><FormattedMessage id="cms.contentmodel.list.actionsHeader" /></th>
      </tr>
    </thead>
  </table>
);

export default ContentModelList;
