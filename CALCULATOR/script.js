const switchbtn = document.getElementById("switch");
const display = document.getElementById("display");
const historyDisplay = document.getElementById("history");
const input = document.querySelectorAll("input");
let value = "";
let memory = 0;

// Theme Toggle
switchbtn.addEventListener("click", () => {
  document.body.setAttribute("data-theme", switchbtn.checked ? "dark" : "");
});

// Calculator Logic
input.forEach((e) => {
  e.addEventListener("click", (event) => {
    const buttonValue = event.target.value;

    if (buttonValue === "=") {
      try {
        const result = eval(value);
        historyDisplay.innerHTML += `${value} = ${result}<br>`;
        value = result.toString();
        display.value = value;
      } catch (error) {
        display.value = "Error";
        value = "";
      }
    } else if (buttonValue === "C") {
      value = "";
      display.value = value;
    } else if (buttonValue === "M+") {
      memory += parseFloat(display.value) || 0;
    } else if (buttonValue === "MR") {
      value += memory.toString();
      display.value = value;
    } else if (buttonValue === "MC") {
      memory = 0;
    } else if (buttonValue === "√") {
      value = Math.sqrt(parseFloat(value)).toString();
      display.value = value;
    } else if (buttonValue === "%") {
      value = (parseFloat(value) / 100).toString();
      display.value = value;
    } else if (buttonValue === "^") {
      value += "**";
      display.value = value;
    } else if (buttonValue === "±") {
      value = (-parseFloat(value)).toString();
      display.value = value;
    } else if (buttonValue !== "switch") {
      value += buttonValue;
      display.value = value;
    }

    // Button Animation
    if (!event.target.classList.contains("switch")) {
      event.target.classList.add("active");
      setTimeout(() => {
        event.target.classList.remove("active");
      }, 400);
    }
  });
});

// Keyboard Support
document.addEventListener("keydown", (event) => {
  const key = event.key;
  const validKeys = [
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
    "+", "-", "*", "/", ".", "=", "Enter", "Backspace", "(", ")", "%", "^"
  ];

  if (validKeys.includes(key)) {
    event.preventDefault();
    if (key === "Enter") {
      document.querySelector("input[value='=']").click();
    } else if (key === "Backspace") {
      value = value.slice(0, -1);
      display.value = value;
    } else {
      value += key;
      display.value = value;
    }
  }
});