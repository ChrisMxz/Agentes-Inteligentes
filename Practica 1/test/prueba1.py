import os
#Constantes
CARPETA_RECURSOS = os.path.abspath('Practica 1/recursos')

#Rutas de archivos
RUTA_PALBRAS_NEGATIVAS =  os.path.join(CARPETA_RECURSOS,"palabras-negativas.txt")
RUTA_PALBRAS_POSITIVAS = os.path.join(CARPETA_RECURSOS,"palabras-positivas.txt")  #ruta palabras positivas
RUTA_COMENTARIOS = os.path.join(CARPETA_RECURSOS,"opiniones.xlsx")  #Ruta de comentarios

#lectura de archivos txt
archivo = open(RUTA_PALBRAS_POSITIVAS)
PalabrasPositivas = archivo.readlines()
archivo.close

archivo = open(RUTA_PALBRAS_NEGATIVAS)
PalabrasNegativas = archivo.readlines()
archivo.close
print("Hay ",len(PalabrasPositivas), " palabras positivas")
print("Hay ",len(PalabrasNegativas), " palabras negativas")

#Quitando frases repetidas

PalabrasPositivas=set(PalabrasPositivas)
PalabrasNegativas=set(PalabrasNegativas)

print(len(PalabrasPositivas))
print(len(PalabrasNegativas))

#--------quitando saltos de linea------------
print("-----Quitando saltos de linea ------------")

for x in PalabrasNegativas:
    x.replace("\n","")

for x in PalabrasPositivas:
    x.replace("\n","")
    
negativos=list(PalabrasNegativas)
positivos=list(PalabrasPositivas)

#------Buscando palabra----------

for x in negativos:
    if x=="malo\n":
        print("true")
        
for x in positivos:
    if x=="mejor de lo esperado\n":
        print("true")
    

    
