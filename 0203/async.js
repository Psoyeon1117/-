//async & await
//clear style of using promise

// 1.async
// async를 사용하면, promise를 보다 간결하게 만들어준다.
async function fetchUser() {
	return 'soyeon';
}

const user = fetchUser();
user.then(console.log);

// 2.await
// await 문장을 기다린 후 다음 코드를 실행한다.
function delay(ms){
	return new Promise(resolve => setTimeout(resolve, ms));
}

async function getApple(){
	await delay(1000);	//1초 동안 기다린 후, return 실행
	return '🍎';
}
async function getBanana(){
	await delay(1000);
	return '🍌';
}
async function pickFruits() {
	const apple = await getApple();	
	const banana = await getBanana();
	return `${apple} + ${banana}`;
	//순차적으로 진행되기 때문에 !시간이 오래걸리는 문제가 발생!
}

pickFruits().then(console.log)

// 3. useful APIs
function pickAllFruits() {
	return Promise.all([getApple(), getBanana()])//모든 promise를 병렬적으로 실행해줌
	.then(fruits => fruits.join(' + '))
}
pickAllFruits().then(console.log)