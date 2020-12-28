# DEFINE CONSTANTS VALUES 
WeigthThreshold     = 500      #  Measure Unit : KG / Max wight that elevator can support 
MaxCapacity         =  10      #  Measure Unit : Person / Max person that elevator can contain
strElevator         = "Elevator: "  #constant for print
# DEFINE GLOBAL PARAMETERS 
Emergency           =   False   #  If Emergency all elevators should be evacuated  

##### Class that describes button inside the elevator ####

# Elevator_Button class

class ElevatorButton:
# Properties declaration in constructor
    def __init__(self,idbutton,idelevator,status):
        self.idbutton=idbutton
        self.idelevator=idelevator
        self.status=status
# Getter and Setter
    def setstatus(self,status):
        self.status=status
    def getstatus(self):
        return self.statuts


# Elevator class
class Elevator :
# Properties declaration in constructor
    def __init__(self,idelevator,direction,doorstatus,doorobstruction,numberofperson,weigth,status,currentfloor,nbbutton):
        self.idelevator=idelevator
        self.direction=direction
        self.doorstatus=doorstatus
        self.doorobstruction=doorobstruction
        self.requestlist=[]
        self.numberofperson=numberofperson
        self.weight=weigth
        self.status=status
        self.currentfloor=currentfloor
        self.nbbutton=nbbutton
        self.buttons=[]
        for i in range (nbbutton):
            self.buttons[i]= ElevatorButton(i,self.idelevator,"desactivate")


# Methods declaration
# move : move the elevator to reach specific floor
   
    def move(self,floornumber):
        if self.currentfloor==floornumber:
            print( strElevator   + self.idelevator + " STOPPED ") 
            self.status ='STOPPED'
        elif self.currentfloor < floornumber:  
            print(strElevator  + self.idelevator + " MOVING UP ")
            self.status="MOVING UP"
        else:
            print(strElevator  + self.idelevator + " MOVING DOWN ")
            self.status="MOVING DOWN"
        print(strElevator  + self.idelevator + " STOPPED ") 
        self.status ='STOPPED'
        self.currentfloor= floornumber 

    # openDoor : open the door of the elevator  
    def opendoor(self):
        print(strElevator  + self.idelevator + " OPEN DOOR ")   
        self.setdoorstatus="OPEN"
     

    
    # closeDoor : close the door of the elevator   
    def closedoor(self): 
        while (self.weight >= WeigthThreshold) or (self.numberofperson>= MaxCapacity) or (self.doorobstruction):
            self.opendoor()
            print(strElevator + self.idelevator + " BIP SIGNAL ") 
        print(strElevator + self.idelevator + " CLOSE DOOR ")               
        self.doorstatus="CLOSED"
    


  
    #addToRequestList : add floor to the request list 
    def addtorequestlist (self,nbfloor):
        if nbfloor  not in self.requestlist:
            self.requestlist.append(nbfloor)
    
    # removeFromRequestList : remove floor from the request list 
    
    def removefromrequestlist (self,nbfloor): 
        self.requestlist.remove(nbfloor)
    
    # sortRequestList : sort the request list 
    
    def  sortrequestlist(self):  
        self.requestlist.sort()
        if self.direction =="DOWN":
            self.requestlist.reverse()
    
    # mainElevator : open the door of the elevator  
    # Manage request list 
    
     
    def mainelevator(self): 
        while  not Emergency:
            for i in range (self.nbbutton):
                if self.buttons[i].status=="activeted" and i not in self.requestlist:
                    self.requestlist.append (i)
          
            self.sortrequestlist()     #sort should be done every time before treating first request : in cas of adding another floor while we treat the last request 
            self.move(self.requestlist[0])    # requestlist[0] is the first floor which should be reached it can be 10, 7,....
            self.opendoor()
            self.removefromrequestlist(self.requestlist[0])
       
    # startElevator : The first time while the elevator start   
    # Manage request list 
     
    def startelevator(self,floornumber):
        self. move(floornumber) 
        self. mainelevator()
    

