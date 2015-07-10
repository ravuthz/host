console.info('default.js loaded.');

window.selectnav = function() {
    return function(p, q) {
        var a, h = function(b) {
                var c;
                b || (b = window.event);
                b.target ? c = b.target : b.srcElement && (c = b.srcElement);
                3 === c.nodeType && (c = c.parentNode);
                c.value && (window.location.href = c.value)
            }, k = function(b) {
                b = b.nodeName.toLowerCase();
                return "ul" === b || "ol" === b
            }, l = function(b) {
                for (var c = 1; document.getElementById("selectnav" + c); c++) {}
                return b ? "selectnav" + c : "selectnav" + (c - 1)
            }, n = function(b) {
                g++;
                var c = b.children.length,
                    a = "",
                    d = "",
                    f = g - 1;
                if (c) {
                    if (f) {
                        for (; f--;) {
                            d += r
                        }
                        d += " "
                    }
                    for (f = 0; f < c; f++) {
                        var e = b.children[f].children[0];
                        if ("undefined" !== typeof e) {
                            var h = e.innerText || e.textContent,
                                i = "";
                            j && (i = -1 !== e.className.search(j) || -1 !== e.parentElement.className.search(j) ? m : "");
                            s && !i && (i = e.href === document.URL ? m : "");
                            a += '<option value="' + e.href + '" ' + i + ">" + d + h + "</option>";
                            t && (e = b.children[f].children[1]) && k(e) && (a += n(e))
                        }
                    }
                    1 === g && o && (a = '<option value="">' + o + "</option>" + a);
                    1 === g && (a = '<select class="selectnav" id="' + l(!0) + '">' + a + "</select>");
                    g--;
                    return a
                }
            };
        if ((a = document.getElementById(p)) && k(a)) {
            document.documentElement.className += " js";
            var d = q || {}, j = d.activeclass || "active1",
                s = "boolean" === typeof d.autoselect ? d.autoselect : !0,
                t = "boolean" === typeof d.nested ? d.nested : !0,
                r = d.indent || "\u2192",
                o = d.label || "- Navigation -",
                g = 0,
                m = " selected ";
            a.insertAdjacentHTML("afterend", n(a));
            a = document.getElementById(l());
            a.addEventListener && a.addEventListener("change", h);
            a.attachEvent && a.attachEvent("onchange", h)
        }
    }
}();
(jQuery);


