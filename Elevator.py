# DEFINE CONSTANTS VALUES 
WeigthThreshold     = 500      #  Measure Unit : KG / Max wight that elevator can support 
MaxCapacity         =  10      #  Measure Unit : Person / Max person that elevator can contain



# DEFINE GLOBAL PARAMETERS 
Emergency           =   False   #  If Emergency all elevators should be evacuated  

#class that describes button inside the elevator// 

# Elevator_Button class

class ElevatorButton:
    
    
# Properties declaration 

    def __init__(self,idbutton,idelevator,status):
        self.idbutton=idbutton
        self.idelevator=idelevator
        self.status=status
    def setstatus(self,status):
        self.status=status
    def getstatus(self):
        return self.statuts


