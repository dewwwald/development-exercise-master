import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Bundle from './Bundle.Module';
import loadIndexPage from 'bundle-loader?lazy!./pages/Index/Index.Page';
import loadArticlePage from 'bundle-loader?lazy!./pages/Article/Article.Page';

const IndexPage = (props) => (<Bundle load={loadIndexPage}>
  {(IndexPage) => <IndexPage {...props}/>}
</Bundle>);

const ArticlePage = (props) => (<Bundle load={loadArticlePage}>
  {(ArticlePage) => <ArticlePage {...props} />}
</Bundle>);

import Footer from './components/Footer.Component';

export default class App extends Component {
  render() {
    return (
      <div className="app-container">
        <Route exact path="/" component={IndexPage} />
        <Route path="/article/:name" component={ArticlePage} />
        <Footer />
      </div>
    );
  }
}
