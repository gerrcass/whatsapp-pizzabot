const menuListings = {
  sides: {
    menuId: 1,
    type: "side",
    categoryIcon: "🍟",
    title: "Tasty Complements",
    description: "Enhance your pizza delight with our scrumptious side dishes.",
    prompts: [
      {
        feature: "variants",
        verbose: false,
        message:
          "🍕🔥 Elevate your pizza enjoyment with our delectable sides!\n\n🍟 Pick a perfect side\n",
      },
    ],
    features: ["variants"],
    variants: [
      {
        variantId: 1100,
        feature: "Garlic Bread",
        featureIcon: "🍞",
        title: "Garlic Bread",
        description:
          "Savor the traditional garlic bread, oven-baked to perfection and served hot.",
        images: ["domain.com/1100.jpg"],
        servings: "portion",
        price: 1.99,
      },
      {
        variantId: 1101,
        feature: "Spud Bites",
        featureIcon: "🥔",
        title: "Spud Bites",
        description:
          "Enjoy crunchy bite-sized potato spud bites, served with a delectable tomato dip.",
        images: ["domain.com/1101.jpg"],
        servings: "portion",
        price: 2.49,
      },
      {
        variantId: 1102,
        feature: "Hot Chips",
        featureIcon: "🍟",
        title: "Hot Chips",
        description:
          "A generous portion of hot chips, expertly crisped to perfection in the oven.",
        images: ["domain.com/1102.jpg"],
        servings: "portion",
        price: 2.99,
      },
    ],
  },
  pizzas: {
    menuId: 2,
    type: "pizza",
    categoryIcon: "🍕",
    title: "Deluxe Pizza Bliss",
    description: "Pizzas for every taste and occasion.",
    features: ["toppings", "servings"],
    prompts: [
      {
        feature: "toppings",
        verbose: false, //if true, will display the description of the variant (to be implemented)
        message:
          "Explore Our Scrumptious Pizza Selection 🍕🍕🍕\n\n🍕 Select your favorite:\n",
      },
      {
        feature: "servings",
        message: "Choose the serving size for your selected pizza\n",
      },
    ],
    toppings: [
      {
        feature: "Pepperoni",
        title: "Pepperoni Lovers",
        featureIcon: "🍕",
        description:
          "A pizza designed for pepperoni enthusiasts, generously topped with pepperoni and mozzarella.",
        servings: [
          {
            variantId: 2100,
            feature: "Small",
            featureIcon: "📐",
            images: ["domain.com/2100.jpg"],
            price: 9.99,
          },
          {
            variantId: 2101,
            feature: "Medium",
            featureIcon: "📐",
            images: ["domain.com/2101.jpg"],
            price: 12.99,
          },
          {
            variantId: 2102,
            feature: "Large",
            featureIcon: "📐",
            images: ["domain.com/2102.jpg"],
            price: 15.99,
          },
        ],
      },
      {
        feature: "Supreme",
        featureIcon: "🍕",
        title: "Super Supreme",
        description:
          "A supreme combination of flavors with pepperoni, Italian sausage, bell peppers, onions, black olives, mushrooms, and mozzarella.",
        servings: [
          {
            variantId: 2200,
            feature: "Small",
            featureIcon: "📐",
            price: 11.99,
          },
          {
            variantId: 2201,
            feature: "Medium",
            featureIcon: "📐",
            price: 15.99,
          },
          {
            variantId: 2202,
            feature: "Large",
            featureIcon: "📐",
            price: 19.99,
          },
        ],
      },
      {
        feature: "Hawaiian",
        featureIcon: "🍕",
        title: "Hawaiian",
        description:
          "A tropical delight with ham, pineapple, and mozzarella cheese.",
        servings: [
          {
            variantId: 2300,
            feature: "Small",
            featureIcon: "📐",
            price: 9.99,
          },
          {
            variantId: 2301,
            feature: "Medium",
            featureIcon: "📐",
            price: 12.99,
          },
          {
            variantId: 2302,
            feature: "Large",
            featureIcon: "📐",
            price: 15.99,
          },
        ],
      },
      {
        feature: "Veggie",
        featureIcon: "🍕",
        title: "Veggie",
        description:
          "A vegetarian delight with bell peppers, onions, black olives, mushrooms, and mozzarella.",
        servings: [
          {
            variantId: 2400,
            feature: "Small",
            featureIcon: "📐",
            price: 9.99,
          },
          {
            variantId: 2401,
            feature: "Medium",
            featureIcon: "📐",
            price: 12.99,
          },
          {
            variantId: 2402,
            feature: "Large",
            featureIcon: "📐",
            price: 15.99,
          },
        ],
      },
    ],
  },
  desserts: {
    menuId: 3,
    type: "dessert",
    categoryIcon: "🍰",
    title: "Sweet Treats",
    description: "Delicious desserts to satisfy your sweet tooth.",
    prompts: [
      {
        feature: "variants",
        verbose: false,
        message:
          "🍕🧁 Elevate your pizza pleasure with our enchanting desserts!\n\n🍰 Choose a sweet delight\n",
      },
    ],
    features: ["variants"],
    variants: [
      {
        variantId: 3100,
        feature: "Chocolate Mousse",
        featureIcon: "🍫",
        title: "Chocolate Mousse",
        description:
          "A rich and creamy chocolate mousse, topped with whipped cream and chocolate shavings.",
        images: ["domain.com/3100.jpg"],
        servings: "portion",
        price: 2.99,
      },
      {
        variantId: 3101,
        feature: "Tiramisu",
        featureIcon: "🍮",
        title: "Tiramisu",
        description:
          "A classic Italian dessert made with ladyfingers, mascarpone cheese, and espresso.",
        images: ["domain.com/3101.jpg"],
        servings: "portion",
        price: 3.49,
      },
      {
        variantId: 3102,
        feature: "Cheesecake",
        featureIcon: "🍰",
        title: "Cheesecake",
        description:
          "A rich and creamy cheesecake, topped with a tangy strawberry sauce.",
        images: ["domain.com/3102.jpg"],
        servings: "portion",
        price: 3.99,
      },
    ],
  },
  drinks: {
    menuId: 4,
    type: "drink",
    categoryIcon: "🥤",
    title: "Refreshing Drinks",
    description: "Quench your thirst with our refreshing drinks.",
    prompts: [
      {
        feature: "variants",
        verbose: false,
        message:
          "🍕🍹 Infuse your pizza indulgence with a touch of refreshment.\n\n🥤 Indulge in Refreshment\n",
      },
    ],
    features: ["variants"],
    variants: [
      {
        variantId: 4100,
        feature: "Coke",
        featureIcon: "🥤",
        title: "Coca-Cola",
        description: "Classic and fizzy cola refreshment",
        images: ["domain.com/4100.jpg"],
        servings: "portion",
        price: 1.99,
      },
      {
        variantId: 4101,
        feature: "Sprite",
        featureIcon: "🥤",
        title: "Sprite",
        description: "Crisp and clear lemon-lime soda",
        images: ["domain.com/4101.jpg"],
        servings: "portion",
        price: 1.99,
      },
      {
        variantId: 4102,
        feature: "Fanta",
        featureIcon: "🥤",
        title: "Fanta",
        description: "Bursting with fruity flavors",
        images: ["domain.com/4102.jpg"],
        servings: "portion",
        price: 1.2,
      },
      {
        variantId: 4103,
        feature: "Iced Tea",
        featureIcon: "🥤",
        title: "Iced Tea",
        description: "Chilled and brewed to perfection",
        images: ["domain.com/4103.jpg"],
        servings: "portion",
        price: 0.99,
      },
      {
        variantId: 4104,
        feature: "Lemonade",
        featureIcon: "🥤",
        title: "Lemonade",
        description: "Tangy and sweet summer favorite",
        images: ["domain.com/4104.jpg"],
        servings: "portion",
        price: 0.99,
      },
    ],
  },
  deals: {
    menuId: 5,
    type: "deal",
    categoryIcon: "🎉",
    title: "Deals",
    description: "Deals for every taste and occasion.",
    prompt_message:
      "Savor Savings and Delectable Deals!💸\n\n🎉 Grab Deals Now! \n├1️⃣ COMBO 2 PLUS 2\n│\tChoose your 2 Large Pizzas & 2 Sides\n│\t➩\t$27.95\tPick Up 🏃\n│\t➩\t$33.95\tDelivered 🛵\n├2️⃣ COMBO 3 PLUS 3\n│\tChoose your 3 Large Pizzas & 3 Sides\n│\t➩\t$36.95\tPick Up 🏃\n│\t➩\t$39.95\tDelivered 🛵\n├3️⃣ COMBO 4 PLUS 4\n│\tChoose your 4 Large Pizzas & 4 Sides\n│\t➩\t$47.95 \tPick Up 🏃\n│\t➩\t$51.95\tDelivered 🛵\n└4️⃣ Go Back",
    prompts: [
      {
        feature: "variants",
        verbose: false,
        message:
          "Savor Savings and Delectable Deals!💸\n\n🎉 Grab Deals Now! \n",
      },
    ],
    features: ["variants"],
    variants: [
      {
        variantId: 5100,
        feature: "Ultimate Feast", //2 PLUS 2: two Large Pizzas & two Sides
        featureIcon: "🎉",
        title: "Ultimate Feast",
        description: "Choose your 2 Large Pizzas & 2 Sides",
        images: ["domain.com/5100.jpg"],
        type: {
          handle: "fixed-price", //discount-percentage, fixed-price
          value: 34.99,
        },
        products: [
          {
            // menu_id: 2,
            menuCategory: "pizzas",
            quantity: 2,
            servings: ["Large"], //all servings allowed to choose from
            toppings: ["Pepperoni", "Supreme", "Hawaiian", "Veggie"], //all toppings allowed to choose from
          },
          {
            // menu_id: 1,
            menuCategory: "sides",
            quantity: 2,
            variants: ["Garlic Bread", "Spud Bites", "Hot Chips"], //all variants to choose from
          },
        ],
      },
      {
        variantId: 5101,
        feature: "Family Fiesta", //3 PLUS 3: three Large Pizzas & three Sides
        featureIcon: "🎉",
        title: "Family Fiesta",
        description: "Choose your 3 Large Pizzas & 3 Sides",
        images: ["domain.com/5101.jpg"],
        type: {
          handle: "fixed-price",
          value: 49.99,
        },
        products: [
          {
            // menu_id: 2,
            menuCategory: "pizzas",
            quantity: 3,
            servings: ["Large"], //all servings allowed to choose from
            toppings: ["Pepperoni", "Supreme", "Hawaiian", "Veggie"], //all toppings allowed to choose from
          },
          {
            // menu_id: 1,
            menuCategory: "sides",
            quantity: 3,
            variants: ["Garlic Bread", "Spud Bites", "Hot Chips"], //all variants to choose from
          },
        ],
      },
      {
        variantId: 5102,
        feature: "Group Share", //4 PLUS 4: four Large Pizzas & four Sides
        featureIcon: "🎉",
        title: "Group Share",
        description: "Choose your 4 Large Pizzas & 4 Sides",
        images: ["domain.com/5102.jpg"],
        type: {
          handle: "fixed-price",
          value: 64.99,
        },
        products: [
          {
            // menu_id: 2,
            menuCategory: "pizzas",
            quantity: 4,
            servings: ["Large"], //all servings allowed to choose from
            toppings: ["Pepperoni", "Supreme", "Hawaiian", "Veggie"], //all toppings allowed to choose from
          },
          {
            // menu_id: 1,
            menuCategory: "sides",
            quantity: 4,
            variants: ["Garlic Bread", "Spud Bites", "Hot Chips"], //all variants to choose from
          },
        ],
      },
    ],
  },
};

const fetchMenuListings = () =>
  new Promise((resolve) => setTimeout(() => resolve(menuListings), 1000));

module.exports = { fetchMenuListings };
