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
  if (editor) {
    const value = editor.getValue();
    onBlur(value);
  }
};

class RenderContentModelInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dictionaryLoaded: false,
    };
  }

  componentDidUpdate(prevProps) {
    const { dictionary } = this.props;
    const { dictionaryLoaded } = this.state;
    if (!dictionaryLoaded && dictionary.length !== prevProps.dictionary.length) {
      this.initCompleter();
    }
  }

  initCompleter() {
    const { dictionaryLoaded } = this.state;
    const contentModelCompleter = {
      getCompletions: (editor, session, pos, prefix, callback) => {
        if (!dictionaryLoaded) {
          const { onInitCommands } = this.props;
          onInitCommands(editor);
        }
        const { dictionary } = this.props;
        callback(null, dictionary);
      },
    };
    langTools.addCompleter(contentModelCompleter);
    this.setState({ dictionaryLoaded: true });
  }

  render() {
    const {
      input, meta: { touched, error }, label, help,
      labelSize, inputSize, append, prepend, alignClass,
    } = this.props;
    const { dictionaryLoaded } = this.state;
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
          {dictionaryLoaded ? (
            <AceEditor
              mode="html"
              theme="tomorrow"
              width="100%"
              showPrintMargin={false}
              editorProps={{
                $blockScrolling: Infinity,
              }}
              setOptions={{
                useWorker: false,
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
          ) : null}
          {append && <span className="AppendedLabel">{append}</span>}
          {touched && ((error && <span className="help-block">{error}</span>))}
        </Col>
      </div>
    );
  }
}

RenderContentModelInput.propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
  }),
  label: PropTypes.node,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.shape({}),
  }),
  dictionary: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  help: PropTypes.node,
  labelSize: PropTypes.number,
  inputSize: PropTypes.number,
  prepend: PropTypes.node,
  append: PropTypes.string,
  alignClass: PropTypes.string,
  onInitCommands: PropTypes.func,
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
  onInitCommands: () => {},
};

export default RenderContentModelInput;
