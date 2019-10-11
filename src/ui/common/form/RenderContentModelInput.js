import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AceEditor from 'react-ace';
import ace from 'brace';
import { Col, ControlLabel } from 'patternfly-react';

import 'brace/mode/html';
import 'brace/theme/tomorrow';
import 'brace/snippets/html';
import 'brace/ext/language_tools';

const langTools = ace.acequire('ace/ext/language_tools');

const aceOnBlur = onBlur => (_event, editor) => {
  const value = editor.getValue();
  onBlur(value);
};

class RenderContentModelInput extends Component {
  componentDidUpdate(prevProps) {
    const { dictionary } = this.props;
    if (dictionary.length !== prevProps.dictionary.length) {
      const mapped = dictionary.reduce((acc, curr) => {
        acc[curr.code] = curr.methods;
        return acc;
      }, {});
      const contentModelCompleter = {
        getCompletions: (editor, session, pos, prefix, callback) => {
          editor.commands.addCommand({
            name: 'dotCommand1',
            bindKey: { win: '.', mac: '.' },
            exec: () => {
              const cpos = editor.selection.getCursor();
              const sess = editor.session;

              const curLine = (sess.getDocument().getLine(cpos.row)).trim();
              const curTokens = curLine.slice(0, cpos.column).split(/\s+/);
              const curCmd = curTokens[0];
              if (!curCmd) return;
              const lastToken = curTokens[curTokens.length - 1];

              editor.insert('.');
              if (lastToken in mapped) {
                callback(null, Object.entries(mapped[lastToken]).map(([key]) => ({
                  caption: key,
                  value: key,
                  score: 10001,
                  meta: `${lastToken} Object`,
                })));
              }
            },
          });
          callback(null, dictionary.map(word => ({
            caption: word.code,
            value: word.code,
            score: 10000,
            meta: `${word.code} Object`,
          })));
        },
      };
      langTools.addCompleter(contentModelCompleter);
    }
  }

  render() {
    const {
      input, meta: { touched, error }, label, help,
      labelSize, inputSize, append, prepend, alignClass,
    } = this.props;
    return (
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
  }
}

RenderContentModelInput.propTypes = {
  input: PropTypes.shape({}),
  label: PropTypes.node,
  meta: PropTypes.shape({}),
  dictionary: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
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
