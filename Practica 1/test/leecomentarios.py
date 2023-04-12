# Import pandas
import pandas as pd
import os

#Constantes
CARPETA_RECURSOS = os.path.abspath('Practica 1/recursos')
RUTA_COMENTARIOS = os.path.join(CARPETA_RECURSOS,"opiniones.xlsx")  #Ruta de comentarios

print("ruta comentarios",RUTA_COMENTARIOS)

# Load the xlsx file
excel_data = pd.read_excel(RUTA_COMENTARIOS)

# Read the values of the file in the dataframe
data = pd.DataFrame(excel_data, columns=['Fecha de publicacion','Autor de la publicacion','Comentario','Numero de estrellas','Nombre de la aplicacion'])
# Print the content
#print("Los comentarios son:\n", data)

print("---------------------------------------------")

for n in range(0,len(data.values)) :
    print("\n-----------------------------------------")
    for m in range(0,len(data.columns)):
        print(data.columns[m]," : ",data.values[n,m])
        palabras=str(data.values[n,m])
        palabras=  palabras.islower()
        print(palabras)
        
    


#print(data.columns[2], " : ",data.values[3,2])
    
