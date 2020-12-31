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
            this.requestlist.append(nbfloor);
    }
    
    # removeFromRequestList : remove floor from the request list 
    
    def removefromrequestlist (nbfloor): 
        this.requestlist.remove(nbfloor)
    
    # sortRequestList : sort the request list 
    
    def  sortrequestlist():  
        this.requestlist.sort()
        if this.direction =="DOWN":
            this.requestlist.reverse()
            
    def __str__():
        res = " id : " + str(this.idelevator) + " \n direction : " +  this.direction + " \n requestlist : " + str(self.requestlist)  
        return res
    
    
    # mainElevator : open the door of the elevator  
    # Manage request list 
    
     
    def mainelevator(): 
        while  (not Emergency) and (len(this.requestlist)!=0) :
            for i in range (this.nbbutton):
                if this.buttons[i].status=="ACTIVATED" and i not in this.requestlist:
                    this.requestlist.append (i)
            
            this.sortrequestlist()     #sort should be done every time before treating first request : in cas of adding another floor while we treat the last request 
            print(this)
            this.move(this.requestlist[0])    # requestlist[0] is the first floor which should be reached it can be 10, 7,....
            this.opendoor()
            this.removefromrequestlist(this.requestlist[0])
            print(str(this))
       
    # startElevator : The first time while the elevator start   
    # Manage request list 
     
    def startelevator(floornumber):
        this. move(floornumber) 
        this. mainelevator()
}
        

        

