import Dispatcher from './Dispatcher';
const WINDOW_SCROLL_ACTIONS = ['WINDOW_SCROLL', 'WINDOW_AT_TOP'];
class WindowScrollManager {

  constructor() {
    this.dispatcher = new Dispatcher();
    this.actionTypes = WINDOW_SCROLL_ACTIONS;
    this.subscriptions = 0;
    this.handlePageScroll = this.handlePageScroll.bind(this);
    this.handlePageAtTopTimeout = this.handlePageAtTopTimeout.bind(this);
    this.startCheckingPageTop = this.startCheckingPageTop.bind(this);
    this.handleWindowBlurEvent = this.handleWindowBlurEvent.bind(this);
    this.pageAtTop = 65;
    this.checkAtTopKey = undefined;
  }

  remove(subscription) {
    this.subscriptions--;
    subscription.remove();

    if (this.subscriptions <= 0) {
      this.stopCheckingAtTop();
      window.removeEventListener('scroll', this.handlePageScroll, false);
    }
  }

  handlePageScroll($event) {
    this.stopCheckingAtTop();
    this.pageAtTop = 150;
    this.startCheckingPageTop();
    this.dispatcher.dispatch('WINDOW_SCROLL', $event);
  }

  emitPageAtTop() {
    this.dispatcher.dispatch('WINDOW_AT_TOP');
  }

  handlePageAtTopTimeout() {
    if (window.scrollY <= 5) {
      this.emitPageAtTop();
    }
    this.pageAtTop++;
    this.startCheckingPageTop();
  }

  stopCheckingAtTop() {
    clearTimeout(this.checkAtTopKey);
  }

  startCheckingPageTop() {
    window.removeEventListener('focus', this.startCheckingPageTop, false);
    this.checkAtTopKey = setTimeout(this.handlePageAtTopTimeout, this.pageAtTop);
  }

  handleWindowBlurEvent() {
    this.stopCheckingAtTop();
    window.addEventListener('focus', this.startCheckingPageTop, false);
  }

  checkOrStartScrollEvents(overwrite = false) {
    if (this.subscriptions && !overwrite) {
      window.addEventListener('scroll', this.handlePageScroll, false);
      window.addEventListener('blur', this.handleWindowBlurEvent, false);
      if (document.hasFocus()) {
        this.startCheckingPageTop();
      } else {
        window.addEventListener('focus', this.startCheckingPageTop, false);
      }
    }
  }

  addSubscriber(action, cb) {
    if (this.actionTypes.includes(action)) {
      this.subscriptions++;
      let subscription = this.dispatcher.addSubscriber(action, cb);
      this.checkOrStartScrollEvents();
      return { remove: this.remove.bind(this, subscription) };
    } else {
      throw new Error('Action not allowed: ' + JSON.stringify(this.actionTypes));
    }
  }
}
// window manager is a singletop
module.exports = {
  WindowScrollManager: new WindowScrollManager(),
  WINDOW_SCROLL: 'WINDOW_SCROLL',
  WINDOW_AT_TOP: 'WINDOW_AT_TOP',
  WINDOW_SCROLL_ACTIONS: WINDOW_SCROLL_ACTIONS
}
