import { testEvents } from "./test.js";

const events = testEvents;

const eventContainer = document.getElementById("event-container");

// Create a div for each event and append it to the event container
events.forEach((event, index) => {
  const eventDiv = document.createElement("div");
  eventDiv.classList.add("event");
  eventDiv.id = `event-${index}`;
  eventDiv.innerText = JSON.stringify(event, null, 2);
  eventContainer.appendChild(eventDiv);
});

// Function to highlight the events one at a time
async function highlightEvents() {
  for (let i = 0; i < events.length; i++) {
    const currentEventDiv = document.getElementById(`event-${i}`);
    currentEventDiv.classList.add("highlight");

    // Calculate the delay based on the timeOffset of the next event
    let delay = events[i + 1]?.data?.positions?.[0]?.timeOffset || 1000;
    if (delay < 0) delay = 1000;

    // Wait for the delay before removing the highlight
    await new Promise((resolve) => setTimeout(resolve, delay));
    currentEventDiv.classList.remove("highlight");
  }
}

highlightEvents();
