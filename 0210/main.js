const clothList = document.querySelector(".cloth_list")
const tiles = document.querySelectorAll(".filter > li")
const filter = document.querySelector(".filter")
const clothchild = clothList.children
let isfilter = false;
let dataLength = 0;

filter.addEventListener('click', (e)=>{
	let trait = e.target.parentNode.dataset.type
	if (isfilter === false){
		filtering(trait)
		isfilter = true
	}else{
		for (let i =0; i<clothchild.length; i++){
				clothchild[i].style.display = ''
		}
		isfilter = false
	}
})

const filtering = (trait) => {	
	for (let i =0; i<clothchild.length; i++){
		if (clothchild[i].dataset.color != trait && clothchild[i].dataset.style != trait){
			clothchild[i].style.display = 'none'
		}
	}
}


const loading = async () => {							//화면 로딩하는 함수
	const response = await axios.get('data.json');		//data.json에서 데이터를 받아온다
	dataLength = response.data.data.length;
	for(let i =0; i<dataLength; i++){					//리스트를 제작하는 함수를 호출
		generateList(response.data.data[i])
	}
}

const generateList = (data) => {	//리스트 제작하는 함수
	const li = document.createElement("li")
	li.setAttribute('data-style', data.style)
	li.setAttribute('data-color', data.color)
	const image = generateImg(data.style, data.color);	//리스트의 이미지 제작 함수를 호출
	const item = generateitem(data.sex, data.size);		//리스트의 정보 제작 함수를 호출
	li.appendChild(image)
	li.appendChild(item)
	clothList.appendChild(li)
}

const generateImg = (style, color) => {					//리스트의 이미지를 제작하는 함수
	const image = document.createElement("img")
	image.classList.add("cloth_img")
	image.src = `imgs/${color}_${style[0]}.png`			//데이터의 옷과 색 정보에 따라 사진을 불러온다.
	return image
}
const generateitem = (sex,size) => {
	const item = document.createElement("p")
	item.classList.add("cloth_info")
	item.innerText = `${sex}, ${size}`					//데이터의 성별과 사이즈 정보를 나타낸다
	return item
}

loading()