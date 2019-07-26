import React from 'react';
import { FormattedMessage } from 'react-intl';
import ContentModelListItem from 'ui/content-model/ContentModelListItem';

const mockData = [
  {
    id: 10012,
    contentType: "Generic Content",
    descr: "Hero Unit + Picture",
  },
  {
    id: 10013,
    contentType: "Generic Content",
    descr: "Lists - Picture",
  },
  {
    id: 10002,
    contentType: "News",
    descr: "Full - Default",
  },
];

const ContentModelList = () => {
  const renderRow = mockData
    .map(item => (
      <ContentModelListItem key={item.id} {...item} />
    ));
  return (
    <table className="table table-striped table-bordered table-hover ContentModelList__table">
      <thead>
        <tr>
          <th width="20%"><FormattedMessage id="cms.contentmodel.list.contentTypeHeader" /></th>
          <th width="70%"><FormattedMessage id="cms.contentmodel.list.contentModelNameHeader" /></th>
          <th width="10%" className="text-center"><FormattedMessage id="cms.contentmodel.list.actionsHeader" /></th>
        </tr>
      </thead>
      <tbody>
        {renderRow}
      </tbody>
    </table>
  );
};

export default ContentModelList;
