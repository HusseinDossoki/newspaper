const router = require('express').Router();
let Article  = require('../models/Article'); 


// get the home page for articles
router.get('/', ensureAuthenticated, (req, res) => {

  Article.find({}, (err, articles) => {
    if(err) throw err;
    res.render('articles', {
      articles: articles
    });

  });
  
});


// add article to database
router.post('/article/add', ensureAuthenticated, (req, res) => {
  
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



// get article details page
router.get('/article/:id', ensureAuthenticated, (req, res) => {
  
  Article.findById(req.params.id, (err, article) => {
    if(err) throw err;
    res.render('single_article', {
      article: article
    })
  });

});


// get article update page
router.get('/article/edit/:id', ensureAuthenticated, (req, res) => {
  
  Article.findById(req.params.id, (err, article) => {
    if(err) throw err;
    res.render('edit_article', {
      article: article
    })
  });

});


// update the article
router.post('/article/edit/:id', ensureAuthenticated, (req, res) => {
  
  let article = {};
  article.title   = req.body.title;
  article.author  = req.body.author;
  article.body    = req.body.body;

  Article.update({_id: req.params.id}, article, (err) => {
    if(err) throw err;
    res.redirect('/');
  });

});


// delete an article
router.delete('/article/:id', ensureAuthenticated, (req, res) => {

  Article.remove({_id: req.params.id}, (err) => {
    if(err) throw err;
    res.send(); // res.send() by default will send a 200 status which means everything is okay
  });

});


function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/user/login');
	}
}

module.exports = router;