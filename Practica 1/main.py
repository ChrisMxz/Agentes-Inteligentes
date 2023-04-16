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


for x in comentarios:
    print("\n-------------------------------------")
    txt=x.texto
    x.nPalabrasPositivas, frasesP = u.analizar(dicPositivo,txt)
    x.nPalabrasNegativas, frasesN = u.analizar(dicNegativo,txt)
    x.Imprimir()
    print("frases Positivas:",frasesP)
    print("frases Negativas:",frasesN)

