import { UPDATE_LIST, SELECT_ARTICLE } from './Article.Action';

const defaultState = {
  list: [],
  selected: undefined
};

function updateArticleList(state, action) {
  const list = action.list;
  return Object.assign({}, { ...state }, { list });
}

function selectArticle(state, action) {
  const selected = action.article;
  return Object.assign({}, { ...state }, { selected });
}

export function articlesReducer(state = defaultState, action) {
  switch(action.type) {
    case UPDATE_LIST:
      return updateArticleList(state, action);
    case SELECT_ARTICLE:
      return selectArticle(state, action);
    default:
      return state;
  }
}
