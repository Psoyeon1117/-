//2. 노트 드래그하여 이동시키기
//3. 기본 노트 기능
//4. 노트 검색
//5. 노트 삭제
//6. 회원가입, 로그인

//1. 노트 추가 기능
//+를 누르면 맨 뒤에 노트가 추가된다.
//필수로 제목을 추가해야한다.

const mainSection = document.querySelector(".main-section > ul")
const plus = document.querySelector(".plus")

plus.addEventListener("click", () => {
    // console.log(e)
    noteplus()
})

const noteplus = () => {
    const li = document.createElement("li")
    const title = generateItem("title")
    const story = generateItem("story")
    li.appendChild(title)
    li.appendChild(story)
    mainSection.appendChild(li)
}
const generateItem = (classname) => {
    const item = document.createElement("div")
    const randomId = Math.random().toString(36).substring(2, 12)
    item.classList.add(classname)
    item.setAttribute("id",randomId)
    item.setAttribute("contenteditable","true")
    return item
}