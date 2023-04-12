# clase comentario

class Comentario:
    #Atributos
    FechaPublicacion="12/04/2023"
    Autor=""
    Comentario= ""
    NumEstrellas=""
    Aplicacion=""
    Tipo="" #Bueno o mal comentario
    NPNegativas=0 #Numero de palabras negativas
    NPPositivas=0 #Numero de palbras positivas

    
    
    def __init__(self):
        self.Tipo="Sin revisar"

    def Imprimir(self):
        msg="Fecha de publicacion : {0} \nAplicación: {1}\nNumero de estrellas: {2}\nComentario:\n{3}".format(self.FechaPublicacion,self.Aplicacion,self.NumEstrellas,self.Comentario) #Formateando los valores
        print(msg)

    def Calificar(self):
        print("Se ha calificado")
    