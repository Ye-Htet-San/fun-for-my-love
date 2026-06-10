const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const question = document.getElementById("question");
const gif = document.getElementById("gif");

const stages = [
  {
    text: "Do you love me? 🥺",
    gif: "https://media.tenor.com/Z8hzZxcO5-cAAAAi/peach-cat-cute.gif",
  },
  {
    text: "Are you sure? 💔",
    gif: "https://media1.tenor.com/m/YNqzKzPOLTsAAAAC/emote.gif",
  },
  {
    text: "Really sure?? 😢",
    gif: "https://media1.tenor.com/m/q263C__wRg4AAAAC/babycrying-baby.gif",
  },
  {
    text: "Think again! 😭",
    gif: "https://media1.tenor.com/m/D_yuP4xjddsAAAAd/crying-vaughn-chat.gif",
  },
  {
    text: "Please? 🎀",
    gif: "https://media1.tenor.com/m/heEyHbV8iaUAAAAC/puss-in-boots-shrek.gif",
  },
  {
    text: "Hehe, you can't click No anymore! 😜",
    gif: "https://media1.tenor.com/m/1LzKSgP6v2wAAAAC/flirt-hello.gif",
  },
];

let currentStage = 0;
let isDodgingMode = false;

function updateStage(index) {
  question.innerText = stages[index].text;
  gif.src = stages[index].gif;
}

function dodgeButton() {
  if (!isDodgingMode) return;
  // current button position details relative to the viewpoint
  const rect = noBtn.getBoundingClientRect();

  const padding = 30;
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  // Pick a completely random absolute screen location
  const targetX =
    Math.random() * (screenWidth - rect.width - padding * 2) + padding;
  const targetY =
    Math.random() * (screenHeight - rect.height - padding * 2) + padding;

  // Calculate the exact offset distance from its original starting location
  // This safely bypasses mobile flexbox constraints completely
  const originalX =
    rect.left -
    (noBtn.style.transform ? parseFloat(noBtn.dataset.translateX || 0) : 0);
  const originalY =
    rect.top -
    (noBtn.style.transform ? parseFloat(noBtn.dataset.translateY || 0) : 0);

  const moveX = targetX - originalX;
  const moveY = targetY - originalY;

  // Save the current translations to keep track of changes
  noBtn.dataset.translateX = moveX;
  noBtn.dataset.translateY = moveY;

  // Use translate3d to move it perfectly on both horizontal and vertical axes
  noBtn.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
}

// When "No" is clicked
noBtn.addEventListener("click", (e) => {
  //   noClickCount++;
  if (isDodgingMode) {
    e.preventDefault();
    return;
  }
  if (currentStage < stages.length - 1) {
    currentStage++;
    updateStage(currentStage);

    if (currentStage === stages.length - 1) {
      isDodgingMode = true;
    }
  }
});

noBtn.addEventListener("mouseenter", dodgeButton);
noBtn.addEventListener("touchstart", (e) => {
  if (isDodgingMode) {
    e.preventDefault();
    dodgeButton();
  }
});

// When "Yes" is clicked
yesBtn.addEventListener("click", () => {
  question.innerText = "Yay! I knew it! I love you too! ❤️";
  gif.src =
    "https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif";
  yesBtn.style.display = "none";
  noBtn.style.display = "none";
});
