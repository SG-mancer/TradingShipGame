//location of the ship
var nowPort = 0;
// ammount of cash held
var cash = 100;

function moveShip(){
  // Move the ship to the next port and update the port information in the table
 if(nowPort<3){
   nowPort += 1;
 }else{
   nowPort = 0;
 }
  document.getElementById("port").innerHTML = "now in " + portName[nowPort];
  
  document.getElementById("portTax").innerHTML = portInfo[nowPort][0]*100 + "% port landing tax.";
    document.getElementById("Fert").innerHTML = portInfo[nowPort][1];
    document.getElementById("Cere").innerHTML = portInfo[nowPort][2];
    document.getElementById("Tool").innerHTML = portInfo[nowPort][3];
    document.getElementById("Booz").innerHTML = portInfo[nowPort][4];
}

function Buy(stock) {
  //buy produce from the current port, then update cash and hold info if good sale
  if (cargo.length < 4){
    cash -= portInfo[nowPort][stock];
    document.getElementById("cash").innerHTML = "$" + cash;
    cargo[cargo.length] = stock;
    document.getElementById("hold").innerHTML = "<ul><li>"+ cargo[0] + "</li><li>" + cargo[1] + "</li><li>" + cargo[2] + "</li><li>" + cargo[3] +"</li></ul>";
  } else {
    //show error can not buy
    alert("You don't have any empty hold");
  }
}

//array for cargo of ship
var cargo = []

      
//The list of 4 port names
var portName = [
  "Alice", "Buck", "Cloud", "Domino"
]

//A nested table of Port information
// [ Tax, Item A, Item B, Item C, Item D ]
var portInfo = [
  [0.10,12,33,134,55],
  [0.08,36,37,98,39],
  [0.22,29,53,94,15],
  [0.17,16,67,108,99]
]