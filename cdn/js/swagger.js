var loopFinished = false
function main_swagger() {
    if (loopFinished == false) {
        var a = document.getElementsByClassName('link');
        var d = a[0]
        if (d) {
            d.href = "https://www.efaz.dev/";
            d.target = "_blank";

            var b = document.createElement('link');
            b.type = 'image/png';
            b.rel = 'icon';
            b.href = 'https://cdn.efaz.dev/cdn/png/logo32.png';
            b.sizes = '32x32';
            document.getElementsByTagName('head')[0].appendChild(b);

            var c = document.createElement('link');
            c.type = 'image/png';
            c.rel = 'icon';
            c.href = 'https://cdn.efaz.dev/cdn/png/logo16.png';
            c.sizes = '16x16';
            document.getElementsByTagName('head')[0].appendChild(c);
            loopFinished = true
        } else {
            setTimeout(main_swagger, 100)
        }
    }
}
(function () {
    window.addEventListener("load", function () {
        main_swagger()
    });
})();