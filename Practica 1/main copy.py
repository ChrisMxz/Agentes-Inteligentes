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


print("\n-------------------------------------")
input("Escribe tu comentario: ")



