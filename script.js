const qsnRemaining = document.getElementById("qsnRemaining");
const question = document.getElementById("question");
const answer = document.getElementById("answer");
const card = document.getElementById("card");
const back = document.getElementById("back");
const next = document.getElementById("next");

let qsnIndex = 0;
let qsnData;

fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    qsnData = data;

    // qsnRemaining
    qsnRemaining.innerText = `${qsnIndex + 1}/${qsnData.length}`;

    // question
    question.innerText = qsnData[qsnIndex].qsn;

    // answer
    answer.innerText = qsnData[qsnIndex].answer;
  });

function animateCard(direction) {
  // add the 'dragged' class to card to trigger animation
  card.classList.add("dragged", direction);
  setTimeout(() => {
    // remove the 'dragged' class after animation ends
    card.classList.remove("dragged", direction);
  }, 500);
}

function showPrevious() {
  qsnIndex--;
  qsnIndex = qsnIndex < 0 ? 0 : qsnIndex;
  qsnRemaining.innerText = `${qsnIndex + 1}/${qsnData.length}`;
  question.innerText = qsnData[qsnIndex].qsn;
  answer.innerText = qsnData[qsnIndex].answer;
  card.classList.remove("flipped");
  animateCard("from-left");
}

function showNext() {
  qsnIndex++;
  qsnIndex = qsnIndex === qsnData.length ? qsnIndex - 1 : qsnIndex;
  qsnRemaining.innerText = `${qsnIndex + 1}/${qsnData.length}`;
  question.innerText = qsnData[qsnIndex].qsn;
  answer.innerText = qsnData[qsnIndex].answer;
  card.classList.remove("flipped");
  animateCard("from-right");
}

// card
card.addEventListener("click", () => {
  card.classList.toggle("flipped");
});

// back
back.addEventListener("click", showPrevious);

// next
next.addEventListener("click", showNext);

// initialize previous and next functions for arrow key presses
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    showPrevious();
  } else if (event.key === "ArrowRight") {
    showNext();
  }
});

// initialize card click for spacebar
document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    card.classList.toggle("flipped");
  }
});
