const resultArea = document.querySelector(".result-area");
const bettingArea = document.querySelector(".betting-area");
const infoArea = document.querySelector(".info-area");
const totalBetEl = document.querySelector(".total-bet");
const resultMessageEl = document.querySelector(".result-message");
const btnSpin = document.querySelector(".btn-spin");
const btnReset = document.querySelector(".btn-reset");

const bets = {
  bau: 0,
  cua: 0,
  tom: 0,
  ca: 0,
  ga: 0,
  huou: 0,
};

function randomImage(images) {
    return images[Math.floor(Math.random() * images.length)];
}

btnSpin.addEventListener("click", () => {
  btnSpin.disabled = true;
  btnReset.disabled = true;
  bettingArea.classList.add("disabled");


  const result = [];
  const images = ["bau", "tom", "cua", "ca", "ga", "huou"];
  for (let i = 0; i < 3; i++) {
    
    const randomImage1 = randomImage(images);
    result.push(randomImage1);
  }

  let intervalId = setInterval(() => {
    for (let i = 0; i < 3; i++) {
      const image = resultArea.children[i];
      image.src = `images/${randomImage(images)}.png`;
    }
  }, 50);


  setTimeout(() => {
    clearInterval(intervalId);
    for (let i = 0; i < 3; i++) {
      resultArea.children[i].src = `images/${result[i]}.png`;
    }
    let totalBet = 0;
    let isWin = true;
    for (const bet in bets) {
      totalBet += bets[bet];
      if (result.filter(x => x === bet).length>bets[bet]) {
        isWin = false;
      }

    }
    console.log(result);

    totalBetEl.textContent = `Tổng điểm cược: ${totalBet}`;
    if (isWin) {
      resultMessageEl.textContent = "Bạn đã đoán đúng!";
    } else {
      resultMessageEl.textContent = "Bạn đã đoán sai!";
    }
    btnSpin.disabled = false;
    btnReset.disabled = false;
    bettingArea.classList.remove("disabled");
  }, 1500);
});

bettingArea.addEventListener("click", (e) => {
  const img = e.target;
  const value = img.dataset.value;

  if (bets[value] < 3) {
    bets[value]++;
  }

  updateBettingArea();
});

    
function updateBettingArea() {

  for (const bet in bets) {
      const img = bettingArea.querySelector(`[data-value="${bet}"]`);
  
      if (img) {
        const betEl = img.parentNode.querySelector(".bet-count");

        if (betEl) {
          betEl.textContent = bets[bet];
        }
      }
    }


  let totalBet = 0;
  for (const bet in bets) {
    totalBet += bets[bet];
  }
  totalBetEl.textContent = `Tổng điểm cược: ${totalBet}`;
}

btnReset.addEventListener("click", () => {
  for (const bet in bets) {
    bets[bet] = 0;
  }

  updateBettingArea();
});

updateBettingArea();
