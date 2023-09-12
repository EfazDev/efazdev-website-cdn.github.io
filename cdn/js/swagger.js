var loopFinished = false
function main_swagger() {
    if (loopFinished == false) {
        var a = document.getElementsByClassName('link');
        var d = a[0]
        if (d) {
            d.href = "https://www.efaz.dev/";
            d.target = "_blank";

            var e = document.getElementsByTagName("link")
            for (let f = 0; f < e.length; f++) {
                if (e && e.href) {
                    if (e.href == "./favicon-32x32.png" || e.href == "./favicon-16x16.png") {
                        e.remove()
                    }
                }
            }

            var g = document.createElement('p')
            g.innerHTML = "EfazDev"
            g.style = "margin: auto; width: 75%;"
            d.appendChild(g)

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

            var h = `<div id="doc-warning"><div class="warning-close" onclick="this.parentNode.remove()">X</div><div class="warning-description">DO NOT SHARE ANY ACCOUNT COOKIES OR PRIVATE INFORMATION WHEN USING THIS.</div></div>`
            var i = document.getElementById("swagger-ui")
            if (i) {
                i.innerHTML = h + i.innerHTML
            }
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