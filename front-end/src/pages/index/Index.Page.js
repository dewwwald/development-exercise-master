import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Articles } from '../article/Articles.Component';
import { store } from '../../state/store';
import Header from '../../components/header/Header.Component';
import { Navigation, NavigationSideBarState } from '../../components/navigation';

export default class IndexPage extends Component {


  render() {
    return (<div>
      <Articles>
        <NavigationSideBarState>
          <Header className="header--dark"/>
          <Navigation />
        </NavigationSideBarState>
      </Articles>
      <div className="enclosure plain">
        <h1>Welcome</h1>
        <p>Toggle the navigation bar and select an article to edit</p>
      </div>
    </div>);
  }
}
