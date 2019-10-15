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
  constructor(props) {
    super(props);
    this.state = {
      dictionaryLoaded: false,
      dictionary: [],
      dictList: [],
      dictMapped: {},
      regLastToken: '',
    };
  }

  componentDidUpdate(prevProps) {
    const { dictionary: _dict } = this.props;
    if (_dict.length !== prevProps.dictionary.length) {
      this.populateDictState();
      this.initCompleter();
    }
  }

  populateDictState() {
    const { dictionary: _dict } = this.props;
    const dictMapped = _dict.reduce((acc, curr) => {
      acc[curr.code] = curr.methods;
      return acc;
    }, {});

    const dictionary = _dict.map(word => ({
      caption: word.code,
      value: word.code,
      score: 10000,
      meta: `${word.code} Object`,
    }))

    this.setState({
      dictionaryLoaded: true,
      dictionary,
      dictMapped,
      dictList: [...dictionary],
    });
  }

  createCommands(editor) {
    editor.commands.addCommand({
      name: 'dotCommand1',
      bindKey: { win: '.', mac: '.' },
      exec: () => {
        const { dictMapped: mapped } = this.state;
        const cpos = editor.selection.getCursor();
        const sess = editor.session;

        const curLine = (sess.getDocument().getLine(cpos.row)).trim();
        const curTokens = curLine.slice(0, cpos.column).split(/\s+/);
        const curCmd = curTokens[0];
        if (!curCmd) return;
        const lastToken = curTokens[curTokens.length - 1];

        editor.insert('.');
        if (lastToken in mapped) {
          this.setState({ regLastToken: lastToken });
          console.log(Object.entries(mapped[lastToken]));
          const dictList = Object.entries(mapped[lastToken]).map(([key]) => ({
            caption: key,
            value: key,
            score: 10001,
            meta: `${lastToken} Object`,
          }));
          this.setState({ dictList });
        }
      },
    });
    editor.commands.on('afterExec', (e) => {
      if (e.command.name === 'dotCommand1') {
        editor.execCommand('startAutocomplete');
      }
    });
  }

  initCompleter() {
    let cmdwritten = false;
    const contentModelCompleter = {
      getCompletions: (editor, session, pos, prefix, callback) => {
        if (!cmdwritten) {
          cmdwritten = true;
          this.createCommands(editor);
        }
        console.log('call', this.state.dictList);
        callback(null, this.state.dictList.map((word) => {
          const { regLastToken } = this.state;
          if (regLastToken) {
            word.completer = {
              insertMatch: (editor, data) => {
                const insertedValue = data.value;
                console.log(insertedValue, this.state.dictMapped[regLastToken]);
                if (insertedValue in this.state.dictMapped[regLastToken]) {
                  this.setState({ regLastToken: '', dictList: [...this.state.dictionary] });
                }
                editor.completer.insertMatch({value: insertedValue});
              },
            };
          }
          return word;
        }));
      },
    };
    langTools.addCompleter(contentModelCompleter);
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
