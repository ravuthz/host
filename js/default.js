console.info('default.js loaded.');

;(function($) {
    var max_posts = 9,
        break_news_posts = 40,
        cpage = 1;

    var url, keyword, feed = '/feeds/posts/default?alt=json&max-results=';

    $(function(){
        $('#adajaxmenu .menu a').on('click', function(){
            $('#adajaxmenu li:not(.menu)').slideToggle('slow');
        });
 // var url = url_blog + '/feeds/posts/default?alt=json&max-results=' + numpostx + '&orderby=published';
        // /feeds/posts/summary?alt=json-in-script&amp;callback=showpageCount&amp;max-results=99999
    
        /* Breaking News Script */
       
        url = feed + break_news_posts + '&orderby=published';
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
        
        $('.btnMenu').click(function(){
            var label = $(this).attr('rel');
            var url = '/feeds/posts/summary/-/' + label + '?alt=json&max-results=' + max_posts + '&start-index=' + cpage + '&orderby=published'
            $.get(url, function(data){
                console.log('data menu', data);
                $('.blog-posts.hfeed').html(listPosts(data.feed.entry));
                search(data, cpage);
            });
        });

        $('#btnSearch').click(function(){
           keyword = $('#txtSearch').val();
            var url = '/feeds/posts/default?q=' + keyword + '&alt=json&max-results=' + max_posts + '&start-index=' + cpage + '&orderby=published';
            $.get(url, function(data){
                $('.blog-posts.hfeed').html(listPosts(data));
                console.log('data search : ', data);
                
               search(data, cpage);
            });
        });



        /* BackToTop button */
        $("a#back-to-top").click(function(){
            $("html, body").animate({
                scrollTop:0
            },"slow");
            return false;
        });
        


        /* disable right on page */
        // $(document).bind("contextmenu",function(e){
        //     return false;
        // });
        
    }); /* //document ready */

    window.search = function(json, current_page) {
        var tposts = json.feed.openSearch$totalResults.$t; // total posts
        var ipage = json.feed.openSearch$itemsPerPage.$t;  //9
        var cpage = current_page ? parseInt(current_page) : 1;
        var tpages = Math.ceil(tposts / ipage);
        

        var ptag = '<div class="showpageArea">';
        ptag += '<span class="showpageOf">Pages(' + tpages + ')</span>';
        for(var page = 1; page <= tpages; page++){
            if(cpage == page){
                ptag += '<span class="showpagePoint"><a href="javascript:" onclick="search(' + page + ',' + json + ');">' + page + '</a></span>';
            } else {
                ptag += '<span class="showpageNum"><a href="javascript:" onclick="search(' + page + ',' + json + ');">' + page + '</a></span>';
            }
        }
        ptag += '</div>';

        cpage = (cpage <= 1) ? 1 : ((cpage-1) * ipage);

        // var url = '/feeds/posts/default?q=' + keyword + '&alt=json&max-results=9999&start-index=' + cpage + '&orderby=published';

        $(function(){
            // $.get(url, function(data){
                if(json.feed.entry){
                    $('.blog-posts.hfeed').html(listPosts(json.feed.entry));
                    $('#blog-pager').html(ptag);
                } else {
                    $('.blog-posts.hfeed').html('Search not found');
                    $('#blog-pager').html('');
                }
                

            // });
        });
        
        console.info('search page : ', cpage);
    }


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
    
})(jQuery, window);