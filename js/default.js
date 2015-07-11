console.info('default.js loaded.');

;(function($) {
    $(function(){
        $('#adajaxmenu .menu a').on('click', function(){
            $('#adajaxmenu li:not(.menu)').slideToggle('slow');
        });

        var blog_id = '5615873936899142487', max_posts = 40;
        var url = 'https://www.blogger.com/feeds/' + blog_id +'/posts/default?alt=json&max-results=' + max_posts + '&orderby=published';
        ajaxGet(url, function(data){
            var posts = data.feed.entry;
            $('.body-post span').each(function(){
                var postTags = makePost({
                    'title': posts[0].title.$t,
                    'link': posts[0].link[2].href,
                    'date': '10:00',
                    'comment' : '0',
                    'content': '...'
                });
                $(this).html(postTags);
                // var script = $(this).next();
                // console.error(script);
                // console.error(script);
                // $(this).siblings('script').remove();
                $(this).show();
            });
        });

        // var x="<data:post.title/>",y="<data:post.url/>",t="<data:post.timestamp/>",
        //     u="<data:post.numComments/>";rm("p<data:post.id/>");                  

        // var window[object+"<data:post.id/>"] = {
        //   title: "<data:post.title/>",
        //   link: "<data:post.url/>",
        //   date: "<data:post.timestamp/>",
        //   comment: "<data:post.numComments/>"
        // };

    });

    function makePost(post){
        var tags = [];
        tags.push('<div class="entry-image"><a href="', post.link, '">');
        tags.push('<img class="thumb" src="', post.thumb, '"/></a></div>');
        tags.push('<div class="post-comments"><span><i class="fa fa-comments-o"></i>', post.comment, '</span></div>');
        tags.push('<div class="post-meta date">', post.date, '</div>');
        tags.push('<h2 class="index-title">', '<a href="', post.link, '">', post.title, '</a></h2>');
        tags.push('<div class="entry-container"><p>', post.content, '</p></div>');
        return tags.join("");
    }

    
    /* BackToTop button */
    $("a#back-to-top").click(function(){
        $("html, body").animate({
            scrollTop:0
        },"slow");
        return false;
    });
    
    
    /* Breaking News Script */
    // var url_blog = 'http://ravuthz.blogspot.com/', numpostx = 20; // Maximum Post
    // var url = url_blog + '/feeds/posts/default?alt=json&max-results=' + numpostx + '&orderby=published';
    // /feeds/posts/summary?alt=json-in-script&amp;callback=showpageCount&amp;max-results=99999
    var blog_id = '5615873936899142487', max_posts = 40;
    var url = 'https://www.blogger.com/feeds/' + blog_id +'/posts/default?alt=json&max-results=' + max_posts + '&orderby=published';
    
    ajaxGet(url, function(data){
        var posts = data.feed.entry;
        if(posts) {
            var tag = "<ul>";
            for(var i=0; i<posts.length; i++){
                var postTitle = posts[i].title.$t;
                var postLink;
                
                for (var j = 0; j < posts[i].link.length; j++) {
                    if (posts[i].link[j].rel == "alternate") {
                        postLink = posts[i].link[j].href;
                        break;
                    }
                }
                tag += "<li><a href='" + postLink + "'>" + postTitle + "</a></li>";
            }
            tag += "</ul>";
            $("#recentpostbreaking").html(tag);
            
            setInterval(function() {
                $('#recentpostbreaking li:first').slideUp(function() {
                    $(this).appendTo($('#recentpostbreaking ul')).slideDown();
                });
            }, 5000);
        } else {
            $('#recentpostbreaking').html('<span>No Post!</span>');
        }
    }, function(){
        $('#recentpostbreaking').html('<strong>Error Loading Feed!</strong>');
    });
    /* //Breaking News Script */



    $('#adajaxmenu').ajaxBloggerMenu({
        numPosts: 4, // Number of Posts to show
        defaultImg: 'http://2.bp.blogspot.com/-BNRsAWPapHM/VY0FFPt97YI/AAAAAAAAB9Y/tyZ_UBgPEg4/s1600/no-image.png' // Default thumbnail Image
    });

    /* Search button event */
    $('.searchblog').submit(function(e) {
        if ($('.search-form .searchbar').val().length === 0) {
            $('.search-form .search-alert').fadeIn().css('display', 'inline-block');
            e.preventDefault();
        }
    });

    /* disable right on page */
    // $(document).bind("contextmenu",function(e){
    //     return false;
    // });
    
    
    /* list posts with pagination */
    // var currentPage = 1, rowsPerPage = 9,
    //     url = 'http://www.blogger.com/feeds/5615873936899142487/posts/default?alt=json';

    // ajaxGet(url + '&max-results=' + rowsPerPage + '&start-index=' + currentPage,
    // function(data){
    //     pagePostHtml(data.feed.entry, '#blogPost2');
    // });
    
    // $(document).on('click', '.item', function(e){
    //     e.preventDefault();
    //     var id = $(this).attr('id');
    //     var post = get(id);
        
    //     var tag = '<article class="article">'
    //         tag += '<header><h3>' + post.title.$t + '</h3></header>'
    //         tag += '<main><img src="" alt="">'
    //         tag += '<p>' + post.content.$t + '</p></main>'
    //         tag += '<footer></footer></article>';
    //     // $("#postOut").append(tag);
    //     $("#postOut").html(tag);
    //     $("#postOut").bPopup();
    // });
    
    function set(name, value){
        localStorage.setItem(name, JSON.stringify(value));
    }
    function get(name){
        return JSON.parse(localStorage.getItem(name));
    }
    
    // ajaxGet(url + '&max-results=999', 
    // function(data){
    //     var totalRows = data.feed.entry.length;
    //     var totalPages = totalRows > rowsPerPage ? (Math.ceil(totalRows / rowsPerPage)) : 1; 
        
    //     var tag = "";
    //     tag += "<ul class='pagination'>";
    //     tag += "<li><a href='javascript:' onclick='gotopage(1)'> << </a></li>";
    //     for(var i=1; i<=totalPages; i++){
    //         if(currentPage == i){
    //             tag += "<li><a href='javascript:' class='page on' onclick='gotopage("+i+")'>" + i + "</a></li>";
    //         } else {
    //             tag += "<li><a href='javascript:' class='page' onclick='gotopage("+i+")'>" + i + "</a></li>";
    //         }
    //     }
    //     tag += "<li><a href='javascript:' onclick='gotopage(" + totalPages + ")'> >> </a></li>";
    //     tag += "</ul>";
    //     $("#blogPager2").html(tag);
    // });
    
    // var self = $(this), //button
    //     content = $('.content'); 
    // $('#iPopup').bPopup({
    //     onOpen: function() {   
    //         content.html(self.data('bpopup') || '');
    //     },
    //     onClose: function() {
    //         content.empty();
    //     }
    // });
   
    /* Custome functions */
    function ajaxGet(url, success, failure){
        $.ajax({
            methos: "GET",
            url: url,
            dataType: "jsonp",
            success: success,
            error: failure || function(xhr, ajaxOptions, thrownError){
                console.log("Ajax error at url [ " + url + " ]");
                console.log("Error status : " + xhr.status);
                console.log("Error exception : " + xhr.status);
            }
        });
    }    
    function setHtml(objs, id, html){
        var tag = "";
        $.each(objs, function(k, v){
            tag += html(k, v);
        });
        $(id).html(tag);
    }
    function pagePostHtml(objs, selector){
        setHtml(objs, selector, function(k, post){
            var id = ((post.id.$t).split('.post-'))[1],
                defaultImage = 'http://2.bp.blogspot.com/-BNRsAWPapHM/VY0FFPt97YI/AAAAAAAAB9Y/tyZ_UBgPEg4/s1600/no-image.png';
            
            var postId = id,
                postTitle = post.title.$t,
                postImage = post.media$thumbnail ? (post.media$thumbnail.url).replace('s72-c/', '') : defaultImage,
                postDate = (new Date(post.published.$t)).toLocaleTimeString(),
                postContent = post.content.$t,
                postLink = post.link[2].href;
                
            set(postId, post);
            
            return "<div class='post hentry'>"
                + "<div class='post-body entry-content' id='" + postId + "'>"
                + "<div class='body-post'>"
                + "<span id='" + postId + "'>"
                + "<div class='entry-image'>"
                // + "<a href='" + postLink + "'>"
                + "<a href='javascript:' class='item' id='" + postId + "' >"
                + "<img class='thumb' src='" + postImage + "'/>"
                + "</a>"
                + "</div>"
                + "<div class='post-comments'>"
                + "<span>"
                + "<i class='fa fa-comments-o'>0"
                + "</i>"
                + "</span>"
                + "</div>"
                + "<div class='post-meta date'>"
                + postDate
                + "</div>"
                + "<h2 class='index-title'>"
                // + "<a href='" + postLink + "'>"
                + "<a href='javascript:' class='item' id='" + id + "' >"
                + postTitle
                + "</a>"
                + "</h2>"
                + "<div class='entry-container'>"
                + postContent
                + "</div>"
                + "</span>"
                + "</div>"
                + "<div style='clear: both;'>"
                + "</div>"
                + "</div>"
                + "<div class='post-footer'>"
                + "<div class='post-footer-line post-footer-line-1'></div>"
                + "<div class='clr'></div>"
                + "<div class='post-footer-line post-footer-line-2'></div>"
                + "<br/><br/>"
                + "<div class='post-footer-line post-footer-line-3'>"
                + "<div id='related-posts'>"
                + "</div>"
                + "</div>"
                + "</div>"
                + "</div>";
        });
    }
    $(function() { /* document ready */
        // $("#iFrame").attr('src', 'http://ravuthz.blogspot.com/p/about-me.html');
        
        
        $('#btnPopup').bind('click', function(e) { 
            e.preventDefault();

            // $('#iPopup').bPopup();
            $('#postOut').bPopup();
        });
    }); /* //document ready */
    



})(jQuery);