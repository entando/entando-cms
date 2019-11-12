import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import GenericModalContainer from 'ui/common/modal/GenericModalContainer';
import {
  Col,
  Button,
  Modal,
  ControlLabel,
} from 'patternfly-react';
import FormLabel from 'ui/common/form/FormLabel';
import CategoryTreeFilterContainer from 'ui/categories/filter/CategoryTreeFilterContainer';

export const JOIN_CATEGORIES_MODAL_ID = 'JoinCategoriesModal';

const JoinCategoriesModal = ({
  onConfirmJoinCategories, info: { contents }, language, joiningCategories,
}) => {
  const modifiedCategories = joiningCategories.map(c => c.code);
  const modifiedContents = contents && contents.map(
    content => Object.assign({},
      { categories: modifiedCategories, id: content.id }),
  );
  const buttons = [
    <Button
      bsStyle="primary"
      id="JoinCategoriesModal__button-save"
      onClick={() => onConfirmJoinCategories(modifiedContents)}
    >
      <FormattedMessage id="cms.label.save" />
    </Button>,
  ];

  const modalTitle = (
    <Modal.Title>
      <FormattedMessage id="cms.contents.categoriesToAdd" />
    </Modal.Title>
  );

  const contentsSize = contents ? contents.length : 0;

  return (
    <GenericModalContainer
      modalId={JOIN_CATEGORIES_MODAL_ID}
      buttons={buttons}
      modalTitle={modalTitle}
      className=""
    >
      <div>
        <div className="JoinCategoriesModal__info-box">
          <span className="pficon-info JoinCategoriesModal__info-icon" />
          <div className="JoinCategoriesModal__info-text">
            <FormattedMessage id="cms.contents.chooseJoiningCategories" values={{ number: contentsSize }} />
          </div>
          <div className="JoinCategoriesModal__info-text">
            <FormattedMessage id="cms.contents.joinCategoriesTip" />
          </div>
        </div>
        <div className="ContentsFilter__advanced-filter">
          <Col xs={12} sm={2} className="text-right mobile-left">
            <ControlLabel>
              <FormLabel labelId="cms.contents.edit.categories" />
            </ControlLabel>
          </Col>
          <Col xs={12} sm={10}>
            <CategoryTreeFilterContainer
              language={language}
              filteringCategories={joiningCategories}
              assetType="image"
              mobile
              minimal
              filterSubject="joinContentCategory"
            />
          </Col>
        </div>
      </div>
    </GenericModalContainer>
  );
};

JoinCategoriesModal.propTypes = {
  onConfirmJoinCategories: PropTypes.func.isRequired,
  info: PropTypes.shape({}),
  language: PropTypes.string.isRequired,
  joiningCategories: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

JoinCategoriesModal.defaultProps = {
  info: {},
};

export default JoinCategoriesModal;
