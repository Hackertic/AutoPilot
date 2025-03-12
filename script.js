function onTelegramAuth(user) {
    // Send login data to Flask backend
    fetch("https://replit.com/@peyoolade744/Auto#app.py", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            alert("Login Successful: " + data.telegram_id);

            // Ask for forwarding setup
            let host = prompt("Enter the host channel/group username:");
            let target = prompt("Enter the target channel/group username:");

            fetch("https://replit.com/@peyoolade744/Auto#main.py", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    telegram_id: data.telegram_id,
                    host: host,
                    target: target
                })
            })
            .then(res => res.json())
            .then(response => {
                alert(response.message);
            });
        } else {
            alert("Login Failed: " + data.message);
        }
    })
    .catch(error => console.error("Error:", error));
}
