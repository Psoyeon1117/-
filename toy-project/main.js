import * as note from "./note.js"
import * as sign from "./sign.js"
const noteContainer = document.querySelector(".note-container")
const plus = document.querySelector(".plus")
const trashCan = document.querySelector(".delete")
const input = document.querySelector(".input")
const title = document.getElementsByClassName("title")
const notetiles = document.getElementsByTagName("li")
const profill = document.querySelector(".profill")
const signLink = document.querySelectorAll("#before > a")
const signupPopup = document.querySelector("#signup")
const signinPopup = document.querySelector("#signin")
const backButton = document.querySelectorAll(".back")
const colorTemas = document.querySelectorAll(".color > i")
const temaPopup = document.querySelector(".tema-popup")
const tema = document.querySelector(".tema")
let checkTemaPopup = false


//1. 노트 추가 기능
//+를 누르면 맨 뒤에 노트가 추가된다.
plus.addEventListener("click", () => {
    note.noteplus(noteContainer)
})


//2. 노트 드래그하여 이동시키기
noteContainer.addEventListener("dragstart", (e) => {
    const obj = e.target;
    note.dragged.el = obj;  //note>dragged 객체에 드래그한 노트의 정보를 입력
    note.dragged.index = [...obj.parentNode.children].indexOf(obj);
    
})
noteContainer.addEventListener("dragover", (e) => {
    e.preventDefault()
})
noteContainer.addEventListener("drop", (e) => {
    note.dropFunc(e)    //drop 방식을 정하는 함수를 호출
})


//3. 노트 삭제
//쓰레기통에 노트를 드래그하여 옮기면 노트를 삭제함
trashCan.addEventListener("mouseenter", (e) => {           
    const deleteElement = note.dragsetting(e.fromElement)   //drag되는 요소를 li로 고정하기 위한 함수
    if(deleteElement.localName == 'li'){
        deleteElement.remove()
    }else{return}
})


//4. 노트 검색
//검색란에 내용이 없으면 초기상태로 돌아감
input.addEventListener("keyup", (e) => {
    if(e.keyCode === 13){
        note.search(e.target.value)
    }
})
input.addEventListener("input", (e) => {
    if(e.target.value == ""){
        for(let i=0;i<title.length; i++){
            notetiles[i].style.display = '';
        }
    }
})

//5. 회원가입, 로그인
profill.addEventListener("click",()=>{
    sign.layoutPopup()
    temaPopup.style.display = "none"
    checkTemaPopup = false
})
Array.from(signLink).forEach(i => i.addEventListener('click', (e)=>{
    if (e.target.className === "signup"){   //회원가입을 눌렀을 경우 회원가입 팝업,기능을 활성화
        signupPopup.style.display = "flex"
        sign.signup()
    }else if(e.target.className === "signin"){  //로그인을 눌렀을 경우 로그인 팝업,기능을 활성화
        signinPopup.style.display = "flex"
        sign.signin()
    }
}))
Array.from(backButton).forEach(i => i.addEventListener("click",()=>{    //취소를 누를 경우 팝업 없앰
    signupPopup.style.display = "none"
    signinPopup.style.display = "none" 
}))

//6. 테마 기능
tema.addEventListener("click",()=>{
    if(!checkTemaPopup){                                                //테마가 안켜져 있을 경우 테마창 활성화
        temaPopup.style.display = "flex"
        checkTemaPopup = true 
    }
})
Array.from(colorTemas).forEach(i => i.addEventListener("click",(e)=>{
    const colorList = ["yellow","blue","black","purple"];               //컬러테마 목록
    colorList.forEach((i) => {
        if(e.target.id === `${i}`){                                     //colorList 중 선택한 컬러와 일치하는 것이 있다면
            document.documentElement.setAttribute('data-theme', `${i}`) //data-theme를 추가하여 테마변경
        }else if(e.target.id === "green"){                              //green일 경우 초기화
            document.documentElement.removeAttribute('data-theme')
        }
    })
}))