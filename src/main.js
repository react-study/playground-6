/*1번 방법 잘안씀
import * as lib from './lib'; // 전체를 통으로 가져옴 그래서 비추
console.log(lib);             // (1)
console.log(lib.square(5));   // (2)
console.log(lib.sqrt(4));     // (3)
*/

//2번 방법

/*import lib, {square, sqrt} from './lib';//<-square,sqrt,default로 정의한 함수까지 모두가져옴
 import lib, {square} from './lib';//<-square, default로 정의한 함수 가져옴
 import lib from './lib';//<-default로 정의한 함수만 가져옴.
 console.log(square(5));
 console.log(sqrt(4));*/

//----- main.js -----
import React from 'react';
import ReactDOM from 'react-dom';
import App from 'App'
ReactDOM.render(
    (<App />),
    document.getElementById('root')
);