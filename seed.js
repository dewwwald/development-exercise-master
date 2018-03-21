const seeder = require('seeder');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const ArticleModel = require('./rest-server/Models/Article.model');

const seedObjects = {
  article: {
    "5aa6089a8b47eeb542b80c91": {
      "title": "It is impossible to walk rapidly and be unhappy.",
      "name": "it-is-impossible-to-walk-rapidly-and-be-unhappy"
    },
    "5aa60a155f8fe5b55387add9": {
      "title": "We don't get offered crises, they arrive.",
      "name": "we-dont-get-offered-crises-they-arrive"
    },
    "5aa60a1f5f8fe5b55387adda": {
      "title": "I have seen the future and it doesn't work.",
      "name": "i-have-seen-the-future-and-it-doesnt-work"
    },
    "5aa60a275f8fe5b55387addb": {
      "title": "I dwell in possibility...",
      "name": "i-dwell-in-possibility"
    },
    "5aa60a305f8fe5b55387addc": {
      "title": "Knowledge is power.",
      "name": "Knowledge-is-power"
    }
  }
};


mongoose.connect(`mongodb://localhost:27017/typecode-developer-challenge-A17570BAEA41`)
  .then(() => {
    const schema = new mongoose.Schema(ArticleModel.schema)
    mongoose.model('Article', schema);
    seeder(seedObjects, mongoose, console.log, function done(err) {
      if(err) {
        throw err;
      }
      process.exit();
    });
  })
  .catch(e => {
    console.error(e);
  });
