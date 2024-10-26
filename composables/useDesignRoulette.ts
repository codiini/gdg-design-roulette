import { computed } from "vue";
import type { RandomizerInput } from "~/types";

const useDesignRoulette = () => {
  const generateDesignVariables = (userInput: RandomizerInput) => {
    const EXPIRATION_HOURS = 24;

    const unconventionalColors = [
      "#FF00FF", // Magenta
      "#00FFFF", // Cyan
      "#FFFF00", // Yellow
      "#FF8000", // Orange
      "#8000FF", // Purple
      "#00FF80", // Spring Green
      "#FF0080", // Hot Pink
      "#80FF00", // Lime
      "#0080FF", // Azure
      "#FF8080", // Light Coral
      "#FF1493", // Deep Pink
      "#00FA9A", // Medium Spring Green
      "#FF4500", // Orange Red
      "#1E90FF", // Dodger Blue
      "#ADFF2F", // Green Yellow
      "#FF6347", // Tomato
      "#7FFFD4", // Aquamarine
      "#FFD700", // Gold
      "#9400D3", // Dark Violet
      "#00CED1", // Dark Turquoise
      "#FF69B4", // Hot Pink
      "#32CD32", // Lime Green
      "#FF6B6B", // Pastel Red
      "#4ECDC4", // Medium Turquoise
      "#FFA07A", // Light Salmon
      "#98FB98", // Pale Green
      "#DDA0DD", // Plum
      "#20B2AA", // Light Sea Green
      "#7B68EE", // Medium Slate Blue
      "#00FA9A", // Medium Spring Green
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
      "Bungee Hairline",
      "Ewert",
      "Finger Paint",
      "Freckle Face",
      "Fredericka the Great",
      "Henny Penny",
      "Londrina Sketch",
      "Megrim",
      "Modak",
      "Monoton",
      "Nixie One",
      "Opacity One",
      "Pirata One",
      "Poiret One",
      "Rye",
      "Seymour One",
      "Shojumaru",
      "Silkscreen",
      "Stalinist One",
      "Vast Shadow",
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

    const businessProductPairs = [
      { type: "Tech Startup", product: "AI Writing Assistant" },
      { type: "E-commerce", product: "Sustainable Fashion Marketplace" },
      { type: "Healthcare", product: "Mental Health Chatbot" },
      { type: "Education", product: "Language Learning Game" },
      { type: "Finance", product: "Freelance Skill Marketplace" },
      { type: "Entertainment", product: "Digital Art Gallery" },
      { type: "Travel", product: "Augmented Reality Cooking Guide" },
      { type: "Food & Beverage", product: "Virtual Pet App" },
      { type: "Fitness & Wellness", product: "Personalized Fitness Tracker" },
      { type: "Smart Home", product: "Smart Home Energy Manager" },
      { type: "Transportation", product: "Ride-Sharing for Electric Vehicles" },
      { type: "Real Estate", product: "Virtual Property Tour Platform" },
      { type: "Agriculture", product: "Precision Farming Sensor Network" },
      { type: "Music Industry", product: "AI-Powered Music Composition Tool" },
      { type: "Environmental", product: "Carbon Footprint Tracking App" },
      { type: "Fashion", product: "Virtual Clothing Try-On Service" },
      { type: "Gaming", product: "Cross-Platform Cloud Gaming Service" },
      { type: "Legal Tech", product: "AI-Assisted Contract Analysis Tool" },
      { type: "Robotics", product: "Personal Robot Assistant Configurator" },
      {
        type: "Space Technology",
        product: "Satellite Imagery Analysis Platform",
      },
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
      "Authentication Flow",
      "Notification Center",
      "File Upload Interface",
      "Progress Tracking Dashboard",
      "Multi-step Form Wizard",
      "Interactive Tutorial",
      "Accessibility Settings",
      "Dark Mode Toggle",
      "In-app Messaging",
      "Product Comparison Tool",
      "Calendar Integration",
      "User Activity Timeline",
      "Password Reset Flow",
      "Gamification Elements",
      "Error Handling and Recovery",
      "Responsive Navigation Menu",
      "User Permissions Management",
      "Real-time Collaboration Tools",
      "Voice User Interface (VUI)",
      "Augmented Reality Overlay",
    ];

    const getRandomItem = (array: string[]) =>
      array[Math.floor(Math.random() * array.length)];

    const getSecureRandomNumber = () => {
      const array = new Uint32Array(1);
      window.crypto.getRandomValues(array);
      return array[0] / (0xffffffff + 1);
    };

    const seedValue = computed(() => {
      const nameSeed = userInput.fullName.charCodeAt(0);
      const levelSeed =
        userInput.designLevel === "Senior Level"
          ? 3
          : userInput.designLevel === "Mid Level"
          ? 2
          : 1;
      const experienceSeed = Math.min(userInput.yearsOfExperience, 15);
      const deviceSeed = userInput.inputDevice === "Mouse" ? 1 : 2;
      const randomSeed = Math.floor(getSecureRandomNumber() * 10);
      return (
        (nameSeed + levelSeed + experienceSeed + deviceSeed + randomSeed) % 10
      );
    });

    const seed = seedValue.value;
    const businessProductPair = businessProductPairs[seed];

    const result = {
      primaryColor: unconventionalColors[seed % unconventionalColors.length],
      font: unconventionalFonts[seed % unconventionalFonts.length],
      designSystem: designSystems[seed % designSystems.length],
      iconPack: iconPacks[seed % iconPacks.length],
      screenSize: getRandomItem(screenSizes),
      productService: businessProductPair.product,
      businessType: businessProductPair.type,
      uiTask: uiTasks[seed % uiTasks.length],
      expireAt: new Date(
        Date.now() + EXPIRATION_HOURS * 60 * 60 * 1000
      ).toISOString(),
    };

    return result;
  };

  return {
    generateDesignVariables,
  };
};

export default useDesignRoulette;
