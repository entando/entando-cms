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

const escChars = term => term.replace('$', '\\$').replace('#', '\\#');

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
      editor: null,
      dictionaryLoaded: false,
      dictionary: [],
      dictList: [],
      dictMapped: {},
      regLastToken: '',
      rootCompleters: [],
    };
    this.dotCommandExec = this.dotCommandExec.bind(this);
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
    editor.commands.addCommand({
      name: 'dotCommandSubMethods',
      bindKey: { win: '.', mac: '.' },
      exec: this.dotCommandExec,
    });

    editor.commands.on('afterExec', (e) => {
      if (e.command.name === 'dotCommandSubMethods') {
        editor.execCommand('startAutocomplete');
      }
    });

    this.setState({ editor });
  }

  condenseDict() {
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
    }));

    this.setState({
      dictionary,
      dictMapped,
      dictList: [...dictionary],
    });
  }

  initCompleter() {
    this.condenseDict();

    const contentTemplateCompleter = {
      contentTemplate: true,
      getCompletions: (editor, session, pos, prefix, callback) => {
        const { dictList } = this.state;
        callback(null, dictList);
      },
    };
    langTools.addCompleter(contentTemplateCompleter);
    this.setState({ dictionaryLoaded: true });
  }

  findTokenInDictMap(token) {
    const { dictMapped } = this.state;
    return Object.keys(dictMapped).find((key) => {
      const keyRegEx = new RegExp(`${escChars(key)}$`, 'g');
      return keyRegEx.test(token);
    });
  }

  resetRootSuggestions() {
    const { rootCompleters, dictionary, editor } = this.state;
    if (rootCompleters.length > 0) {
      editor.completers = rootCompleters;
    }
    this.setState({
      regLastToken: '',
      dictList: [...dictionary],
      rootCompleters: [],
    });
  }

  insertMethodsToAutoCompleteArray(token) {
    const { dictMapped: mapped, editor } = this.state;
    editor.completer.popup.on('hide', this.resetRootSuggestions.bind(this));
    this.setState({ rootCompleters: editor.completers });
    const soloCompleter = editor.completers.filter(c => c.contentTemplate);
    editor.completers = soloCompleter;
    const dictList = Object.entries(mapped[token]).map(([key]) => ({
      caption: key,
      value: key,
      score: 10001,
      meta: `${token} Object Method`,
      completer: {
        insertMatch: (ed, data) => {
          const { regLastToken, dictMapped } = this.state;
          const insertedValue = data.value;
          console.log('inserting', data, ed, ed.completer);
          if (insertedValue in dictMapped[regLastToken]) {
            ed.completer.insertMatch({ value: insertedValue });
            this.resetRootSuggestions();
          }
        },
      },
    }));
    this.setState({ regLastToken: token, dictList });
  }

  dotCommandExec(editor) {
    const { selection, session } = editor;

    const cpos = selection.getCursor();
    const curLine = (session.getDocument().getLine(cpos.row)).trim();
    const curTokens = curLine.slice(0, cpos.column).split(/\s+/);
    const curCmd = curTokens[0];
    if (!curCmd) return;

    const lastToken = curTokens[curTokens.length - 1];
    editor.insert('.');

    const tokenres = this.findTokenInDictMap(lastToken);

    if (tokenres) {
      this.insertMethodsToAutoCompleteArray(tokenres);
    }
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
