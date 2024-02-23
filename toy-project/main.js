//6. 테마 기능 + 화면 구성 선택
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
trashCan.addEventListener("mouseenter", (e) => {
    const deleteElement = note.dragsetting(e.fromElement)
    if(deleteElement.localName == 'li'){
        deleteElement.remove()
    }else{return}
})


//4. 노트 검색
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
})
Array.from(signLink).forEach(i => i.addEventListener('click', (e)=>{
    if (e.target.className === "signup"){
        signupPopup.style.display = "flex"
        sign.signup()
    }else if(e.target.className === "signin"){
        signinPopup.style.display = "flex"
        sign.signin()
    }
}))
Array.from(backButton).forEach(i => i.addEventListener("click",()=>{
    signupPopup.style.display = "none"
    signinPopup.style.display = "none" 
}))
