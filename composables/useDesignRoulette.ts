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

    const productsServices = [
      "AI Writing Assistant",
      "Virtual Pet App",
      "Sustainable Fashion Marketplace",
      "Augmented Reality Cooking Guide",
      "Personalized Fitness Tracker",
      "Digital Art Gallery",
      "Smart Home Energy Manager",
      "Language Learning Game",
      "Freelance Skill Marketplace",
      "Mental Health Chatbot",
    ];

    const businessTypes = [
      "Tech Startup",
      "E-commerce",
      "Healthcare",
      "Education",
      "Finance",
      "Entertainment",
      "Travel",
      "Food & Beverage",
      "Fitness & Wellness",
      "Social Media",
    ];

    const uiTasks = [
      "User Onboarding",
      "Checkout Process",
      "Search Functionality",
      "User Profile Creation",
      "Settings Configuration",
      "Data Visualization",
      "Social Sharing",
      "Feedback Collection",
      "Subscription Management",
      "Content Curation",
    ];

    const getRandomItem = (array: string[]) =>
      array[Math.floor(Math.random() * array.length)];

    const seedValue = computed(() => {
      const nameSeed = userInput.fullName.charCodeAt(0);
      const levelSeed =
        userInput.designLevel === "Senior Level"
          ? 3
          : userInput.designLevel === "Mid Level"
          ? 2
          : 1;
      const experienceSeed = Math.min(userInput.yearsOfExperience, 10);
      const deviceSeed = userInput.inputDevice === "Team Mouse" ? 1 : 2;
      return (nameSeed + levelSeed + experienceSeed + deviceSeed) % 10;
    });

    const seed = seedValue.value;

    const result = {
      primaryColor: unconventionalColors[seed],
      font: unconventionalFonts[seed],
      designSystem: designSystems[seed],
      iconPack: iconPacks[seed],
      screenSize: getRandomItem(screenSizes),
      productService: productsServices[seed],
      businessType: businessTypes[seed],
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
