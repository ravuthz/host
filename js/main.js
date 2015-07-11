//<![CDATA[
    (function(){
        var scripts = ['jquery.bpopup', 'default'];
        var located = "https://rawgit.com/ravuthz/host/master/js/";

        function loadScript(url){
            var date = new Date(),
                scripts = document.createElement("script");

            scripts.type = "text/javascript";
            scripts.src = located + url + '.js?' + date.getUTCMilliseconds();
            document.head.appendChild(scripts);
        }
        
        for(var i=0; i<scripts.length; i++){
            loadScript(located + scripts[i]);
        }
        console.log('loaded all scripts completed.');
    })();
//]]>