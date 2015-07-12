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
		var cpost = json.feed.openSearch$startIndex.$t;//1
		var tpost = json.feed.openSearch$totalResults.$t || json.feed.entry.length;//19
		console.log('json', json);

		page(cpage, tpost);

	};

	window.page = function(cpage, tpost) {

        var cp = parseInt(cpage),
        	tp = Math.ceil(parseInt(tpost) / max_posts);

        cp = cp <= 1 ? 1 : ((cp-1) * max_posts);

        var ptag = '<div class="blog-pager" id="blog-pager"><div class="showpageArea">';
        
        ptag += '<span class="showpageOf">Pages(' + tp + ')</span>';
        for(var p=1; p<=tp; p++){
        	if(cp == p){
        		ptag += '<span class="showpagePoint"><a href="javascript:" onclick="page(' + p + ',' + tp + ');">' + p + '</a></span>';
        	} else {
        		ptag += '<span class="showpageNum"><a href="javascript:" onclick="page(' + p + ',' + tp + ');">' + p + '</a></span>';
        	}
        }
        ptag += '</div></div>';

        var link = url + '&start-index=' + cp + '&orderby=published';

        $(function(){
        	ajaxGet(link, function(data){
	            $('.blog-posts.hfeed').html(listPosts(data));
	            // $('#Blog1').append(ptag);
	            $('#blog-pager').html(ptag);
	        });
        });

        console.info('page : ', cp);
    }


})(jQuery, window);




