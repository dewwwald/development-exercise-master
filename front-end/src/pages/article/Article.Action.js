import { store } from '../../state/store';

export const UPDATE_LIST = 'article/UPDATE_LIST';
export const SELECT_ARTICLE = 'article/SELECT_ARTICLE';

export function updateList() {
  fetch(`${API_URL}/articles`)
  .then(response => response.json())
  .then(articles => {
    store.dispatch({
      type: UPDATE_LIST,
      list: articles
    });
  });
}

export function selectArticle(article) {
  store.dispatch({
    type: SELECT_ARTICLE,
    article
  });
}

/**
 * updates the currently selected article
 * @param {*} article
 */
export function updateArticle({ title }, callback = (err, response) => {}) {
  const { list, selected } = store.getState().articles;
  fetch(`${API_URL}/article/${selected._id}`, {
    body: JSON.stringify({ title }),
    method: 'PATCH',
    cache: 'no-cache',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
  })
  .then(response => response.json())
  .then(newArticle => {
    store.dispatch({
      type: UPDATE_LIST,
      list: list.map(article => {
        if (article._id === newArticle._id) {
          console.log(newArticle);
          return newArticle;
        }
        return article;
      })
    });
    selectArticle(newArticle);
    callback(null, newArticle);
  })
  .catch(error => {
    callback(error, null);
  });
}
