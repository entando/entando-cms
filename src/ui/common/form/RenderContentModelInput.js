import React from 'react';
import PropTypes from 'prop-types';
import AceEditor from 'react-ace';
import ace from 'brace';
import { Col, ControlLabel } from 'patternfly-react';

import 'brace/mode/html';
import 'brace/theme/tomorrow';
import 'brace/snippets/html';
import 'brace/ext/language_tools';

const langTools = ace.acequire('ace/ext/language_tools');

const contentModelCompleter = {
  getCompletions: (editor, session, pos, prefix, callback) => {
    const wordList = [
      {
        caption: '#foreach',
        value: `#foreach ($item in $<LIST>)
  <DO with $item>
#end`,
        meta: 'Content Model Snippet',
      },
      {
        caption: '#if #else #end',
        value: `#if (<TRUE>)
  <DO>
#else
  <DOANOTHER>
#end`,
        meta: 'Content Model Snippet',
      },
      {
        caption: '#if',
        value: `#if (<TRUE>)
  <DO>
#end`,
        meta: 'Content Model Snippet',
      },
      {
        caption: '#set',
        value: '#set ($<VAR> = <VALUE>)',
        meta: 'Content Model Snippet',
      },
      {
        caption: '$content',
        value: '$content',
        meta: 'Content Object',
      },
      {
        caption: '$i18n',
        value: '$i18n',
        meta: 'I18n Object',
      },
      {
        caption: '$info',
        value: '$info',
        score: 10000,
        meta: 'Info Object',
      },
    ];
    callback(null, wordList.map(word => ({ ...word, score: 10000 })));
  },
};

langTools.addCompleter(contentModelCompleter);

const aceOnBlur = onBlur => (_event, editor) => {
  const value = editor.getValue();
  onBlur(value);
};

const RenderContentModelInput = ({
  input, meta: { touched, error }, label, help,
  labelSize, inputSize, append, prepend, alignClass,
}) => (
  <div className={(touched && error) ? 'form-group has-error' : 'form-group'}>
    {
      labelSize > 0 ? (
        <Col xs={labelSize} className={alignClass}>
          <ControlLabel htmlFor={input.name}>
            {label} {help}
          </ControlLabel>
        </Col>
      ) : ''
    }
    <Col xs={inputSize || 12 - labelSize}>
      {prepend}
      <AceEditor
        mode="html"
        theme="tomorrow"
        width="100%"
        showPrintMargin={false}
        editorProps={{
          $blockScrolling: Infinity,
        }}
        style={{ border: '1px solid #ddd' }}
        enableBasicAutocompletion
        enableLiveAutocompletion
        enableSnippets
        name={input.name}
        onBlur={aceOnBlur(input.onBlur)}
        onChange={input.onChange}
        onFocus={input.onFocus}
        value={input.value}
      />
      {append && <span className="AppendedLabel">{append}</span>}
      {touched && ((error && <span className="help-block">{error}</span>))}
    </Col>
  </div>
);

RenderContentModelInput.propTypes = {
  input: PropTypes.shape({}),
  label: PropTypes.node,
  meta: PropTypes.shape({}),
  help: PropTypes.node,
  labelSize: PropTypes.number,
  inputSize: PropTypes.number,
  prepend: PropTypes.node,
  append: PropTypes.string,
  alignClass: PropTypes.string,
};

RenderContentModelInput.defaultProps = {
  input: {},
  label: <span />,
  meta: {},
  help: null,
  labelSize: 2,
  inputSize: null,
  append: '',
  prepend: '',
  alignClass: 'text-right',
};

export default RenderContentModelInput;
