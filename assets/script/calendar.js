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

  // array to store events and parse events stored in localstorage
  let events = JSON.parse(localStorage.getItem("events")) || [];

  // nice to have: a calendar view showing all days of the month, being able to click on a date to see events associated with that date
  // nice to have: import events from todo to calendar

  // function to render events
  const renderEvents = (array) => {
    //clear container before rendering events to prevent doubles
    listContainer.innerHTML = "";
    //TODO render only events that is created by the current user
    //sort array with events chronologically
    let sortedArray = array.sort((a, b) => {
      const dateA = new Date(a.start.date + "T" + a.start.time);
      const dateB = new Date(b.start.date + "T" + b.start.time);
      console.log(dateA, dateB);
      return dateA - dateB;
    });
    console.log(sortedArray);
    //create ul to render events inside
    const ul = document.createElement("ul");
    array.forEach((event) => {
      //destructuring the event object and create list element for each event
      const { title, start, end } = event;
      const li = document.createElement("li");
      //render title
      let titleP = document.createElement("p");
      titleP.textContent = `Title: ${title}`;
      li.append(titleP);
      //render start date and time
      Object.keys(start).forEach((key) => {
        let p = document.createElement("p");
        p.textContent = `Start ${key}: ${start[key]} `;
        li.append(p);
      });
      //render end date and time
      Object.keys(end).forEach((key) => {
        let p = document.createElement("p");
        p.textContent = `End ${key}: ${end[key]}`;
        li.append(p);
      });
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
      start: {
        date: startDate,
        time: startTime,
      },
      end: {
        date: endDate,
        time: endTime,
      },
    };
  };
  // function to render inputs to create new calendar event
  const renderCalendarControl = () => {
    // create input container
    const calendarInputContainer = document.createElement("div");
    calendarInputContainer.classList.add("calendarInputContainer");

    // create event title input with input
    const titleLabel = document.createElement("label");
    titleLabel.setAttribute("for", "eventTitleInput");
    titleLabel.textContent = "Event title";
    const eventTitleInput = document.createElement("input");
    eventTitleInput.setAttribute("type", "text");
    eventTitleInput.setAttribute("id", "eventTitleInput");
    calendarInputContainer.append(titleLabel, eventTitleInput);

    // create start date input with label
    const startDateLabel = document.createElement("label");
    startDateLabel.setAttribute("for", "startDateInput");
    startDateLabel.textContent = "Select a start date";
    const startDateInput = document.createElement("input");
    startDateInput.setAttribute("type", "date");
    startDateInput.setAttribute("id", "startDateInput");
    calendarInputContainer.append(startDateLabel, startDateInput);

    // create start time input with label
    const startLabel = document.createElement("label");
    startLabel.setAttribute("for", "startTimeInput");
    startLabel.textContent = "Select a start time";
    const startTimeInput = document.createElement("input");
    startTimeInput.setAttribute("type", "time");
    startTimeInput.setAttribute("id", "startTimeInput");
    calendarInputContainer.append(startLabel, startTimeInput);

    // create start date input with label
    const endDateLabel = document.createElement("label");
    endDateLabel.setAttribute("for", "endDateInput");
    endDateLabel.textContent = "Select an end date";
    const endDateInput = document.createElement("input");
    endDateInput.setAttribute("type", "date");
    endDateInput.setAttribute("id", "endDateInput");
    calendarInputContainer.append(endDateLabel, endDateInput);

    // create end time input with label
    const endLabel = document.createElement("label");
    endLabel.setAttribute("for", "endTimeInput");
    endLabel.textContent = "Select an end time";
    const endTimeInput = document.createElement("input");
    endTimeInput.setAttribute("type", "time");
    endTimeInput.setAttribute("id", "endTimeInput");
    calendarInputContainer.append(endLabel, endTimeInput);

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
        events.push(eventData);
        saveEvents(events);
      } else {
        console.log("please fill out the required fields"); //TODO Handle this showing an error message the user can see
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
    const today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth();
    // console.log(year, month, today);
  });
} else {
  window.location.href = "../../index.html";
}
