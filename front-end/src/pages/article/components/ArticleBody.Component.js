import React, { Component } from 'react';
import Header from '../../../components/header/Header.Component';
import { Navigation, NavigationSideBarState } from '../../../components/navigation';

export class ArticleBody extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div>
      <p>
      <span style={styles.importantText}>New York, NY</span>. Nunc eu ullamcorper orci. Quisque eget odio ac lectus vestibulum faucibus eget in metus. In pellentesque faucibus vestibulum. Nulla at nulla justo, eget luctus tortor. Nulla facilisi. Duis aliquet egestas purus in blandit. Curabitur vulputate, ligula lacinia scelerisque tempor, lacus lacus ornare ante, ac egestas est urna sit amet arcu. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed molestie augue sit amet leo consequat posuere.
      </p>
      <p>
        Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Proin vel ante a orci tempus eleifend ut et magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus luctus urna sed urna ultricies ac tempor dui sagittis. In condimentum facilisis porta. Sed nec diam eu diam mattis viverra. Nulla fringilla, orci ac euismod semper, magna diam porttitor mauris, quis sollicitudin sapien justo in libero. Vestibulum mollis mauris enim.
      </p>
      <h3 style={{ marginLeft: '-50px', marginRight: '50px' }}>
        Looking at it now, last December. We were built to fall apart. Then fall back together.
      </h3>
      <p>
        Morbi euismod magna ac lorem rutrum elementum. Donec viverra auctor lobortis. Pellentesque eu est a nulla placerat dignissim. Morbi a enim in magna semper bibendum. Etiam scelerisque, nunc ac egestas consequat, odio nibh euismod nulla, eget auctor orci nibh vel nisi. Aliquam erat volutpat. Mauris vel neque sit amet nunc gravida congue sed sit amet purus. Quisque lacus quam, egestas ac tincidunt a, lacinia vel velit. Aenean facilisis nulla vitae urna tincidunt.
      </p>
      <p>
        Nam vestibulum, arcu sodales feugiat consectetur, nisl orci bibendum elit, eu euismod magna sapien ut nibh. Donec semper quam scelerisque tortor. Mauris vel neque sit amet nunc gravida congue.
      </p>
    </div>);
  }
}

const styles = {
  importantText: {
    color: '#777',
    textTransform: 'uppercase',
    fontFamily: 'FuturaStd',
    fontSize: '75%'
  }
};
