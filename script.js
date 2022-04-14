'use strict'

const table = [[], [], []];
var tableMap = new Map();
let formTable = document.getElementById('form');
formTable.addEventListener("submit", (event)=>{
  event.preventDefault();

  for(let i=1;i<=3;i++){
    for(let j=1;j<=3;j++){
      tableMap.set(`a${i}b${j}`, document.getElementById(`a${i}b${j}`).value);
      
    }
  }
  console.log(tableMap);
})