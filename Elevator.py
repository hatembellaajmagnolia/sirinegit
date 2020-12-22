class Elevator_button(object):
    def __init__(self,idbutton,idelevator,status):
        self.idbutton = idbutton
        self.idelevator = idelevator
        self.status = status
    def setStatus(self,status):
        self.status = status
    def getStatus(self):
        return self.status
    def __str__(self):
        return " ID = " + str(self.idbutton) + "\n ID ELEVATOR : " + str(self.idelevator) + "\n Status : " + str(self.status)


eb = Elevator_button(10,2,"deactivate")
print(eb)

