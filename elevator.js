// DEFINE CONSTANTS VALUES 
let WeigthThreshold     = 500           ;    //Measure Unit : KG / Max wight that elevator can support 
let MaxCapacity         =  10           ;    //  Measure Unit : Person / Max person that elevator can contain
let strElevator         = "Elevator: "  ;    //constant for print
var i                   =i
var Emergency           =   false       ;    //  If Emergency all elevators should be evacuated  

//Class that describes button inside the elevator //
class Elevator_Button{
    constructor(elevator,button,status){
        this.button=button;
        this.elevator=elevator;
        this.status=status;
    }
    // Getter and Setter
    set status(status){
        this.status=status;
    }
    get status(){
        return this.statuts;
    }
}

class Elevator {
    constructor (idelevator, direction, doorstatus, doorobstruction,numberofperson,weigth,status,currentfloor,nbbutton)
    {
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
    // Methods declaration
    // move : move the elevator to reach specific floor
    move(floornumber){
        if (this.currentfloor==floornumber)
        {
            console.log( strElevator   + this.idelevator + " STOPPED "); 
            this.status ='STOPPED';
        }
        else if (this.currentfloor < floornumber){  
            console.log(strElevator  + this.idelevator + " MOVING UP ");
            this.status="MOVING UP";
        }
        else{
             console.log(strElevator  + this.idelevator + " MOVING DOWN ");
            this.status="MOVING DOWN";
        }
        console.log(strElevator  + this.idelevator + " STOPPED ") ;
        this.status ='STOPPED';
        this.currentfloor= floornumber ;
    }

    // openDoor : open the door of the elevator  
    opendoor()
    {
        console.log(strElevator  + this.idelevator + " OPEN DOOR ") ;  
        this.setdoorstatus="OPEN";
    }

    
    // closeDoor : close the door of the elevator   
    closedoor()
    {
        while ((this.weight >= WeigthThreshold) || (this.numberofperson>= MaxCapacity) || (this.doorobstruction))
        {
            this.opendoor();
            console.log(strElevator + this.idelevator + " BIP SIGNAL ") ;
        }
        console.log(strElevator + this.idelevator + " CLOSE DOOR ");               
        this.doorstatus="CLOSED";
    }
    //addToRequestList : add floor to the request list 
    addtorequestlist (nbfloor)
    {
        if (!this.requestlist.includes(nbfloor))
            this.requestlist.push(nbfloor);
    }
    
    // removeFromRequestList : remove floor from the request list 
    
    removefromrequestlist (nbfloor)
    {
        this.requestlist.splice(nbfloor);
    }
    // sortRequestList : sort the request list 
    
    sortrequestlist()
    {
        this.requestlist.sort();
        if (this.direction =="DOWN")
            this.requestlist.reverse();
    }        

    __str__(){
        var res = " id : " + this.idelevator + " \n direction : " +  this.direction + " \n requestlist : " + this.requestlist ; 
        return res ;
    }
    // mainElevator : open the door of the elevator  
    // Manage request list 
    mainelevator()
    {
        while  (( Emergency=true) && (this.requestlist.length !=0)) 
        {
            for (i=0; i<this.nbbutton; i++)
            {
                if ((this.buttons[i].status=="ACTIVATED") && !this.requestlist.includes(i))
                    this.requestlist.push (i);
            }
            this.sortrequestlist() ;    //sort should be done every time before treating first request : in cas of adding another floor while we treat the last request 
            console.log(this.__str__());
            this.move(this.requestlist[0])  ;  // requestlist[0] is the first floor which should be reached it can be 10, 7,....
            this.opendoor();
            this.removefromrequestlist(this.requestlist[0]);
            console.log(this.__str__());
        }
    }
    // startElevator : The first time while the elevator start   
    // Manage request list 
    startelevator(floornumber)
    {
        this.move(floornumber) ;
        this.mainelevator();
    }
}

// outsidebutton class
class outsidebutton {
    //Properties declaration
    constructor(direction,currentfloor,status){
        this.direction = direction;
        this.currentfloor = currentfloor;
        this.status = status;
    }
    // Getter and Setter
    set status(status){
        this.status=status;
    }
    get status(){
        return this.statuts;
    }
}
// Shaft class
class shaft {
    constructor(idshaft,status,nbelevator,nbfloor)
    {
        this.idshaft=idshaft;
        this.status=status;
        this.nbelevator=nbelevator;
        //add elevators to shaft
        this.elevators=[];
        for (i in range(this.nbelevator))
        { 
            this.elevators.push(Elevator(i,"NULL","CLOSED",False,0,0,"ACTIVATED",0,nbfloor));
            
        }
        // add outside buttons
        this.outsidebuttons=[];
        this.outsidebuttons.push(outsidebutton("UP",0,"DESACTIVATED"));
        for (i in range(1,nbfloor-1))
        {
            // instantiate button outside (up or down) Parameters : direction, floor, status
            this.outsidebuttons.push(outsidebutton("DOWN",i,"DESACTIVETED"));
            this.outsidebuttons.push(outsidebutton("UP",i,"DESACTIVETED"));
        }
        this.outsidebuttons.push(outsidebutton("DOWN",i,"DESACTIVETED"));
    }
    findelevator()
    {
        this.eligiblelevator= [];
        for  (var elevator in this.elevators)
        {
            if(elevator.status=="ACTIVETED")(elevator.direction== outsidebutton.direction) 
            if((elevator.floor >= outsidebutton.currentfloor)&& (elevator.direction == "DOWN")) or ((elevator.floor <= outsidebutton.currentfloor) && (elevator.direction == "UP"))
            this.eligibleElevator.push(elevator);
        }
        if (this.eligiblelevator.length > 1) 
            return this.findnearestelevator(outsidebutton.currentfloor,this.eligiblelevator) ;
        else if (this.eligiblelevator.length == 1) 
            return this.eligiblelevator[0];
        else
            return this.findnearestelevator(outsidebutton.currentfloor,this.elevators);
    }
    findnearestelevator(currentfloor,elevatorslist)
    {
        var bestelevator = elevatorslist[0] ;    //lets take the first element of the array and compare it to each elevator1 of the array  
        var bestgap = abs(bestelevator.currentfloor - currentfloor);
        for (var elevator in elevatorslist) 
            if (abs(elevator.currentfloor - currentfloor <bestgap))
                bestelevator = elevator ;
        return bestelevator ;
    }

