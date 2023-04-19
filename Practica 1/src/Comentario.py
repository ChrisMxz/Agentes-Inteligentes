# clase Comentario
from src import utilidades as u

class Comentario:
    #Atributos
    fecha="12/04/2023"
    autor=""
    texto=""
    nEstrellas=""
    aplicacion=""
    tipo="" #Bueno o mal texto
    npalabras=0 #Palabras
    nnegativas=0 #Numero de palabras negativas
    npositivas=0 #Numero de palbras positivas
    nSin=0 #Palabras sin identificar
    frasesP=[]
    frasesN=[]
    fraseSin=[]

    def analizar(self,POSITIVOS,NEGATIVOS):
        txt = self.texto.split()
        for i in txt:
            try:
                self.frasesP.append(POSITIVOS[POSITIVOS.index(i)])
                self.npositivas+= 1
                
            except:
                try:
                    self.frasesN.append(NEGATIVOS[NEGATIVOS.index(i)])
                    self.nnegativas += 1
                    
                except:
                    #No se identifico
                    self.nSin+=1 #Aumentamos
                    self.fraseSin.append(i) #agregamos la palabra no identificada
            
            self.npalabras+=1 #Contando las palabras
        

        #verificando tipo de comentario
        if self.npositivas>self.nnegativas:
            self.tipo="Positivo"
        if self.npositivas<self.nnegativas:
            self.tipo="Negativo"
        if self.npositivas==self.nnegativas:
            self.tipo="Neutro"

    def __init__(self):
        self.tipo="Sin revisar"

    def Imprimir(self):
        print("\n*********************************************************")
        msg="Fecha de publicacion : {0} \nAplicación: {1}\nNumero de estrellas: {2}\ntexto:\n{3}".format(self.fecha,self.aplicacion,self.nEstrellas,self.texto) #Formateando los valores
        print(msg)
        print("\n--------------------Estadisticas-----------------------")
        print("Numero de palabras Total: ",self.npalabras)
        print("Numero de palabras positivas: ",self.npositivas)
        print("Palabras positivos: ",self.frasesP)
        print("Numero de palabras negativas: ",self.nnegativas)
        print("Palabras negativos: ",self.frasesN)
        print("Numero de palabras sin identificar: ",self.nSin)
        print("Tipo de comentario: ",self.tipo)
        #print("Palabras sin identificar: ",self.fraseSin)
        print("*********************************************************\n")
   
    
    