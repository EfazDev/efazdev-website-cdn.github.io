var selected_mode = "Report"

function get_values() {
    var name_obj = document.getElementById("name_input")
    var title_obj = document.getElementById("title_input")
    var message_obj = document.getElementById("message_input")

    return {"n": name_obj.value, "t": title_obj.value, "m": message_obj.value, "mo": selected_mode}
}

function view_main_menu() {
    var obj1 = document.getElementById("main_menu")
    var obj2 = document.getElementById("success")
    var obj3 = document.getElementById("failed")

    obj1.style = "display: block;"
    obj2.style = "display: none;"
    obj3.style = "display: none;"
}

function returnFromMessageAndClear() {
    var name_obj = document.getElementById("name_input")
    var title_obj = document.getElementById("title_input")
    var message_obj = document.getElementById("message_input")
    name_obj.value = ""
    title_obj.value = ""
    message_obj.value = ""

    view_main_menu()
}

function view_success_menu(mode) {
    var obj1 = document.getElementById("main_menu")
    var obj2 = document.getElementById("success")
    var obj3 = document.getElementById("failed")

    obj1.style = "display: none;"
    obj2.style = "display: block;"
    obj3.style = "display: none;"

    var obj4 = document.getElementById("message2")
    if (mode == 1) {
        obj4.innerHTML = "Thanks for suggesting your idea!"
    } else {
        obj4.innerHTML = "Thanks for reporting problems to us!"
    }
}

function view_error_menu(text) {
    var obj1 = document.getElementById("main_menu")
    var obj2 = document.getElementById("success")
    var obj3 = document.getElementById("failed")

    obj1.style = "display: none;"
    obj2.style = "display: none;"
    obj3.style = "display: block;"

    var obj4 = document.getElementById("message1")
    obj4.innerHTML = text
}

function set_mode(text) {
    selected_mode = text

    var obj1 = document.getElementById("current_mode")
    obj1.innerHTML = `Current Mode: ${text}`
    var obj2 = document.getElementById("sendButton")
    obj2.innerHTML = `Send ${text}!`
}

function send_response() {
    var values = get_values()

    if (values["mo"] == "Suggest") {
        fetch("https://api.efaz.dev/api/reports/send-suggestion", {
            "headers": {
                "accept": "application/json",
                "accept-language": "en-US,en;q=0.9",
                "content-type": "application/json",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin"
            },
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": `{"name": "${values["n"]}",  "title": "${values["t"]}",  "message": "${values["m"]}"}`,
            "method": "POST",
            "mode": "cors",
            "credentials": "omit"
        }).then(res => {
            if (res.ok) {
                view_success_menu(1)
            } else {
                res.json().then(json => {
                    view_error_menu(json["message"])
                })
            }
        })
    } else {
        fetch("https://api.efaz.dev/api/reports/send", {
            "headers": {
                "accept": "application/json",
                "accept-language": "en-US,en;q=0.9",
                "content-type": "application/json",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin"
            },
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": `{"name": "${values["n"]}",  "title": "${values["t"]}",  "message": "${values["m"]}"}`,
            "method": "POST",
            "mode": "cors",
            "credentials": "omit"
        }).then(res => {
            if (res.ok) {
                view_success_menu(2)
            } else {
                res.json().then(json => {
                    view_error_menu(json["message"])
                })
            }
        })
    }
}