import React, { Component } from 'react';

export class CanvasHeroTitle extends Component {
  /**
   * @var number: ratio mapping native image dimentions to drawing square
   */
  get ratio() { return this._ratio; }
  set ratio(value) { this._ratio = value; }

  /**
   * @var elementRef: canvas with white bars
   */
  get canvas0() { return this._canvas0; }
  set canvas0(value) { this._canvas0 = value; }

  /**
   * @var elementRef: canvas with text
   */
  get canvas1() { return this._canvas1; }
  set canvas1(value) { this._canvas1 = value; }

  constructor(props) {
    super(props);
    this.image = document.createElement('IMG');
    this.state = {
      width: window.innerWidth,
      canvasWidth: undefined,
      canvasHeight: undefined,
    };
    this.image.onload = () => this.setState({
      canvasWidth: this.image.naturalWidth,
      canvasHeight: this.image.naturalHeight
    });
    this.image.src = props.textFillSrc
    this.image.width = window.innerWidth;
    this.initialized = false;
  }

  determineDimentions() {
    this.setState({
      width: window.innerWidth,
    });
    this.image.width = window.innerWidth;
  }

  componentDidMount() {
    window.addEventListener('resize', this.determineDimentions.bind(this), false);
    this.setState({
      canvasWidth: this.image.naturalWidth,
      canvasHeight: this.image.naturalHeight
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.determineDimentions.bind(this), false);
  }

  componentDidUpdate() {
    if (this.props.imageLoaded) {
      this.renderCanvas();
    }
    if (!this.initialized) {
      //hack for after fonts are hopefully loaded, should be a callback
      setTimeout(this.renderCanvas.bind(this), 400);
      this.initialized = true;
    }
  }

  renderCanvas() {
    const { naturalWidth, naturalHeight, width, height } = this.image;
    const maxWidth = +this.props.maxWidth;
    this.ratio = naturalWidth / width;
    const drawWidth = (width < maxWidth) ? width : maxWidth;
    const wrapLeft = (width > maxWidth) ? (width - maxWidth) / 2: 0;
    const textWidth = this.props.textWidthPercentage / 100 * drawWidth * this.ratio;
    const leftOffset = this.props.pushLeftPercentage / 100 * drawWidth * this.ratio + wrapLeft * this.ratio;
    this.lineHeight = 80 * this.ratio;
    if (this.props.selectedArticle.title) {
      this.createTextLines(this.props.selectedArticle.title, textWidth)
      .then(lines => {
        if (!this.state.textHeight) {
          this.setState({
            textHeight: lines.length * this.lineHeight + 25 * this.ratio,
            leftOffset: leftOffset - 20 * this.ratio
          });
        }
        const _lines = lines.slice();
        _lines.reverse();
        this.createLineBars(_lines, leftOffset, naturalHeight);
        this.writeLines(_lines, leftOffset, naturalHeight);
      });
    }
  }

  configureContextForText(context) {
    context.textBaseline = 'middle';
    context.fillStyle = '#ffffff';
    context.font = `${75 * this.ratio}px Copernicus-Heavy`;
  }

  renderSubBars(context, x, y, width, height) {
    const { naturalWidth, naturalHeight } = this.image;
    context.fillRect(0, y, x, height);
    context.fillRect(x + width, y, naturalWidth - x - width, height);
  }

  createLineBars(lines, x, y) {
    const { naturalWidth, naturalHeight } = this.image;
    const context = this.canvas0.getContext('2d');
    context.clearRect(0, 0, naturalWidth, naturalHeight);
    this.configureContextForText(context);
    let yPosition = y;
    let width, line;
    for (let index = 0; index < lines.length; index++) {
      line = lines[index];
      width = context.measureText(line).width;
      if (index === 0) {
        this.renderSubBars(context, x, yPosition - this.lineHeight / 2, width, this.lineHeight / 2);
      }
      yPosition = yPosition - this.lineHeight;
      context.fillRect(x - 20 * this.ratio, yPosition - 25 * this.ratio, width + 40 * this.ratio, this.lineHeight + 25 * this.ratio);
    }
  }

  writeLines(lines, x, y) {
    const { naturalWidth, naturalHeight } = this.image;
    const context = this.canvas1.getContext('2d');
    context.globalCompositeOperation = 'source-over';
    context.clearRect(0, 0, naturalWidth, naturalHeight);
    this.configureContextForText(context);
    let yPosition = y;
    let line;
    context.beginPath();
    yPosition = y - 50 * this.ratio;
    for (let index = 0; index < lines.length; index++) {
      line = lines[index];
      context.fillText(line, x, yPosition);
      yPosition = yPosition - this.lineHeight;
    }
    context.globalCompositeOperation = 'source-in';
    context.drawImage(this.image,
      0, 0, naturalWidth, naturalHeight,
      0, 0, naturalWidth, naturalHeight);
  }

  appendWord(cursor, word) {
    if (cursor !== '') {
      return cursor + ' ' + word;
    } else {
      return word;
    }
  }

  createTextLines(text, maxWidth) {
    const context = this.canvas0.getContext('2d');
    this.configureContextForText(context);
    return new Promise((resolve, reject) => {
      const words = text.split(' ');
      const lines = [''];

      for(let index = 0; index < words.length; index++) {
        const cursor = lines[lines.length - 1];
        const testCursor = this.appendWord(cursor, words[index]);
        const { width } = context.measureText(testCursor);
        if (width > maxWidth) {
          lines[lines.length] = words[index];
        } else {
          lines[lines.length - 1] = testCursor;
        }
        if (index >= words.length - 1) {
          resolve(lines);
        }
      }
    });
  }

  render() {
    const { canvasWidth, canvasHeight, width, textHeight, leftOffset } = this.state;
    const dimentions = { width };
    return (<div style={{...this.props.style, fontFamily: 'Copernicus-Heavy' }}>
      <canvas
        ref={canvas => { this.canvas0 = canvas }}
        style={{ ...styles.canvas, zIndex: 5 }}
        width={canvasWidth}
        height={canvasHeight} />
      <canvas
        ref={canvas => { this.canvas1 = canvas }}
        style={{ ...styles.canvas, zIndex: 10 }}
        width={canvasWidth}
        height={canvasHeight} />
      {this.props.actions
        ? React.createElement(this.props.actions, {
          ...this.props,
          textHeight: textHeight / this.ratio,
          leftOffset: leftOffset / this.ratio,
          style: {
            zIndex: 15,
            width: '30px',
            height: '30px',
          }
        })
        : null}
      <h1 className="visuallyhidden">{(this.props.selectedArticle || {}).title}</h1>
    </div>);
  }

}

const styles = {
  image: {
    display: 'block',
    opacity: 1,
  },
  canvas: {
    maxWidth: '100%',
    display: 'block',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
}
