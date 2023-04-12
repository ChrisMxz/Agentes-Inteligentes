#Programa Principal

#Importando 
from src import Comentario as c
from src import utilidades as u

PalabrasPositivas, PalabrasNegativas = u.CargarDiccionarios()

print(len(PalabrasPositivas))
print(len(PalabrasNegativas))

comentarios = u.CargarComentarios()

for x in comentarios:

    x.Calificar()
    x.Imprimir()
    print("\n------------------------")
