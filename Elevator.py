# DEFINE CONSTANTS VALUES 
WeigthThreshold     = 500      #  Measure Unit : KG / Max wight that elevator can support 
MaxCapacity         =  10      #  Measure Unit : Person / Max person that elevator can contain
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
    def __init__(self,idelevator,direction,doorstatus,doorobstruction,requestlist,numberofperson,weigth,status,currentfloor,nbbutton):
        self.idelevator=idelevator
        self.direction=direction
        self.doorstatus=doorstatus
        self.doorobstruction=doorobstruction
        self.requestlist=requestList
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
   
    def move(self,floorNumber):
        if self.currentfloor==floorNumber:
            print("Elevator : " + self.idelevator + "Stoped") 
            self.status ='STOPPED'
        elif self.currentfloor < floorNumber:  
            print("Elevator : " + self.idelevator + "Moving up")
            self.status="MOVING UP"
        else:
            print("Elevator : " + self.idelevator + "Moving DOWN")
            self.status="MOVING DOWN"
        print("Elevator : " + self.idelevator + "Stoped") 
        self.status ='STOPPED'
        self.currentfloor= floorNumber 

    # openDoor : open the door of the elevator  
    def openDoor(self,)  
        OPEN DOOR               //Execute system command - Electrical 
        setDoorStatus("OPEN")
    ENDSEQUENCE 

    //**************************************************
    // closeDoor : close the door of the elevator  
    //**************************************************
     
    SEQUENCE closeDoor 
        WHILE (Weight == WeigthThreshold) OR (NumberOfPerson== MaxCapacity) OR DoorObstrcution 
            CALL openDoor
            BIP SIGNAL
        END WHILE
        CLOSE DOOR                
        setDoorStatus("CLOSED")
    ENDSEQUENCE 


    //**************************************************
    // addToRequestList : add floor to the request list 
    //**************************************************
     
    SEQUENCE addToRequestList with floorNumber 
        ADD floorNumber To requestList

    ENDSEQUENCE 

    //**************************************************
    // removeFromRequestList : remove floor from the request list 
    //**************************************************
     
    SEQUENCE removeFromRequestList with floorNumber 
         remove floorNumber from requestList
    ENDSEQUENCE 

    //**************************************************
    // sortRequestList : sort the request list 
    //**************************************************
     
    SEQUENCE sortRequestList  
        IF Elevator Direction IS GOING UP THEN
            //SORT requestList FROM Lower Levels TO Upper levels
            p = 0
            REPEAT
                permut = FALSE
                FOR i FROM 1 TO n-1-p 
                    IF requestList[i] > requestList[i+1] THEN
                        TEMP = requestList[i] 
                        requestList[i] = requestList[i+1]
                        requestList[i+1] = TEMP
                        permut = TRUE 
                    END IF
                END FOR
                p= p + 1
            UNTIL permut = TRUE

        ELSE IF Elevator Direction IS GOING DOWN THEN
            //SORT requestList FROM Upper Levels TO Lower levels

            p = 0
            REPEAT
                permut = FALSE
                FOR i FROM 1 TO n-1-p 
                    IF requestList[i] < requestList[i+1] THEN
                        TEMP = requestList[i] 
                        requestList[i] = requestList[i+1]
                        requestList[i+1] = TEMP
                        permut = TRUE 
                    END IF
                END FOR
                p= p + 1
            UNTIL permut = TRUE

        END IF
    END SEQUENCE
 
    ENDSEQUENCE 

    //**************************************************
    // mainElevator : open the door of the elevator  
    // Manage request list 
    //**************************************************
     
    SEQUENCE mainElevator 
        while requestList is not EMPTY and (not Emergency) 
            Call sortRequestList //sort should be done every time before treating first request : in cas of adding another floor while we treat the last request 
            call move with requestList[0] // requestList[0] is the first floor which should be reached it can be 10, 7,....
            call openDoor
            call removeFromRequestList with requestList[0]
        END WHILE
    ENDSEQUENCE

    //**************************************************
    // startElevator : Thez first time while the elevator start   
    // Manage request list 
    //**************************************************
     
    SEQUENCE startElevator with floorNumber
        call move with floorNumber
        call mainElevator
    ENDSEQUENCE

END DEFINE

