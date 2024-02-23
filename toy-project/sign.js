const bfsignin = document.querySelector("#before")
const afsignin = document.querySelector("#after")
const idInputUp = document.querySelector(".id")
const passwordInputUp = document.querySelector(".password")
const idInputIn = document.querySelector(".signin-id")
const passwordInputIn = document.querySelector(".signin-password")
const signUpButton = document.querySelector(".sign-up-button")
const signInButton = document.querySelector(".sign-in-button")
const checkPassword = document.querySelector(".checkPassword")
const signupPopup = document.querySelector("#signup")
const signinPopup = document.querySelector("#signin")
const logout = document.querySelector(".logout")
let checklogin = false;
let checkPopup = false
let status;

export const layoutPopup = () => {
	logout.addEventListener("click",()=>{
		checklogin = false
		status.style.display = "none"
	})
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
	idInputUp.addEventListener("input", (e)=>{
		id = e.target.value
	})
	passwordInputUp.addEventListener("input", (e)=>{
		password = e.target.value
	})
	checkPassword.addEventListener("input", (e)=>{
		rpassword = e.target.value
	})
	signUpButton.addEventListener("click", () => {
		if(password === rpassword){
			window.localStorage.setItem('id',id)
			window.localStorage.setItem('password',password)
			signupPopup.style.display = "none"
			checklogin =  true
			layoutPopup()
			return;
		}else{
			alert("비밀번호가 같지 않습니다.")
		}
	})
}

export const signin = () => {
	let id,password;
	const saveId = window.localStorage.getItem('id')
	const savePassword = window.localStorage.getItem('password')
	idInputIn.addEventListener("input", (e)=>{
		id = e.target.value
	})
	passwordInputIn.addEventListener("input", (e)=>{
		password = e.target.value
	})
	signInButton.addEventListener("click", () => {
		if(id===saveId && password===savePassword){
			alert("로그인에 성공하였습니다!")
			signinPopup.style.display = "none"
			checklogin =  true
			layoutPopup()
			return;
		}else{
			alert("아이디 또는 비밀번호가 틀렸습니다.")
		}
	})
}
