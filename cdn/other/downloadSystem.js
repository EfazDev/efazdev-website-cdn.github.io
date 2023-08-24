window.onload = download;

const testingMode = false
var isDownloading = false

function setMessage(message) {
    document.getElementById("message").innerHTML = message
}

function setIsDownloading(toggle) {
    isDownloading = toggle
    const objectButton = document.getElementById("retryButton")
    if (isDownloading == true) {
        objectButton.style.display = "none";
    } else {
        objectButton.style.display = "block";
    }
}

function download() {
    if (isDownloading == false) {
        setIsDownloading(true)
        var url = getDownloadURL()
        console.log("Loaded URL: " + url)

        setMessage("Awaiting server..")
        if (getIfServerIsActive() == true) {
            setMessage("Starting Download..")
            if (testingMode == false) {
                const object = document.getElementById("downloadbutton")
                object.href = url
                object.click()
                setIsDownloading(false)
                setMessage("Download should be started! You'll be redirected soon!")

                setTimeout(() => {
                    object.href = thanksURL + "?file=" + urlParams.get('fileName')
                    object.click()
                }, "4000");
            }
        } else {
            setMessage("Server may be down. Try again later!")
            setIsDownloading(false)
        }
    }
}