const { createMachine, assign } = require("xstate");
const moment = require("moment");
const { typing } = require("../utils/utils");

const createLeadMachine = (leadStore) =>
  createMachine(
    {
      /** @xstate-layout N4IgpgJg5mDOIC5QGMAWBDALgIwPaYDowA7dbAG0gGIBtABgF1FQAHXWAS0w92OZACeiALQBGAOwBWADQgAHogAsANmUEAHIoDMUunv17lAXyOy0WPIRJlKEArEzoATpiqwSEAAQB3MOWS4ALZg9ExIIGyc3Lz8CggSBMpaktpaogCcouriWsp0AEyyQghiyuIEkgZ06eqa+bkmZhg4+ESkFJAEAApOQSyYngBmuE6eALLoHMTjJACuVBC8YARTAG64ANbLPX0Dw6MTUzPEs6H8kVw8fOFxOQT5mcrqaZnZuUUi+aKSFVU1dQ1TCBzC0rO1bN1eoF+kMRuNJtMxnMqGAnL0nAQWOQsPtApDdrCDgjjqdGOd2JcYjdEFoVIl8pV8op0mV0o9FB8Ssk6ARRKoynQtFp8nRxHR1I1gc1LG0bJ0dtC9nDDojkQBVADKAFEAEoAfQAkgA5LpqgAqZ3CF2i11AcWE6h+OmZtR0knE+VU4k5wkUdDUfK9dHdmXEZUlIJl1g6dgVMP28KOSJOVE1usNJvNNFEYVYFJtsREOR5Yueij5inynvU6R9-N5-PE4lE+XEinUDwj0ta0YhcaVRKT6u1+uNpot+VzEXzV0LJUkokUBFLQuZYr9bJ9ikkameQuSmkk7rKxiBkZ74PlUPjyuJyfmadHmYtWin1tn1IQdwefOeGSyOTKJyogtuoBBshB6R0CBx6KF2FgXnKdjBCcGp+GAyA2viiqEp4Cq4CSqYjhm46WnmUQfnaIiSDoBAFHk27qN8NRJMBdL7vuyhfFxyT5PBoKyjGBAobMaGUJhVzYTeoz4YRj4kVmObkhRVJUQglRaAQwoPDRQpHtu3w+ukiSNiBLLpOW278VGl7IXMYkYVh-a4QAYrM5DkHJxFjlmZJWjOqnyIgIGiHR5ZPC8AHvIIiBMqFkFstB3xhnBZ7dmCSHCfZ6ESbwUkDp4bkeV56Y+RaSn+SptpBQgDJOlBygpF6KSKE2nJaAUdFVOoyjtmKp5NAhGVCSJDm5cQ+W4QA8k4ECop4BqYGAgSwERpXPmR05VXO1aJM2UEqGULVtTFCDlqFDIGD1fX+tZiEjdl4lOdeBUzXNoyLctq2be+gVxLtZQZHQh1SIorXeqdKRgZd+jXdkt1pUNgkQqNOVYSwL3CPswgAI6zOgxDcJgAjCO4T0jGtT6kX55GUtVcQdWono7k1R1gydxR5EzlSw718MDVKSO9p0qNPZJGO7FjIzCAExCDBwTiBFgVyUwpFo01tdNzqIQoEMy7biv+bxAadEX3MyEFJbBd3DSjj2OeLmPY7L8uK8rvCq2V2ZvgF9PBbr+vqIbryAZyZtMpBVspTbyMi-b42Yk70suwrSs2p7G2TspWufq25SaDo4gsmz4Ocm2mkw3ocP9THwt2ahaOSc5CZvfNn0rXhUK4Bn1M+9tn5pGBAGSA8zXsxDxSOvkvxXXzNeIwJddZQ3Yt5c3cKtx9S0d-htAa79fsIIPvLZCPxeg6Xp0sqFui8zdp5AsQuBzfA4Tnpg2cFp+wjpCKdFpAyZikgaxVh9LUIeQYda9W3LSWutlP6URqg6D0-8WwLkkOkYBv9CinWEFITS-IyhlikE8PiC8bKZQcM4D+lUc5qQdEyVBgCMFYNAbgt0etBRlGZK2TQBQ4GZXXoOVUJwEF-REB2UKuRGLthUI6VQ7UlxHhqCosUzYYECIeivB2gUD5zl9NuOi3wuYigXIuVqPovjTz3LSHWUFoIj00XbbRCchGdyCARe8YjD5EPApoSsYpGb5EdD6NBWl9x+j5GyB4TEnFxxcc9AkCYiqeS8bQr+9DaTlFIa2HWrVr4TyLDyHm0FRTMlEP6dscT66iUbmvF601Zpt23q-WmGSarNh5DUMGwToJQQXOoTkrU1AcSFD1bIDwdDVOXrU1eE0JaKilk4XG+NCZcBJmTRyIxvH6K0OkcoDiTHBhAuzTkKRjI2I6jRVsEFpmix0fMpOyyU5u3aXoz8QcwJpCbL1A8fCTbFAqa1cJq4CjpFpM8O58dEk4Rbk0reX13GBFwDs7+eyeQQvBeC4UI9erAX0BoUZl0WTMmmcgahpNZiBCVk4YobTEH2nqOUaRO4niG09ByU6LY9DgQSlHXq0y3FmjlJ4HUcBUSrHdtVd59CmVaV6qyz5LY8Vcq0B2PWfKYLR3IfdCEjhyAbGEJgXAwhJiotlbRFlqglUcuAjuTSCUoJaoFTq22nQjT4A4IMAQngAASVKCbmqQXKq1bKmK2q5W2H4FtLbOtSoNASAARDgsAkJBriBIJchDGpJDFMAjmIhlA1HuDoBxNymI1BMCYIAA */
      id: "chatbot",
      initial: "enabled",
      context: {
        flowControl: {
          isActive: true,
          userInput: -1,
          currentSelection: {
            menuCategory: "",
            features: [],
            userInputCount: 0,
            isUserResponse: false,
            didCompleteSelection: false,
            maxOptionNumber: -1,
            quantity: 0,
            deals: [],
            currentFeatureItems: [],
            currentFeature: "",
          },
          flowDynamic: () => {},
        },
        leadState: {
          name: "",
          phone: "",
          cart: {
            status: "empty", // empty | active | processing | completed (or failed: rejected | canceled | expired)
            total: 0,
            items: [],
            checkout: {
              deliveryMethod: "", // pickup | delivery
              shippingAddress: "",
              paymentMethod: "", // cash | credit | debit | paypal | other
            },
          },
        },
      },
      states: {
        enabled: {
          initial: "start",
          states: {
            start: {
              on: {
                "send welcome": {
                  actions: "setInitialLeadState",
                  target: "manage-menu.prompt-main-menu-on-welcome",
                },
              },
            },
            "manage-menu": {
              states: {
                "prompt-main-menu-on-welcome": {
                  onEntry: async (context) => {
                    const {
                      leadState: { name },
                      flowControl: { flowDynamic },
                    } = context;

                    await flowDynamic([
                      {
                        // body: `Hola ${name}! 😊👋.\nSoy BurguerBot 🍔🤖, tu asistente virtual de BurguerMania.\n\n🛎️¿En qué puedo ayudarte hoy?\n├1️⃣ Descubrir el Especial de la Semana\n├2️⃣ Explorar Nuestro Menú Completo\n├3️⃣ Ver Resumen de Tu Carrito 🛒\n└4️⃣ Hablar con un Asesor`,
                        body: `Hola ${name}! 😊👋.\nSoy BurgerBot 🍔🤖, Tu Asistente de Sabores.\n\n🛎️¿En qué puedo ayudarte hoy?\n├1️⃣ Especial de la Semana\n├2️⃣ Explorar Menú Completo\n├3️⃣ Revisar Tu Carrito 🛒\n└4️⃣ Contactar Servicio al Cliente`,
                        // media:
                        //   "https://drive.google.com/uc?export=download&id=1mX2y6jw0Fu5r_bbkU3Q1hW3d_lTG6Vag",
                        //aqui va el media
                        media:
                          "https://drive.google.com/uc?export=download&id=1uWXl0HgfCF7KiFYDToDkygZVxwi3zF3B",
                      },
                      "¡Responde con el número de la opción!",
                    ]);

                    //there is no go back option
                    context.flowControl.currentSelection.maxOptionNumber = 4;
                  },
                  on: {
                    USER_INPUT: [
                      {
                        actions: "handleInvalidOption",
                        cond: "userInput_is_invalid",
                      },
                      {
                        actions: "assignToContext",
                        target: "prompt-deal-menu",
                        cond: "userInput_is_1",
                      },
                      {
                        actions: "assignToContext",
                        target: "prompt-full-menu",
                        cond: "userInput_is_2",
                      },
                      {
                        actions: "assignToContext",
                        target: "#chatbot.enabled.manage-cart.cart-summary",
                        cond: "userInput_is_3",
                      },
                      {
                        actions: "assignToContext",
                        target: "#chatbot.enabled.connect-with-a-human",
                        cond: "userInput_is_4",
                      },
                    ],
                  },
                },
                "prompt-deal-menu": {
                  onEntry: (context) => {
                    const {
                      flowControl: { flowDynamic },
                    } = context;

                    const { menu } = leadStore;

                    let promptDeal = menu.especial.prompts[0].message;

                    // cosnt addDealToCurrentSelection =

                    // const options = [
                    //   "1️⃣",
                    //   "2️⃣",
                    //   "3️⃣",
                    //   "4️⃣",
                    //   "5️⃣",
                    //   "6️⃣",
                    //   "7️⃣",
                    //   "8️⃣",
                    //   "9️⃣",
                    // ];

                    // const baseFeature = menu.especial.features[0]; //always at least one feature
                    // menu.especial[baseFeature].map((deal) => {
                    //   promptDeal += `├${options.shift()} ${deal.title}\n`;
                    // });
                    // promptDeal += `└${options.shift()} Volver atrás`;

                    //😋 ¿Preparado para saborearla?
                    flowDynamic([
                      {
                        body: promptDeal,
                        // media:
                        //   "https://drive.google.com/uc?export=download&id=1S7SYBjaQC88Gr7-Q_PMR03qRlC__1jVv",
                        //aqui va el media
                        media:
                          "https://drive.google.com/uc?export=download&id=1ZFUd2zIl9A5bTMH0JPamRBxoEXRZYexg",
                      },
                      "¡Responde con el número de la opción!",
                    ]);

                    //go back option matches the max option number
                    context.flowControl.currentSelection.maxOptionNumber = 2;
                  },
                  on: {
                    USER_INPUT: [
                      {
                        actions: "handleInvalidOption",
                        cond: "userInput_is_invalid",
                      },
                      {
                        target: "prompt-explore-menu",
                        cond: "userInput_match_go_back",
                      },
                      {
                        actions: [
                          "assignToContext",
                          // "assignDealMenuCategoryToContext",

                          (context) => {
                            context.flowControl.currentSelection = {
                              menuCategory: "especial",
                              features: [
                                {
                                  name: "variants",
                                  value: "Beef Extravaganza",
                                },
                              ],
                            };
                          },
                        ],
                        target:
                          "#chatbot.enabled.manage-menu.prompt-quantity-selector",
                      },
                    ],
                  },
                },
                "prompt-full-menu": {
                  onEntry: (context) => {
                    const {
                      flowControl: { flowDynamic },
                    } = context;

                    const { menu } = leadStore;

                    const options = [
                      "1️⃣",
                      "2️⃣",
                      "3️⃣",
                      "4️⃣",
                      "5️⃣",
                      "6️⃣",
                      "7️⃣",
                      "8️⃣",
                      "9️⃣",
                    ];

                    let menuPrompt =
                      "¡Desata Tu Pasión por las Hamburguesas en BurguerMania! 🍔🔥🍔\n\n🎉 Elige tu Camino de Sabor:\n";

                    for (const category in menu) {
                      if (category === "especial") continue;
                      let capitalizedCategory =
                        category.charAt(0).toUpperCase() + category.slice(1);
                      menuPrompt += `├${options.shift()} ${capitalizedCategory}\n`;
                      // menuPrompt += `│\t${menu[category].title} ${menu[category].categoryIcon}\n`; //verbose
                    }
                    menuPrompt += `└${options.shift()} Volver atrás`;

                    flowDynamic([
                      menuPrompt,
                      "¡Responde con el número de la opción!",
                    ]);

                    //go back option matches the max option number
                    context.flowControl.currentSelection.maxOptionNumber =
                      Object.keys(menu).length;
                  },
                  on: {
                    USER_INPUT: [
                      {
                        actions: "handleInvalidOption",
                        cond: "userInput_is_invalid",
                      },
                      {
                        target: "prompt-explore-menu",
                        cond: "userInput_match_go_back",
                      },
                      {
                        actions: [
                          "assignToContext",
                          "assignMenuCategoryToContext",
                        ],
                        target: "prompt-menu-item-selection",
                      },
                    ],
                  },
                },
                "prompt-menu-item-selection": {
                  onEntry: (context) => {
                    const {
                      flowControl: {
                        flowDynamic,
                        userInput,
                        currentSelection: {
                          menuCategory,
                          features: prevChoice,
                          userInputCount,
                          currentFeatureItems,
                          currentFeature,
                          maxOptionNumber,
                        },
                      },
                    } = context;

                    const options = [
                      "1️⃣",
                      "2️⃣",
                      "3️⃣",
                      "4️⃣",
                      "5️⃣",
                      "6️⃣",
                      "7️⃣",
                      "8️⃣",
                      "9️⃣",
                      "🔟",
                      "🔙 11.",
                    ];

                    const { menu } = leadStore; //from global store
                    const selectedMenu = menu[menuCategory];

                    const firstFeature = selectedMenu.features[0]; //always at least one feature

                    //display a prompt message upon initial entry into this state

                    if (userInputCount === 0) {
                      let introPrompt = selectedMenu.prompts[0].message;

                      selectedMenu[firstFeature].map((variant) => {
                        introPrompt += `├${options.shift()} ${variant.title}`;
                        if (variant.price) {
                          introPrompt += `: $${variant.price.toFixed(2)}\n`;
                        } else {
                          if (variant.features !== undefined) {
                            const nextFeat = variant.features[0];
                            introPrompt += `: $${variant[
                              nextFeat
                            ][0].price.toFixed(2)} ▶️\n`;
                          } else {
                            introPrompt += `\n`;
                          }
                        }
                      });
                      introPrompt += `└${options.shift()} Volver atrás`;

                      flowDynamic([
                        introPrompt,
                        "¡Responde con el número de la opción!",
                      ]);

                      //go back matches the max option number
                      context.flowControl.currentSelection.maxOptionNumber =
                        selectedMenu[firstFeature].length + 1;

                      //set current feature items
                      context.flowControl.currentSelection.currentFeatureItems =
                        selectedMenu[firstFeature];
                      context.flowControl.currentSelection.currentFeature =
                        firstFeature;

                      return;
                    }

                    //when go back is selected
                    if (userInput === maxOptionNumber) {
                      context.flowControl.currentSelection.userInputCount = 0;
                      currentFeatureItems = {};
                      prevChoice = [];
                      return;
                    }

                    const selectedItem = currentFeatureItems[userInput - 1];

                    //store the user's choice
                    prevChoice.push({
                      name: currentFeature,
                      value: selectedItem.feature,
                      userInput,
                    });

                    const nextFeature =
                      selectedMenu.features[prevChoice.length] || null; //null if no more features to be selected

                    //go to next state if no more features to be selected
                    if (!nextFeature) {
                      if (selectedItem.features !== undefined) {
                        const nextFeat = selectedItem.features[0];

                        const featOptions = selectedItem[nextFeat];

                        context.flowControl.currentSelection.currentFeatureItems =
                          featOptions;
                        context.flowControl.currentSelection.currentFeature =
                          nextFeat;

                        let introPrompt = selectedItem.prompts[0].message;
                        featOptions.map((variant) => {
                          introPrompt += `├${options.shift()} ${
                            variant.feature
                          }`;
                          if (variant.price) {
                            introPrompt += `: $${variant.price.toFixed(2)}\n`;
                          } else {
                            introPrompt += `\n`;
                          }
                        });
                        introPrompt += `└${options.shift()} Volver atrás`;

                        flowDynamic([
                          introPrompt,
                          "¡Responde con el número de la opción!",
                        ]);

                        //go back matches the max option number
                        context.flowControl.currentSelection.maxOptionNumber =
                          featOptions.length + 1;

                        return;
                      }
                      //This checks the condition in the "always" transition.
                      context.flowControl.currentSelection.didCompleteSelection = true;
                      return;
                    }

                    //display a prompt message for the next feature to be selected
                    let nextPrompt;
                    nextPrompt = selectedMenu.prompts[userInputCount].message;

                    selectedItem[nextFeature].map((variant) => {
                      nextPrompt += `├${options.shift()} ${variant.feature}: $${
                        variant.price
                      }\n`;
                    });
                    nextPrompt += `└${options.shift()} Volver atrás`;

                    flowDynamic([
                      nextPrompt,
                      "¡Responde con el número de la opción!",
                    ]);

                    //go back matches the max option number
                    context.flowControl.currentSelection.maxOptionNumber =
                      selectedItem[nextFeature].length + 1;

                    //set current feature items
                    context.flowControl.currentSelection.currentFeatureItems =
                      selectedItem[nextFeature];
                    context.flowControl.currentSelection.currentFeature =
                      nextFeature;
                  },
                  always: {
                    cond: "selection_is_completed",
                    target: "prompt-quantity-selector",
                  },
                  on: {
                    USER_INPUT: [
                      {
                        actions: "handleInvalidOption",
                        cond: "userInput_is_invalid",
                      },
                      {
                        target: "prompt-menu-item-selection",
                        cond: "go_back_menu_item_selection",
                        internal: false,
                      },
                      {
                        actions: "resetCurrentSelection",
                        target: "prompt-full-menu",
                        cond: "userInput_match_go_back",
                      },
                      {
                        actions: ["updateUserInputCount", "assignToContext"],
                        target: "prompt-menu-item-selection",
                        internal: false,
                      },
                    ],
                  },
                },
                "prompt-quantity-selector": {
                  onEntry: (context) => {
                    const {
                      flowControl: {
                        flowDynamic,
                        currentSelection: { menuCategory, features },
                      },
                    } = context;

                    const { menu } = leadStore;

                    const selectedMenu = menu[menuCategory];

                    let nextPrompt = `👍 ¡Excelente elección!`;

                    features.reduce((filteredMenu, feat) => {
                      const isLastFeat = feat === features[features.length - 1];
                      const hierarchySymbol = isLastFeat ? "└" : "├";

                      const featData = filteredMenu[feat.name].find(
                        (item) => item.feature === feat.value
                      );
                      nextPrompt += `\n${hierarchySymbol}✅ ${featData.feature} ${featData.featureIcon}`;
                      return featData;
                    }, selectedMenu);

                    // const nextLine = `🛒 How many of this would you like?`;
                    const nextLine = `🛒 ¿Qué *cantidad* te gustaría agregar?`;

                    flowDynamic([nextPrompt, nextLine]);

                    //No options here, but still needed for user quantity input
                    context.flowControl.currentSelection.maxOptionNumber = 99;
                  },
                  on: {
                    USER_INPUT: [
                      {
                        actions: "handleInvalidOption",
                        cond: "userInput_is_invalid",
                      },
                      {
                        actions: ["assignQtyToContext", "assignToContext"],
                        target:
                          "#chatbot.enabled.manage-menu.prompt-for-confirmation",
                      },
                    ],
                  },
                },
                "prompt-for-confirmation": {
                  onEntry: (context) => {
                    const { quantity, features, menuCategory, deals } =
                      context.flowControl.currentSelection;

                    const { menu } = leadStore;

                    const categoryIcon = menu[menuCategory].categoryIcon;

                    const selectedMenu = menu[menuCategory];
                    const selectedVariant = features.reduce(
                      (filteredMenu, feat) => {
                        const featData = filteredMenu[feat.name].find(
                          (item) => item.feature === feat.value
                        );
                        return featData;
                      },
                      selectedMenu
                    );

                    const featureIcon = selectedVariant
                      ? selectedVariant.featureIcon
                      : categoryIcon;

                    const itemLabel = features
                      .map((feat) => feat.value)
                      .join(" ");

                    let nextPrompt;
                    nextPrompt = `Tu selección actual: 🔍\n${featureIcon} *${quantity}* ${
                      quantity > 1 ? "unidades" : "unidad"
                    } de *${itemLabel}*`;

                    deals?.forEach((deal, dealIndex) => {
                      const hierarchySymbol =
                        dealIndex !== deals.length - 1 ? "├" : "└";

                      const dealLabel = deal.features
                        .map((feat) => feat.value)
                        .join(" ");

                      nextPrompt += `\n${hierarchySymbol}✅ ${dealLabel}`;
                    });

                    //item price
                    let itemPrice = 0;
                    if (deals?.length > 0) {
                      if (selectedVariant.type?.handle === "fixed-price") {
                        itemPrice = selectedVariant.type.value;
                      } else {
                        itemPrice = selectedVariant.type.value; //some other logic if not fixed-price
                      }
                    } else {
                      itemPrice = selectedVariant.price * quantity;
                    }

                    nextPrompt += `\n\n💰 *Monto:* $${itemPrice.toFixed(2)}`;

                    nextPrompt += `\n\n🛒 ¿Deseas continuar? 🛍️\n├1️⃣ Agregar al Carrito\n└2️⃣ Modificar mi Selección`;

                    context.flowControl.flowDynamic([
                      nextPrompt,
                      "¡Responde con el número de la opción!",
                    ]);

                    //no go back option in this state though
                    context.flowControl.currentSelection.maxOptionNumber = 2;
                  },
                  on: {
                    USER_INPUT: [
                      {
                        actions: "handleInvalidOption",
                        cond: "userInput_is_invalid",
                      },
                      {
                        actions: ["addToCart", "resetCurrentSelection"],
                        target: "#chatbot.enabled.manage-cart.cart-summary",
                        cond: "userInput_is_1",
                      },
                      {
                        actions: "resetCurrentSelection",
                        target: "prompt-explore-menu",
                        cond: "userInput_is_2",
                      },
                    ],
                  },
                },
                "prompt-deal-item-selection": {
                  onEntry: (context) => {
                    const {
                      flowControl: {
                        flowDynamic,
                        currentSelection: { deals },
                        // menuCategory,
                      },
                      leadState: { cart },
                    } = context;

                    context.flowControl.currentSelection.menuCategory =
                      "especial";
                    // console.log("🚩menuCategory (before): ", menuCategory);

                    const { menu } = leadStore;
                    const selectedMenu = menu["especial"];
                    // const baseFeature = selectedMenu.features[0]; //always at least one main feature

                    // features.push({
                    //   name: "variants",
                    //   value: "Beef Extravaganza",
                    // });

                    deals.push({
                      name: "variants",
                      value: "Beef Extravaganza",
                    });

                    // const baseFeatureItem = selectedMenu[baseFeature].find(
                    //   (item) => item.feature === features[0].value
                    // );

                    const selectedItem = deals.reduce((filteredMenu, feat) => {
                      return filteredMenu[feat.name].find(
                        (item) => item.feature === feat.value
                      );
                    }, selectedMenu);

                    cart.status = "active";
                    cart.items.push({
                      variantId: selectedItem.variantId,
                      variant: deals,
                      menuCategory:
                        context.flowControl.currentSelection.menuCategory,
                      title: selectedItem.title,
                      // description: selectedItem.description,
                      price: selectedItem.price,
                      quantity: 1,
                    });
                    cart.total = cart.items.reduce(
                      (total, item) => total + item.price * item.quantity,
                      0
                    );

                    let nextPrompt = `👍 ¡Excelente elección!\n\n *¿Quieres agregar algo más para complementar tu comida?* 🥤🍟\n\n👉 *Bebidas:* Refrescos, Té, Agua Mineral, Jugos, Sodas.\n👉 *Extras*: Salsas (variedad), Papas Fritas, Cebolla Caramelizada, Champiñones Salteados, Huevo Frito , Tocineta.\n\n🚀 Escoge una opción:\n├1️⃣ Bebidas\n├2️⃣ Extras\n├3️⃣ Continuar\n└4️⃣ Volver atrás`;

                    // features.reduce((filteredMenu, feat) => {
                    //   const isLastFeat = feat === features[features.length - 1];
                    //   const hierarchySymbol = isLastFeat ? "└" : "├";

                    //   const featData = filteredMenu[feat.name].find(
                    //     (item) => item.feature === feat.value
                    //   );

                    //   nextPrompt += `\n${hierarchySymbol}✅ ${featData.feature} ${featData.featureIcon}`;
                    //   return featData;
                    // }, selectedMenu);

                    // const nextLine = `🛒 How many of this would you like?`;
                    // const nextLine = `🛒 ¿Qué *cantidad* te gustaría agregar?`;

                    flowDynamic([
                      nextPrompt,
                      "¡Responde con el número de la opción!",
                    ]);

                    //go back option matches the max option number
                    context.flowControl.currentSelection.maxOptionNumber = 4;
                  },
                  always: {
                    cond: "selection_is_completed",
                    target:
                      "#chatbot.enabled.manage-menu.prompt-for-confirmation",
                  },
                  on: {
                    USER_INPUT: [
                      {
                        actions: "handleInvalidOption",
                        cond: "userInput_is_invalid",
                      },
                      {
                        target: "prompt-explore-menu",
                        cond: "userInput_match_go_back",
                      },
                      {
                        actions: [
                          // "addToCart",
                          // "resetCurrentSelectionExceptMenuCategory",
                          (context) => {
                            context.flowControl.currentSelection.menuCategory =
                              "bebidas";
                          },
                        ],
                        target: "prompt-menu-item-selection",
                        cond: "userInput_is_1",
                      },
                      {
                        actions: [
                          // "addToCart",
                          // "resetCurrentSelectionExceptMenuCategory",
                          (context) => {
                            context.flowControl.currentSelection.menuCategory =
                              "extras";
                          },
                        ],
                        target: "prompt-menu-item-selection",
                        cond: "userInput_is_2",
                      },
                      {
                        // actions: ["addToCart", "resetCurrentSelection"],
                        target: "#chatbot.enabled.manage-cart.cart-summary",
                        cond: "userInput_is_3",
                      },
                      // {
                      //   actions: ["assignToContext"],
                      //   target:
                      //     "#chatbot.enabled.manage-menu.prompt-deal-item-selection",
                      //   internal: false,
                      // },
                    ],
                  },
                },
                "prompt-explore-menu": {
                  onEntry: (context) => {
                    const {
                      flowControl: { flowDynamic },
                      // leadState: { name },
                    } = context;

                    flowDynamic([
                      {
                        body: `De vuelta al Menú 🍔🔙\n\nDescubre nuestra deliciosa variedad y ¡haz tu elección!\n\n🛎️¿En qué puedo ayudarte hoy?\n├1️⃣ Especial de la Semana\n├2️⃣ Explorar Menú Completo\n├3️⃣ Revisar Tu Carrito 🛒\n└4️⃣ Contactar Servicio al Cliente` /* ,
                            media:
                              "https://drive.google.com/uc?export=download&id=1rvEiJlrNMSSlTvy428dZIpuulASMtB4V", */,
                      },
                      "¡Responde con el número de la opción!",
                    ]);

                    //there is no go back option though
                    context.flowControl.currentSelection.maxOptionNumber = 4;
                  },
                  on: {
                    USER_INPUT: [
                      {
                        actions: "handleInvalidOption",
                        cond: "userInput_is_invalid",
                      },
                      {
                        actions: "assignToContext",
                        target: "prompt-deal-menu",
                        cond: "userInput_is_1",
                      },
                      {
                        actions: "assignToContext",
                        target: "prompt-full-menu",
                        cond: "userInput_is_2",
                      },
                      {
                        actions: "assignToContext",
                        target: "#chatbot.enabled.manage-cart.cart-summary",
                        cond: "userInput_is_3",
                      },
                      {
                        actions: "assignToContext",
                        target: "#chatbot.enabled.connect-with-a-human",
                        cond: "userInput_is_4",
                      },
                    ],
                  },
                },
              },
            },

            "manage-cart": {
              states: {
                "cart-summary": {
                  onEntry: async (context) => {
                    const {
                      flowControl: { flowDynamic, provider, ctx },
                      leadState: { cart, phone },
                    } = context;

                    let nextPrompt;
                    if (cart.items.length === 0) {
                      nextPrompt = `🛒 ¡Tu Carrito Está Actualmente Vacío!\n\nNo te preocupes, es el momento perfecto para llenarlo con deliciosas opciones. Explora nuestro menú y crea tu pedido perfecto. 🍔🥤\n\n¡Prepárate para saborear una delicia!`;

                      await flowDynamic([
                        nextPrompt,
                        "Redirigiendo al menú en unos segundos... 🍔",
                      ]);

                      await typing(provider, ctx, 2000);

                      //trigger event to go to explore menu
                      const actor = await leadStore.getLeadMachineInstance(
                        phone
                      );
                      actor.send("USER_INPUT", { userInput: 3 });
                      return;
                    }

                    nextPrompt = `🛒 *Tu Carrito:* ¡${
                      cart.items.length
                    } Artículo${cart.items.length > 1 ? "s" : ""} listo${
                      cart.items.length > 1 ? "s" : ""
                    }!`;

                    const { menu } = leadStore;
                    cart.items?.forEach((item, index) => {
                      const isLastItem = index === cart.items.length - 1;
                      const hierarchySymbol = isLastItem ? "└" : "├";

                      let itemLabel;
                      if (item.variant.length > 0) {
                        itemLabel = item.variant
                          .map((feat) => feat.value)
                          .join(" ");
                      } else {
                        itemLabel = item.title;
                      }

                      //extract featureIcon from variant
                      const selectedMenu = menu[item.menuCategory];
                      const selectedVariant = item.variant?.reduce(
                        (filteredMenu, feat) => {
                          const featData = filteredMenu[feat.name].find(
                            (item) => item.feature === feat.value
                          );
                          return featData;
                        },
                        selectedMenu
                      );

                      const featureIcon = selectedVariant
                        ? selectedVariant.featureIcon
                        : selectedMenu.categoryIcon;

                      const baseFeat = item.variant[0];
                      let extraLabel = ""; //to be more descriptive
                      if (
                        item.menuCategory === "extras" &&
                        baseFeat.value !== "Salsa" //except for "Salsa" which is already descriptive
                      ) {
                        extraLabel = "Extra";
                      }

                      nextPrompt += `\n${hierarchySymbol}${featureIcon} ${itemLabel} ${extraLabel} (${item.quantity})`;
                    });

                    nextPrompt += `\n\n💰 *Subtotal:* $${cart.total.toFixed(
                      2
                    )}`;
                    nextPrompt += `\n\n🛍️ ¿Tu siguiente paso? \n├1️⃣ Ir a Pagar\n├2️⃣ Editar Mis Artículos\n└3️⃣ Seguir Comprando`;

                    flowDynamic([
                      nextPrompt,
                      "¡Responde con el número de la opción!",
                    ]);

                    //no dynamic maximum options number
                    context.flowControl.currentSelection.maxOptionNumber = 3;
                  },
                  on: {
                    USER_INPUT: [
                      {
                        actions: "handleInvalidOption",
                        cond: "userInput_is_invalid",
                      },
                      {
                        actions: "assignToContext",
                        target:
                          "#chatbot.enabled.manage-order.initiate-checkout",
                        cond: "userInput_is_1",
                      },
                      {
                        actions: "assignToContext",
                        target: "cart-edit",
                        cond: "userInput_is_2",
                      },
                      {
                        actions: "assignToContext",
                        target:
                          "#chatbot.enabled.manage-menu.prompt-explore-menu",
                        cond: "userInput_is_3",
                      },
                    ],
                  },
                },
                "cart-edit": {
                  onEntry: (context) => {
                    const {
                      flowControl: { flowDynamic },
                      leadState: { cart },
                    } = context;

                    const menu = leadStore.menu;

                    let nextPrompt;
                    // nextPrompt = `📝 *Tu Carrito:* ${cart.items.length} ${
                    nextPrompt = `🛒 *Tu Carrito:* ${cart.items.length} ${
                      cart.items.length > 1
                        ? "Increíbles Elecciones"
                        : "Increíble Elección"
                    }!`;

                    cart.items?.forEach((item, index) => {
                      const isLastItem = index === cart.items.length - 1;
                      let hierarchySymbol = isLastItem ? "└" : "├";

                      if (isLastItem && item.dealItems) {
                        hierarchySymbol = "├";
                      }

                      let itemLabel;
                      if (item.variant.length > 0) {
                        itemLabel = item.variant
                          .map((feat) => feat.value)
                          .join(" ");
                      } else {
                        itemLabel = item.title;
                      }

                      //extract featureIcon from variant
                      const selectedMenu = menu[item.menuCategory];
                      const selectedVariant = item.variant?.reduce(
                        (filteredMenu, feat) => {
                          const featData = filteredMenu[feat.name].find(
                            (item) => item.feature === feat.value
                          );
                          return featData;
                        },
                        selectedMenu
                      );

                      const featureIcon = selectedVariant
                        ? selectedVariant.featureIcon
                        : selectedMenu.categoryIcon;

                      const baseFeat = item.variant[0];
                      let extraLabel = ""; //to be more descriptive
                      if (
                        item.menuCategory === "extras" &&
                        baseFeat.value !== "Salsa" //except for "Salsa" which is already descriptive
                      ) {
                        extraLabel = "Extra";
                      }

                      nextPrompt += `\n${hierarchySymbol}${featureIcon} ${itemLabel} ${extraLabel} (${item.quantity})`;

                      item.dealItems?.forEach((dealItem) => {
                        const dealSymbol = "│";

                        const selectedMenu = menu[dealItem.menuCategory];
                        nextPrompt += `\n${dealSymbol}\t➤ ${dealItem.features
                          .map((feature) => feature.value)
                          .join(" ")} ${selectedMenu.categoryIcon}`;
                      });
                    });

                    nextPrompt += `\n\n💰 *Subtotal:* $${cart.total.toFixed(
                      2
                    )}`;
                    nextPrompt += `\n\n🛍️ Escoge una Acción\n├1️⃣ Empezar de Nuevo\n└2️⃣ Volver atrás`;

                    flowDynamic([
                      nextPrompt,
                      "¡Responde con el número de la opción!",
                    ]);

                    //no dynamic maximum options number
                    context.flowControl.currentSelection.maxOptionNumber = 2;
                  },
                  on: {
                    USER_INPUT: [
                      {
                        actions: "handleInvalidOption",
                        cond: "userInput_is_invalid",
                      },
                      {
                        target: "cart-summary",
                        cond: "userInput_match_go_back",
                      },
                      {
                        actions: ["assignToContext", "resetShoppingCart"],
                        target:
                          "#chatbot.enabled.manage-menu.prompt-explore-menu",
                        cond: "userInput_is_1",
                      },
                      {
                        actions: "assignToContext",
                        target: "cart-summary",
                        cond: "userInput_is_2",
                      },
                    ],
                  },
                },
              },
            },
            "manage-order": {
              states: {
                "initiate-checkout": {
                  onEntry: (context) => {
                    const {
                      flowControl: { flowDynamic },
                      leadState: { name },
                    } = context;

                    const checkoutPrompt = `👏 Excelente, ${name}.\n\nYa casi terminas.\n\n🚀 ¿Cómo prefieres recibirlo?\n├1️⃣ Retirar\n└2️⃣ Delivery ($3)`;
                    flowDynamic([
                      checkoutPrompt,
                      "¡Responde con el número de la opción!",
                    ]);

                    //no dynamic maximum options number
                    context.flowControl.currentSelection.maxOptionNumber = 2;
                  },
                  on: {
                    USER_INPUT: [
                      {
                        actions: "handleInvalidOption",
                        cond: "userInput_is_invalid",
                      },
                      {
                        actions: "setDeliveryMethod",
                        target: "prompt-for-payment",
                        cond: "userInput_is_1",
                      },
                      {
                        actions: "setDeliveryMethod",
                        target: "prompt-for-delivery",
                        cond: "userInput_is_2",
                      },
                    ],
                  },
                },
                "prompt-for-delivery": {
                  onEntry: (context) => {
                    const {
                      flowControl: { flowDynamic },
                      leadState: { name },
                    } = context;

                    const deliveryPrompt = `🛵 ¡Genial ${name}! El delivery es muy sencillo.\n\nPor favor, proporciona tu dirección de entrega, incluyendo cualquier instrucción especial si es necesario.\n\n¡Solo escribe tu dirección y nosotros nos encargamos del resto!`;
                    const nextLine = `📍 *Dirección:*`;

                    flowDynamic([deliveryPrompt, nextLine]);
                  },
                  on: {
                    USER_INPUT: [
                      {
                        actions: [
                          "storeUserAddress",
                          (context) => {
                            context.leadState.cart.checkout.deliveryMethod =
                              "Delivery";
                          },
                        ],
                        target: "prompt-address-validation",
                      },
                    ],
                  },
                },
                "prompt-address-validation": {
                  onEntry: (context) => {
                    const { flowDynamic } = context.flowControl;
                    const { shippingAddress } = context.leadState.cart.checkout;

                    const addressValidation = `📍 Esta es la información que proporcionaste:\n\n*${shippingAddress}*\n\n🏠 ¿Está correcta?\n├1️⃣ Si\n└2️⃣ No, déjame intentarlo de nuevo`;

                    flowDynamic([
                      addressValidation,
                      "¡Responde con el número de la opción!",
                    ]);

                    //no dynamic maximum options number
                    context.flowControl.currentSelection.maxOptionNumber = 2;
                  },
                  on: {
                    USER_INPUT: [
                      {
                        actions: "handleInvalidOption",
                        cond: "userInput_is_invalid",
                      },
                      {
                        actions: "assignToContext",
                        target: "prompt-for-payment",
                        cond: "userInput_is_1",
                      },
                      {
                        actions: "assignToContext",
                        target: "prompt-for-delivery",
                        cond: "userInput_is_2",
                      },
                    ],
                  },
                },
                "prompt-for-payment": {
                  onEntry: (context) => {
                    const {
                      flowControl: { flowDynamic },
                      leadState: { name, cart },
                    } = context;

                    const { deliveryMethod } = context.leadState.cart.checkout;

                    let deliveryFee = 0;
                    if (deliveryMethod === "Delivery") {
                      deliveryFee = 3;
                    }

                    //update total
                    cart.total =
                      cart.items.reduce(
                        (total, item) => total + item.price * item.quantity,
                        0
                      ) + deliveryFee;

                    const { total } = context.leadState.cart;

                    let paymentPrompt = `🌟 ¡Un pasito más, ${name}! Llegó el momento de pagar:\n\n`;

                    paymentPrompt += `💰 *Monto Total:* $${total.toFixed(
                      2
                    )}\n\n`;

                    paymentPrompt += `💰 Elige el método de tu preferencia:\n├1️⃣ Efectivo\n├2️⃣ Transferencia bancaria\n├3️⃣ Pago Móvil\n├4️⃣ Zelle\n└5️⃣ Volver atrás`;

                    flowDynamic([
                      paymentPrompt,
                      "¡Responde con el número de la opción!",
                    ]);

                    //no dynamic maximum options number
                    context.flowControl.currentSelection.maxOptionNumber = 5;
                  },
                  on: {
                    USER_INPUT: [
                      {
                        actions: "handleInvalidOption",
                        cond: "userInput_is_invalid",
                      },
                      {
                        target: "initiate-checkout",
                        cond: "userInput_match_go_back",
                      },
                      {
                        actions: "setPaymentMethod",
                        target: "prompt-for-order-confirmation",
                      },
                    ],
                  },
                },
                "prompt-for-order-confirmation": {
                  // type: "final",
                  onEntry: (context) => {
                    const {
                      flowControl: { flowDynamic },
                      leadState: { name },
                    } = context;
                    const { cart } = context.leadState;

                    let bcv = 32.42; //BCV rate of the day
                    const subtotal = cart.total * bcv;
                    // const total = subtotal.toFixed(2);
                    const totalFormatted = subtotal.toLocaleString("es-ES", {
                      minimumFractionDigits: 2,
                    });
                    const bcvFormatted = bcv.toLocaleString("es-ES", {
                      minimumFractionDigits: 2,
                    });

                    const paymentMethod = cart.checkout.paymentMethod;

                    let orderConfirmation;
                    if (paymentMethod === "Cash") {
                      orderConfirmation = `🎉 Gracias, ${name}! 🍔🥳\n\n✅ Tu pedido ha sido procesado exitosamente. Para proceder con el pago, por favor prepara *$${totalFormatted}* en efectivo. ¡Estamos emocionados por atenderte.!\n\nSi tienes algún problema durante el proceso de pago o tienes preguntas, no dudes en contactar a nuestro servicio al cliente.\n\nGracias por elegir BurguerMania. ¡Apreciamos tu preferencia!\n\n¡Disfruta de tu comida y gracias nuevamente! 🍔🎉`;
                    } else {
                      // orderConfirmation = `🎉 Gracias, ${name}! 🍕🥳\n\nTu pedido ha sido procesado exitosamente. Completa la transacción de manera segura siguiendo el enlace de pago a continuación: 🔒💳\n\n*Enlace Seguro:* https://www.example.com/payment?id=123456789\n\nUna vez que hayas realizado el pago, nos pondremos manos a la obra para preparar tu pedido y hacer la entrega o tenerlo listo para que lo retires. Te mantendremos informado sobre el estado del pedido.\n\nSi tienes algún problema durante el proceso de pago o tienes preguntas, no dudes en contactar a nuestro servicio al cliente.\n\nGracias por elegir BurguerMania. ¡Apreciamos tu preferencia!\n\n¡Disfruta de tu comida y gracias nuevamente! 🍔🎉`;
                      orderConfirmation = `🎉 Gracias, ${name}! 🍔🥳\n\n✅ Tu pedido ha sido procesado exitosamente. Completa el pago con esta información:\n\n📱 *Pago Móvil:*\n├🏦 Banco Provincial\n├📞 (0414) 123 45 67\n├🆔 C.I. V-12.345.678\n└💰 Bs ${totalFormatted} (BCV ${bcvFormatted})\n\n📌Envíanos la captura o el número de operación después de pagar.\n\n📌Al confirmar, nos ponemos a trabajar en tu pedido para entrega o retiro. Te mantendremos informado sobre el estado del pedido.\n\nSi tienes algún problema durante el proceso de pago o tienes preguntas, no dudes en contactarnos nuevamente.\n\nGracias por elegir BurguerMania 🍔🎉. ¡Apreciamos tu preferencia!`;
                    }

                    flowDynamic(orderConfirmation);

                    context.flowControl.isActive = false; //disable machine
                  },
                },
              },
            },

            "ai-chat-interaction": {
              onEntry: (context, event) => {
                //Chat with our AI Assistant (to be implemented)
                //https://docs.flowiseai.com/memory/zep-memory
                // const body = {
                //   question: "Hi, I am Gerard",
                //   overrideConfig: {
                //     sessionId: "userid-152632874",
                //   },
                // };
              },
            },
            "connect-with-a-human": {
              onEntry: async (context) => {
                const { flowDynamic, provider, ctx } = context.flowControl;

                //for the user
                const connectWithHumanPrompt = `🤖 I'm here to assist you! If you'd like to speak with a human, we've got you covered.\n\nOur team is ready to help answer any questions or provide assistance you might need.\n\nPlease wait a moment while we connect you with a member of our support team. 🙋‍♂️🙋‍♀️`;
                const nextLine = `Please note that during busy periods, there might be a slight delay in our response. Thank you for your patience! 🕒🙂🍕`;
                flowDynamic([connectWithHumanPrompt, nextLine]);

                //for the agent
                const agentPhoneNumber = "1234567890@s.whatsapp.net"; //1234567890 should be replaced with the agent's phone number
                const agentMessage = `🔔🆕 A new potential customer, ${
                  ctx.pushName
                }, is seeking assistance. Here are the user's contact details:\n\n*Name:* ${
                  ctx.pushName
                }\n*Phone:* wa.me/${
                  ctx.key.remoteJid.split("@")[0]
                }\n*Requested:* ${moment().format(
                  "DD/MM/YYYY HH:mm"
                )}\n\nPlease reach out to provide support and address their needs. Thank you!`;

                // await provider.sendText(agentPhoneNumber, agentMessage);

                await typing(provider, ctx, 1000);

                context.flowControl.isActive = false; //disable machine
              },
            },
          },
          always: {
            cond: "user_not_active",
            target: "Disabled",
          },
        },
        Disabled: {
          type: "final",
          onEntry: async (context, event) => {
            //Implementation for handling the disabled state
            console.log("⛔ Machine currently disabled");
          },
          // after: {
          //   //after 5 minutes, activate the machine again
          //   300000: {
          //     actions: (context) => {
          //       //Attempt enabling the bot with certain logic
          //       context.flowControl.isActive = true;
          //     },
          //     target: "#chatbot.enabled.start",
          //   },
          // },
        },
      },
      predictableActionArguments: true,
      preserveActionOrder: true,
    },
    {
      actions: {
        setPaymentMethod: assign({
          leadState: (context, event) => ({
            ...context.leadState,
            cart: {
              ...context.leadState.cart,
              checkout: {
                ...context.leadState.cart.checkout,
                paymentMethod:
                  parseInt(event.userInput) === 1
                    ? "Cash"
                    : parseInt(event.userInput) === 2
                    ? "Credit Card"
                    : parseInt(event.userInput) === 3
                    ? "Debit Card"
                    : "PayPal",
              },
            },
          }),
        }),
        setDeliveryMethod: assign({
          leadState: (context, event) => ({
            ...context.leadState,
            cart: {
              ...context.leadState.cart,
              checkout: {
                ...context.leadState.cart.checkout,
                deliveryMethod:
                  parseInt(event.userInput) === 1 ? "Pick Up" : "Delivery",
              },
            },
          }),
        }),
        storeUserAddress: assign({
          leadState: (context, event) => ({
            ...context.leadState,
            cart: {
              ...context.leadState.cart,
              checkout: {
                ...context.leadState.cart.checkout,
                shippingAddress: event.userInput,
              },
            },
          }),
        }),
        handleInvalidOption: (context) => {
          const { flowDynamic } = context.flowControl;
          flowDynamic("❌ Opción Inválida. Por favor intenta de nuevo.");
        },
        addToCart: (context) => {
          const {
            flowControl: {
              currentSelection: { menuCategory, features, quantity, deals },
            },
            leadState: { cart },
          } = context;

          const { menu } = leadStore;
          const selectedMenu = menu[menuCategory];
          const baseFeature = selectedMenu.features[0]; //always at least one main feature

          const baseFeatureItem = selectedMenu[baseFeature].find(
            (item) => item.feature === features[0].value
          );

          const selectedItem = features.reduce((filteredMenu, feat) => {
            return filteredMenu[feat.name].find(
              (item) => item.feature === feat.value
            );
          }, selectedMenu);

          let itemPrice = selectedItem.price;

          //Add variantId and price to deal items if applicable.
          deals?.forEach((deal) => {
            const dealMenu = menu[deal.menuCategory];
            const dealItem = deal.features.reduce((filteredMenu, feat) => {
              return filteredMenu[feat.name].find(
                (item) => item.feature === feat.value
              );
            }, dealMenu);
            deal.variantId = dealItem.variantId;
            deal.price = dealItem.price;
          });

          const itemInCart = cart.items.find(
            (item) => item.variantId === selectedItem.variantId
          );

          if (itemInCart) {
            //update the quantity of an item already in the cart
            itemInCart.quantity += quantity;
          } else {
            //add item to cart
            cart.status = "active";
            cart.items.push({
              variantId: selectedItem.variantId,
              variant: features,
              menuCategory,
              title: baseFeatureItem.title,
              description: baseFeatureItem.description,
              price: itemPrice,
              quantity,
              ...(deals?.length > 0 && { dealItems: deals }), //only add dealItems property if it exists
            });
          }
          //update total
          cart.total = cart.items.reduce(
            (total, item) => total + item.price * item.quantity,
            0
          );
        },
        resetShoppingCart: assign({
          leadState: (context) => ({
            ...context.leadState,
            cart: {
              status: "empty",
              items: [],
              total: 0,
            },
          }),
        }),
        updateUserInputCount: assign({
          flowControl: (context) => ({
            ...context.flowControl,
            currentSelection: {
              ...context.flowControl.currentSelection,
              userInputCount:
                context.flowControl.currentSelection.userInputCount + 1,
            },
          }),
        }),
        resetCurrentSelectionExceptMenuCategory: assign({
          flowControl: (context) => ({
            ...context.flowControl,
            userInput: -1,
            currentSelection: {
              features: [],
              userInputCount: 0,
              isUserResponse: false,
              didCompleteSelection: false,
              maxOptionNumber: 0,
              quantity: 0,
              deals: [],
            },
          }),
        }),
        resetCurrentSelection: assign({
          flowControl: (context) => ({
            ...context.flowControl,
            userInput: -1,
            currentSelection: {
              menuCategory: "",
              features: [],
              userInputCount: 0,
              isUserResponse: false,
              didCompleteSelection: false,
              maxOptionNumber: 0,
              quantity: 0,
              deals: [],
            },
          }),
        }),
        setInitialLeadState: assign({
          flowControl: (context, event) => ({
            ...context.flowControl,
            flowDynamic: event.leadData.flowDynamic,
            provider: event.leadData.provider,
            ctx: event.leadData.ctx,
          }),
          leadState: (context, event) => ({
            ...context.leadState,
            name: event.leadData.name,
            phone: event.leadData.phone,
          }),
        }),
        assignToContext: assign({
          flowControl: (context, event) => ({
            ...context.flowControl,
            userInput: parseInt(event.userInput),
          }),
        }),
        assignQtyToContext: assign({
          flowControl: (context, event) => ({
            ...context.flowControl,
            currentSelection: {
              ...context.flowControl.currentSelection,
              quantity: parseInt(event.userInput),
            },
          }),
        }),
        assignDealMenuCategoryToContext: assign({
          flowControl: (context) => ({
            ...context.flowControl,
            currentSelection: {
              ...context.flowControl.currentSelection,
              menuCategory: "especial",
            },
          }),
        }),
        assignMenuCategoryToContext: assign({
          flowControl: (context, event) => ({
            ...context.flowControl,
            currentSelection: {
              ...context.flowControl.currentSelection,
              menuCategory:
                parseInt(event.userInput) === 1
                  ? "entradas"
                  : parseInt(event.userInput) === 2
                  ? "hamburguesas"
                  : parseInt(event.userInput) === 3
                  ? "bebidas"
                  : "extras",
            },
          }),
        }),
      },
      guards: {
        selection_is_completed: (context) =>
          context.flowControl.currentSelection.didCompleteSelection,
        user_not_active: (context) => context.flowControl.isActive === false,
        go_back_menu_item_selection: (context, event) => {
          const { userInput } = event;
          const { maxOptionNumber, userInputCount } =
            context.flowControl.currentSelection;

          if (parseInt(userInput) === parseInt(maxOptionNumber)) {
            if (userInputCount !== 0) {
              context.flowControl.currentSelection.userInputCount = 0;
              context.flowControl.currentSelection.features = [];
              return true;
            }
          }
          return false;
        },
        userInput_match_go_back: (context, event) => {
          const { userInput } = event;
          const { maxOptionNumber } = context.flowControl.currentSelection;
          return parseInt(userInput) === parseInt(maxOptionNumber);
        },
        userInput_is_invalid: (context, event) => {
          const { userInput } = event;
          const { maxOptionNumber } = context.flowControl.currentSelection;

          if (parseInt(userInput) > parseInt(maxOptionNumber)) return true;
          if (parseInt(userInput) === 0) return true;
          if (parseInt(userInput) < 1) return true;
          // if (parseInt(userInput) > 9) return true;
          if (parseInt(userInput) === NaN) return true;
          if (parseInt(userInput) === undefined) return true;
          if (parseInt(userInput) === null) return true;
          if (parseInt(userInput) === "") return true;
          if (isNaN(event.userInput)) return true;

          return false;
        },
        userInput_is_1: (_, event) => parseInt(event.userInput) === 1,
        userInput_is_2: (_, event) => parseInt(event.userInput) === 2,
        userInput_is_3: (_, event) => parseInt(event.userInput) === 3,
        userInput_is_4: (_, event) => parseInt(event.userInput) === 4,
        // userInput_is_5: (_, event) => parseInt(event.userInput) === 5,
      },
    }
  );

module.exports = { createLeadMachine };
