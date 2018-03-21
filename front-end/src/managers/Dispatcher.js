export default class Dispatcher {
  constructor(props) {
    this.subscriptions = {};
  }

  removeSubscriber(action, subscriptionIndex) {
    this.subscriptions[action][subscriptionIndex] = undefined;
  }

  addSubscriber(action, cb) {
    if (this.subscriptions[action]) {
      this.subscriptions[action].push(cb);
    } else  {
      this.subscriptions[action] = [cb];
    }
    return {
      remove: this.removeSubscriber.bind(this, action, this.subscriptions[action].length - 1)
    };
  }

  dispatch(action, state) {
    if (this.subscriptions[action]) {
      this.subscriptions[action].forEach(callback => {
        if (typeof callback === 'function') {
          callback(action, state);
        }
      });
    }
  }
}
