// An array stores all event objects.
let events = [];

const eventForm = document.getElementById("eventForm");
const eventName = document.getElementById("eventName");
const eventDate = document.getElementById("eventDate");
const eventPlace = document.getElementById("eventPlace");
const searchInput = document.getElementById("searchInput");
const eventList = document.getElementById("eventList");
const message = document.getElementById("message");

// This function shows the event list on the page.
function displayEvents(searchText = "") {
  eventList.innerHTML = "";

  const matchingEvents = events.filter(function (event) {
    const searchableText = `${event.name} ${event.place}`.toLowerCase();
    return searchableText.includes(searchText.toLowerCase());
  });

  if (matchingEvents.length === 0) {
    message.textContent = "No events found.";
    return;
  }

  message.textContent = "";

  matchingEvents.forEach(function (event) {
    const eventItem = document.createElement("article");
    eventItem.className = "event";

    const details = document.createElement("div");
    details.innerHTML = `<strong>${event.name}</strong><p>${event.date} · ${event.place}</p>`;

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.className = "remove-button";
    removeButton.addEventListener("click", function () {
      removeEvent(event.id);
    });

    eventItem.append(details, removeButton);
    eventList.appendChild(eventItem);
  });
}

// This function removes an event using its id.
function removeEvent(id) {
  events = events.filter(function (event) {
    return event.id !== id;
  });
  displayEvents(searchInput.value);
}

// Add an event when the form is submitted.
eventForm.addEventListener("submit", function (event) {
  event.preventDefault();

  try {
    const newEvent = {
      id: Date.now(),
      name: eventName.value.trim(),
      date: eventDate.value,
      place: eventPlace.value.trim()
    };

    if (!newEvent.name || !newEvent.date || !newEvent.place) {
      throw new Error("Please fill in all the fields.");
    }

    events.push(newEvent);
    eventForm.reset();
    displayEvents(searchInput.value);
  } catch (error) {
    message.textContent = error.message;
  }
});

// Search as the user types.
searchInput.addEventListener("input", function () {
  displayEvents(searchInput.value);
});

// async/await example: this runs once when the app starts.
async function startApp() {
  await Promise.resolve();
  displayEvents();
}

startApp();
