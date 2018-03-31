// ammount of cash held
var cash = 100;
//array for cargo of ship
var cargo = [];
var maxCargo = 4; //The maximum cargo that can be held
//The list of 4 port names
var portName = [
  "Alice", "Buck", "Cloud", "Domino"
]
//The list of the items (notused,ItemA, ItemB, ItemC, ItemD)
var cargoList = [
  "empty","Fertiliser","Cereal","Tools","Booze"
]
//A nested table of Port information
// [ Tax, Item A, Item B, Item C, Item D ]
var portInfo = [
  [0.0,5,100,400,200],
  [0.14,20,50,90,40],
  [0.38,20,50,200,300],
  [0.18,20,20,200,100]
]

//location of the ship (starts in a random port)
var nowPort = Math.floor(Math.random() * portInfo.length);

// to start the game move the ship
moveShip();



function moveShip(){
  priceChange();
  // Move the ship to the next port
  if(nowPort < (portInfo.length -1)){
    nowPort += 1;
  }else{
    nowPort = 0;
  }
 //list the port info
 listPort();
}

function listPort() {
 //update the information on the table for the port
  document.getElementById("port").innerHTML = "Now in " + portName[nowPort] + " port.";

  document.getElementById("portTax").innerHTML = "Where import tarrifs are: "+ Math.round(portInfo[nowPort][0]*100) + "%.";
    document.getElementById("Fert").innerHTML = portInfo[nowPort][1];
    document.getElementById("Cere").innerHTML = portInfo[nowPort][2];
    document.getElementById("Tool").innerHTML = portInfo[nowPort][3];
    document.getElementById("Booz").innerHTML = portInfo[nowPort][4];
}

function buyCargo(stock) {
  //buy produce from the current port, then update cash and hold info if good sale
  if (cargo.length < maxCargo && cash > portInfo[nowPort][stock]){
    cash -= portInfo[nowPort][stock];
    document.getElementById("cash").innerHTML = "$" + cash;
    cargo[cargo.length] = stock;
    listCargo();
  } else {
    //show error can not buy
    if (cargo.length >= maxCargo){
      alert("You don't have enough hold for more cargo. \n Sell some cargo to make room.");
    } else {
      alert("You don't have enough cash for " + cargoList[stock] + " here.");
    }
  }
}


function sellCargo(hld) {
  //sell produce in the selected hold, add to cash price - landing tax
  //set hold to undefined (to be filled on buy)
  switch (cargo[hld]) {
    case 0:
    case undefined:
      alert("That hold is empty.");
      break;
    case 1:
    case 2:
    case 3:
    case 4:
      var sellPrice = portInfo[nowPort][cargo[hld]] * (1-portInfo[nowPort][0]);
      cash += Math.round(sellPrice);
      document.getElementById("cash").innerHTML = "$" + cash;
      cargo.pop(cargo[hld]);
      break;
  }
  listCargo();
}

function listCargo() {
  //List the cargo in the hold
  if (cargo.length < 1){
  document.getElementById("hold").innerHTML = "empty";
  } else {
    document.getElementById("hold").innerHTML = "<ul><li>"+ cargo.join("</li><li>") + "</li></ul>";
  }
}

function priceChange () {
  // Change the tax or price of goods in a random port and report it as news.
  var effectPort = Math.floor(Math.random() * portInfo.length);
  var effectCargo = Math.floor(Math.random() * 4)+1;
  switch(Math.floor(Math.random() * 3)){
    case 0:   //change tax
      portInfo[effectPort][0] += 0.01;
      portInfo[effectPort][0] -= portInfo[effectPort][0]%0.01; //to round?
      document.getElementById("gamenews").innerHTML = "tax increase in "+portName[effectPort]+"!";
      break;
    case 1:  //price decrease
      portInfo[effectPort][effectCargo] -= Math.round(portInfo[effectPort][effectCargo]*(Math.floor(Math.random() * 10))/100);
      document.getElementById("gamenews").innerHTML = "Surplus "+cargoList[effectCargo]+" at " +portName[effectPort]+ " port.";
      break;
    case 2: //price increase
      portInfo[effectPort][effectCargo] += Math.round(portInfo[effectPort][effectCargo]*(Math.floor(Math.random() * 10))/100);
      document.getElementById("gamenews").innerHTML = "Shortage of "+cargoList[effectCargo]+" at " +portName[effectPort]+ "Port.";
      break;
  }
}
