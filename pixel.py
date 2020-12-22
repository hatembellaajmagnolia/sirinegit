class Pixel:
    def __init__(self,i,j,t):
        self.posi = i
        self.posj = j
        self.ton = t
    def __str__(self):
        return( "i = " + str(self.posi) + " j = " + str(self.posj) +"t = "+ str(self.ton))

class Region:
    def __init__(self,label):
        self.label = lab
        self.dict_pixel={}
    def __len__(self):
        res=0
        for i in self.dict_pixel:
            res += len(self.dict_pixel[i])
        return res
    def ajouter_pixel(self,px):
        self.dict_pixel[px.ton]=[(px.posi,px.posj)]

P1 = Pixel(20,54,200)
print (P1)
R = Region("R1")
print(len(R))


