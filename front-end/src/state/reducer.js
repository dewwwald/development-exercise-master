import { combineReducers } from 'redux';
import { articlesReducer as articles } from '../pages/article';

export const reducer = combineReducers({ articles });
