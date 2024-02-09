const todoInput = document.querySelector("#todo-input")
const todoList = document.querySelector(".todo-list")
const allClear = document.querySelector(".all-clear")
//input값과 list값을 불러온다.

todoInput.addEventListener("keypress",function(e){
	if(e.keyCode === 13){	//enter를 누를 경우 리스트를 생성
		generateTodo(todoInput.value)
		todoInput.value = ""
	}
})

allClear.addEventListener("click", ()=>{	//리스트 전체삭제
	while(todoList.firstChild){				
		todoList.removeChild(todoList.firstChild);
	}
	//todolist에 자식노드가 없을때까지 지우기 반복
})

const generateTodo = (todo)=>{				//리스트 생성 함수
	const li = document.createElement("li")
	const likeSpan = generateLike();		//리스트 요소 중 하트
	const itemSpan = generateItem(todo);	//리스트 요소 중 내용
	const manageSpan = generateManage();	//리스트 요소 중 관리
	li.appendChild(likeSpan);
	li.appendChild(itemSpan);
	li.appendChild(manageSpan);
	todoList.appendChild(li)
}
const generateIcon = (iconName)=>{			//아이콘 생성 함수
	const icon = document.createElement("i")
	icon.classList.add("material-icons")	//icon.class에 추가 
	icon.classList.add(iconName)
	icon.innerText = iconName
	return icon
}
const generateLike = ()=>{					//하트 생성 함수
	const span = document.createElement("span")
	span.classList.add("todo-like")				//아이콘 위치 추가
	const icon = generateIcon("favorite_border")//하트아이콘 생성
	//icon에 접근하기 위해서 선언해야함
	span.appendChild(icon);						//아이콘 추가
	icon.addEventListener("click",()=>{			//클릭 시 하트 변경
		if(icon.innerText === "favorite_border"){
			icon.innerText = "favorite"
		}else{
			icon.innerText = "favorite_border"
		}
	})
	return span;
}
const generateItem = (todo)=>{					//내용 생성 함수
	const span = document.createElement("span")
	span.classList.add("todo-item")
	span.innerText = todo;
	return span;
}
const generateManage = ()=>{					//관리 생성 함수
	const span = document.createElement("span")
	span.classList.add("todo-manage")
	const icon1 = generateIcon("check");
	const icon2 = generateIcon("clear");

	icon1.addEventListener("click", (e)=>{		
		const li = e.target.parentNode.parentNode;
		li.classList.add('done')
	})
	//check가 클릭될 경우 li가 done형식으로 변경
	icon2.addEventListener("click", (e)=>{
		const li = e.target.parentNode.parentNode;
		todoList.removeChild(li)
	})
	//clear가 클릭된 경우 li 삭제
	span.appendChild(icon1);	
	span.appendChild(icon2);
	return span;
}