/* document ready */
;(function($) {

    /* Menu to drop down */
    // selectnav('adajaxmenu', {
    //     label: 'Select Here ',
    //     nested: true,
    //     autoselect: false,
    //     indent: '-'
    // });

    /* BackToTop button */
    $("a#back-to-top").click(function(){
        $("html, body").animate({
            scrollTop:0
        },"slow");
        return false;
    });
    
    

    var url_blog = 'http://ravuthz.blogspot.com/', // Replace With your Blog Url
        numpostx = 20; // Maximum Post
    // $.ajax({
    //         url: '' + url_blog + '/feeds/posts/default?alt=json-in-script&max-results=' + numpostx + '',
    //         type: 'get',
    //         dataType: "jsonp",
    //         success: function(data) {
    //             var posturl, posttitle, skeleton = '',
    //                 entry = data.feed.entry;
    //             if (entry !== undefined) {
    //                 skeleton = "<ul>";
    //                 for (var i = 0; i < entry.length; i++) {
    //                     for (var j = 0; j < entry[i].link.length; j++) {
    //                         if (entry[i].link[j].rel == "alternate") {
    //                             posturl = entry[i].link[j].href;
    //                             break;
    //                         }
    //                     }
    //                     posttitle = entry[i].title.$t;
    //                     skeleton += '<li><a href="' + posturl + '" target="_blank">' + posttitle + '</a></li>';
    //                 }
    //                 skeleton += '</ul>';
    //                 $('#recentpostbreaking').html(skeleton);
    //                 // kode untuk efek pada breaking news

    //                 function tick() {
    //                     $('#recentpostbreaking li:first').slideUp(function() {
    //                         $(this).appendTo($('#recentpostbreaking ul')).slideDown();
    //                     });
    //                 }
    //                 setInterval(function() {
    //                     tick()
    //                 }, 5000);
    //             } else {
    //                 $('#recentpostbreaking').html('<span>No result!</span>');
    //             }
    //         },
    //         error: function() {
    //             $('#recentpostbreaking').html('<strong>Error Loading Feed!</strong>');
    //         }
    //     });
        
        //var url = 'https://www.blogger.com/feeds/5615873936899142487/posts/default?alt=json&max-results=40&orderby=published';

        ajaxGet('' + url_blog + '/feeds/posts/default?alt=json&max-results=' + numpostx + '&orderby=published', 
        function(data){
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
                    tagl+= "<li><a href='" + postLink + "'>" + postTitle + "</a></li>";
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

            
            
            // var posturl, posttitle, skeleton = '',
            //         entry = data.feed.entry;
            //     if (entry !== undefined) {
            //         skeleton = "<ul>";
            //         for (var i = 0; i < entry.length; i++) {
            //             for (var j = 0; j < entry[i].link.length; j++) {
            //                 if (entry[i].link[j].rel == "alternate") {
            //                     posturl = entry[i].link[j].href;
            //                     break;
            //                 }
            //             }
            //             posttitle = entry[i].title.$t;
            //             skeleton += '<li><a href="' + posturl + '" target="_blank">' + posttitle + '</a></li>';
            //         }
            //         skeleton += '</ul>';
            //         $('#recentpostbreaking').html(skeleton);
            //         // kode untuk efek pada breaking news

            //         function tick() {
            //             $('#recentpostbreaking li:first').slideUp(function() {
            //                 $(this).appendTo($('#recentpostbreaking ul')).slideDown();
            //             });
            //         }
            //         setInterval(function() {
            //             tick()
            //         }, 5000);
            //     } else {
            //         $('#recentpostbreaking').html('<span>No result!</span>');
            //     }
        },
        function(){
            $('#recentpostbreaking').html('<strong>Error Loading Feed!</strong>');
        });




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
    var currentPage = 1, rowsPerPage = 9,
        url = 'http://www.blogger.com/feeds/5615873936899142487/posts/default?alt=json';

    ajaxGet(url + '&max-results=' + rowsPerPage + '&start-index=' + currentPage,
    function(data){
        pagePostHtml(data.feed.entry, '#blogPost2');
    });
    
    $(document).on('click', '.item', function(e){
        e.preventDefault();
        var id = $(this).attr('id');
        var post = get(id);
        
        var tag = '<article class="article">'
            tag += '<header><h3>' + post.title.$t + '</h3></header>'
            tag += '<main><img src="" alt="">'
            tag += '<p>' + post.content.$t + '</p></main>'
            tag += '<footer></footer></article>';
        // $("#postOut").append(tag);
        $("#postOut").html(tag);
        $("#postOut").bPopup();
    });
    
    function set(name, value){
        localStorage.setItem(name, JSON.stringify(value));
    }
    function get(name){
        return JSON.parse(localStorage.getItem(name));
    }
    
    ajaxGet(url + '&max-results=999', 
    function(data){
        var totalRows = data.feed.entry.length;
        var totalPages = totalRows > rowsPerPage ? (Math.ceil(totalRows / rowsPerPage)) : 1; 
        
        var tag = "";
        tag += "<ul class='pagination'>";
        tag += "<li><a href='javascript:' onclick='gotopage(1)'> << </a></li>";
        for(var i=1; i<=totalPages; i++){
            if(currentPage == i){
                tag += "<li><a href='javascript:' class='page on' onclick='gotopage("+i+")'>" + i + "</a></li>";
            } else {
                tag += "<li><a href='javascript:' class='page' onclick='gotopage("+i+")'>" + i + "</a></li>";
            }
        }
        tag += "<li><a href='javascript:' onclick='gotopage(" + totalPages + ")'> >> </a></li>";
        tag += "</ul>";
        $("#blogPager2").html(tag);
    });
    
   
   
    
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



/* bPopup, iPopup */


    $(function() {
        // $("#iFrame").attr('src', 'http://ravuthz.blogspot.com/p/about-me.html');
        
        
        $('#btnPopup').bind('click', function(e) { 
            e.preventDefault();

            // $('#iPopup').bPopup();
            $('#postOut').bPopup();
        });
    });
    
})(jQuery);















