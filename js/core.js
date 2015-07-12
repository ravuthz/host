
// var $form = $("#myForm");
//     var url = $form.attr("action") + "?" + $form.serialize();
//     $("#" + id).html(url);
 
// $.ajax({
//     type: "POST",
//     url: action,
//     data: $form,
//     success: function(response)
//     {
//         if(response == 'success')
//             $("#myForm").slideUp('slow', function() {
//                 $("#msg").html("<p class='success'>You have logged in successfully!</p>");
//             });
//         else
//             $("#msg").html("<p class='error'>Invalid username and/or password.</p>");
//     }
// });

function BlogPost(prop){
	// if (!prop){
	// 	console.error('BlogPost need one or more parameter.');
	// 	return false;	
	// }

	var blog_id = '5615873936899142487', 
		max_posts = 9, 
		cpage = 1;

	var url = 'https://www.blogger.com/feeds/' + blog_id + '/posts/default?alt=json&max-results=' + max_posts;

	$.get(url, function(data){
		post(data);
		page(data);
	});

	var post = function(p){
		console.log('post : ', p);
	}

	var page = function(p){
		console.log('page : ', p);
	};

	

	// var url = 'https://www.blogger.com/feeds/' + blog_id + '/posts/default?alt=json&max-results=' + max_posts;
	// jQuery.get(url, function(data){
	// 	console.log('data : ', data);
	// });

	
}

BlogPost();

// window.showpageCount = function(json){
// 		var entry = json.feed.entry.length; //19
// 		var cpost = json.feed.openSearch$startIndex.$t;//1
// 		var tpost = json.feed.openSearch$totalResults.$t || json.feed.entry.length;//19
		
//         tpost = Math.ceil(parseInt(tpost) / max_posts);
// 		page(cpage, tpost);

// 	};

// 	window.page = function(cpage, tpost) {
//         var cp = parseInt(cpage),
//         	tp = tpost;

//         cp = cp <= 1 ? 1 : ((cp-1) * max_posts);

//         var ptag = '<div class="showpageArea">';
//         ptag += '<span class="showpageOf">Pages(' + tp + ')</span>';
//         for(var p=1; p<=tp; p++){
//         	if(cp == p){
//         		ptag += '<span class="showpagePoint"><a href="javascript:" onclick="page(' + p + ',' + tp + ');">' + p + '</a></span>';
//         	} else {
//         		ptag += '<span class="showpageNum"><a href="javascript:" onclick="page(' + p + ',' + tp + ');">' + p + '</a></span>';
//         	}
//         }
//         ptag += '</div>';

//         var link = url + '&start-index=' + cp + '&orderby=published';

//         $(function(){
//         	ajaxGet(link, function(data){
// 	            $('.blog-posts.hfeed').html(listPosts(data));
// 	            // $('#Blog1').append(ptag);
// 	            $('#blog-pager').html(ptag);
// 	        });
//         });

//         console.info('page : ', cp);
//     }