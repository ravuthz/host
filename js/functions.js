;(function($) { /* main scope for jQuery and Window */

    // featurePosts({
    //  selector: '#result',
    //  blogCode: '5615873936899142487',
    //  labelName: 'Movie',
    //  titleMaxChars: 10,
    //  contentMaxChars: 30,
    //  dateLabel : 'Published on ',
    //  defaultImage: 'https://img.youtube.com/vi/8SrXPr3GCUM/default.jpg'
    // });

    window.ajaxGet = function(url, success, failure) {
        $.ajax({
            url: url,
            type: 'get',
            dataType: 'jsonp',
            success: success,
            error: failure || function(XMLHttpRequest, textStatus, errorThrown) {
                console.log("Ajax error at url [ " + url + " ]");
                console.log("Error status : " + textStatus);
                console.log("Error exception : " + errorThrown);
            }
        });
    };

    /* json.feed.entry format */
    window.limitedText = function(str, num) {
        if (!num) return str;
        return str.length > num ? str.substring(0, num) + ' ... ' : str;
    };

    window.formatTitle = function(entry){
        return (entry.title.type == 'html') ? entry.title.$t : escape(entry.title.$t);
    }

    window.formatId = function(id) {
        // "tag:blogger.com,1999:blog-5615873936899142487.post-118256394100900487"
        var blogIndex = id.indexOf("blog-"), //5
            postIndex = id.indexOf("post-"); //5

        if (blogIndex != -1 && postIndex != -1) {
            blogid = id.substring(blogIndex + 5, id.length - (postIndex - 1));
            postid = id.substring(postIndex + 5, id.length);

            // console.log('blog id ' + blogid);
            // console.log('post id ' + postid);
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

    /* list data common functions */

    window.featurePosts = function(p) {
        p = p || {};
        var numPosts = 4;
        var blogCode = p.blogCode;
        var labelName = p.labelName;

        var blogLink = 'https://www.blogger.com/feeds/' + blogCode + '/posts/default';
        blogLink += '/-/' + labelName;
        blogLink += '?alt=json&max-results=' + numPosts + '&orderby=published';

        ajaxGet(blogLink, function(data) {
            var tag = '',
                imageSize = 100,
                titleNumChars = p.titleMaxChars || 20,
                contentNumChars = p.contentMaxChars || 40,
                dateLabel = p.dateLabel || '',
                posts = data.feed.entry,
                rootClass = 'listByLabel',
                defaultImage = p.defaultImage || 'http://1.bp.blogspot.com/-htG7vy9vIAA/Tp0KrMUdoWI/AAAAAAAABAU/e7XkFtErqsU/s1600/grey.gif';

            tag += '<div class="row feature">';
            for (var i = 0, post; i < posts.length; i++) {
                post = posts[i];

                var postLink = post.link ? post.link[2].href : '',
                    postTitle = limitedText(post.title.$t, titleNumChars),
                    postAuthor = post.author[0].name.$t,
                    postContent = limitedText(post.content.$t, contentNumChars),
                    postThubnail = formatImage(post.media$thumbnail, defaultImage),
                    postPublished = formatDate(post.published.$t);

                tag += '<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12"><div class="thumbnail">';
                tag += '<a href="' + postLink + '">';
                tag += '<img src="' + postThubnail + '" alt=""></a>';
                tag += '<div class="caption">';
                tag += '<h3>' + postTitle + '</h3>';
                // tag += '<p>' + postContent + '</p>';
                tag += '<p><span class="date-label">' + dateLabel + '</span>';
                tag += postPublished + '</p></div></div></div>';
            }
            tag += '<div>';
            $(p.selector).html(tag);

        });
    };

    window.listPosts = function(json, selector){
        var tags = [],
            post = {},
            posts = json.feed.entry || [];

        for(var i=0; i<posts.length; i++){
            var post = posts[i];

            var id = formatId(post.id.$t),
                link = post.link[2].href,
                date = formatDate(post.published.$t),
                title = limitedText(post.title.$t, 22),
                image = formatImage(post.media$thumbnail),
                comment = '0',
                content = '';

            tags.push('<div class="post hentry"><div class="post-body entry-content">');
            tags.push('<div class="body-post"><span id="', id,'">');

            tags.push('<div class="entry-image"><a href="', link, '">');
            tags.push('<img class="thumb" src="', image, '"/></a></div>');
            tags.push('<div class="post-comments"><span><i class="fa fa-comments-o"></i>', comment, '</span></div>');
            tags.push('<div class="post-meta date">', date, '</div>');
            tags.push('<h2 class="index-title">', '<a href="', link, '">', title, '</a></h2>');
            tags.push('<div class="entry-container"><p>', content, '</p></div></span>');
            
            tags.push('<div class="clearfix"></div>');
            tags.push('</span></div></div></div>');
        }
        return tags.join("");
        // if(selector)
        //     return tags.join("");
        // else
        //     $('.blog-posts.hfeed').html(tags.join(""));
    };

})(jQuery, window); /* main scope for jQuery and Window */