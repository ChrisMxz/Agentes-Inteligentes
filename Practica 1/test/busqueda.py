import re
from unicodedata import normalize
import string

def formatear(cadena):
    # -> NFD y eliminar diacríticos
    cadena = re.sub(
            r"([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+", r"\1", 
            normalize( "NFD", cadena), 0, re.I
        )
    cadena = re.sub(r'[.,"\'-?¿:¡!;{}()_]', '', cadena)
    caracters = '[%s]+' % re.escape(string.punctuation+string.digits)
    cadena = re.sub(caracters, '', cadena)
    # -> NFC
    cadena = normalize( 'NFC', cadena)
    cadena= cadena.strip()
    return(cadena)

lista = ['cereza', 'fresa', 'limón', 'manzana!  \n', 'naranja\n', 'plátano?', 'tomate','fresa'] 
medio = int(len(lista)/2)

print(lista)
for x in range(0,len(lista)):
    msg=formatear(lista[x])
    lista[x]=msg
    
print (lista)
elemento_de_interes = 'tomate'

def buscar(arreglo, busqueda, izquierda, derecha):
    if izquierda > derecha:
        return -1
    indiceDelElementoDelMedio = (izquierda + derecha) // 2
    elementoDelMedio = arreglo[indiceDelElementoDelMedio].rstrip()
    if elementoDelMedio == busqueda:
        return indiceDelElementoDelMedio
    if busqueda < elementoDelMedio:
        return buscar(arreglo, busqueda, izquierda, indiceDelElementoDelMedio - 1)
    else:
        return buscar(arreglo, busqueda, indiceDelElementoDelMedio + 1, derecha)
    
print(buscar(lista, elemento_de_interes, 0,len(lista)-1))
print(lista[buscar(lista, elemento_de_interes, 0,len(lista)-1)])