import { computed } from "vue";
import type { RandomizerInput } from "~/types";

const useDesignRoulette = () => {
  const generateDesignVariables = (userInput: RandomizerInput) => {
    const EXPIRATION_HOURS = 24;

    const unconventionalColors = [
      "#FF00FF",
      "#00FFFF",
      "#FFFF00",
      "#FF8000",
      "#8000FF",
      "#00FF80",
      "#FF0080",
      "#80FF00",
      "#0080FF",
      "#FF8080",
    ];

    const unconventionalFonts = [
      "Bungee Shade",
      "Creepster",
      "Fascinate Inline",
      "Frijole",
      "Monofett",
      "Nosifer",
      "Rubik Moonrocks",
      "Rubik Wet Paint",
      "Sancreek",
      "Sedgwick Ave Display",
    ];

    const designSystems = [
      "Neumorphism",
      "Glassmorphism",
      "Claymorphism",
      "Brutalism",
      "Cyberpunk",
      "Vaporwave",
      "Retro Futurism",
      "Minimalism",
      "Maximalism",
      "Skeuomorphism",
    ];

    const iconPacks = [
      "Phosphor Icons",
      "Heroicons",
      "Feather Icons",
      "Font Awesome",
      "Material Icons",
      "Ionicons",
      "Remix Icon",
      "Tabler Icons",
      "Eva Icons",
      "Lucide",
    ];

    const screenSizes = ["Desktop", "Mobile", "Tablet", "Watch"];

    const businessProductTaskTrios = [
      { type: "Tech Startup", product: "AI Writing Assistant", task: "Content Creation Interface" },
      { type: "E-commerce", product: "Sustainable Fashion Marketplace", task: "Product Filtering and Search" },
      { type: "Healthcare", product: "Mental Health Chatbot", task: "Mood Tracking Dashboard" },
      { type: "Education", product: "Language Learning Game", task: "Progress Visualization" },
      { type: "Finance", product: "Freelance Skill Marketplace", task: "Payment Processing Flow" },
      { type: "Entertainment", product: "Digital Art Gallery", task: "Virtual Exhibition Setup" },
      { type: "Travel", product: "Augmented Reality Cooking Guide", task: "Recipe Exploration Interface" },
      { type: "Food & Beverage", product: "Virtual Pet App", task: "Pet Customization Screen" },
      { type: "Fitness & Wellness", product: "Personalized Fitness Tracker", task: "Workout Scheduling Calendar" },
      { type: "Smart Home", product: "Smart Home Energy Manager", task: "Device Control Panel" },
    ];
    const getRandomItem = (array: string[]) =>
      array[Math.floor(Math.random() * array.length)];

    const seedValue = computed(() => {
      const nameSeed = userInput.fullName.charCodeAt(0);
      const levelSeed =
        userInput.designLevel === "senior_level"
          ? 3
          : userInput.designLevel === "mid_level"
          ? 2
          : 1;
      const experienceSeed = Math.min(userInput.yearsOfExperience, 15);
      const deviceSeed = userInput.inputDevice === "mouse" ? 1 : 2;
      return (nameSeed + levelSeed + experienceSeed + deviceSeed) % 10;
    });

    const seed = seedValue.value;
    const businessProductPair = businessProductPairs[seed];

    const result = {
      primaryColor: unconventionalColors[seed],
      font: unconventionalFonts[seed],
      designSystem: designSystems[seed],
      iconPack: iconPacks[seed],
      screenSize: getRandomItem(screenSizes),
      productService: businessProductPair.product,
      businessType: businessProductPair.type,
      uiTask: uiTasks[seed],
      expireAt: new Date(
        Date.now() + EXPIRATION_HOURS * 60 * 60 * 1000
      ).toISOString(),
    };

    //save to localstorage
    localStorage.setItem("design_roulette_variables", JSON.stringify(result));

    return result;
  };

  return {
    generateDesignVariables,
  };
};

export default useDesignRoulette;
