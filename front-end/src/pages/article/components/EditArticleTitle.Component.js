import React, { Component } from 'react';
import ArticleSchema from '../../../../../common/rest-schemas/article-schema';
import Slugifier from '../../../../../common/helpers/slugify';
import { Validation } from 'uni-validation';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';

export class EditArticleTitle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articleTitle: props.selectedArticle.title
    };
    this.validator = new Validation(ArticleSchema)
  }

  validateArticle(data) {
    return new Promise((resolve, reject) => {
        const length = Object.keys(data).length;
        const destroyer$ = new Subject();
        let validationResults = [];

        this.validator.validate(data)
            .pipe(takeUntil(destroyer$))
            .subscribe(validationResult => {
                validationResults = [ ...validationResults, validationResult];
                if (validationResults.length >= length) {
                    destroyer$.next();
                }
            }, reject, () => {
                const allValid = validationResults
                    .reduce((x, validationResult) => x && validationResult.isValid, true);
                if (allValid) {
                    resolve(validationResults);
                } else {
                    const message = validationResults
                        .reduce((x, validationResult) => x.concat(validationResult.errors), [])
                        .join(' ');
                    reject(new Error(message));
                }
            });
    })
  }

  textChangeHandle(event) {
    this.setState({ articleTitle: event.target.value });
    this.props.onTextChange(event);
    this.validateArticle({ title: event.target.value })
      .then(validationResults => {
        this.setState({
          errorMessage: null,
          error: false
        });
      })
      .catch(e => {
        console.log(e.message);
        this.setState({
          errorMessage: e.message,
          error: true
        });
      });
  }

  onCancel() {
    this.setState({ articleTitle: '' });
    this.props.onCancel(event);
  }

  onSave() {
    const data = this.state.articleTitle;
    this.props.onSave(data);
  }

  componentDidMount() {
    this.inputField.focus();
    const len = this.inputField.value.length * 2;
    this.inputField.setSelectionRange(len, len)
    this.inputField.scrollLeft = 9999999;
  }

  render() {
    console.log(this.state.articleTitle);
    return (<div className="enclosure" style={{ ...this.props.style }}>
      <div className="g">
        <div
          style={styles.inputWrap}
          className="g__i w--5/8 desk-push--1/8">
          <div style={styles.actionsWrapper}>
            <button
              onClick={this.onCancel.bind(this)}
              className="btn btn--error"
              style={styles.button}>
              <svg className="symbol" viewBox="0 0 25.242 20">
                <use xlinkHref="#icon-x"/>
              </svg>
            </button>
            <button
              onClick={this.onSave.bind(this)}
              className="btn btn--success"
              disabled={this.state.error}
              style={styles.button}>
              <svg className="symbol" viewBox="0 0 25.242 20">
                <use xlinkHref="#icon-checkmark"/>
              </svg>
            </button>
          </div>
          <input
            ref={input => this.inputField = input}
            className="fs--h3"
            style={styles.inputField}
            value={this.state.articleTitle}
            onChange={this.textChangeHandle.bind(this)} />
          <div>
            <span className="fc--base">slug:</span> {this.state.articleTitle
              ? Slugifier.slugify(this.state.articleTitle)
              : (<span className="fc--base">please enter a title</span>)
            }
          </div>
        </div>
      </div>
    </div>);
  }
}


const styles = {
  inputWrap: {
    paddingTop: '25px',
    paddingBottom: '25px',
    paddingRight: '25px',
    backgroundColor: 'white',
    position: 'relative',
  },
  button: {
    width: '30px',
    height: '30px',
    padding: 0,
    verticalAlign: 'middle',
    display: 'block',
    margin: 0,
    border: 'none',
  },
  actionsWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    transform: 'translate(-100%, -100%)'
  },
  inputField: {
    color: '#000000',
    fontFamily: 'Copernicus-Heavy'
  }
};
