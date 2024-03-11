import { addRedOutline, removeRedOutLine } from "./warning.js";
// check if user is logged in
loggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
if (loggedIn === true) {
  // query selectors containers and text elements
  const main = document.querySelector("main");

  //create list container
  const listContainer = document.createElement("div");
  listContainer.classList.add("listContainer");

  // query selectors buttons
  const calendarBtn = document.querySelector("#calendarBtn");

  // get current user from local storage
  let currentUser = localStorage.getItem("currentUser");

  // get current date
  let currentTime = new Date();

  // array to store events and parse events stored in localstorage
  let events = JSON.parse(localStorage.getItem("events")) || [];

  // nice to have: a calendar view showing all days of the month, being able to click on a date to see events associated with that date
  // nice to have: import events from todo to calendar

  // function to check overlapping events

  const eventsOverlap = (event1, event2) => {
    let start1 = new Date(event1.start).getTime();
    let end1 = new Date(event1.end).getTime();
    let start2 = new Date(event2.start).getTime();
    let end2 = new Date(event2.end).getTime();
    return start1 < end2 && end1 > start2 && event1.user == event2.user;
  };

  // function to add event to array after checking overlap
  const addEvent = (newEvent, eventArray) => {
    for (let i = 0; i < eventArray.length; i++) {
      if (eventsOverlap(newEvent, eventArray[i])) {
        renderWarning("Time slot unavailable.", calendarMsg);
        return;
      }
    }
    eventArray.push(newEvent);
    // clear input fields and change message on success
    calendarMsg.textContent = "Fill in the fields to add an event.";
    eventTitleInput.value = "";
    startDateInput.value = "";
    startTimeInput.value = "";
    endDateInput.value = "";
    endTimeInput.value = "";
  };
  // function to filter events for current user and sort them
  const filterAndSort = (array) => {
    return array
      .filter((event) => event.user === currentUser)
      .sort((a, b) => {
        const dateA = new Date(a.start);
        const dateB = new Date(b.start);
        return dateA - dateB;
      });
  };
  // function to create list item for event
  const createListItem = (event) => {
    //destructuring the event object and create list element for each event
    const { title, start, end, eventId } = event;
    const li = document.createElement("li");
    li.dataset.id = eventId;
    //add class to show events that passed in time
    if (new Date(end) < currentTime) {
      li.classList.add("oldEvent");
    }
    //render title
    let titleP = document.createElement("p");
    titleP.textContent = `Title: ${title}`;
    li.append(titleP);
    //object for localestring options
    let timeDateFormat = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    //render start date and time
    let startInfo = document.createElement("p");
    startInfo.textContent = `Start: ${new Date(start).toLocaleString(
      "en-GB",
      timeDateFormat
    )}`;
    let endInfo = document.createElement("p");
    endInfo.textContent = `End: ${new Date(end).toLocaleString(
      "en-GB",
      timeDateFormat
    )}`;
    li.append(startInfo, endInfo);
    return li;
  };
  // function to render events
  const renderEvents = (array) => {
    // clear container before rendering events to prevent doubles
    listContainer.innerHTML = "";
    let currentUserEvents = filterAndSort(array);
    // create lists to render events inside headings for lists
    const ul = document.createElement("ul");
    const oldUl = document.createElement("ul");
    oldUl.classList.add("hideList");
    // buttons to toggle visibility,
    const upcomingBtn = document.createElement("button");
    const oldBtn = document.createElement("button");
    upcomingBtn.textContent = "Upcoming events";
    oldBtn.textContent = "Past events";
    // list headings
    const upcomingHeader = document.createElement("li");
    const pastHeader = document.createElement("li");
    upcomingHeader.innerHTML = "<h3>Upcoming</h3>";
    pastHeader.innerHTML = "<h3>Past</h3>";
    ul.append(upcomingHeader);
    oldUl.append(pastHeader);
    // event listeners for toggle buttons
    upcomingBtn.addEventListener("click", () => {
      ul.classList.toggle("hideList");
    });
    oldBtn.addEventListener("click", () => {
      oldUl.classList.toggle("hideList");
    });

    currentUserEvents.forEach((event) => {
      const li = createListItem(event);
      if (li.classList.contains("oldEvent")) {
        oldUl.append(li);
      } else {
        ul.append(li);
      }
      listContainer.append(upcomingBtn, oldBtn, ul, oldUl);
    });
    main.append(listContainer);
  };

  // function to store events in localstorage with json stringify
  const saveEvents = (array) => {
    localStorage.setItem("events", JSON.stringify(array));
    renderEvents(events);
  };

  // function to take inputs and create event object
  const getEventData = (title, startDate, startTime, endDate, endTime) => {
    //random id test to implement functionality to delete event
    let randomId = crypto.randomUUID();
    return {
      user: currentUser,
      title: title,
      //create date object from date and time inputs
      start: new Date(startDate + "T" + startTime),
      end: new Date(endDate + "T" + endTime),
      eventId: randomId,
    };
  };
  // function to render warning message
  const renderWarning = (message, element) => {
    const requiredInputs = document.querySelectorAll("input[required]");
    let parsedNodeList = Array.from(requiredInputs);
    const emptyInputs = parsedNodeList.filter((input) => {
      return input.value === "" || input.value === null;
    });
    removeRedOutLine(parsedNodeList);
    addRedOutline(emptyInputs);
    element.textContent = message;
    element.classList.add("warning");
    setTimeout(() => {
      element.classList.remove("warning");
    }, 1000);
  };

  // function to create label and input elements
  const createInput = (inputConfig, container) => {
    //destructure inputConfig
    const { labelText, inputType, inputId, required } = inputConfig;
    //create label
    const label = document.createElement("label");
    label.setAttribute("for", inputId);
    label.textContent = labelText;
    //create input
    const input = document.createElement("input");
    input.setAttribute("type", inputType);
    input.setAttribute("id", inputId);
    input.setAttribute("required", "required");
    //append
    container.append(label, input);
  };

  // function to render inputs to create new calendar event
  const renderCalendarControl = () => {
    // create input container
    const calendarInputContainer = document.createElement("div");
    calendarInputContainer.classList.add("calendarInputContainer");
    const calendarHeading = document.createElement("h2");
    calendarHeading.textContent = "Calendar";
    const calendarMsg = document.createElement("p");
    calendarMsg.setAttribute("id", "calendarMsg");
    calendarMsg.textContent = "Fill in the fields to add an event.";
    calendarInputContainer.append(calendarHeading, calendarMsg);
    // array with input configurations for all the input and label combinations to create
    const inputConfigs = [
      {
        labelText: "Event title",
        inputType: "text",
        inputId: "eventTitleInput",
        required: true,
      },
      {
        labelText: "Select a start date",
        inputType: "date",
        inputId: "startDateInput",
        required: true,
      },
      {
        labelText: "Select a start time",
        inputType: "time",
        inputId: "startTimeInput",
        required: true,
      },
      {
        labelText: "Select an end date",
        inputType: "date",
        inputId: "endDateInput",
        required: true,
      },
      {
        labelText: "Select an end time",
        inputType: "time",
        inputId: "endTimeInput",
        required: true,
      },
    ];
    // actually render the inputs
    inputConfigs.forEach((inputConfig) => {
      createInput(inputConfig, calendarInputContainer);
    });

    // create save event button
    const saveEventBtn = document.createElement("button");
    saveEventBtn.textContent = "Save event";
    calendarInputContainer.append(saveEventBtn);

    // save event event listener
    saveEventBtn.addEventListener("click", () => {
      const calendarMsg = document.querySelector("#calendarMsg");
      const eventTitle = eventTitleInput.value;
      const startDate = startDateInput.value;
      const startTime = startTimeInput.value;
      const endDate = endDateInput.value;
      const endTime = endTimeInput.value;
      //TODO write a function that works on all empty required inputs both for calendar and login/register user to show warning, idea below
      // const allInputs = document.querySelectorAll("input[type='text']");
      // const emptyInputs = Array.from(allInputs).filter(
      //   (input) => input.value === null || input.value === ""
      // );
      if (
        eventTitle !== "" &&
        startDate !== "" &&
        startTime !== "" &&
        endDate !== "" &&
        endTime !== ""
      ) {
        const eventData = getEventData(
          eventTitle,
          startDate,
          startTime,
          endDate,
          endTime
        );
        //condition to verify that the event being created has valid time inputs
        if (eventData.start.getTime() < eventData.end.getTime()) {
          addEvent(eventData, events);
          saveEvents(events);
        } else {
          //tell the user the time inputs are not valid
          renderWarning("Invalid end time or end date.", calendarMsg);
        }
      } else {
        renderWarning("Please fill out the required fields.", calendarMsg);
      }
    });

    // append inputs to DOM
    main.append(calendarInputContainer);
  };

  // event listener calendar button
  calendarBtn.addEventListener("click", () => {
    main.innerHTML = "";
    main.classList.add("calendar");
    renderCalendarControl();
    renderEvents(events);
  });
} else {
  // redirect user to login page if not logged in
  window.location.href = "../../index.html";
}
