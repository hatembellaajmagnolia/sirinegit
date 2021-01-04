using System;
using System.Collections.Generic;
using System.Linq;

//    define constants
const int WeigthThreshold = 500;
const int  MaxCapacity = 10;
const string  strElevator = "Elevator: ";
 
// main program
public  class Program {
    public static void main(string[] args)
    {    
        bool Emergency = false;
    }
}
        

//  Class that describes button inside the elevator ####

//  Elevator_Button class
public class ElevatorButton
{
// Properties declaration in constructor
    public ElevatorButton(int idbutton,int idelevator,int status)
    {
        idbutton=idbutton;
        idelevator=idelevator;
        status=status;
    }
//  Getter and Setter
    public setstatus(int status){
        status=status;
    }
    public getstatus{
        return statuts
    }
}
// elevator class
public class Elevator
{
    // properties defination
    public int idelevator;
    public string status;
    public string doorstatus;
    public string doorobstruction;
    public List<int> requestlist= new List<int>(); 
    public int numberofperson;
    public int weight;
    public int currentfloor;
    public int nbbutton;
    public List<ElevatorButton> buttons=new List<ElevatorButton>();
    public string direction;
       
    //constructor 
    public Elevator(int idelevator, string direction, string doorstatus, string doorobstruction,int numberofperson,int weight,sting status,string currentfloor,int nbbutton)
    {
        this.idelevator =idelevator;
        this.direction = direction;
        this.doorstatus = doorstatus;
        this.doorobstruction=doorobstruction;
        this.doorobstruction=numberofperson;
        this.weigth = weigth;
        this.status=status;
        this.currentfloor=currentfloor;
        this.nbbutton=nbbutton;
        for (var i=0;i<this.nbbutton;i++)
            this.buttons.Add(new ElevatorButton(i,idelevator,"DESACTIVATED"));
    }
    // Methods declaration
    // move : move the elevator to reach specific floor
    public void move(floornumber)
    {
        if (this.currentfloor==floornumber)
        {
            Console.WriteLine("{0} {1} STOPPED ", strElevator, this.idelevator );  
            this.status ='STOPPED';
        }
        else if (this.currentfloor < floornumber){  
            Console.WriteLine("{0} {1} MOVING UP ", strElevator, this.idelevator );
            this.status="MOVING UP";
            this.direction="UP";
        }
        else{
            Console.WriteLine("{0} {1} MOVING DOWN ", strElevator, this.idelevator );
            this.status="MOVING DOWN";
            this.direction="DOWN";
        }
        Console.WriteLine("{0} {1} STOPPED ", strElevator, this.idelevator ) ;
        this.status ='STOPPED';
        this.currentfloor= floornumber ;
    }

    // openDoor : open the door of the elevator  
    public void opendoor()
    {
        Console.WriteLine("{0} {1} OPEN DOOR ", strElevator, this.idelevator ) ;  
        this.setdoorstatus="OPEN";
    }

    
    // closeDoor : close the door of the elevator   
    public void closedoor()
    {
        while ((this.weight >= WeigthThreshold) || (this.numberofperson>= MaxCapacity) || (this.doorobstruction))
        {
            this.opendoor();
            Console.WriteLine("{0} {1} BIP SIGNAL ", strElevator, this.idelevator );
        }
        Console.WriteLine("{0} {1} CLOSE DOOR ", strElevator, this.idelevator );               
        this.doorstatus="CLOSED";
    }
    //addToRequestList : add floor to the request list 
    public void addtorequestlist (nbfloor)
    {
        if (!this.requestlist.Contains(nbfloor))
            this.requestlist.Add(nbfloor);
    }
    
    // removeFromRequestList : remove floor from the request list 
    
    public void removefromrequestlist(int index)
    {
        this.requestlist.RemoveAt(index);
    }
    // sortRequestList : sort the request list 
    
    public void sortrequestlist()
    {
        this.requestlist.Sort();
        if (this.direction =="DOWN")
            this.requestlist.Reverse();
    }        

    public void __str__(){
        Sting  res = " id : " + this.idelevator + " \n direction : " +  this.direction + " \n requestlist : " + this.requestlist ; 
        return res ;
    }
    // mainElevator : open the door of the elevator  
    // Manage request list 
    public void mainelevator()
    {
        Console.WriteLine("requestlist={0}"+ this.requestlist.Count);
        while (this.requestlist.Count !=0) 
         {
            for (int i=0; i<this.nbbutton; i++)
            {
                if ((this.buttons[i].status=="ACTIVATED") && !this.requestlist.Contains(i))
                    this.requestlist.Add(i);
            }
            this.sortrequestlist() ;    //sort should be done every time before treating first request : in cas of adding another floor while we treat the last request 
            if (this.requestlist[0]>this.currentfloor)
                this.direction="UP";
            else if (this.requestlist[0]<this.currentfloor)
                this.direction="DOWN";

            console.WriteLine("{0}",this.__str__());
            this.move(this.requestlist[0])  ;  // requestlist[0] is the first floor which should be reached it can be 10, 7,....
            this.opendoor();
            this.removefromrequestlist();
            console.WriteLine("{0}",this.__str__());
         }
    }
    // startElevator : The first time while the elevator start   
    // Manage request list 
    public void startelevator(int floornumber)
    {
        this.move(floornumber) ;
        this.mainelevator();
    }
}

