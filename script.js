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

});








