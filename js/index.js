console.info('index.js loaded.');

;(function($){
	var max_posts = 9,
		cpage = 1;

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
        		ptag += '<span class="showpageNum"><a href="javascript:" onclick="page(' + p + ',' + tp + ');">' + p + '</a></span>';
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

    /* json.feed.entry format */
    window.limitedText = function(str, num) {
        if (!num) return str;
        return str.length > num ? str.substring(0, num) + ' ... ' : str;
    };

    window.formatTitle = function(entry) {
        return (entry.title.type == 'html') ? entry.title.$t : escape(entry.title.$t);
    }

    window.formatId = function(id) {
        // "tag:blogger.com,1999:blog-5615873936899142487.post-118256394100900487"
        var blogIndex = id.indexOf("blog-"), //5
            postIndex = id.indexOf("post-"); //5

        if (blogIndex != -1 && postIndex != -1) {
            blogid = id.substring(blogIndex + 5, id.length - (postIndex - 1));
            postid = id.substring(postIndex + 5, id.length);

            return postid; //;[blogid,postid];
        }
        return [];
    };

    window.formatImage = function(img, def) {
        var imageSize = 500;
        var defaultImage = def || 'http://2.bp.blogspot.com/-BNRsAWPapHM/VY0FFPt97YI/AAAAAAAAB9Y/tyZ_UBgPEg4/s1600/no-image.png';

        if (img) {
            /*return img.url.replace(/\/s[0-9]+\-c/g, "/s" + imageSize + "-c");*/
            return img.url.replace(/\/s[0-9]+\-c/g, "");
        }
        /*return defaultImage.replace(/\/s[0-9]+(\-c|\/)/, "/s" + imageSize + "$1");*/
        return defaultImage;
    };

    window.formatDate = function(dat, fmt) {
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var dt;

        if (fmt) {
            dt = new Date(dat);
            return dt.toLocaleDateString(fmt);
        }
        dt = dat.substring(0, 10); /* 2014-11-30T18:31:00.001+07:00 */
        return months[dt.substring(5, 7) - 1] + ', ' + dt.substring(8, 10) + ' ,' + dt.substring(0, 4);
    };

})(jQuery, window);




