#Programa Principal

#Importando 
from src import Comentario as c
from src import utilidades as u

dicPositivo = u.CargarDiccionario(u.RUTA_PALBRAS_POSITIVAS)
dicNegativo = u.CargarDiccionario(u.RUTA_PALBRAS_NEGATIVAS)

print("-------------------------------------")
print("Diccionarios cargados")
print("Palabras positivas: ",len(dicPositivo))
print("Palabras negativas: ",len(dicNegativo))
print("-------------------------------------")

comentarios = u.CargarComentarios()
print("Comentarios cargados: ",len(comentarios))
print("-------------------------------------")

while True:
    print("\n-------------------------------------")
    n=int(input("Numero de comenatrio: "))
    b,m,fp,fn= u.analizar(comentarios[n].texto)
    
    comentarios[n].nPalabrasNegativas=m #Numero de palabras negativas
    comentarios[n].nPalabrasPositivas=b #Numero de palbras positivas
    comentarios[n].frasesP=fp
    comentarios[n].frasesN=fn
    
    comentarios[n].Imprimir()




