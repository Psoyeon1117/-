const notetiles = document.getElementsByTagName("li")
const title = document.getElementsByClassName("title")

let dobj;
let originPlace;
let isLast = false;
export const dragged = {
    el: null,
    index: null,
}

export const dragsetting = (e) => {
    let drag;
    if (e ==  "li"){
        drag = e
    }else if(e.localName == "div"){
        drag = e.parentNode
    }else{return}
    return drag
}

export const noteplus = (mainSection) => {  //note를 추가하는 함수
    const li = document.createElement("li")
    const title = generateItem("title")
    const story = generateItem("story")
    li.appendChild(title)
    li.appendChild(story)
    li.setAttribute("draggable", "true")
    mainSection.appendChild(li)
}
const generateItem = (classname) => {   //요소를 만드는 함수
    const item = document.createElement("div")
    const randomId = Math.random().toString(36).substring(2, 12)
    item.classList.add(classname)
    item.setAttribute("id",randomId)
    item.setAttribute("contenteditable","true")
    return item
}


export const dropFunc = (e) => {

    dobj = dragsetting(e.target)
    //drop.target이 li가 아닐 경우에 대한 if문

    if(dragged.el.nextSibling){ //drag조각이 마지막 조각인지 확인하는 곳
        originPlace = dragged.el.nextSibling;
    //drag조각!=마지막 조각이라면, drag조각의 이후조각을 원 위치로 설정한다.
    }else{
        originPlace = dragged.el.previousSibling;
        isLast = true
    }
    const dropindex = [...dobj.parentNode.children].indexOf(dobj)
    if(isLast){
        originPlace.after(dobj)
        //drag조각이 마지막이라면, 원 위치의 뒤에 drop조각을 둔다.
    }else{
        dragged.index < dropindex?dobj.after(dragged.el):dobj.before(dragged.el)
        //drag조각이 drop조각보다 앞에 있을 경우, drag조각이 drop조각의 뒤로 가도록 함
    }

}

export const search = (words) => {      //제목을 검색하는 함수
    for(let i=0;i<title.length; i++){
        if(title[i].innerText != words){    //제목과 검색내용이 일치하지 않을 경우 노트를 숨긴다.
            notetiles[i].style.display = 'none';
        }
    }
}
