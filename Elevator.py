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
            self.buttons.append(ElevatorButton(i,self.idelevator,"DESACTIVATED"))


# Methods declaration
# move : move the elevator to reach specific floor
   
    def move(self,floornumber):
        if self.currentfloor==floornumber:
            print( strElevator   + str(self.idelevator) + " STOPPED ") 
            self.status ='STOPPED'
        elif self.currentfloor < floornumber:  
            print(strElevator  + str(self.idelevator) + " MOVING UP ")
            self.status="MOVING UP"
        else:
            print(strElevator  + str(self.idelevator) + " MOVING DOWN ")
            self.status="MOVING DOWN"
        print(strElevator  + str(self.idelevator) + " STOPPED ") 
        self.status ='STOPPED'
        self.currentfloor= floornumber 

    # openDoor : open the door of the elevator  
    def opendoor(self):
        print(strElevator  + str(self.idelevator) + " OPEN DOOR ")   
        self.setdoorstatus="OPEN"
     

    
    # closeDoor : close the door of the elevator   
    def closedoor(self): 
        while (self.weight >= WeigthThreshold) or (self.numberofperson>= MaxCapacity) or (self.doorobstruction):
            self.opendoor()
            print(strElevator + str(self.idelevator) + " BIP SIGNAL ") 
        print(strElevator + str(self.idelevator) + " CLOSE DOOR ")               
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
            
    def __str__(self):
        res = " id : " + str(self.idelevator) + " \n direction : " +  self.direction + " \n requestlist : " + str(self.requestlist)  
        return res
    
    
    # mainElevator : open the door of the elevator  
    # Manage request list 
    
     
    def mainelevator(self): 
        while  (not Emergency) and (len(self.requestlist)!=0) :
            for i in range (self.nbbutton):
                if self.buttons[i].status=="ACTIVATED" and i not in self.requestlist:
                    self.requestlist.append (i)
            
            self.sortrequestlist()     #sort should be done every time before treating first request : in cas of adding another floor while we treat the last request 
            print(self)
            self.move(self.requestlist[0])    # requestlist[0] is the first floor which should be reached it can be 10, 7,....
            self.opendoor()
            self.removefromrequestlist(self.requestlist[0])
            print(str(self))
       
    # startElevator : The first time while the elevator start   
    # Manage request list 
     
    def startelevator(self,floornumber):
        self. move(floornumber) 
        self. mainelevator()

# outsidebutton class
class outsidebutton :
    #Properties declaration
    def __init__(self,direction,currentfloor,status):
        self.direction = direction
        self.currentfloor = currentfloor
        self.status = status
   # Getter and Setter
    def setstatus(self,status):
        self.status=status
    def getstatus(self):
        return self.statuts
# Shaft class
class shaft :
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





#controller.RequestFloor(elevator, 6,1)
#elevator = controller.RequestElevator(3, "up",1)
#controller.RequestFloor(elevator, 5,1)
#elevator = controller.RequestElevator(9, "down",1)
#controller.RequestFloor(elevator, 2,1)
#print("==============================")
#print("End Senario 2")
#print("==============================")

#// // //------------- WORKINGGGG - -------------//// //

#controller.column.elevatorList[0].elevator_currentDirection = "down"
#controller.column.elevatorList[1].elevator_floor = 3
#controller.column.elevatorList[1].status = "moving"
#controller.column.elevatorList[1].elevator_currentDirection = "down"

#print(controller.column.elevatorList)
#elevator = controller.RequestElevator(10, "down",1)
#controller.RequestFloor(elevator, 3,1)

#elevator = controller.RequestElevator(3, "down",1)
#controller.RequestFloor(elevator, 2,1)
#print("==============================")
#print("End Senario 3")
#print("==============================")
