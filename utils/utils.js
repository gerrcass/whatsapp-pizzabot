const delay = (ms) => new Promise((res) => setTimeout(res, ms));
const typing = async (provider, ctx, ms) => {
  const refProvider = await provider.getInstance();
  const jid = ctx.key.remoteJid;

  await delay(300);
  await refProvider.sendPresenceUpdate("composing", jid);
  await delay(ms);
  await refProvider.sendPresenceUpdate("available", jid);
};

module.exports = { typing };
