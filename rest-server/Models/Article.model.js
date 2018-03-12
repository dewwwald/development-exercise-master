const path = require('path'),
    mongoose = require('mongoose'),
    articlePostSchema = require(path.resolve('../common/rest-schemas/article-schema')),
    { takeUntil } = require('rxjs/operators'),
    { Subject } = require('rxjs/subject'),
    { Validation } = require('uni-validation'),
    { Model, SERIALIZE_ALL } = require('epitome-core');


module.exports = class ArticleModel extends Model {    
    /**
     * slugifySpace: used in slugify function
     * @var RegExp
     */
    static get slugifySpaces() { return new RegExp(' [ ]{0,5}', 'g'); };
    
    /**
     * invalidSlugChars: just a regex to simplify slugs, doesn't reflect RFC 3986 URI standard
     * @var RegExp
     */
    static get invalidSlugChars() { return new RegExp('(?:[^a-zA-Z0-9\-])*', 'g'); }

    static get schema() {
        return {
            name: {
                type: String,
                required: true,
                index: { unique: true },
                validate: {
                    validator: function (value) {
                        return ArticleModel.invalidSlugChars.test(value);
                    },
                    message: `The supplied slug broke some of the rules.
                        Only single dashes allowed.' 
                        Only lowercase alphanumeric values allowed.`
                }
            },
            title: {
                type: String,
                requried: true
            }
        };
    }

    /**
     * Model data
     * @var {}
     */
    set postData(data) {
        const { title } = data;
        const name = data.name || this._slugify(title);
        this._postData = { 
            title,
            name
        };
    }

    get postData() { return this._postData; }

    constructor(listName, data = {}) {
        super(listName, data);
        this.validator = new Validation(articlePostSchema);
        this.serializable = SERIALIZE_ALL;
    }

    /**
     * if you look at this code and think to yourself what??
     * you are right. There should be some refactoring but not 
     * here, it should be done in the uni-validation library as
     * an alternative to validate. Refactoring the code here has
     * no value and does not shorten anything or remove duplication
     * 
     * A validator utilizing the same validation used on front end
     * @param {}
     * @returns uniValidation.ValidationResults: { isValid, fieldname, errors }
     */
    validateArticle(data) {
        return new Promise((resolve, reject) => {
            const length = Object.keys(data).length;
            const destroyer$ = new Subject();
            let validationResults = [];

            this.validator.validate(data)
                .pipe(takeUntil(destroyer$))
                .subscribe(validationResult => {
                    validationResults = [ ...validationResults, validationResult];
                    if (validationResults.length >= length) {
                        destroyer$.next();
                    }
                }, reject, () => {
                    const allValid = validationResults
                        .reduce((x, validationResult) => x && validationResult.isValid, true);
                    if (allValid) {
                        resolve(validationResults);
                    } else {
                        const message = validationResults
                            .reduce((x, validationResult) => x.concat(validationResult.errors), [])
                            .join(' ');
                        reject(new Error(message));
                    }
                });
        })
    } 

    create(postData) {
        return this.validateArticle(postData)
            .then((validationResults) => this._createNewArticle(postData));
    }
    
    update(postData) {
        return this.validateArticle(postData)
            .then((validationResults) => new Promise((resolve, reject) => {
                this.postData = postData;
                const keys = Object.keys(this.postData);
                keys.forEach(key => {
                    this.data[key] = this.postData[key];
                });
                resolve(this.save());
            }));
    }


    /**
     * creates a new article
     * @param string value
     * @param number index 
     * @return string
     */
    _appendRandom5(value, index = 0) {
        const char = this._getRandomAlphaNumericChar();
        value += char;
        if (index < 4) {
            return this._appendRandom5(value, index + 1);
        } else {
            return value;
        }
    }

    /**
     * Creates and returns a single random alphanumeric char
     * @returns string;
     */
    _getRandomAlphaNumericChar() {
        const random = Math.random();
        if (random < .33) {
            return String.fromCharCode(97 + Math.round(25 * Math.random()));
        } else if (random < .67) {
            return String.fromCharCode(65 + Math.round(25 * Math.random()));
        } else {
            return Math.round(9 * Math.random()).toString();
        }
    }

    /**
     * creates a new article
     * @param { isValid, fieldname, errors } validationResults 
     * @returns Promise
     */
    _createNewArticle(postData, retries = 0) { 
        console.log(postData);
        this.postData = postData;
        return new Promise((resolve, reject) => {
            const Article = mongoose.model(this.list);
            const newArticle = new Article(this.postData);
            newArticle.save((err, result) => {
                if (err && err.code === 11000 && retries === 0) {
                    const postData = Object
                        .assign(this.postData, { 
                            name: this._appendRandom5(this.postData.name + '-') 
                        });
                    resolve(this._createNewArticle(postData, retries + 1));
                } else if (err) {
                    reject(err);
                } else {
                    this._data = result.toJSON();
                    resolve(result);
                }
            });
        });
    }

    /**
     * Slugifies the url
     * @param string value 
     */
    _slugify(value) {
        return value
            .trim()
            .replace(ArticleModel.slugifySpaces, '-')
            .replace(ArticleModel.invalidSlugChars, '');
    }
}