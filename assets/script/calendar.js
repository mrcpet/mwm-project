import { addRedOutline, removeRedOutLine } from "./warning.js";
console.log(addRedOutline, removeRedOutLine);
// check if user is logged in
loggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
// console.log(loggedIn);
if (loggedIn === true) {
  // query selectors containers
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
    console.log("events overlap:", event1, event2);
    let start1 = new Date(event1.start).getTime();
    let end1 = new Date(event1.end).getTime();
    let start2 = new Date(event2.start).getTime();
    let end2 = new Date(event2.end).getTime();
    console.log("overlap function variables:", start1, start2, end1, end2);
    return start1 < end2 && end1 > start2 && event1.user == event2.user;
  };
  // eventsOverlap(events[0], events[1]);
  // console.log(eventsOverlap(events[1], events[2]));

  // function to add event to array after checking overlap
  const addEvent = (newEvent, eventArray) => {
    for (let i = 0; i < eventArray.length; i++) {
      if (eventsOverlap(newEvent, eventArray[i])) {
        console.log("time slot not available.");
        return;
      }
    }
    eventArray.push(newEvent);
    console.log("event added");
  };

  // function to render events
  const renderEvents = (array) => {
    //clear container before rendering events to prevent doubles
    listContainer.innerHTML = "";

    //TODO render only events that is created by the current user
    let currentUserEvents = array.filter((event) => event.user === currentUser);
    //sort array with events chronologically
    currentUserEvents.sort((a, b) => {
      const dateA = new Date(a.start);
      const dateB = new Date(b.start);
      console.log(dateA, dateB);
      return dateA - dateB;
    });

    //create ul to render events inside
    const ul = document.createElement("ul");
    currentUserEvents.forEach((event) => {
      //destructuring the event object and create list element for each event
      const { title, start, end } = event;
      const li = document.createElement("li");
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
      console.log("render date object:", start, end);
      ul.append(li);
      listContainer.append(ul);
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
    return {
      user: currentUser,
      title: title,
      //create date object from date and time inputs
      start: new Date(startDate + "T" + startTime),
      end: new Date(endDate + "T" + endTime),
    };
  };
  // function to render warning message
  const renderWarning = (message, element) => {
    const requiredInputs = document.querySelectorAll("input[required]");
    let parsedNodeList = Array.from(requiredInputs);
    const emptyInputs = parsedNodeList.filter((input) => {
      return input.value === "" || input.value === null;
    });
    console.log(parsedNodeList);
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
        console.log(
          "event objekt att jämföra för korrekta tider",
          "sluttid",
          eventData.end.getTime(),
          "starttid",
          eventData.start.getTime()
        );
        //condition to verify that the event being created has valid time inputs
        if (eventData.start.getTime() < eventData.end.getTime()) {
          addEvent(eventData, events);
          saveEvents(events);
          //empty input fields after success
          eventTitleInput.value = "";
          startDateInput.value = "";
          startTimeInput.value = "";
          endDateInput.value = "";
          endTimeInput.value = "";
        } else {
          //tell the user the time inputs are not valid
          console.log(
            "end time must be after start time for event to be valid"
          );
          renderWarning("Invalid end time or end date.", calendarMsg);
        }
      } else {
        console.log("please fill out the required fields"); //TODO Handle this showing an error message the user can see
        //TODO rewrite this toa  function taking element array or single element + text element to change as inputs, similar to renderWarning in login.js
        // const requiredInputs = document.querySelectorAll("input");
        // let parsedNodeList = Array.from(requiredInputs);
        // const emptyInputs = parsedNodeList.filter((input) => {
        //   return input.value === "" || input.value === null;
        // });
        // console.log(parsedNodeList);
        // removeRedOutLine(parsedNodeList);
        // addRedOutline(emptyInputs);
        renderWarning("Please fill out the required fields!", calendarMsg);
      }
    });

    // append inputs to DOM
    main.append(calendarInputContainer);
  };

  // function to render all calendar events in order based on time and date, older events should be grayed out
  // functionality to prevent events from being created if an event already exists on that time
  // function to remove events from calendar(DOM) AND localstorage/array
  // function to render correct events based on currentUser

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
