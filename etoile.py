m=1
while m==1 :
c=(input('entrez une caractere:'))
print('donnez la hauteur du triangle:')
n=input()
n=int(n)
k=1
i=1
while i<n :
i=int(k/2)+1
d=' '*(n-i)+c*k
print(d)
k+=2
print('continuer 1/0')
m=input()