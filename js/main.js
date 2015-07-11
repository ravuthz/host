(function(){
    var scripts = ['jquery.bpopup', 'default'];
    var located = "https://rawgit.com/ravuthz/host/master/js/";

    function loadScript(url){
        var date = new Date(),
            scripts = document.createElement("script");

        scripts.type = "text/javascript";
        scripts.src = url + '.js?' + date.getUTCMilliseconds();
        document.head.appendChild(scripts);
    }
    function loadStyle(url){
        var date = new Date(),
            style = document.createElement("link");

        style.type = "text/css";
        style.rel= "stylesheet";
        style.href = url + '.css?' + date.getUTCMilliseconds();
        document.head.appendChild(style);
    }

    loadStyle('default');
    loadStyle('respone');

    for(var i=0; i<scripts.length; i++){
        loadScript(located + scripts[i]);
    }
    console.log('loaded all scripts completed.');
})();