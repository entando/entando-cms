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

class RenderContentTemplateInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dictionaryLoaded: false,
    };
    this.onEditorLoad = this.onEditorLoad.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { dictionary } = this.props;
    const { dictionaryLoaded } = this.state;
    if (!dictionaryLoaded && dictionary.length !== prevProps.dictionary.length) {
      this.initCompleter();
    }
  }

  onEditorLoad(editor) {
    const { loadSubMethods } = this.props;
    editor.commands.addCommand({
      name: 'dotCommandSubMethods',
      bindKey: { win: '.', mac: '.' },
      exec: loadSubMethods,
    });

    editor.commands.on('afterExec', (e) => {
      if (e.command.name === 'dotCommandSubMethods') {
        editor.execCommand('startAutocomplete');
      }
    });
  }

  initCompleter() {
    const contentTemplateCompleter = {
      contentTemplate: true,
      getCompletions: (editor, session, pos, prefix, callback) => {
        const { dictionary } = this.props;
        callback(null, dictionary);
      },
    };
    langTools.addCompleter(contentTemplateCompleter);
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
          {dictionaryLoaded && (
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
              onLoad={this.onEditorLoad}
              value={input.value}
            />
          )}
          {append && <span className="AppendedLabel">{append}</span>}
          {touched && ((error && <span className="help-block">{error}</span>))}
        </Col>
      </div>
    );
  }
}

RenderContentTemplateInput.propTypes = {
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
  loadSubMethods: PropTypes.func.isRequired,
};

RenderContentTemplateInput.defaultProps = {
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

export default RenderContentTemplateInput;
