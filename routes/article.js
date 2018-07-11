const router = require('express').Router();


router.get('/', (req, res) => {

  res.render('articles');

});

module.exports = router;