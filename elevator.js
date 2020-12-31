// DEFINE CONSTANTS VALUES 
let WeigthThreshold     = 500       //Measure Unit : KG / Max wight that elevator can support 
let MaxCapacity         =  10      //  Measure Unit : Person / Max person that elevator can contain
let strElevator         = "Elevator: "  //constant for print
//DEFINE GLOBAL PARAMETERS 
var Emergency           =   False   //  If Emergency all elevators should be evacuated  

//Class that describes button inside the elevator //
class Elevator_Button{
    constructor(elevator,button,status){
        this.button=button;
        this.elevator=elevator;
        this.status=status;
    }

    // Getter and Setter
    setstatus(status){
        this.status=status;
    }
    getstatus(){
        return this.statuts;
    }
}



/*
class Elevator {

        constructor(idelevator, doorstatus, doorobstruction,numberofperson,weigth,status,currentfloor, direction,nbbutton) {
    
            this.elevator =idelevator;
            this.doorstatus = doorstatus;
            this.doorobstruction=doorobstruction;
            this.doorobstruction=numberofperson;
            this.weigth = weigth;
            this.status=status;
            this.currentfloor=currentfloor;
            this.direction = direction;
            this.nbbutton=nbbutton;
        }
    
        addFloorList(RequestFloor) {
    
            this.floor_list.push(RequestFloor);
            this.sortFloorList();
            this.moveElevator(RequestFloor);
        }
    
        sortFloorList() {
            if (this.elevator_currentDirection === "Up") {
                this.floor_list.sort();
            } else if (this.elevator_currentDirection === "Down") {
                this.floor_list.sort();
                this.floor_list.reverse();
            }
            return this.floor_list;
        }
        

        
*/
