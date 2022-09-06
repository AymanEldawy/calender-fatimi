import countapi from "countapi-js";
countapi.visits("global").then((result) => {
  let displayCounter = "";
  let spratedCount = result.value.toString().split("");
  for (let i = spratedCount.length - 1; i >= 0; i--) {
    displayCounter += `<span class="counter-item">${spratedCount[i]}</span>`;
  }
  document.getElementById("visitors").innerHTML = displayCounter;
});
