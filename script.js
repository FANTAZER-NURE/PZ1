'use strict'

const table = [[], [], []];
const deliveryValue = new Array();
const tableMap = new Map();
const valuesMap = new Map();
let formTable = document.getElementById('form');
formTable.addEventListener("submit", (event)=>{
  event.preventDefault();

  /*ЗАПОЛНЯЕМ СЛОВАРЬ ВСЕМИ ВВЕДЕНЫМИ ЗНАЧЕНИЯМИ*/

  for(let i=1;i<=4;i++){
    for(let j=1;j<=4;j++){

      if((i % 4 === 0)&& (j % 4 === 0)) {
        continue;
      }
      else if(i % 4 === 0){
        tableMap.set(`b${j}p`, document.getElementById(`b${j}p`).value);      
      }
      else if(j % 4 === 0){
        tableMap.set(`a${i}z`, document.getElementById(`a${i}z`).value);
      }
      else{
        tableMap.set(`a${i}b${j}`, document.getElementById(`a${i}b${j}`).value);
        valuesMap.set(`a${i}b${j}`, document.getElementById(`a${i}b${j}`).value);
        table[i-1][j-1]=tableMap.keys();
      }

    }
  }

  let tableMap2 = tableMap;

  /*СОРТИРУЕМ ЦЕНЫ ДОСТАВКИ*/
  const mapSort2 = new Map([...valuesMap.entries()].sort((a,b)=> a[1] - b[1]));

  let sum = 0;

  for(let i = 1; i < 4; i++) {
    sum += parseInt(tableMap.get(`a${i}z`)) + parseInt(tableMap.get(`b${i}p`));
  }


  /* ПЕРЕВОЕ РЕШЕНИЕ ЗАДАЧИ */

  const smallMap = new Map();

  while (sum !== 0) {
    for (let key of mapSort2.keys()) {


      let substrZapas = key.substring(0, 2);
      let substrPotr = key.substring(2);
      
      let min =  Math.min(tableMap2.get(`${substrZapas}z`), tableMap2.get(`${substrPotr}p`));

      if (min == 0) {
        continue;
      }

      let num1 = tableMap2.get(`${substrZapas}z`) - min;
      let num2 = tableMap2.get(`${substrPotr}p`) - min;

      tableMap2.set(`${substrZapas}z`, num1);
      tableMap2.set(`${substrPotr}p`, num2);

      smallMap.set(`${substrZapas}${substrPotr}`, min);

      console.log(tableMap2);

      sum -= min*2;
    }
  }

  console.log(smallMap);

  let firstResult = 0;
  for (let key of smallMap.keys()) {
    firstResult = tableMap.get(key)*smallMap.get(key) + firstResult;
  }
  console.log(firstResult);

  let page = document.querySelector('.page__answer');
  console.log(page);
  page.className = 'page__answer--opened';
  document.querySelector('.page__text--1').textContent = firstResult;
});




// for (let i = 1; i < 4; i++){
  //   tableMap.set(`a${i}u`);
  //   tableMap.set(`b${i}v`);
  // }
  // tableMap.set('a1u', 0);
  // for (let key of tableMap.keys()){
  //   let substrForU = key.substring(0, 2);
  //   let substrForV = key.substring(2);
  //   if(smallMap.get(key) && tableMap2.get(key)){
  //     if(tableMap.get(`${substrForU}u`) != undefined){
  //       tableMap.set(`${substrForV}v`, tableMap.get(key) - tableMap.get(`${substrForU}u`));
  //     }
  //     else if(tableMap.get(`${substrForV}v`) != undefined){
  //       tableMap.set(`${substrForU}u`, tableMap.get(key) - tableMap.get(`${substrForV}v`));
  //     }
  //   }
  // }
  
  // console.log(tableMap);



