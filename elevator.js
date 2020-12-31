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
    set status(status){
        this.status=status;
    }
    get status(){
        return this.statuts;
    }
}




class Elevator {
    constructor(idelevator, direction, doorstatus, doorobstruction,numberofperson,weigth,status,currentfloor,nbbutton)
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
    
# Methods declaration
# move : move the elevator to reach specific floor
    move(floornumber){
        if this.currentfloor==floornumber{
            console.log( strElevator   + this.idelevator + " STOPPED "); 
            this.status ='STOPPED';
        }
        elif this.currentfloor < floornumber{  
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

    # openDoor : open the door of the elevator  
    opendoor():
        console.log(strElevator  + this.idelevator + " OPEN DOOR ") ;  
        this.setdoorstatus="OPEN";
     

    
    # closeDoor : close the door of the elevator   
    closedoor()
    {
        while (this.weight >= WeigthThreshold) or (this.numberofperson>= MaxCapacity) or (this.doorobstruction)
        {
            this.opendoor()
            console.log(strElevator + this.idelevator + " BIP SIGNAL ") ;
        }
        console.log(strElevator + this.idelevator + " CLOSE DOOR ");               
        this.doorstatus="CLOSED";
    }
    


  
    #addToRequestList : add floor to the request list 
    addtorequestlist (nbfloor)
    {
        if nbfloor  not in this.requestlist
            this.requestlist.push(nbfloor);
    }
    
    # removeFromRequestList : remove floor from the request list 
    
    removefromrequestlist (nbfloor)
    {
        this.requestlist.splice(nbfloor);
    }
    # sortRequestList : sort the request list 
    
    sortrequestlist()
    {
        this.requestlist.sort()
        if this.direction =="DOWN"
            this.requestlist.reverse();
    }        

    __str__(){
        res = " id : " + this.idelevator + " \n direction : " +  this.direction + " \n requestlist : " + self.requestlist ; 
        return res ;
    }
    
    # mainElevator : open the door of the elevator  
    # Manage request list 
    
     
    mainelevator()
    {
        while  (not Emergency) and (len(this.requestlist)!=0) 
        {
            for i in range (this.nbbutton){
                if this.buttons[i].status=="ACTIVATED" and i not in this.requestlist
                    this.requestlist.push (i);
            }
            this.sortrequestlist() ;    #sort should be done every time before treating first request : in cas of adding another floor while we treat the last request 
            console.log(this.__str__());
            this.move(this.requestlist[0])  ;  # requestlist[0] is the first floor which should be reached it can be 10, 7,....
            this.opendoor();
            this.removefromrequestlist(this.requestlist[0]);
            console.log(this.__str__());
        }
    }
       
    # startElevator : The first time while the elevator start   
    # Manage request list 
     
    startelevator(floornumber)
    {
        this. move(floornumber) ;
        this. mainelevator();
    }
}

# outsidebutton class
class outsidebutton {
    #Properties declaration
    __init__(direction,currentfloor,status){
        this.direction = direction;
        this.currentfloor = currentfloor;
        this.status = status;
    }
    # Getter and Setter
    setstatus(status){
        this.status=status;
    }
    getstatus(){
        return this.statuts;
    }
}
# Shaft class
class shaft {
    def __init__(self,idshaft,status,nbelevator,nbfloor):
        self.idshaft=idshaft
        self.status=status
        self.nbelevator=nbelevator
        #add elevators to shaft
        self.elevators=[]
        for i in range(self.nbelevator): 
            self.elevators.append(Elevator(i,"NULL","CLOSED",False,0,0,"ACTIVATED",0,nbfloor))
        # add outside buttons
        self.outsidebuttons=[]
        self.outsidebuttons.append(outsidebutton("UP",0,"DESACTIVATED"))
        for i in range(1,nbfloor-1):
            #instantiate button outside (up or down) Parameters : direction, floor, status
            self.outsidebuttons.append(outsidebutton("DOWN",i,"DESACTIVETED"))
            self.outsidebuttons.append(outsidebutton("UP",i,"DESACTIVETED"))
        self.outsidebuttons.append(outsidebutton("DOWN",i,"DESACTIVETED"))

    def findelevator(self,outsidebutton):
        self.eligiblelevator= []
        for  elevator in self.elevators:
            if(elevator.status=="ACTIVETED")and(elevator.direction== outsidebutton.direction): 
                if((elevator.floor >= outsidebutton.currentfloor) and (elevator.direction == "DOWN"))or ((elevator.floor <= outsidebutton.currentfloor) and (elevator.direction == "UP")):
                        self.eligibleElevator.append(elevator)
        
        if len(self.eligiblelevator) > 1 :
            return self.findnearestelevator(outsidebutton.currentfloor,self.eligiblelevator) 
        elif len(self.eligiblelevator) == 1 :
            return self.eligiblelevator[0]
        else:
            return self.findnearestelevator(outsidebutton.currentfloor,self.elevators)
   
    def findnearestelevator(self,currentfloor,elevatorslist):
        bestelevator = elevatorslist[0]     #lets take the first element of the array and compare it to each elevator1 of the array  
        bestgap = abs(bestelevator.currentfloor - currentfloor)
        for elevator in elevatorslist: 
            if abs(elevator.currentfloor - currentfloor <bestgap):
                bestelevator = elevator                 
        return bestelevator 

    def mainshaft(self):
        self.status = "ACTIVE"
        for outside in self.outsidebuttons:
            if outside.status=="ACTIVATED":
                e = self.findelevator(outside) #Get the elgible elevator to handle request 
                e.addtorequestlist(outside.currentfloor) #add the floor to handle to the requestlist of the elevator
        for elevator in self.elevators : 
            elevator.mainelevator()
            

# Elevator_Controller class
class elevatorcontroller:
    def __init__(self,nbshaft,status):
        self.status = status  #'ACTIVE' OR 'STOPPED'
        self.shafts =[]
        for i in range(nbshaft):
            self.shafts.append(shaft(i,"ACTIVATED",2,10))
    def mainelevatorcontroller(self): 
        self.status ="ACTIVATED"
        for shaft in self.shafts :
            shaft.mainshaft()

print("********* CREATE ELEVATOR CONTROLLER  ************")
ec = elevatorcontroller(1,"ACTIVATED")


print("********* Run Main ELEVATOR CONTROLLER ************")

ec.mainelevatorcontroller()

print("********* SCENARIO 1 ************")
ec.shafts[0].elevators[0].elevatorfloor = 10
ec.shafts[0].elevators[1].elevatorfloor = 3
ec.shafts[0].outsidebuttons[6].status = "ACTIVATED" #floor 3 to up activeted
ec.shafts[0].outsidebuttons[2].status = "ACTIVATED" #floor 1 to up activeted
ec.shafts[0].outsidebuttons[17].status = "ACTIVATED" #floor 9 to down activeted
ec.shafts[0].mainshaft()
        

        

