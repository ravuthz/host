
function BlogPost(prop, callBlog) {
    var maxpost = prop.maxpost,
        numpost = prop.numpost,
        allpost = prop.allpost,
        allpage = Math.ceil(numpost / maxpost);

    if (prop.callBlog && typeof(prop.callBlog) === "function") {
        prop.callBlog(allpost, allpage);
    }

    if (callBlog && typeof(callBlog) === "function") {
        callBlog(allpost, allpage);
    }

}

var maxpost = 9,
    cpage = 1,
    showpage = 9,
    keyword = '';

var url, feed = '/feeds/posts/default?alt=json&max-results=';

query({
    maxpost: maxpost,
    keyword: keyword
}, function(data) {
    var blog = BlogPost({
        maxpost: data.feed.openSearch$itemsPerPage.$t,
        numpost: data.feed.openSearch$totalResults.$t,
        allpost: data.feed.entry,
        callBlog: function(posts, pages) {
            console.log(posts);
            $('#Blog1').html(listPosts(posts));
            page(1, pages);
        }
    });
});

function query(prop, callback) {
    // var url = 'https://www.blogger.com/feeds/5615873936899142487/posts/default',
    var url = '/feeds/posts/default',
        max = prop.maxpost || 9,
        key = prop.keyword || '',
        idx = prop.stindex || 1;
    if (key) {
        url += '?q="' + key + '"&alt=json&max-results=' + max;
    } else {
        url += '?alt=json&max-results=' + max;
    }
    url += '&start-index=' + idx + '&orderby=published'; //+'&callback=postss';
    console.log(url);
    $.get(url, function(data) {
        callback(data);
    });
}

window.getLink = function(entry) {
    for (var i = 0; i < entry.link.length; i++) {
        if (entry.link[i].rel == 'alternate') {
            return entry.link[i].href;
        }
    }
};

window.getId = function(entry) {
    // "tag:blogger.com,1999:blog-5615873936899142487.post-118256394100900487"
    var id = entry.id.$t;
    var blogIndex = id.indexOf("blog-"), //5
        postIndex = id.indexOf("post-"); //5

    if (blogIndex != -1 && postIndex != -1) {
        blogid = id.substring(blogIndex + 5, id.length - (postIndex - 1));
        postid = id.substring(postIndex + 5, id.length);
        return postid; //;[blogid,postid];
    }
    return [];
};

window.getComment = function(entry) {
    return ('thr$total' in entry) ? entry.thr$total.$t : '';
};

window.getTitle = function(entry, max) {
    // var txt = (entry.title.type == 'html') ? entry.title.$t : escape(entry.title.$t);
    var txt = entry.title.$t;
    return txt.length >= max ? txt.substring(0, max) + ' ... ' : txt;
};

window.getContent = function(entry, max) {
    var txt = '';
    if ('content' in entry) {
        txt = entry.content.$t;
    }
    if ('summary' in entry) {
        txt = entry.summary.$t;
    }
    if (!txt || txt === '') return '';
    txt = txt.replace(/<[^>]*>/g, "");
    return txt.length >= max ? txt.substring(0, max) + ' ... ' : txt;
};

window.getImage = function(entry, def) {
    var img = "http://2.bp.blogspot.com/-BNRsAWPapHM/VY0FFPt97YI/AAAAAAAAB9Y/tyZ_UBgPEg4/s1600/no-image.png";
    if ('media$thumbnail' in entry) {
        img = (entry.media$thumbnail.url).replace(/\/s[0-9]+\-c/g, '');
    }
    if (def) {
        img = def;
    }
    return img;
};

window.getDate = function(entry, format) {
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var date = '';
    if ('published' in entry) {
        date = '2014-11-30T18:31:00.001+07:00'; //entry.published.$t;
    } else {
        return '';
    }

    var d = date.substring(8, 10),
        m = date.substring(5, 7),
        y = date.substring(0, 4),
        h = date.substring(11, 13),
        th = h > 12 ? (h - 12) : h,
        tm = date.substring(14, 16),
        ts = date.substring(16, 18);
    ampm = th > 12 ? 'pm' : 'am';

    if (format) { /* 2014-11-30T18:31:00.001+07:00 */
        return format.replace('mm', months[m - 1]).replace('dd', d).replace('yy', y)
            .replace('th', th).replace('tm', tm).replace('ts', ts).replace('ampm', ampm);
    } else {
        return months[m - 1] + ', ' + d + ' ,' + y;
    }
};

window.page = function(cpage, tpost) {
    var cp = parseInt(cpage),
        tpage = parseInt(tpost);

    var ptag = '<div class="showpageArea">';
    ptag += '<span class="showpageOf">Pages(' + tpage + ')</span>';
    for (var page = 1; page <= tpage; page++) {
        if (cp == page) {
            ptag += '<span class="showpagePoint"><a href="javascript:" onclick="page(' + page + ',' + tpage + ');">' + page + '</a></span>';
        } else {
            if (page > showpage) {
                ptag += '<span class="hidepageNum"><a href="javascript:" onclick="page(' + page + ',' + tpage + ');">' + page + '</a></span>';
            } else if (page < showpage) {
                ptag += '<span class="showpageNum"><a href="javascript:" onclick="page(' + page + ',' + tpage + ');">' + page + '</a></span>';
            }
        }
    }
    ptag += '</div>';

    cp = (cp <= 1) ? 1 : ((cp - 1) * maxpost);

    query({
	    maxpost: maxpost,
	    keyword: keyword,
	    stindex: cp
	}, function(data) {
		$('#Blog1').html(listPosts(data.feed.entry));
        $('#blog-pager').html(ptag);
	});

	// var feed = '/feeds/posts/default?alt=json&max-results=';

 //    var url = feed + maxpost + '&start-index=' + cp + '&orderby=published';

 //    $(function() {
 //        $.get(url, function(data) {
 //            $('#Blog1').html(listPosts(data.feed.entry));
 //            $('#blog-pager').html(ptag);
 //        });
 //    });

    console.info('page : ', cp);
}

window.listPosts = function(entry) {
    var tags = [],
        post = {},
        posts = entry;

    tags.push('<div class="blog-posts hfeed">');
    for (var i = 0; i < posts.length; i++) {
        var post = posts[i];

        var id = getId(post),
            link = getLink(post),
            date = getDate(post),
            title = getTitle(post, 25),
            image = getImage(post),
            comment = getComment(post),
            content = getContent(post);

        tags.push('<div class="post hentry"><div class="post-body entry-content">');
        tags.push('<div class="body-post"><span id="', id, '">');
        tags.push('<div class="entry-image"><a href="', link, '">');
        tags.push('<img class="thumb" src="', image, '"/></a></div>');
        // tags.push('<div class="post-comments"><span><i class="fa fa-comments-o"></i>', comment, '</span></div>');
        tags.push('<div class="post-meta date">', date, '</div>');
        tags.push('<h2 class="index-title">', '<a href="', link, '">', title, '</a></h2>');
        // tags.push('<div class="entry-container"><p>', content, '</p></div></span>');
        tags.push('</span></div></div></div>');

    }
    tags.push('</div>');
    tags.push('<div class="clearfix" id="blog-pager"></div>');
    tags.push('<script type="text/javascript">window.___gcfg = {"lang": "en"};</script>');
    return tags.join("");
};
