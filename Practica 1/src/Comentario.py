# clase Comentario

class Comentario:
    #Atributos
    fecha="12/04/2023"
    autor=""
    texto=""
    nEstrellas=""
    aplicacion=""
    tipo="" #Bueno o mal texto
    nPalabrasNegativas=0 #Numero de palabras negativas
    nPalabrasPositivas=0 #Numero de palbras positivas
    frasesP=[]
    frasesN=[]

    
    
    def __init__(self):
        self.tipo="Sin revisar"

    def Imprimir(self):
        msg="Fecha de publicacion : {0} \nAplicación: {1}\nNumero de estrellas: {2}\ntexto:\n{3}".format(self.fecha,self.aplicacion,self.nEstrellas,self.texto) #Formateando los valores
        print(msg)
        print("Numero de palabras positivas: ",self.nPalabrasPositivas)
        print("Palabras positivos: ",self.frasesP)
        print("Numero de palabras negativas: ",self.nPalabrasNegativas)
        print("Palabras negativos: ",self.frasesN)

   
    
    