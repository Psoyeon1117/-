const bfsignin = document.querySelector("#before")
const afsignin = document.querySelector("#after")
const idInput = document.getElementById("id")
const passwordInput = document.getElementById("password")
const signButton = document.querySelector(".sign")
const checkPassword = document.querySelector(".checkPassword")
const signPopup = document.querySelector(".sign-popup")
let checklogin = false;
let checkPopup = false
let status;

export const layoutPopup = () => {
	if(checkPopup == false){
		if(checklogin){ //로그인 O
			status = afsignin
			status.style.display = "block"
		}else{  //로그인 X
			status = bfsignin
			status.style.display = "block"
		}
		checkPopup = true;
	}else{
		status.style.display = "none"
		checkPopup = false;
	}}

export const signup = () => {
	let id,password,rpassword;
	checkPassword.style.display =  "block"
	signButton.innerText = "회원가입"
	idInput.addEventListener("input", (e)=>{
		id = e.target.value
	})
	passwordInput.addEventListener("input", (e)=>{
		password = e.target.value
	})
	checkPassword.addEventListener("input", (e)=>{
		rpassword = e.target.value
	})
	signButton.addEventListener("click", () => {
		if(password === rpassword){
			window.localStorage.setItem('id',id)
			window.localStorage.setItem('password',password)
			signPopup.style.display = "none"
			return;
		}else{
			alert("비밀번호가 같지 않습니다.")
		}
	})
}

export const signin = () => {
	let id,password;
	checkPassword.style.display =  "none"
	signButton.innerText = "로그인"
	const saveId = window.localStorage.getItem('id')
	const savePassword = window.localStorage.getItem('password')
	idInput.addEventListener("input", (e)=>{
		id = e.target.value
	})
	passwordInput.addEventListener("input", (e)=>{
		password = e.target.value
	})
	signButton.addEventListener("click", () => {
		if(id==saveId && password==savePassword){
			alert("로그인에 성공하였습니다!")
			signPopup.style.display = "none"
			return;
		}else{
			alert("아이디 또는 비밀번호가 틀렸습니다.")
		}
	})
	
}