// outsidebutton class
public class outsidebutton {
    public string direction;
    public string currentfloor;
    public string status;
    //Properties declaration
    public outsidebutton(string direction,string currentfloor,sting status)
    {
        this.direction = direction;
        this.currentfloor = currentfloor;
        this.status = status;
    }
}
// Shaft class
public class shaft {
    public int idshaft;
    public string status;
    public int nbelevator;
    public int nbfloor;
    public shaft (int idshaft,string status,int nbelevator,int nbfloor)
    {
        this.idshaft=idshaft;
        this.status=status;
        this.nbelevator=nbelevator;
        //add elevators to shaft
         public List<Elevator> elevator=new List<Elevator>()
        for (int  i=0;i<nbelevator;i++ )
        { 
            this.elevators.Add(new Elevator(i,"NULL","CLOSED",false,0,0,"ACTIVATED",0,nbfloor));
            
        }
        // add outside buttons
         public List<outsidebutton> buttons=new List<outsidebutton>()
        this.outsidebuttons.Add(new outsidebutton("UP",0,"DESACTIVATED"));
        for ( i =1;i<nbfloor-1;i++)
        {
            // instantiate button outside (up or down) Parameters : direction, floor, status
            this.outsidebuttons.Add(new outsidebutton("DOWN",i,"DESACTIVETED"));
            this.outsidebuttons.Add(new outsidebutton("UP",i,"DESACTIVETED"));
        }
        this.outsidebuttons.Add(new outsidebutton("DOWN",i,"DESACTIVETED"));
    }
    public void findelevator()
    {
        this.eligiblelevator= [];
        for  (var i=0;i< this.elevators.Count;i++)
        {
            if((this.elevators[i].status=="ACTIVETED")&&(this.elevators[i].direction== outsidebutton.direction))
            {
                if((this.elevators[i].floor >= outsidebutton.currentfloor)&& (this.elevators[i].direction == "DOWN")) or ((this.elevators[i].floor <= outsidebutton.currentfloor) && (this.elevators[i].direction == "UP"))
                {
                    this.eligibleElevator.Add(this.elevators[i]);
                }
            }
        }
        if (this.eligiblelevator.Count > 1) 
            return this.findnearestelevator(outsidebutton.currentfloor,this.eligiblelevator) ;
        else if (this.eligiblelevator.Count == 1) 
            return this.eligiblelevator[0];
        else
            return this.findnearestelevator(outsidebutton.currentfloor,this.elevators);
    }
    public void findnearestelevator(string currentfloor,int elevatorslist)
    {
        var bestelevator = elevatorslist[0] ;    //lets take the first element of the array and compare it to each elevator1 of the array  
        var bestgap = Math.abs(bestelevator.currentfloor - currentfloor);
        for (var i=0;i<elevatorslist.Count;i++) 
            if (Math.abs(elevatorslist[i].currentfloor - currentfloor <bestgap))
                bestelevator = elevatorslist[i] ;
        return bestelevator ;
    }

    public void mainshaft()
    {
        this.status = "ACTIVE";
        for (var i=0;i<this.outsidebuttons.Count;i++)
        {
            if (this.outsidebuttons[i].status=="ACTIVATED")
            {
                var e = this.findelevator(this.outsidebuttons[i]); //Get the elgible elevator to handle request 
                e.addtorequestlist(this.outsidebuttons[i].currentfloor); //add the floor to handle to the requestlist of the elevator
            }
        }
        for (i=0;i<this.elevators.Count;i++)  
            this.elevators[i].mainelevator();
        
    }
}            

// Elevator_Controller class
public class elevatorcontroller
{
    public int nbshaft;
    public string status;
    public elevatorcontroller(int nbshaft,string status)
    {
        this.status = status ; //'ACTIVE' OR 'STOPPED'
         public List<shaft> nbshaft=new List<shaft>()
        for (var i=0 ;i<nbshaft;i++)
            this.shafts.Add(new shaft(i,"ACTIVATED",2,10));
    }
    public void mainelevatorcontroller()
    {
        this.status ="ACTIVATED";
        for (var i=0;i<this.shafts.Count;i++)
            this.shafts[i].mainshaft();
    }
}
console.WriteLine("********* CREATE ELEVATOR CONTROLLER  ************");
var ec = new elevatorcontroller(1,"ACTIVATED");


console.WriteLine("********* Run Main ELEVATOR CONTROLLER ************");

ec.mainelevatorcontroller();

console.WriteLine("********* SCENARIO 1 ************");
ec.shafts[0].elevators[0].elevatorfloor = 10;
ec.shafts[0].elevators[1].elevatorfloor = 3;
ec.shafts[0].outsidebuttons[6].status = "ACTIVATED"; //floor 3 to up activeted
ec.shafts[0].outsidebuttons[2].status = "ACTIVATED" ; //floor 1 to up activeted
ec.shafts[0].outsidebuttons[17].status = "ACTIVATED" ; //floor 9 to down activeted
ec.shafts[0].mainshaft() ;
        {
           
        }
		
        