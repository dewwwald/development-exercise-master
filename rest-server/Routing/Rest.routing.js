module.exports = function ApiRoutes(router) {
    router.get('/articles', 'Article@index');
    router.post('/article', 'Article@store');
    router.get('/article/:article', 'Article@get');
    router.patch('/article/:article', 'Article@patch');
    router.delete('/article/:article', 'Article@delete');
}