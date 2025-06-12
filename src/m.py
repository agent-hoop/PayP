import os

structure = {
    "App.css": None,
    "App.js": None,
    "index.js": None,
    "nav.js": None,
    "components": [
        "Activity.css", "Activity.js",
        "Admin.css", "Admin.js",
        "Footer.css", "Footer.js",
        "Home.css", "Home.js",
        "Nav.css", "Nav.js",
        "Notification.css", "Notification.js",
        "PaymentSuccess.css", "PaymentSuccess.js",
        "ProfileDropdown.css", "ProfileDropdown.js",
        "SendMoney.css", "SendMoney.js"
    ],
    "context": ["WalletContext.js"],
    "data": ["mockUsers.js"]
}

def create_structure(base_path="."):
    for key, value in structure.items():
        path = os.path.join(base_path, key)
        if value is None:
            # Create file
            open(path, "w").close()
        elif isinstance(value, list):
            os.makedirs(path, exist_ok=True)
            for file in value:
                open(os.path.join(path, file), "w").close()

if __name__ == "__main__":
    create_structure()
    print("✅ Folder and file structure created.")
