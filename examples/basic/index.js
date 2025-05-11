import { GoogleAgent, Type } from "genai-agent";

//Functions
async function getLocation() {
  return { city: "San Jose", latitude: 37.3512, longitude: -121.8846 };
}

async function getCurrentWeather(latitude, longitude) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=apparent_temperature`;
  const response = await fetch(url);
  const weatherData = await response.json();
  return weatherData;
}

const availableTools = {
  getCurrentWeather,
  getLocation,
};

//Function Declarations
const weatherFunctionDeclaration = {
  name: "getCurrentWeather",
  description: "Gets the current temperature for a given location.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      latitude: {
        type: Type.STRING,
        description: "latitude of the location",
      },
      longitude: {
        type: Type.STRING,
        description: "longitude of the location",
      },
    },
    required: ["latitude", "longitude"],
  },
};

const locationFunctionDeclaration = {
  name: "getLocation",
  description: "Gets the current location of the user",
  parameters: {
    type: Type.OBJECT,
    properties: {},
  },
};

const functionDeclarations = [
  weatherFunctionDeclaration,
  locationFunctionDeclaration,
];

// Initialize the agent with your API key
const agent = new GoogleAgent({
  apiKey: "GOOGLE_API_KEY",
});

// Call the chat method to interact with the AI
const response = await agent.chat({
  model: "gemini-2.0-flash",
  text: "Use my current location to find the weather and recommend activites",
  functionDeclarations,
  functions: availableTools,
  systemInstruction:
    "Use the availble tool to recommend activities to the user. You can get their current location and get the weather",
});

console.log(response); // The response from the AI
