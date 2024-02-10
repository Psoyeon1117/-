// 1. Producer
//when new Promise is created, the executor runs automatically.
const promise = new Promise((resolve,reject)=>{
	console.log('doing something...')
	setTimeout(()=> {
		resolve('soyeon')
		// reject(new Error('no network'))
	}, 2000);
});

// 2. consumers: then, catch, finally
promise
	.then((value) => {	//promise가 성공할 시 실행됨 = resolve
		console.log(value)
	})
	.catch(error => {	//promise가 실패할 시 실행됨 = reject
		console.log(error)
	})
	.finally(()=>{
		console.log('finally')	//마지막에 무조건 실행되는 함수
	})

// 3. promise chaining
// promise를 여러번 실행하여 체인처럼 이을 수 있다.
const fetchNumber = new Promise((resolve,reject)=>{
	setTimeout(()=>resolve(1),1000);
});

fetchNumber	
.then(num => num*2)
.then(num => num*3)
.then(num => {
	return new Promise((resolve,reject) => {
		setTimeout(() => resolve(num-1), 1000);
	});
})
.then(num => console.log(num))