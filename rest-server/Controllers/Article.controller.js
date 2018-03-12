const path = require('path'),
    fs = require('fs');

module.exports = class ArticleController {
    get container() { return this._container; }
    get ArticleModel() { return this._ArticleModel; }
    set ArticleModel(value) { this._ArticleModel = value; }
    
    constructor(container) {
        this._container = container;
        this.ArticleModel = this.container.make('Model/Article');
    }

    index(request, response) {
        this.ArticleModel
            .get()
            .then(() => {
                response.json(this.ArticleModel);
            });
    }

    get(request, response, article) {
        if (article) {
            response.json(article.toJSON());
        } else {
            response.status(404).json({ message: 'Article not found' });
        }
    }

    
    store(request, response) {
        return this.ArticleModel
            .create(request.body)
            .then(() => {
                response.json(this.ArticleModel);
            })
            .catch(error => {
                console.error(error);
                const maskedServerError = { 
                    message: 'An issue occured when trying to handle your request'
                };
                response.status(500).json(maskedServerError);
            });
    }

    patch(request, response, article) {
        article.update(request.body)
            .then(() => {
                response.json(article.toJSON());
            })
            .catch((e) => {
                console.error(e);
                const maskedServerError = { 
                    message: 'An issue occured when trying to handle your request'
                };
                response.status(500).json(maskedServerError);
            });
    }

    delete(request, response, article) {
        article.delete();
        response.json(article.toJSON());
    }
}