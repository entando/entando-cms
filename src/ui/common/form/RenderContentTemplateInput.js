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
const tokenUtils = ace.acequire('ace/autocomplete/util');

const escChars = term => term.replace('$', '\\$').replace('#', '\\#');
const isAttribFunction = term => /[a-zA-Z]+\([^)]*\)(\.[^)]*\))?/g.test(term);

const createSuggestionItem = (key, namespace) => ({
  caption: key,
  value: key,
  score: 10001,
  meta: `${namespace} Object ${isAttribFunction(key) ? 'Method' : 'Property'}`,
});

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
      rootCompleters: [],
    };
    // this.dotCommandExec = this.dotCommandExec.bind(this);
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
      exec: () => editor.insert('.'),
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
      getCompletions: (
        editor,
        session,
        cursor,
        prefix,
        callback,
      ) => {
        const extracted = this.extractCodeFromCursor(cursor);
        console.log('begin search', extracted, prefix);
        const { namespace } = extracted;
        if (!namespace) {
          this.enableRootSuggestions();
        } else {
          const [rootSpace, ...subSpace] = namespace.split('.');

          this.disableRootSuggestions();

          const verified = subSpace.length
            ? this.findTokenInDictMap(subSpace[0], rootSpace)
            : this.findTokenInDictMap(rootSpace);
          if (verified) {
            const { dictMapped } = this.state;
            if (verified.namespace) {
              const mappedToken = dictMapped[verified.namespace];
              const dictList = mappedToken[verified.term]
                .map(entry => createSuggestionItem(entry, verified.namespace));
              this.setState({ dictList });
            } else {
              const mappedToken = dictMapped[verified.term];
              const dictList = Object.entries(mappedToken)
                .map(([entry]) => createSuggestionItem(entry, verified.term));
              this.setState({ dictList });
            }
          } else {
            this.disableRootSuggestions();
          }
        }
        const { dictList } = this.state;
        callback(null, dictList);
      },
    };
    langTools.addCompleter(contentTemplateCompleter);
    this.setState({ dictionaryLoaded: true });
  }

  extractCodeFromCursor({ row, column }) {
    const { editor: { session } } = this.state;
    const codeline = (session.getDocument().getLine(row)).trim();
    const token = tokenUtils.retrievePrecedingIdentifier(codeline, column);
    const wholeToken = tokenUtils.retrievePrecedingIdentifier(
      codeline,
      column,
      /[.a-zA-Z_0-9$\-\u00A2-\uFFFF]/,
    );
    if (token === wholeToken) {
      return { token, namespace: '' };
    }
    const namespace = wholeToken.replace(/.$/g, '');
    return { token, namespace };
  }

  findTokenInDictMap(token, parentToken) {
    const { dictMapped } = this.state;
    const findInDict = (term, dict) => {
      return Object.keys(dict).find((key) => {
        const keyRegEx = new RegExp(`${escChars(key)}$`, 'g');
        return keyRegEx.test(term);
      });
    };
    console.log(dictMapped, token, parentToken);
    if (!parentToken) {
      const term = findInDict(token, dictMapped);
      return term && { term };
    }
    const namespace = findInDict(parentToken, dictMapped);
    if (!namespace) {
      return false;
    }
    const term = findInDict(token, dictMapped[parentToken]);
    if (!term) return false;
    return { term, namespace };
  }

  disableRootSuggestions() {
    const { rootCompleters, editor } = this.state;
    if (rootCompleters.length) {
      this.setState({ rootCompleters: editor.completers });
      const soloCompleter = editor.completers.filter(c => c.contentTemplate);
      editor.completers = soloCompleter;
    }
  }

  enableRootSuggestions() {
    const { rootCompleters, dictionary, editor } = this.state;
    if (rootCompleters.length > 0) {
      editor.completers = rootCompleters;
    }
    this.setState({
      dictList: [...dictionary],
      rootCompleters: [],
    });
  }

  /* insertMethodsToAutoCompleteArray(token) {
    const { dictMapped: mapped, editor } = this.state;
    editor.completer.popup.on('hide', this.resetRootSuggestions.bind(this));
    this.setState({ rootCompleters: editor.completers });
    const soloCompleter = editor.completers.filter(c => c.contentTemplate);
    editor.completers = soloCompleter;

    const dictList = Object.entries(mapped[token])
      .map(entry => createSuggestionItem(entry, mapped[token]));
    this.setState({ regLastToken: token, dictList });
  }

  beginExtractTokenFromEditor() {
    const { editor, dotActivated } = this.state;
    const { token, namespace } = this.extractTokenFromEditor();
    if (!token && !namespace) return;

    if (dotActivated) {
      editor.insert('.');
    }

    const tokenres = this.findTokenInDictMap(token, namespace);

    if (tokenres) {
      this.insertMethodsToAutoCompleteArray(tokenres);
    }
  }

  dotCommandExec() {
    this.setState({ dotActivated: true });
    this.beginExtractTokenFromEditor();
  } */

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
