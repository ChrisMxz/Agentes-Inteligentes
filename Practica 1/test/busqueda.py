
lista = ['cereza', 'fresa', 'limón', 'manzana  \n', 'naranja', 'plátano', 'tomate'] 
medio = int(len(lista)/2)
elemento_de_interes = 'manzana'

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