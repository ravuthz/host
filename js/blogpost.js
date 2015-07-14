function BlogPost(prop, callPost, callPage) {
    var maxpost = prop.maxpost,
        numpost = prop.numpost,
        allpost = prop.allpost;

    console.log('prop : ', numpost);


}


function makePost(posts) {
    console.log('total posts ', posts[0].title.$t);
}

function makePage(pages) {
    console.log('total pages ', pages);
}

var url = 'https://www.blogger.com/feeds/5615873936899142487/posts/default?',
    maxpost = 9,
    keyword = 'snae';

url += (keyword != '') ? ('q="' + keyword + '"&') : '';
// url += 'q="' + keyword + '"&';
url += 'start_index=' + 1;
url += '&alt=json&max-results=' + maxpost + '&orderby=published';
console.log(url);
$.get(url, function(data) {

    console.log('data : ', data);

    var blog = BlogPost({
        maxpost: data.feed.openSearch$itemsPerPage.$t,
        numpost: data.feed.openSearch$totalResults.$t,
        allpost: data.feed.entry
    }, makePost, makePage);

});
