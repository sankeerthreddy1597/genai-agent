# Usage Example

### 1.Initialize Agent

```js
import { GoogleAgent, Type } from "genai-agent";

// Initialize the agent with your API key
const agent = new GoogleAgent({
  apiKey: "GOOGLE_API_KEY",
});
```

### 2. Add available tools

```js
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
```

### 3. Add function declarations for the tools

```js
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
```

### 4. Call agent

```js
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
```

#### Example Response

`
The weather in San Jose is expected to be mild over the next few days, with temperatures ranging from 7.6°C to 27.1°C.

Here are a few activity recommendations:

- **Outdoor activities:** With the weather being mild, you could go for a walk or hike in one of the many parks in San Jose, such as Alum Rock Park or the Guadalupe River Park & Gardens. You could also visit the Japanese Friendship Garden.
- **Indoor activities:** If you prefer to stay indoors, you could visit one of the many museums in San Jose, such as the Tech Interactive or the San Jose Museum of Art. You could also check out a show at the San Jose Center for the Performing Arts.
  `
