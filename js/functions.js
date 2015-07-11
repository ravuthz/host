function releatePostFunction(){
    (function(){
        var relatedTitles = new Array();
        var relatedTitlesNum = 0;
        var relatedUrls = new Array();
        var thumburl = new Array();

        function related_results_labels_thumbs(json) {
            for (var i = 0; i < json.feed.entry.length; i++) {
                var entry = json.feed.entry[i];
                relatedTitles[relatedTitlesNum] = entry.title.$t;
                try {
                    thumburl[relatedTitlesNum] = entry.gform_foot.url;
                } catch (error) {
                    s = entry.content.$t;
                    a = s.indexOf("<img");
                    b = s.indexOf("src=\"", a);
                    c = s.indexOf("\"", b + 5);
                    d = s.substr(b + 5, c - b - 5);
                    if ((a != -1) && (b != -1) && (c != -1) && (d != "")) {
                        thumburl[relatedTitlesNum] = d;
                    } else thumburl[relatedTitlesNum] = 'http://1.bp.blogspot.com/_u4gySN2ZgqE/SosvnavWq0I/AAAAAAAAArk/yL95WlyTqr0/s400/noimage.png';
                }
                if (relatedTitles[relatedTitlesNum].length > 50) relatedTitles[relatedTitlesNum] = relatedTitles[relatedTitlesNum].substring(0, 50) + "...";
                for (var k = 0; k < entry.link.length; k++) {
                    if (entry.link[k].rel == 'alternate') {
                        relatedUrls[relatedTitlesNum] = entry.link[k].href;
                        relatedTitlesNum++;
                    }
                }
            }
        }

        function removeRelatedDuplicates_thumbs() {
            var tmp = new Array(0);
            var tmp2 = new Array(0);
            var tmp3 = new Array(0);
            for (var i = 0; i < relatedUrls.length; i++) {
                if (!contains_thumbs(tmp, relatedUrls[i])) {
                    tmp.length += 1;
                    tmp[tmp.length - 1] = relatedUrls[i];
                    tmp2.length += 1;
                    tmp3.length += 1;
                    tmp2[tmp2.length - 1] = relatedTitles[i];
                    tmp3[tmp3.length - 1] = thumburl[i];
                }
            }
            relatedTitles = tmp2;
            relatedUrls = tmp;
            thumburl = tmp3;
        }

        function contains_thumbs(a, e) {
            for (var j = 0; j < a.length; j++)
                if (a[j] == e) return true;
            return false;
        }

        function printRelatedLabels_thumbs() {
            for (var i = 0; i < relatedUrls.length; i++) {
                if ((relatedUrls[i] == currentposturl) || (!(relatedTitles[i]))) {
                    relatedUrls.splice(i, 1);
                    relatedTitles.splice(i, 1);
                    thumburl.splice(i, 1);
                    i--;
                }
            }
            var r = Math.floor((relatedTitles.length - 1) * Math.random());
            var i = 0;
            if (relatedTitles.length > 0)
                document.write('<h2 class="relatedpost" >' + relatedpoststitle + ' </h2><br/>');
                document.write('<div class="related-content" style="clear: both;margin-right: -3.5%;" />');
                while (i < relatedTitles.length && i < 50 && i < maxresults) {
                    document.write(' < a style = "width:30%;text-decoration:none;margin:0 18px 18px 0;float:left;');
                    if (i != 0) document.write('"');
                    else document.write('"'); document.write('href="' + relatedUrls[r] + '"><img style="width:100%;height:160px;max-height:200px;padding:0;" src="' + thumburl[r] + '"/><br/><div class="relatedtitle" style="width:90%;padding-left:3px;height:60px;text-align:center;margin:8px 0px; line-height:18px;font-size:100%;">' + relatedTitles[r] + '</div></a>');
                    if (r < relatedTitles.length - 1) {
                        r++;
                    } else {
                        r = 0;
                    }
                    i++;
                }
                document.write('</div>');
                relatedUrls.splice(0, relatedUrls.length);
                thumburl.splice(0, thumburl.length);
                relatedTitles.splice(0, relatedTitles.length);
        }
    })();
}


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