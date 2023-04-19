#Utilidades 

import os
import pandas as pd
from src import Comentario as com
import re
from unicodedata import normalize
import string

#Constantes
CARPETA_RECURSOS = os.path.abspath('Practica 1/recursos')  #ruta carpeta recursos
RUTA_PALBRAS_NEGATIVAS =  os.path.join(CARPETA_RECURSOS,"palabras-negativas.txt") #ruta palabras negativas
RUTA_PALBRAS_POSITIVAS = os.path.join(CARPETA_RECURSOS,"palabras-positivas.txt")  #ruta palabras positivas
RUTA_COMENTARIOS = os.path.join(CARPETA_RECURSOS,"opiniones.xlsx")  #Ruta de comentarios
RUTA_COMENTARIOS2 = os.path.join(CARPETA_RECURSOS,"Datos opiniones Facebook (1).xlsx")  #Ruta de comentarios

"""Cargar los diccionarios correspondientes
    Palabras Positivas , Palabras negativas
"""
def CargarDiccionario(ruta):
    #lectura de archivo txt
    try:
        archivo = open(file=ruta,mode = 'r',encoding='utf8')
        diccionario= archivo.readlines()
        archivo.close
    except:
        archivo.close
        archivo = open(file=ruta,mode = 'r')
        diccionario= archivo.readlines()
        archivo.close

    for x in range(0,len(diccionario)):
        msg=formatear(diccionario[x].replace("\n", ""))
        diccionario[x]=msg


    diccionario = set(diccionario) #Quitando palabras repetidas
    diccionario=list(diccionario)#volviendo a listas

    return(diccionario)

#Carga todos los comentarios del archivo excel
def CargarComentarios():
    datos_excel = pd.read_excel(RUTA_COMENTARIOS2)
    listaComentarios=[]
    # Lectura de los datos 
    datos = pd.DataFrame(datos_excel, columns=['Fecha de publicacion','Autor de la publicacion','Comentario','Numero de estrellas','Nombre de la aplicacion'])

    for fila in range(0,len(datos.values)) :
        comentario= com.Comentario() #Nuevo comentario

        #Depositando los datos en el objeto Comentario
        comentario.fecha=datos.values[fila,0]
        comentario.autor=datos.values[fila,1]
        txt=datos.values[fila,2].lower()
        txt=formatear(txt)
        comentario.texto=txt #Convirtiendo a minusculas
        comentario.nEstrellas=datos.values[fila,3]
        comentario.aplicacion=datos.values[fila,4]

        listaComentarios.append(comentario) #Agregando a la lista
    
    return(listaComentarios)

def buscar(arreglo, busqueda, izquierda, derecha):
    if izquierda > derecha:
        return -1
    indiceDelElementoDelMedio = (izquierda + derecha) // 2
    elementoDelMedio = arreglo[indiceDelElementoDelMedio].rstrip()
    if elementoDelMedio == busqueda:
        print(elementoDelMedio)
        return indiceDelElementoDelMedio
    if busqueda < elementoDelMedio:
        return buscar(arreglo, busqueda, izquierda, indiceDelElementoDelMedio - 1)
    else:
        return buscar(arreglo, busqueda, indiceDelElementoDelMedio + 1, derecha)

def analizar(comentario):
    positivos=CargarDiccionario(RUTA_PALBRAS_POSITIVAS)
    negativos=CargarDiccionario(RUTA_PALBRAS_NEGATIVAS)
    cuentaBuena=0
    cuentaMala = 0 
    frasesP=[]
    frasesN=[]
    comentario = comentario.split()
    for i in comentario:
        try:
            frasesP.append(positivos[positivos.index(i)])   
            cuentaBuena= cuentaBuena + 1
            
        except:
            try:
                frasesN.append(negativos[negativos.index(i)])
                cuentaMala= cuentaMala + 1
               
            except:
                continue
    
    return cuentaBuena,cuentaMala,frasesP,frasesN

def analizar2(comentario):
    positivos=CargarDiccionario(RUTA_PALBRAS_POSITIVAS)
    negativos=CargarDiccionario(RUTA_PALBRAS_NEGATIVAS)
    txt=comentario.texto
    txt = txt.split()
    for i in txt:
        try:
            comentario.frasesP.append(positivos[positivos.index(i)])
            comentario.nPalabrasPositivas= comentario.nPalabrasPositivas + 1
            
        except:
            try:
                comentario.frasesN.append(negativos[negativos.index(i)])
                comentario.nPalabrasNegativas = comentario.nPalabrasNegativas + 1
                
            except:
                continue
    comentario.Imprimir()

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

    return(cadena)

def formatear2(cadena):
    cadena = re.sub(r"[^a-zA-Z0-9]"," ",normalize( "NFD", cadena), 0, re.I)
    cadena = normalize( 'NFC', cadena)

    return(cadena)


    


