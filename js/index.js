console.info('index.js loaded.');

;(function($){
	var max_posts = 9,
		cpage = 1,
        show_page = 2;

    var url, feed = '/feeds/posts/default?alt=json&max-results=';
    
	window.showpageCount = function(json){
		var entry = json.feed.entry.length; //19
		var cpost = json.feed.openSearch$startIndex.$t;//1
		var tpost = json.feed.openSearch$totalResults.$t || json.feed.entry.length;//19
		
        tpost = Math.ceil(parseInt(tpost) / max_posts);
		page(cpage, tpost);
	};

	window.page = function(cpage, tpost) {
        var cp = parseInt(cpage),
        	tp = parseInt(tpost);

        var ptag = '<div class="showpageArea">';
        ptag += '<span class="showpageOf">Pages(' + tp + ')</span>';
        for(var p=1; p<=tp; p++){
        	if(cp == p){
        		ptag += '<span class="showpagePoint"><a href="javascript:" onclick="page(' + p + ',' + tp + ');">' + p + '</a></span>';
        	} else {
        		if(p >= show_page){c
                    ptag += '<span class="hidepageNum"><a href="javascript:" onclick="page(' + p + ',' + tp + ');">' + p + '</a></span>';    
                } else if (p < show_page) {
                    ptag += '<span class="showpageNum"><a href="javascript:" onclick="page(' + p + ',' + tp + ');">' + p + '</a></span>';    
                }
        	}
        }
        ptag += '</div>';

        cp = (cp <= 1) ? 1 : ((cp-1) * max_posts);

        var url = feed + max_posts + '&start-index=' + cp + '&orderby=published';

        $(function(){
        	$.get(url, function(data){
	            $('#Blog1').html(listPosts(data.feed.entry));
	            $('#blog-pager').html(ptag);
	        });
        });

        console.info('page : ', cp);
    }

    window.listPosts = function(entry) {
        var tags = [],
            post = {},
            posts = entry || [];

        tags.push('<div class="blog-posts hfeed">');
        for (var i = 0; i < posts.length; i++) {
            var post = posts[i];

            var id = formatId(post.id.$t),
                link = post.link[2].href,
                date = formatDate(post.published.$t),
                title = limitedText(post.title.$t, 22),
                image = formatImage(post.media$thumbnail),
                comment = '0',
                content = '';
            
            tags.push('<div class="post hentry"><div class="post-body entry-content">');
            tags.push('<div class="body-post"><span id="', id, '">');

            tags.push('<div class="entry-image"><a href="', link, '">');
            tags.push('<img class="thumb" src="', image, '"/></a></div>');
            // tags.push('<div class="post-comments"><span><i class="fa fa-comments-o"></i>', comment, '</span></div>');
            tags.push('<div class="post-meta date">', date, '</div>');
            tags.push('<h2 class="index-title">', '<a href="', link, '">', title, '</a></h2>');
            tags.push('<div class="entry-container"><p>', content, '</p></div></span>');
            tags.push('</span></div></div></div>');
            
        }
        tags.push('</div>');
        tags.push('<div class="clearfix" id="blog-pager"></div>');
        tags.push('<script type="text/javascript">window.___gcfg = {"lang": "en"};</script>');
        return tags.join("");
    };

    


})(jQuery, window);




