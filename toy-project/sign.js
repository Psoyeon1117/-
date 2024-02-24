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
	if(checkPopup == false){	//팝업이 켜져있지 않음
		if(checklogin){ //로그인 O
			status = afsignin
			status.style.display = "block"
		}else{  //로그인 X
			status = bfsignin
			status.style.display = "block"
		}
		checkPopup = true;
	}else{						//팝업이 켜져있음
		status.style.display = "none"
		checkPopup = false;
	}}

export const signup = () => {	//회원가입 함수
	let id,password,rpassword;
	idInputUp.addEventListener("input", (e)=>{	//id를 받아오기
		id = e.target.value
	})
	passwordInputUp.addEventListener("input", (e)=>{	//비밀번호 받아오기
		password = e.target.value
	})
	checkPassword.addEventListener("input", (e)=>{		//재비밀번호 받아오기
		rpassword = e.target.value
	})
	signUpButton.addEventListener("click", () => {
		if(password === rpassword){						//비밀번호와 재비밀번호가 같은지 확인
			window.localStorage.setItem('id',id)		//id와 비밀번호 로컬저장소에 저장
			window.localStorage.setItem('password',password)
			signupPopup.style.display = "none"
			checklogin =  true
			layoutPopup()								//로그인 된 상태에 맞는 팝업 설정
			return;
		}else{
			alert("비밀번호가 같지 않습니다.")
		}
	})
}

export const signin = () => {							//로그인 함수
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
		if(id===saveId && password===savePassword){		//로컬저장소의 아이디,비번과 입력한 정보가 일치하는 지를 확인
			alert("로그인에 성공하였습니다!")
			signinPopup.style.display = "none"
			checklogin =  true
			layoutPopup()								//로그인 된 상태에 맞는 팝업 설정
			return;
		}else{
			alert("아이디 또는 비밀번호가 틀렸습니다.")
		}
	})
}
