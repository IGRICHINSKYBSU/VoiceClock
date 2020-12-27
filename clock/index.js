const timeEl = document.querySelector("time");
const speakBtn = document.querySelector("button");
const audioEl = document.querySelector("audio");

let date, min, hr, ampm;

const updateTime = () => {
  date = new Date();
  min = date.getMinutes();
  const hr24 = date.getHours();
  hr = hr24 % 24 || 24;
  const timeStr = `${hr}:${min < 10 ? 0 : ""}${min}`;
  timeEl.innerText = timeStr;
};
setTimeout(() => {
  updateTime();
  setInterval(() => {
    updateTime();
  }, 60 * 1000);
}, (60 - new Date().getSeconds()) * 1000);

updateTime();

let isFinishedSpeaking = false,
isMinWordSaid = false,
isMinSaid = false,
isMinAfter20Said = false,
isHrSaid = false,
isHrAfter20Said = false,
isHrWordSaid = false,
isEvenAdded = false;

const speakTime = () => {
    const addSrc = (num) => {
    audioEl.src = `./audio/hours/${num}.mp3`;
    const isPlayed = audioEl.play();
    audioEl.playbackRate = 1.2;
  };


//   hr = 20;
//   min = 03;

  const audioEnd = () => {
    console.log("audio end called ", isHrSaid);

    if (isFinishedSpeaking) {
      return;
    }

    if (!isHrSaid) {
        if ( hr <= 20) {
            addSrc(hr);
            isHrSaid = true;
            isHrAfter20Said = true;
            return;
        } else {
            addSrc("20");
            isHrSaid = true;
            return;
        }
    }

    if (!isHrAfter20Said) {
        addSrc(hr.toString()[1]);
        isHrAfter20Said = true;
        return;
    }

    if (!isHrWordSaid) {
        let urlHr;
        if ( hr >= 5 && hr <= 20 || hr == 0) {
            addSrc("hours");
            isHrWordSaid = true;
            return;
        } else if (hr == 1 || hr == 21) {
            addSrc("hour");
            isHrWordSaid = true;
            return;
        } else if (hr == 2 || hr == 3 || hr == 4 || hr == 22 || hr == 23 || hr == 24) {
            addSrc("houra");
            isHrWordSaid = true;
            return;
        }
    }

    if (!isMinSaid) {
        if (min == 0) {
            addSrc("0");
            isMinSaid = true;
            isMinAfter20Said = true;
            return;
        } else if (min >= 3 && min <= 20) {
            addSrc(min);
            isMinSaid = true;
            isMinAfter20Said = true;
            return;
        } else if (min == 2){
            addSrc("dve");
            isMinSaid = true;
            isHrAfter20Said = true;
            return;isMinAfter20Said
        } else if (min == 1){
            addSrc("odna");
            isMinSaid = true;
            isMinAfter20Said = true;
            return;
        } else if (min > 20 && min < 60) {
            addSrc(min.toString()[0] + "0");
            isMinSaid = true;
            return;
        }
    }

    if (!isMinAfter20Said) {
        if (min > 20) {
            if (min.toString()[1] == "1" ) {
                addSrc("odna");
                isMinAfter20Said = true;
                return;
            } else if (min.toString()[1] == "2") {
                addSrc("dve");
                isMinAfter20Said = true;
                return;            
            } else{
                addSrc(min.toString()[1]);
                isMinAfter20Said = true;
                return;            
            }
        }        
    } 

    if (!isMinWordSaid) {
        if ((min >= 5 && min <= 20) || min == 0 || (min > 20 && min < 60 && min.toString()[1] != "1" && min < 60 && min.toString()[1] != "2" && min.toString()[1] != "3" && min.toString()[1] != "4")) {
            addSrc("minutes");
            isMinWordSaid = true;
            return;
        } else if (min == 1 || (min > 20 && min < 60 && min.toString()[1] == "1")) {
            addSrc("minuta");
            isMinWordSaid = true;
            return;
        } else if ((min >= 2 && min <= 4) || (min > 20 && min < 60 && min.toString()[1] == "2") || (min > 20 && min < 60 && min.toString()[1] == "3") || (min > 20 && min < 60 && min.toString()[1] == "4"))  {
            addSrc("mini");
            isMinWordSaid = true;
            return;
        }
    }

  };

  if (!isEvenAdded) {
    audioEl.addEventListener("ended", audioEnd);
    isEvenAdded = true;
  }
  addSrc("tis");
};



speakBtn.addEventListener("click", () => {
    isFinishedSpeaking = false;
    isMinWordSaid = false;
    isMinSaid = false;
    isMinAfter20Said = false;
    isHrSaid = false;
    isHrAfter20Said = false;
    isHrWordSaid = false;
  speakTime();
});
