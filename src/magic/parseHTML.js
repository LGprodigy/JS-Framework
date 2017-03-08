ZCJ.magic({
    parseHTML: function(html) {
        var tmp = document.implementation.createHTMLDocument(null);
        tmp.body.innerHTML = html;
        return tmp.body.children;
    }
});