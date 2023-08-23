import VerifyAllRobloxAccounts
# ./VerifyAllRobloxAccounts.py

new_object = VerifyAllRobloxAccounts.VerifyAllRobloxAccountsViaEmails("youremail@example.com") # If not valid, it will throw exception
new_object.validateCookie("CookieHere") # Verify your cookie if want
new_object.changeEmail("newemail@example.com") # Set a new email
def callback(res):
    # Get callback for each success or failed response per cookie.
    # Example Response: {"failed": False, "cookie": "CookieHere", "message": "Successfully sent email! Check your mailbox to fully verify the account!", "cookieValid": True, "userInfo": {"id":1,"name":"Roblox","displayName":"Roblox"}}
    print(res)
new_response = new_object.sendEmails(["CookieHere"], callback)
# Get final results returned
# Example Response: {"success": True, "email": "newemail@example.com", "successRate": 1, "successCookies": [{"cookie": "CookieHere", "userInfo": {"id":1,"name":"Roblox","displayName":"Roblox"}}], "failedRate": 0, "failedCookies": [], "failedMessages": [{"message": "Invalid Cookie (Validation Error)", "cookie": "CookieHere", "userInfo": {}}], "listOfCookies": ["CookieHere"]}