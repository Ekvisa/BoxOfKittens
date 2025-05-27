const box = document.getElementById("box");
box.addEventListener("click", () => {
  if (mom.classList.contains("hidden")) {
    generateKittenPlace();
    //leaving.innerHTML = "";
  } else {
    makeKittensJump();
  }
});

function makeKittensJump() {
  const kittens = document.querySelectorAll(".kitten");
  kittens.forEach((kitten) => {
    kitten.classList.add("jump");
    kitten.addEventListener(
      "animationend",
      () => {
        kitten.classList.remove("jump");
      },
      { once: true }
    );
  });
}

function generateKittenPlace() {
  const hiddenKittens = document.querySelectorAll(".kitten.hidden");
  if (hiddenKittens.length === 0) return;
  if (callMomButton.hasAttribute("disabled")) {
    callMomButton.removeAttribute("disabled");
  }
  const randomHiddenKittenIndex = Math.floor(
    Math.random() * hiddenKittens.length
  );
  const randomHiddenKitten = Array.from(hiddenKittens)[randomHiddenKittenIndex];

  show(randomHiddenKitten);
}

const score = document.getElementById("score");
let scoreCount = 0;
const leaving = document.getElementById("leaving");

const kittens = document.querySelectorAll(".kitten");
kittens.forEach((kitten) => {
  kitten.addEventListener("click", (event) => {
    event.stopPropagation(); //only the kitten gets this event, the block doesn't
    if (callMomButton.hasAttribute("disabled")) {
      //if mom is shown
      if (
        mom.getAttribute("data-color") === kitten.getAttribute("data-color")
      ) {
        kittens.forEach((k) => {
          if (
            k.getAttribute("data-color") === kitten.getAttribute("data-color")
          ) {
            k.classList.add("hidden");
            //console.log(`kitten with color ${k.style.background} is left`);
            leaving.innerHTML += `kitten with color ${k.style.background} is left <br />`;
            scoreCount = scoreCount + 1;
            score.innerText = scoreCount;
          }
        });

        mom.classList.add("hidden");
        leaving.innerHTML += `The ${mom.getAttribute(
          "data-color"
        )} family was reunited! <br />`;
      } else {
        mom.classList.add("hidden");

        leaving.innerHTML += `Mom with color ${mom.style.background},  didn't find her kiittens :( <br />`;
      }
    } else kitten.classList.add("hidden");
    //leaving.innerHTML = "";

    if (Array.from(kittens).every((k) => k.classList.contains("hidden"))) {
      console.log("Congrats!");
    }
  });
});

function getRandomColorRGB() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  console.log({ r, g, b });
  return { r, g, b };
}

function getDominantColor({ r, g, b }) {
  if (r === Math.max(r, g, b)) {
    return "red";
  } else if (g === Math.max(r, g, b)) {
    return "green";
  } else return "blue";
}

const callMomButton = document.getElementById("callmom");
const mom = document.getElementById("mom");
callMomButton.addEventListener("click", () => {
  show(mom);
  callMomButton.setAttribute("disabled", "");
});

function show(cat) {
  cat.classList.remove("hidden");
  const color = getRandomColorRGB();
  const dominantColor = getDominantColor(color);
  b = `rgb(${color.r}, ${color.g}, ${color.b})`;
  cat.style.background = b;
  cat.setAttribute("data-color", dominantColor);
}
