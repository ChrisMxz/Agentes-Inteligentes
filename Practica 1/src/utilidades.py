#Utilidades 

import os
import pandas as pd
from src import Comentario as com

#Constantes
CARPETA_RECURSOS = os.path.abspath('Practica 1/recursos')  #ruta carpeta recursos
RUTA_PALBRAS_NEGATIVAS =  os.path.join(CARPETA_RECURSOS,"palabras-negativas.txt") #ruta palabras negativas
RUTA_PALBRAS_POSITIVAS = os.path.join(CARPETA_RECURSOS,"palabras-positivas.txt")  #ruta palabras positivas
RUTA_COMENTARIOS = os.path.join(CARPETA_RECURSOS,"opiniones.xlsx")  #Ruta de comentarios

"""Cargar los diccionarios correspondientes
    Palabras Positivas , Palabras negativas
"""
def CargarDiccionarios():
    #lectura de archivo txt
    archivo = open(RUTA_PALBRAS_POSITIVAS)
    pp = archivo.readlines() #Palabras Positivas
    archivo.close

    archivo = open(RUTA_PALBRAS_NEGATIVAS)
    pn = archivo.readlines() #Palabras Negativas
    archivo.close
    return (pp,pn)

def CargarComentarios():
    datos_excel = pd.read_excel(RUTA_COMENTARIOS)
    listaComentarios=[]
    # Lectura de los datos 
    datos = pd.DataFrame(datos_excel, columns=['Fecha de publicacion','Autor de la publicacion','Comentario','Numero de estrellas','Nombre de la aplicacion'])

    for fila in range(0,len(datos.values)) :
        comentario= com.Comentario() #Nuevo comentario

        #Depositando los datos en el objeto Comentario
        comentario.FechaPublicacion=datos.values[fila,0]
        comentario.Autor=datos.values[fila,1]
        comentario.Comentario=datos.values[fila,2]
        comentario.NumEstrellas=datos.values[fila,3]
        comentario.Aplicacion=datos.values[fila,4]

        listaComentarios.append(comentario) #Agregando a la lista
    
    return(listaComentarios)


