import json
import os
import platform
import requests

ROBLOX_API_URL = "https://users.roblox.com/v1/users/authenticated"
session = requests.Session()
count = 0

def whichPythonCommand():
    LocalMachineOS = platform.system()
    if (
        LocalMachineOS == "win32"
        or LocalMachineOS == "win64"
        or LocalMachineOS == "Windows"
    ):
        return "python"
    else:
        return "python3"

if whichPythonCommand() == "python3":
    os.system("clear")
else:
    os.system("cls")

def printMainMessage(mes):
    print(f"\x1b[38;2;255;255;255m{mes}\033[38;5;231m")

def printErrorMessage(mes):
    print(f"\x1b[38;2;255;0;0m{mes}\033[38;5;231m")

def printSuccessMessage(mes):
    print(f"\x1b[38;2;0;255;0m{mes}\033[38;5;231m")


def printWarnMessage(mes):
    print(f"\x1b[38;2;255;75;0m{mes}\033[38;5;231m")

printWarnMessage("Welcome to Roblox Item Fixer!")
printWarnMessage("Script v1.5.1")
printWarnMessage("")
printWarnMessage("This script allows you to fixed bugged Roblox Items that are off-sale and can't be put on-sale!")
printWarnMessage("Please know we are not responsible for any phishing/hacking attacks on your ROBLOX account.")
printWarnMessage("Made by @efazdev on Discord (efaz.dev)")
printWarnMessage("")
printWarnMessage("Console: ")

def testIfInt(value):
    try:
        new_int = int(value)
        if new_int < 15:
            return False
        return True
    except Exception as e:
        return False
    
def testVerificationOfUser(cookie):
    session.cookies[".ROBLOSECURITY"] = cookie
    session.headers["accept"] = "application/json"
    session.headers["Content-Type"] = "application/json"
    user_data = session.get(ROBLOX_API_URL).json()
    if user_data.get("name"):
        username = user_data["name"]
        userid = user_data["id"]
        return {
            "success": True,
            "username": username,
            "userId": userid
        }
    else:
        return {
            "success": False,
            "username": "None",
            "userId": 0
        }

def loop(price, cookie):
    generatedSettings = {
        "cookie": "",
        "id": 0,
        "price": 0
    }

    def rbx_request(session, method, url, **kwargs):
        request = session.request(method, url, **kwargs)
        method = method.lower()
        if (
            (method == "post")
            or (method == "put")
            or (method == "patch")
            or (method == "delete")
        ):
            if "X-CSRF-TOKEN" in request.headers:
                session.headers["X-CSRF-TOKEN"] = request.headers["X-CSRF-TOKEN"]
                if request.status_code == 403:  # Request failed, send it again
                    request = session.request(method, url, **kwargs)
        return request

    def fulfillVariables(priceGiven, cookieGiven):
        inputs = [
            input("Enter your Roblox Item ID to use: "),
            123,
            ""
        ]
        if priceGiven == 0:
            inputs[1] = input("Enter your price to set it to: ")
        else:
            inputs[1] = priceGiven

        if cookieGiven == "":
            inputs[2] = input("Enter your Roblox Security Cookie Here (YOUR COOKIE IS SECURE BETWEEN YOU AND ROBLOX): ")
        else:
            inputs[2] = cookieGiven

        cookieInfo = testVerificationOfUser(inputs[2])
        if testIfInt(inputs[0]) == True and testIfInt(inputs[1]) == True and cookieInfo["success"] == True:
            generatedSettings["id"] = int(inputs[0])
            generatedSettings["price"] = int(inputs[1])
            generatedSettings["cookie"] = inputs[2]

            printSuccessMessage("Inputs Passed Tests")
            printSuccessMessage("Results:")
            printMainMessage(f"Roblox Username: {cookieInfo['username']} ({cookieInfo['userId']})")
            printMainMessage("Item ID: " + str(generatedSettings["id"]))
            printMainMessage("Price: " + str(generatedSettings["price"]))

            c = input("Confirm? (y/n): ")
            if not c.lower() == "y":
                fulfillVariables(0, generatedSettings["cookie"])
        else:
            printErrorMessage("Inputs Failed Tests")
            printErrorMessage("Results:")
            new_price = 0
            new_cookie = ""
            if testIfInt(inputs[0]) == True:
                printSuccessMessage(f"True (Item ID)")
            else:
                printErrorMessage(f"False (Item ID)")

            if testIfInt(inputs[1]) == True:
                printSuccessMessage(f"True (Price)")
                new_price = inputs[1]
            else:
                printErrorMessage(f"False (Price)")

            if cookieInfo['success'] == True:
                printSuccessMessage(f"True (Roblox Cookie)")
                new_cookie = inputs[2]
            else:
                printErrorMessage(f"False (Roblox Cookie)")
            printMainMessage("Restarting Form..")
            fulfillVariables(new_price, new_cookie)
         
    fulfillVariables(price, cookie)

    printMainMessage("Requests Ready to send. Send Now? (y/n):")
    sendrequest = input(">> ")
    if sendrequest.lower() == "y":
        def main(item_id):
            global count
            apiLink = "https://itemconfiguration.roblox.com/v1/assets/" + str(item_id) + "/release"
            body = {
                "priceConfiguration": {"priceInRobux": generatedSettings["price"]},
                "saleStatus": "OnSale",
                "releaseConfiguration": {"saleAvailabilityLocations": [0, 1]},
            }
            printMainMessage("Sending Request to https://itemconfiguration.roblox.com:443/v1/assets/" + str(item_id) + "/release..")
            res = rbx_request(session=session, method="POST", url=apiLink, data=json.dumps(body))
            count = count + 1
            if res.status_code == 200 or res.status_code == 204:
                printSuccessMessage("Success! Your Item should be on sale for " + str(generatedSettings["price"]) + " Robux!")
                printSuccessMessage("Response Code: " + str(res.status_code))
                printSuccessMessage("Response: " + res.text)
                printSuccessMessage("Try again with another item? (y/n):")
                if input(">> ").lower() == "y":
                    loop(0, generatedSettings["cookie"])
                else:
                    printWarnMessage("Script Ended")
                    exit()
            else:
                printErrorMessage("Error while sending a request to Roblox's Server:")
                printErrorMessage("Response Code: " + str(res.status_code))
                printErrorMessage("Response: " + res.text)
                if count > 3:
                    printWarnMessage("Do you want to refill the info again? (y/n):")
                    if input(">> ").lower() == "y":
                        loop(0, "")
                    else:
                        printWarnMessage("Would you like to retry the request again? (y/n):")
                        if input(">> ").lower() == "y":
                            main(generatedSettings["id"])
                        else:
                            printWarnMessage("Script Ended")
                            exit()
                else:
                    printWarnMessage("Would you like to retry the request again? (y/n):")
                    if input(">> ").lower() == "y":
                        main(generatedSettings["id"])
                    else:
                        printWarnMessage("Script Ended")
                        exit()
        main(generatedSettings["id"])
    else:
        printWarnMessage("Script Ended")
        exit()
loop(0, "")