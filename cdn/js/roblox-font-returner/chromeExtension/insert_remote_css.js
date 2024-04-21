/* 

Efaz's Builder™️ Font Remover
By: EfazDev
Page: https://www.efaz.dev/remove-builder-font

insert_remote_css.js:
    - Create a link element in the form of a stylesheet.
    - Inject remoted styles from https://cdn.efaz.dev/cdn/other/reset_roblox_font.css into the page.
    
*/

(function () {
    if (document.getElementById("return-roblox-gotham") == null) {
        const style = document.createElement("link")
        style.id = "return-roblox-gotham";
        style.rel = "stylesheet";
        style.type = "text/css";
        style.media = "all";
        style.href = "https://cdn.efaz.dev/cdn/other/reset_roblox_font.css"
        document.head.append(style)
    }
})()