import React, { Component } from 'react';
import { Navigation, NavigationSideBarState } from '../../components/navigation';
import { Articles } from '../article/Articles.Component';
import Header from '../../components/header/Header.Component';
import { CanvasHeroTitle } from '../../components/canvas-hero/CanvasHeroTitle.Component';
import { EditArticleTitle } from './components';
import { ArticleMeta, ArticleBody } from './components';
import { Grid, GridItem } from '../../components/grid';
import { PassProps } from '../../components/pass-props';
import { updateArticle } from './Article.Action';

const ToggleEditButton = (props) => {
  return (<button
    className="btn btn--warn"
    style={{
      ...styles.editButton,
      ...props.style,
      top: `calc(100% - ${props.textHeight}px)`,
      left: `${props.leftOffset}px`,
      padding: 0,
      verticalAlign: 'middle',
      border: 'none'
    }}
    onClick={props.onEditClick}>
    <svg className="symbol" viewBox="0 0 25.242 20">
      <use xlinkHref="#icon-pencil" />
    </svg>
  </button>)
};

export default class ArticlePage extends Component {
  constructor(props) {
    super(props);
    this.subscriptions = [];
    this.state = {
      imageLoaded: false,
      image: undefined,
      editToggled: false
    };
  }

  setupImage(image) {
    if (this.image) {
      this.image.onload = undefined;
    }
    this.image = image;
    if (this.image && this.image.complete && !this.state.imageLoaded) {
      this.imageSourceLoaded();
    } else if (this.image && !this.state.imageLoaded) {
      this.image.onload = this.imageSourceLoaded.bind(this);
    }
  }

  imageSourceLoaded() {
    this.setState({
      imageLoaded: true
    });
  }

  articleTitleChange(value) { }

  onEditClick() {
    this.setState({
      editToggled: true
    });
  }

  onEditCancel() {
    this.setState({
      editToggled: false
    });
  }

  onEditSave(title) {
    const _this = this;
    updateArticle({ title }, (error, newArticle) => {
      if (!error) {
        _this.setState({
          editToggled: false
        });
        _this.props.history.push(`/article/${newArticle.name}`);
      } else {
        _this.setState({
          serverErrorMessage: error.message
        });
      }
    });
  }

  render() {
    const { editToggled, imageLoaded, width } = this.state;
    return (<div>
      <Articles selectedName={this.props.match.params.name}>
        <NavigationSideBarState>
          <Header style={{ position: 'relative', zIndex: 20 }}/>
          <Navigation />
        </NavigationSideBarState>
        <PassProps style={{ position: 'relative', zIndex: 10 }}>
          <img
            style={styles.image}
            ref={image => this.setupImage(image)}
            src="/public/images/header.jpg" />
          {!editToggled
            ? <CanvasHeroTitle
              imageLoaded={imageLoaded}
              textFillSrc="/public/images/header.jpg"
              textWidthPercentage="60"
              pushLeftPercentage="12.5"
              maxWidth={1300 - 100 * 2}
              style={{ position: 'absolute', zIndex: 5, top: 0, left: 0, right: 0, bottom: 0 }}
              onEditClick={this.onEditClick.bind(this)}
              actions={ToggleEditButton} />
            : <EditArticleTitle
              style={styles.editTitle}
              onCancel={this.onEditCancel.bind(this)}
              onSave={this.onEditSave.bind(this)}
              onTextChange={this.articleTitleChange.bind(this)} />}
        </PassProps>
        <div className="plain enclosure">
          <div className="g g--top g--rev">
            <div className="g__i desk-w--5/8">
              <ArticleBody />
            </div>
            <div className="g__i desk-push--1/8 desk-w--2/8">
              <ArticleMeta />
            </div>
          </div>
        </div>
      </Articles>
    </div>);
  }
}

const styles = {
  image: {
    display: 'block',
    opacity: 1,
    width: '100%'
  },
  editButton: {
    position: 'absolute',
    transform: 'translate(-100%, -100%)'
  },
  editTitle: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    margin: 'auto',
    transform: 'translateY(-100%)'
  }
}
