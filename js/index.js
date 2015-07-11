console.info('single.js loaded.');

;(function($){
	$(function(){
		var blog_id = '5615873936899142487', max_posts = 9;
        var url = 'https://www.blogger.com/feeds/' + blog_id +'/posts/default?alt=json&max-results=' + max_posts + '&orderby=published';
        ajaxGet(url, function(data){
            var x = listPosts(data);
            $('.blog-posts.hfeed').html(x);
        });

        

	});



})(jQuery, window);




