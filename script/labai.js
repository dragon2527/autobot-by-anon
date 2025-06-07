const axios = require("axios");

module.exports.config = {
  name: "labai",
  version: "1.0.1",
  hasPermission: 0,
  credits: "vern",
  description: "Talk to an AI using lab70018's API",
  commandCategory: "AI",
  usages: "labai [your message]",
  cooldowns: 3,
};

module.exports.run = async function({ api, event, args }) {
  const prompt = args.join(" ");

  if (!prompt) {
    return api.sendMessage(
      `📌 USAGE:\nlabai [your message]\n\n💡 Example:\nlabai What's the weather today?\n\nThis command sends your message to an AI and returns a smart response.`,
      event.threadID,
      event.messageID
    );
  }

  try {
    const res = await axios.get("https://ai.lab70018.workers.dev/", {
      params: { q: prompt }
    });

    const reply = res.data?.response || res.data || "⚠️ | No response received.";
    api.sendMessage(`🤖 | ${reply}`, event.threadID, event.messageID);
  } catch (err) {
    console.error("labai error:", err);
    api.sendMessage("❌ | Failed to get a response from the AI.", event.threadID, event.messageID);
  }
};