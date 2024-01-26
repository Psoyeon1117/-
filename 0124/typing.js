const SETTING_TIME = 5;
let words = [];
let time;
let isReady = false;
let isPlaying = false;
let score = 0;
let timeInterval;
const wordDisplay = document.querySelector(".word-display")
const wordInput = document.querySelector(".word-input")
const scoreDisplay = document.querySelector(".score")
const timeDisplay = document.querySelector(".time")
const button = document.querySelector(".button")
const url = "https://random-word-api.herokuapp.com/word?number=100"


const runToast = (text)=>{          //좌측에 toast 띄우는 함수
    const option = {
        text: text,
        duration: 3000,
        newWindow: true,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        background: "linear-gradient(#00b09b, #96c93d)",
        }
        Toastify(option).showToast()
    }
const getWords = () => {                //랜덤단어들을 받아오는 함수
    axios.get(url).then(res=> {         //url의 단어들을 axios로 받아옴
        words = res.data.filter(word => {
            return word.length < 8
        })
        button.innerText = '게임시작'     //단어로딩 후 버튼을 활성화시킴
        button.classList.remove('loading')
        isReady = true;
    }).catch(err=>console.log(err))
}
const init = () => {                      //초기화 함수
    time = SETTING_TIME
    getWords()
}
const countDown = () => {               //time값을 변경하는 함수
    if(time>0){
        time--;
    } else {                            //time=0일 경우 interval을 클리어함
        isPlaying = false;
        clearInterval(timeInterval)
    }
    timeDisplay.innerText = time;
}
const run = () => {                     //button 눌리면 게임시작하는 함수
    if(isReady === false){              //준비가 안됐으면 시작하지 않음
        return
    }
    timeInterval = setInterval(countDown,1000)//1초마다 countDown함수를 콜백함
    time = SETTING_TIME;
    score = 0;                          //score를 0으로 초기화
    scoreDisplay.innerText = score;
    isPlaying = true;
}

const checkMatch = () => {              //단어매치하는 함수
    if(!isPlaying) {return;}            //시작준비가 false라면 리턴함
    if(wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()){
        score++                         //두 단어가 같다면 점수 1+
        runToast(wordDisplay.innerText) //toast함수를 불러온다.
        time = SETTING_TIME;
        wordInput.value = ""
        const randomIndex = Math.floor(Math.random()* words.length);
        //floor:반올림, random:랜덤 수 생성
        wordDisplay.innerText = words[randomIndex]
        //words에 있는 요소들 중 랜덤단어를 불러온다.
    }
    scoreDisplay.innerText = score;
}
wordInput.addEventListener("input", checkMatch)
//input의 값이 Display의 단어와 같은지 확인한다.

//getting ready
init()