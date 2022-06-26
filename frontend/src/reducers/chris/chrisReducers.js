import list from 'reducers/chris/chrisListReducers';
import form from 'reducers/chris/chrisFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
