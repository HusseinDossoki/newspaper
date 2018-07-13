$(document).ready(function(){

  $('.delete-article-btn').on('click', function(e){

    let target    = $(e.target); // $(...) You are dealing with the raw DOM element .. need to wrap it in a jquery object
    let articleId = target.attr('article-id');
    
    // we make a delete request with ajax for security
    // we can make <a href="/article/:id"> but it'll be a GET request and that will run security issues
    $.ajax({
      type: 'DELETE',
      url: `/article/${articleId}`,
      success: (res) => {
        window.location.href = '/';
      },
      error: (err) => {
        console.log(err);
      }
    });

  });


});