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
                        body: `Hello  ${name}! 😊👋.\nI'm PizzaBot 🍕🤖, your virtual assistant from PizzaHouse.\n\n🛎️How can I assist you today?\n├1️⃣ Discover Deals & Promotions\n├2️⃣ Explore Our Full Menu\n├3️⃣ Check Your Cart Summary\n└4️⃣ Connect with a Human`,
                        media:
                          "https://drive.google.com/uc?export=download&id=1rvEiJlrNMSSlTvy428dZIpuulASMtB4V",
                      },
                      "Respond with option number!",
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

                    let promptDeal = menu.deals.prompts[0].message;

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

                    const baseFeature = menu.deals.features[0]; //always at least one feature
                    menu.deals[baseFeature].map((deal) => {
                      if (deal.type.handle === "fixed-price") {
                        promptDeal += `├${options.shift()} ${deal.title} $${
                          deal.type.value
                        }\n`;
                      } else {
                        promptDeal += `├${options.shift()} ${deal.title}\n`; //some other logic if not fixed-price
                      }
                      promptDeal += `│\t_${deal.description}_\n`;
                    });
                    promptDeal += `└${options.shift()} Go Back`;

                    flowDynamic([promptDeal, "Respond with option number!"]);

                    //set go back option when needed
                    context.flowControl.currentSelection.maxOptionNumber =
                      menu.deals[baseFeature].length + 1;
                  },
                  on: {
                    USER_INPUT: [
                      {
                        actions: "handleInvalidOption",
                        cond: "userInput_is_invalid",
                      },
                      {
                        // actions: "assignToContext",
                        target: "prompt-explore-menu",
                        cond: "userInput_match_go_back",
                      },
                      {
                        actions: [
                          "assignToContext",
                          "assignDealMenuCategoryToContext",
                        ],
                        target:
                          "#chatbot.enabled.manage-menu.prompt-deal-item-selection",
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
                      "Embark on a Pizza-Fueled Gastronomic Journey of Flavors! 🍕🍰🥤\n\n🎉 Explore Our Menu \n";

                    for (const category in menu) {
                      if (category !== "deals") {
                        let capitalizedCategory =
                          category.charAt(0).toUpperCase() + category.slice(1);
                        menuPrompt += `├${options.shift()} ${capitalizedCategory}\n`;
                        // menuPrompt += `│\t${menu[category].title} ${menu[category].categoryIcon}\n`; //verbose
                      }
                    }
                    menuPrompt += `└${options.shift()} Go Back`;

                    flowDynamic([menuPrompt, "Respond with option number!"]);

                    //set go back option when needed
                    context.flowControl.currentSelection.maxOptionNumber =
                      Object.keys(menu).length; //exclude deals
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
                          introPrompt += `\n`;
                        }
                      });
                      introPrompt += `└${options.shift()} Go Back`;

                      flowDynamic([introPrompt, "Respond with option number!"]);

                      //go back matches the max option number
                      context.flowControl.currentSelection.maxOptionNumber =
                        selectedMenu[firstFeature].length + 1;

                      return;
                    }

                    //determine data to be saved to context
                    let currentFeature = firstFeature; //default to first feature
                    let selectedItem;

                    if (prevChoice.length > 0) {
                      selectedItem =
                        selectedMenu[firstFeature][prevChoice[0].userInput - 1];

                      for (let i = 0; i < prevChoice.length; i++) {
                        currentFeature = selectedMenu.features[i + 1]; //skip first feature

                        if (i === prevChoice.length - 1) {
                          selectedItem =
                            selectedItem[currentFeature][userInput - 1];
                        } else {
                          selectedItem =
                            selectedItem[currentFeature][
                              prevChoice[i + 1].userInput - 1
                            ];
                        }
                      }
                    } else {
                      selectedItem = selectedMenu[firstFeature][userInput - 1];
                    }

                    //save the previously chosen item to the context

                    prevChoice.push({
                      name: currentFeature,
                      value: selectedItem.feature,
                      userInput,
                    });

                    const nextFeature =
                      selectedMenu.features[prevChoice.length] || null; //null if no more features to be selected

                    //go to next state if no more features to be selected
                    if (!nextFeature) {
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
                    nextPrompt += `└${options.shift()} Go Back`;

                    flowDynamic([nextPrompt, "Respond with option number!"]);

                    //go back matches the max option number
                    context.flowControl.currentSelection.maxOptionNumber =
                      selectedItem[nextFeature].length + 1;
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

                    let nextPrompt = `👍 Great choice!`;

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
                    const nextLine = `🛒 Choose your *quantity*`;

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

                    let nextPrompt;
                    nextPrompt = `Your current selection: 🔍\n${categoryIcon} *${quantity}* unit${
                      quantity > 1 ? "s" : ""
                    } of *${features[0].value}*:`;

                    if (features[1]?.value) {
                      nextPrompt += ` in *${features[1].value}*`;
                    }

                    deals?.forEach((deal, dealIndex) => {
                      const hierarchySymbol =
                        dealIndex !== deals.length - 1 ? "├" : "└";
                      nextPrompt += `\n${hierarchySymbol}✅ ${deal.features[0].value}`;
                      if (deal.features[1]?.value) {
                        nextPrompt += ` ${deal.features[1].value}`;
                      }
                    });

                    //item price
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

                    let itemPrice = 0;
                    if (deals.length > 0) {
                      if (selectedVariant.type?.handle === "fixed-price") {
                        itemPrice = selectedVariant.type.value;
                      } else {
                        itemPrice = selectedVariant.type.value; //some other logic if not fixed-price
                      }
                    } else {
                      itemPrice = selectedVariant.price * quantity;
                    }

                    nextPrompt += `\n\n💰 *Amount:* $${itemPrice.toFixed(2)}`;

                    nextPrompt += `\n\n🛒 What's Next? 🛍️\n├1️⃣ Add to Cart\n└2️⃣ Let Me Tweak My Selection`;

                    context.flowControl.flowDynamic([
                      nextPrompt,
                      "Respond with option number!",
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
                        userInput,
                        currentSelection: {
                          menuCategory,
                          features: chosenDealVariant,
                          deals: dealsToBeDefined,
                        },
                      },
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

                    //only the first time this state is entered
                    if (
                      context.flowControl.currentSelection.isUserResponse ===
                      false
                    ) {
                      // 1) Store the chosen deal in the context.
                      const selectedMenu = menu[menuCategory];
                      const baseFeature = selectedMenu.features[0];
                      const selectedDeal =
                        selectedMenu[baseFeature][userInput - 1];
                      const dealData = selectedDeal.products;

                      chosenDealVariant.push({
                        name: selectedMenu.features[0],
                        value: selectedDeal.feature,
                        userInput,
                      });

                      // 2) Create a buffer to store deals that need to be defined.
                      let dealsBuffer = [];

                      dealData.forEach((deal /* , dealIndex */) => {
                        const dealMenu = menu[deal.menuCategory];

                        let newPreSelectionDeal = {
                          // dealIndex,
                          // variantId: deal.variantId,
                          menuCategory: deal.menuCategory,
                          features: [],
                          // price: deal.price,
                        };

                        for (const feat of dealMenu.features) {
                          if (deal[feat].length > 1) {
                            newPreSelectionDeal.features.push({
                              name: feat,
                              value: undefined, //will be set later by the user
                            });
                          } else {
                            newPreSelectionDeal.features.push({
                              name: feat,
                              value: deal[feat][0], //already set by the merchant
                            });
                          }
                        }

                        for (let i = 0; i < deal.quantity; i++) {
                          dealsBuffer.push({
                            ...newPreSelectionDeal,
                            position: i,
                          });
                        }
                      });

                      //we need a deep copy because there are nested objects
                      // const deep = structuredClone(dealsBuffer);
                      const deepCopy = JSON.parse(JSON.stringify(dealsBuffer)); //simple deep copy

                      dealsToBeDefined.push(...deepCopy);
                    }

                    const ordinals = [
                      "first",
                      "second",
                      "third",
                      "fourth",
                      "fifth",
                      "sixth",
                      "seventh",
                      "eighth",
                      "ninth",
                      "tenth",
                    ];

                    // 3) Handle prompts or user responses based on dealsBuffer.
                    let hasDealToDefine = false;
                    for (const dealItem of dealsToBeDefined) {
                      const dealCategory = dealItem.menuCategory;
                      const dealMenu = menu[dealCategory];

                      for (let i = 0; i < dealItem.features.length; i++) {
                        const feat = dealItem.features[i];
                        if (feat.value === undefined) {
                          if (
                            context.flowControl.currentSelection
                              .isUserResponse === true
                          ) {
                            // store user response
                            const userRes = dealMenu[feat.name][userInput - 1];
                            dealItem.features[i].value = userRes.feature;
                            context.flowControl.currentSelection.isUserResponse = false; //for the next prompt, if any
                          } else {
                            // next prompt
                            nextPrompt = `🛒 Choose your *${
                              ordinals[dealItem.position]
                            } ${dealCategory.slice(0, -1)}* \n`;

                            const variants = dealMenu[feat.name];
                            variants.forEach((variant, index) => {
                              const hierarchySymbol =
                                index !== variants.length - 1 ? "├" : "└";

                              nextPrompt += `${hierarchySymbol}${options.shift()} ${
                                variant.feature
                              }\n`;
                            });

                            flowDynamic([
                              nextPrompt,
                              "Respond with option number!",
                            ]);

                            //halt and await next user input
                            context.flowControl.currentSelection.maxOptionNumber =
                              variants.length;
                            context.flowControl.currentSelection.isUserResponse = true;
                            hasDealToDefine = true;
                            break;
                          }
                        }
                      }
                      if (hasDealToDefine === true) {
                        break;
                      }
                    }

                    if (hasDealToDefine === true) {
                      return;
                    } else {
                      context.flowControl.currentSelection.quantity = 1; //if many deals, likely different items in each.
                      context.flowControl.currentSelection.didCompleteSelection = true;
                    }
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
                        actions: ["assignToContext"],
                        target:
                          "#chatbot.enabled.manage-menu.prompt-deal-item-selection",
                        internal: false,
                      },
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
                        body: `Back to the Menu 🍕🔙\n\nExplore our delicious selection once again and make your choice!\n\n🛎️How can I assist you today?\n├1️⃣ Discover Deals & Promotions\n├2️⃣ Explore Our Full Menu\n├3️⃣ Check Your Cart Summary\n└4️⃣ Connect with a Human` /* ,
                            media:
                              "https://drive.google.com/uc?export=download&id=1rvEiJlrNMSSlTvy428dZIpuulASMtB4V", */,
                      },
                      "Respond with option number!",
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
                      nextPrompt = `🛒 Your Cart is Currently Empty!\n\nNo worries, it's a perfect time to fill it with delicious choices. Explore our menu and craft your perfect order. 🍕🥤\n\nGet ready to enjoy a culinary delight!`;

                      await flowDynamic([
                        nextPrompt,
                        // "Respond anything to continue to the menu... 🍕",
                        "Redirecting to the menu in a few seconds... 🍕",
                      ]);

                      await typing(provider, ctx, 2000);

                      //trigger event to go to explore menu
                      const actor = await leadStore.getLeadMachineInstance(
                        phone
                      );
                      actor.send("USER_INPUT", { userInput: 3 });
                      return;
                    }

                    nextPrompt = `🎉 *Your Cart:* ${cart.items.length} Item${
                      cart.items.length > 1 ? "s" : ""
                    } Ready to Go!`;
                    cart.items?.forEach((item, index) => {
                      const isLastItem = index === cart.items.length - 1;
                      const hierarchySymbol = isLastItem ? "└" : "├";
                      nextPrompt += `\n${hierarchySymbol}✅ ${item.title} (${item.quantity})`;
                    });

                    nextPrompt += `\n\n💰 *Subtotal:* $${cart.total.toFixed(
                      2
                    )}`;
                    nextPrompt += `\n\n🛒 What would you like to do next? 🛍️\n├1️⃣ Proceed to Checkout\n├2️⃣ Edit My Choices\n└3️⃣ Continue Shopping`;

                    flowDynamic([nextPrompt, "Respond with option number!"]);

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
                    nextPrompt = `📝 *Your Cart:* ${
                      cart.items.length
                    } Awesome Pick${cart.items.length > 1 ? "s" : ""}!`;

                    cart.items?.forEach((item, index) => {
                      const selectedMenu = menu[item.menuCategory];
                      const isLastItem = index === cart.items.length - 1;
                      let hierarchySymbol = isLastItem ? "└" : "├";

                      if (isLastItem && item.dealItems) {
                        hierarchySymbol = "├";
                      }

                      nextPrompt += `\n${hierarchySymbol}${selectedMenu.categoryIcon} ${item.title} (${item.quantity})`;

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
                    nextPrompt += `\n\n🛒 Pick an action\n├1️⃣ Start Fresh\n└2️⃣ Go Back`;

                    flowDynamic([nextPrompt, "Respond with option number!"]);

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

                    const checkoutPrompt = `👏 Great choice, ${name}.\n\nYou're almost there.\n\nHow would you like to get your delicious pizza?\n\n🚀 Let's get your order on its way!\n├1️⃣ Pick Up\n└2️⃣ Delivery`;
                    flowDynamic([
                      checkoutPrompt,
                      "Respond with option number!",
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

                    const deliveryPrompt = `🛵 Wonderful choice, ${name}! Delivery is a breeze.\n\nPlease provide us with your delivery address, including any special instructions if needed.\n\nJust type in your address, and we'll take care of the rest!`;
                    const nextLine = `📍 *Address:*`;

                    flowDynamic([deliveryPrompt, nextLine]);
                  },
                  on: {
                    USER_INPUT: [
                      {
                        actions: "storeUserAddress",
                        target: "prompt-address-validation",
                      },
                    ],
                  },
                },
                "prompt-address-validation": {
                  onEntry: (context) => {
                    const { flowDynamic } = context.flowControl;
                    const { shippingAddress } = context.leadState.cart.checkout;

                    const addressValidation = `📍 Here's the address you provided:\n\n${shippingAddress}\n\n🏠 Is this address correct?\n├1️⃣ Yes\n└2️⃣ No, let me try again`;

                    flowDynamic([
                      addressValidation,
                      "Respond with option number!",
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
                      leadState: { name },
                    } = context;
                    const { total } = context.leadState.cart;

                    let paymentPrompt = `🌟 Just a bit further, ${name}! It's payment time:\n\n`;

                    paymentPrompt += `💰 *Total Amount:* $${total.toFixed(
                      2
                    )}\n\n`;

                    paymentPrompt += `💰 Choose your method:\n├1️⃣ Cash\n├2️⃣ Credit card\n├3️⃣ Debit card\n├4️⃣ PayPal\n└5️⃣ Go Back`;

                    flowDynamic([paymentPrompt, "Respond with option number!"]);

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

                    const total = cart.total.toFixed(2);

                    const paymentMethod = cart.checkout.paymentMethod;

                    let orderConfirmation;
                    if (paymentMethod === "Cash") {
                      orderConfirmation = `🎉 Thank you, ${name}! 🍕🥳\n\nYour order has been placed successfully. To proceed with the payment, please prepare *$${total}* in cash. We look forward to serving you!\n\nIf you encounter any issues during the payment process or have questions, feel free to reach out to our customer support.\n\nThank you for choosing PizzaHouse for your meal. We appreciate your business!\n\nEnjoy your meal and thank you again! 🍕🎉`;
                    } else {
                      orderConfirmation = `🎉 Thank you, ${name}! 🍕🥳\n\nYour order has been placed successfully. Please follow the secure payment link below to complete the transaction: 🔒💳\n\n*Payment Link:* https://www.example.com/payment?id=123456789\n\nOnce you complete the payment, we'll start preparing your order for delivery or pickup. We'll keep you updated on the status of your order.\n\nIf you encounter any issues during the payment process or have questions, feel free to reach out to our customer support.\n\nWe appreciate your choice to dine with PizzaHouse.\n\nEnjoy your meal and thank you once again! 🍕🎉`;
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

                await provider.sendText(agentPhoneNumber, agentMessage);

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
          flowDynamic("❌ Invalid option. Please try again.");
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

          let itemPrice;
          if (selectedMenu.type === "deal") {
            if (baseFeatureItem.type?.handle === "fixed-price") {
              itemPrice = baseFeatureItem.type.value;
            } else {
              itemPrice = baseFeatureItem.type.value; //some other logic if not fixed-price
            }
          } else {
            itemPrice = selectedItem.price;
          }

          //Add variantId and price to deal items if applicable.
          deals.forEach((deal) => {
            const dealMenu = menu[deal.menuCategory];
            const dealItem = deal.features.reduce((filteredMenu, feat) => {
              return filteredMenu[feat.name].find(
                (item) => item.feature === feat.value
              );
            }, dealMenu);
            deal.variantId = dealItem.variantId;
            deal.price = dealItem.price;
          });

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
            ...(deals.length > 0 && { dealItems: deals }), //only add dealItems property if it exists
          });
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
              menuCategory: "deals",
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
                  ? "sides"
                  : parseInt(event.userInput) === 2
                  ? "pizzas"
                  : parseInt(event.userInput) === 3
                  ? "desserts"
                  : "drinks",
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
