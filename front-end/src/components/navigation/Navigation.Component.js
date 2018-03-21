  import React, { Component } from 'react';
  import { NavLink } from 'react-router-dom';

  export class Navigation extends Component {
    toggleMenu() {
      this.props.toggleMenu();
    }

    navigateArticle(article) {
      this.toggleMenu();
      this.props.selectArticle(article);
    }

    render() {
      const { articles, toggled } = this.props;
      return (<div className={`${toggled ? 'menu-is-toggled ' : ''} menu-container--primary`}>
        <nav role="navigation">
          <ul className="menu--primary">
            <li className="menu__item--primary">
              <button onClick={() => this.toggleMenu()} className="menu-toggle menu-toggle--x">
                <svg version="1.1" viewBox="0 0 25.242 20" xmlSpace="preserve" overflow="visible">
                  <use xlinkHref="#icon-x" />
                </svg>
              </button>
            </li>
            <li className="menu__item--primary">
              <NavLink
                onClick={() => this.toggleMenu()}
                activeClassName="current"
                to="/">Home</NavLink>
            </li>
            {articles.map(article => (<li className="menu__item--primary" key={'article-item-' + article._id}>
              <NavLink
                onClick={this.navigateArticle.bind(this, article)}
                activeClassName="current"
                to={'/article/' + article.name}>{article.title}</NavLink>
            </li>))}
          </ul>
        </nav>
      </div>);
    }
  }
