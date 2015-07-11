console.info('single.js loaded.');

;(function($){
	var blog_id = '5615873936899142487', 
			max_posts = 9,
			cpage = 1;
	var url = 'https://www.blogger.com/feeds/' + blog_id + '/posts/default?alt=json&max-results=' + max_posts;

	// $(function(){
 //        ajaxGet(url + '&orderby=published', function(data){
 //            var x = listPosts(data),
 //            	y = listPagers();
 //            $('.blog-posts.hfeed').html(x);
 //            $('#Blog1').append(y);

 //        });
	// });

	window.showpageCount = function(json){
		var entry = json.feed.entry.length; //19
		var cpost = json.feed.openSearch$startIndex;//1
		var tpost = json.feed.openSearch$totalResults || json.feed.entry.length;//19
		console.log('json', json);

		page(cpage, tpost);

	};

	window.page = function(cp, tp) {
        var ptag = '<div class="blog-pager" id="blog-pager"><div class="showpageArea">';
        
        ptag += '<span class="showpageOf">Pages(' + tp + ')</span>';
        for(var i=1; i<=tp; i++){
        	if(cp == i){
        		ptag += '<span class="showpagePoint"><a href="javascript:page(' + tp + ',' + p + ')">' + p + '</a></span>';
        	} else {
        		ptag += '<span class="showpageNum"><a href="javascript:page(' + tp + ',' + p + ')">' + p + '</a></span>';
        	}
        }
        ptag += '</div></div>';

        cp = cp <= 1 ? 1 : (cp * max_posts);

        url += '&start-index=' + cp + '&orderby=published';

        ajaxGet(url, function(data){
            $('.blog-posts.hfeed').html(listPosts(data));
            $('#Blog1').append(ptag);
        });
    }


})(jQuery, window);




