import React, { Component } from 'react';
import Header from '../../../components/header/Header.Component';
import { Navigation, NavigationSideBarState } from '../../../components/navigation';
import './ArticleMeta.Component.scss';

export class ArticleMeta extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    return (<div className="article-meta">
      <div className="push--bottom">
        <hr />
        By <span className="article-meta__author">Bob Loblaw</span>
      </div>
      <div className="push--bottom">
        <hr />
        August 6 2015
      </div>
      <div className="push--bottom">
        <hr />
        <div>
          #ENVIRONMENT
        </div>
        <div>
          #SWIFT
        </div>
        <div>
          #FUNGUS
        </div>
      </div>
    </div>);
  }
}

const styles = {};
