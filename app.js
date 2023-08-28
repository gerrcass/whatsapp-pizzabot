// require("dotenv").config();
const { createBot, createProvider, createFlow } = require("@bot-whatsapp/bot");
const QRPortalWeb = require("@bot-whatsapp/portal");
const BaileysProvider = require("@bot-whatsapp/provider/baileys");
const MockAdapter = require("@bot-whatsapp/database/mock");

//***  Global state ***
const storeInstance = require("./utils/store");

//***  Flows ***
const flowWelcomeWithStore = require("./flows/flowWelcome");

//*** Main function ***
const main = async () => {
  const adapterDB = new MockAdapter();

  const globalState = await storeInstance;
  const flowWelcome = flowWelcomeWithStore(globalState);
  const adapterFlow = createFlow([flowWelcome]);

  const adapterProvider = createProvider(BaileysProvider);

  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });

  QRPortalWeb();
};

main();
