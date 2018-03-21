import React, { Component } from 'react';
import { store } from '../../state/store';
import { updateList, selectArticle } from './Article.Action';

export class Articles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listReady: false,
      articles: [],
      selectedArticle: undefined
    };
  }

  componentWillMount() {
    store.getState()
    const hasList = this._updateArticlesState();
    store.subscribe(() => {
      this._updateArticlesState(store.getState());
    });
    if (!hasList) {
      updateList();
    }
  }

  changeSelectedArticle(article) {
    selectArticle(article);
  }

  render() {
    const { children } = this.props;
    const { selectedArticle, articles } = this.state;
    const childrenWithProps = React.Children
      .map(children, child => {
        if (typeof child.type === 'function') {
          return React.cloneElement(child, {
            ...child.props,
            articles,
            selectedArticle,
            selectArticle: this.changeSelectedArticle.bind(this),
          });
        }
        return React.cloneElement(child);
      });

    return this.state.listReady ? <div>{childrenWithProps}</div> : null
  }

  _getSelectedArticle(state) {
    if (!state.articles.selected && this.props.selectedName) {
      selectArticle(state.articles.list.find(_article => _article.name === this.props.selectedName));
      return false;
    }
    return state.articles.selected;
  }

  _updateArticlesState(state) {
    if (state && state.articles.list.length > 0) {
      const article = this._getSelectedArticle(state);
      if (article) {
        this.setState({
          listReady: true,
          articles: state.articles.list,
          selectedArticle: article
        });
      } else {
        this.setState({
          listReady: true,
          articles: state.articles.list,
        });
      }
      return state.articles.list.length > 0;
    }
    return false;
  }
}
