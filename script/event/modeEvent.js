module.exports.config = {
  name: "modeEvent",
  eventType: ["message"],
  version: "1.0.0",
  credits: "vern",
  description: "Auto reply and react to messages when Mode is ON."
};

module.exports.run = async function({ api, event }) {
  try {
    const threadID = event.threadID;
    const threadData = global.data.threadData.get(threadID);
    if (!threadData || !threadData.vernMode) return;

    // Auto reply
    const replyMsg = "Hello! Mode is active. How can I help you?";
    await api.sendMessage(replyMsg, threadID);

    // React with 👍 emoji
    await api.react(event.messageID, "👍");
  } catch (error) {
    console.error(error);
  }
};
