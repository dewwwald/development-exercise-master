import React, { Component } from 'react';
import RouteDispatcher from '../../managers/RouteChange.Manager';
import { WindowScrollManager, WINDOW_AT_TOP, WINDOW_SCROLL } from '../../managers/WindowScroll.Manager';
import './Header.Component.scss';
import { store } from '../../state/store';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { scrolled: false, articles: [] };
    this.subscriptions = [];
    this.routeSubscription = undefined;
    this.toggleMenu = this.toggleMenu.bind(this);
    this.handlePageScroll = this.handlePageScroll.bind(this);
    this.handlePageAtTop = this.handlePageAtTop.bind(this);
  }

  handleRouteChange(e) {
    this.toggleMenu();
  }

  componentDidMount() {
    this.routeSubscription = RouteDispatcher
      .addSubscriber('ROUTE_MENU_NAVIGATION', this.handleRouteChange.bind(this));
    this.subscriptions.push(
      WindowScrollManager.addSubscriber(WINDOW_SCROLL, this.handlePageScroll),
      WindowScrollManager.addSubscriber(WINDOW_AT_TOP, this.handlePageAtTop)
    );
    this._updateStateData();
    store.subscribe(() => {
      this._updateStateData();
    });
  }

  handlePageAtTop() {
    if (this.state.scrolled) {
      this.setState({ scrolled: false });
    }
  }

  handlePageScroll(actionName, $event) {
    if (!this.state.scrolled && window && window.scrollY > 0) {
      this.setState({ scrolled: true });
    } else if (window.scrollY === 0) {
      this.setState({ scrolled: false });
    }
  }

  componentWillUnmount() {
    this.routeSubscription.remove();
    this.subscriptions.forEach(sub => sub.remove());
  }

  toggleMenu() {
    this.props.toggleMenu();
  }

  render() {
    const headerClassList = 'header ' +
      (this.props.toggled ? 'menu-is-toggled' : '') +
      (this.state.scrolled ? ' page-is-scrolled' : '') +
      ' ' + (this.props.className || '');
    const { articles } = this.state;
    return (<header id="header" className={headerClassList} style={{ ...(this.props.style || {}) }}>
      <div className="enclosure--header">
        <div className="enclosure">
          <button onClick={() => this.toggleMenu()} className="menu-toggle">
            <svg version="1.1" viewBox="0 0 200 20" xmlSpace="preserve" overflow="visible">
              <use xlinkHref="#icon-logo_and_hamburger" />
            </svg>
          </button>
        </div>
      </div>
    </header>);
  }

  _updateStateData() {
    const state = store.getState();
    this.setState({ articles: state.articles.list || [] });
  }
}
