const router = require('express').Router();
let Article  = require('../models/Article'); 


router.get('/', (req, res) => {

  Article.find({}, (err, articles) => {
    if(err) throw err;
    res.render('articles', {
      articles: articles
    });

  });
  
});


router.post('/article/add', (req, res) => {
  
  let article = new Article();
  article.title   = req.body.title;
  article.author  = req.body.author;
  article.body    = req.body.body;

  article.save((err) => {
    if(err) {
      console.log(err);
      return;
    } else {
      res.redirect('/');
    }

  });

});


router.get('/article/:id', (req, res) => {
  
  Article.findById(req.params.id, (err, article) => {
    if(err) throw err;
    res.render('single_article', {
      article: article
    })
  });

});

module.exports = router;