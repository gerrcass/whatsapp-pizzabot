const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");

const flowWelcomeWithStore = (globalState) =>
  addKeyword(EVENTS.WELCOME)
    .addAction(async (ctx, { flowDynamic, provider }) => {
      console.log("... Starting Lead Machine 🚀");

      const leadData = {
        phone: ctx.from,
        name: ctx.pushName,
        flowDynamic,
        provider,
        ctx,
      };
      await globalState.initLeadMachine(leadData);
    })
    .addAnswer(
      "__capture_only_intended__",
      { capture: true },
      async (ctx, { fallBack }) => {
        const leadMechine = await globalState.getLeadMachineInstance(ctx.from);

        const userInput = ctx.body.trim();
        leadMechine.send("USER_INPUT", { userInput });

        await fallBack();
        return;
      }
    );

module.exports = flowWelcomeWithStore;
