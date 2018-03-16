//location of the ship
var nowPort = 0;
// ammount of cash held
var cash = 100;
//array for cargo of ship
var cargo = [];

function moveShip(){
  // Move the ship to the next port and update the port information in the table
 if(nowPort<3){
   nowPort += 1;
 }else{
   nowPort = 0;
 }
  document.getElementById("port").innerHTML = "Now in " + portName[nowPort] + " port.";
  
  document.getElementById("portTax").innerHTML = "Where import tarrifs are: "+ portInfo[nowPort][0]*100 + "%.";
    document.getElementById("Fert").innerHTML = portInfo[nowPort][1];
    document.getElementById("Cere").innerHTML = portInfo[nowPort][2];
    document.getElementById("Tool").innerHTML = portInfo[nowPort][3];
    document.getElementById("Booz").innerHTML = portInfo[nowPort][4];
}

function buyCargo(stock) {
  //buy produce from the current port, then update cash and hold info if good sale
  if (cargo.length < 4 && cash > portInfo[nowPort][stock]){
    cash -= portInfo[nowPort][stock];
    document.getElementById("cash").innerHTML = "$" + cash;
    cargo[cargo.length] = stock;
    listCargo();
  } else {
    //show error can not buy
    if (cargo.length >= 4){
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
      cash += sellPrice;
      cash -= cash%1; //this is done to round the ammount down to whole $
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
  [0.10,12,33,134,55],
  [0.08,36,37,98,39],
  [0.22,29,53,94,15],
  [0.17,16,67,108,99]
]
