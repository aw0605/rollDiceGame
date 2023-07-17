const player1 = document.querySelector(".player1");
const player2 = document.querySelector(".player2");
const p1TotalScore = document.querySelector(".total-score1");
const p2TotalScore = document.querySelector(".total-score2");

const dice = document.querySelector(".roll-dice");
const diceNumber = document.querySelector(".dice-number");
const currentScore = document.querySelector(".current-score");

const stopBtn = document.querySelector(".play-stop");

let currentPlayer = 1;
let player1Score = 0;
let player2Score = 0;

let diceN;
let cScore = 0;

let play = true;

// 게임 종료 -------------------------------------------
function gameover() {
  alert(`Player ${currentPlayer}가 승리하였습니다!`);
  // 새로고침
  location.reload();
}

// player 턴 변경 --------------------------------------
function changeTurn() {
  // stop버튼 초기화
  play = true;

  // 현재 player 구분해서 inactive클래스 토글
  currentPlayer = currentPlayer === 1 ? 2 : 1;
  player1.classList.toggle("inactive");
  player2.classList.toggle("inactive");
}

// stop ------------------------------------------------
function stop() {
  play = false;
  if (currentPlayer === 1) {
    player1Score += cScore;
    p1TotalScore.innerText = player1Score;
    if (player1Score >= 50) {
      setTimeout(gameover, 300);
    }
  } else {
    player2Score += cScore;
    p2TotalScore.innerText = player2Score;
    if (player2Score >= 50) {
      setTimeout(gameover, 300);
    }
  }

  cScore = 0;
  currentScore.innerText = cScore;
  changeTurn();
}

// 랜덤 주사위 눈 ---------------------------------------
function rollDice() {
  if (!play) return;

  // 주사위 숫자 랜덤으로 고르기
  diceN = Math.floor(Math.random() * 6) + 1;
  diceNumber.innerText = diceN;

  if (diceN < 3) {
    // 주사위 숫자 1,2인 경우, 현재점수 초기화 및 턴변경
    cScore = 0;
    currentScore.innerText = cScore;
    changeTurn();
  } else {
    // 주사위 숫자 3 -6인 경우, 현재점수 += 주사위 숫자
    cScore += diceN;
    currentScore.innerText = cScore;

    // 해당 player가 stop을 누른 경우, stop()
    stopBtn.addEventListener("click", stop);

    // 현재 점수가 50이상이면 게임종료
    if (cScore >= 50) {
      if (currentPlayer === 1) {
        player1Score += cScore;
        p1TotalScore.innerText = player1Score;
        if (player1Score >= 50) {
          setTimeout(gameover, 300);
        }
      } else {
        player2Score += cScore;
        p2TotalScore.innerText = player2Score;
        if (player2Score >= 50) {
          setTimeout(gameover, 300);
        }
      }
    }
  }
}
dice.addEventListener("click", rollDice);
