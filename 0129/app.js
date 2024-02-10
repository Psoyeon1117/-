const container = document.querySelector(".image-container")
const startButton = document.querySelector(".start-button")
const gameText = document.querySelector(".game-text")
const playTime = document.querySelector(".play-time")
const tiles = document.querySelectorAll(".image-container > li");
const hint = document.querySelector(".hint")
let timeInterval = null;
let time = 0;
let isPlaying = false;
const dragged = {
    el: null,
    class: null,
    index: null,
}
hint.addEventListener("click",()=>{
    [...container.children].forEach(child => {
        child.innerText = child.getAttribute("data-type")
    })
})

startButton.addEventListener('click', ()=>{
    setGame()
})

function setGame(){
    time = 0;
    gameText.style.display = "none"
    isPlaying = true;
    timeInterval = setInterval(()=>{
        time++;
        playTime.innerText = time;
    },1000)

    const gameTiles = shuffle([...tiles]);
    container.innerHTML = "";
    console.log(gameTiles)
    gameTiles.forEach((tile) => {
        container.appendChild(tile)
    })
}
function shuffle(array){
    let index = array.length - 1;
    let n = 0;
    while(index>0){
        const randomIndex = Math.floor(Math.random()*(index+1))
        n = array[index]
        array[index] = array[randomIndex]
        array[randomIndex] = n        
        // [array[index],array[randomIndex]] = [array[randomIndex], array[index]]
        // 이거 왜 안되는 걸까
        index--;
    }
    return array;
}

function checkStatus(){
    const currentList = [...container.children];
    const unMatched = currentList.filter((list,index)=>{
        return Number(list.getAttribute("data-type")) !== index
    })
    if(unMatched.length === 0){
        isPlaying = false;
        clearInterval(timeInterval)
        gameText.style.display = "block"
    }
}
container.addEventListener('mouseover', e => {
    if(isPlaying === false){
        tiles.forEach((tile) => {
        tile.setAttribute('draggable', false)
        })
        container.style.cursor = 'not-allowed'
    }
})
container.addEventListener('dragstart', e => {
    const obj = e.target;
    dragged.el = obj;
    dragged.class = obj.className;
    dragged.index = [...obj.parentNode.children].indexOf(obj)
    //spread 연산자로 children의 list들을 배열로 변경한 후
    //obj의 인덱스 번호(=위치)를 찾는다.
})
container.addEventListener('dragover', e => {
    e.preventDefault()
})
container.addEventListener('drop', e => {
    const dobj = e.target;
    let originPlace;
    let isLast = false;
    if(dragged.el.nextSibling){ //drag조각이 마지막 조각인지 확인하는 곳
        originPlace = dragged.el.nextSibling;
    //drag조각!=마지막 조각이라면, drag조각의 이후조각을 원 위치로 설정한다.
    }else{
        originPlace = dragged.el.previousSibling;
        isLast = true
    }//drag조각==마지막 조각이라면,drag조각의 이전조각을 원 위치로 설정한다. 
    const droppedIndex = [...dobj.parentNode.children].indexOf(dobj)
    dragged.index > droppedIndex? dobj.before(dragged.el) : dobj.after(dragged.el) 
    //drag조각이 drop조각보다 앞에 있을 경우, drag조각이 drop조각의 뒤로 가도록 함
    //위의 경우에서 before만 있다면 drag조각과 drop조각의 위치가 제대로 바뀌지 않음
    isLast ? originPlace.after(dobj) : originPlace.before(dobj);
    //drag조각이 마지막이라면, 원 위치의 뒤에 drop조각을 둔다.
    checkStatus()   //조각의 위치가 맞는지 확인하는 함수
})