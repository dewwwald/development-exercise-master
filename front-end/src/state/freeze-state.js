function deepFreeze(_object) {
  Object.freeze(_object);
  Object.getOwnPropertyNames(_object).forEach(_prop => {
      if (_object.hasOwnProperty(_prop)
      && typeof _object[_prop] === 'object'
      && _object[_prop].isFrozen
      && !_object[_prop].isFrozen()
      ) {
          deepFreeze(_object[_prop]);
      }
  });
}

export default function freezeState(store) {
  return next => action => {
      const result = next(action);
      const state = store.getState();
      deepFreeze(state);
      return result;
  };
}