    mainshaft()
    {
        this.status = "ACTIVE";
        for (var outside in this.outsidebuttons)
        {
            if (outside.status=="ACTIVATED")
            {
                var e = this.findelevator(outside); //Get the elgible elevator to handle request 
                e.addtorequestlist(outside.currentfloor); //add the floor to handle to the requestlist of the elevator
            }
        }
        for (var elevator in this.elevators)  
            elevator.mainelevator();
    }
}            

// Elevator_Controller class
class elevatorcontroller
{
    constructor(nbshaft,status)
    {
        this.status = status ; //'ACTIVE' OR 'STOPPED'
        this.shafts =[];
        for (i in range(nbshaft))
            this.shafts.append(shaft(i,"ACTIVATED",2,10));
    }
    mainelevatorcontroller(this)
    {
        this.status ="ACTIVATED";
        for (shaft in this.shafts )
            shaft.mainshaft();
    }
}
console.log("********* CREATE ELEVATOR CONTROLLER  ************");
var ec = new elevatorcontroller(1,"ACTIVATED");


console.log("********* Run Main ELEVATOR CONTROLLER ************");

ec.mainelevatorcontroller();

console.log("********* SCENARIO 1 ************");
ec.shafts[0].elevators[0].elevatorfloor = 10;
ec.shafts[0].elevators[1].elevatorfloor = 3;
ec.shafts[0].outsidebuttons[6].status = "ACTIVATED"; //floor 3 to up activeted
ec.shafts[0].outsidebuttons[2].status = "ACTIVATED" ; //floor 1 to up activeted
ec.shafts[0].outsidebuttons[17].status = "ACTIVATED" ; //floor 9 to down activeted
ec.shafts[0].mainshaft() ;
        

        

