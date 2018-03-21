import Dispatcher from './Dispatcher';

const actionTypes = ['ROUTE_CHANEGE', 'ROUTE_MENU_NAVIGATION'];
let instance = new Dispatcher();
let routeManagerApi = {
  addSubscriber: (action, cb) => {
    if (actionTypes.includes(action)) {
      return instance.addSubscriber(action, cb);
    } else {
      console.error('Action not allowed: ' + JSON.stringify(actionTypes));
    }
  },
  routeChange: () => instance.dispatch('ROUTE_CHANEGE'),
  menuNavigation: () => instance.dispatch('ROUTE_MENU_NAVIGATION')
};
export default routeManagerApi;
