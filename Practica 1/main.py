#Programa Principal
import os

#Importando 
from src import Comentario as c
from src import utilidades as u

#Cargando los datos necesarios
POSITIVOS = u.CargarDiccionario(u.RUTA_PALBRAS_POSITIVAS)
NEGATIVOS = u.CargarDiccionario(u.RUTA_PALBRAS_NEGATIVAS)
COMENTARIOS = u.CargarComentarios(u.RUTA_COMENTARIOS)


def individual():
    bandera =True
    nComentarios=len(COMENTARIOS)
    opc=""
    while bandera:
        os.system ("cls") 
        print("\n---Analizando individual---")
        print("cantidad de comentarios: ",nComentarios)
        try:
            opc=input("\nIngresa el numero del comentario -> ")
            n=int(opc)
            if n<nComentarios and n>-1:
                COMENTARIOS[n].analizar(POSITIVOS,NEGATIVOS) #Analiza
                COMENTARIOS[n].Imprimir()
                datos=[COMENTARIOS[n].npositivas,COMENTARIOS[n].nnegativas]
                u.graficar(datos)
            else:
                print("Escribe un indice valido(0-{0})".format(nComentarios-1))
        except:
            print("Vuelve a intentarlo")
        
        #Preguntando si desea continuar
        opc=input("\n¿Desea continuar? s/n -> ")
        if opc=="n":
            bandera=False
def todos():
    #Variables para estadisticas
    palabras=0
    negativas=0
    positivas=0
    sinIden=0 #sin identificar
    porcentajeMalas=0
    porcentajebuenas=0
    #recorrido de cada comentario
    for x in COMENTARIOS:
        x.analizar(POSITIVOS,NEGATIVOS)
        palabras=palabras+x.npalabras #Acomulando palabras totales
        negativas=negativas+x.nnegativas
        positivas=positivas+x.npositivas
        sinIden=sinIden+x.nSin


    #Informacion estadistica
    print("\n-------------------------------------")
    print("Se analizaron :",len(COMENTARIOS)," cometarios")
    print("Estadistica global")
    msg="Palabras: {0}\nPositivas:{1}\nNegativas: {2}\nSin identificar: {3}".format(palabras,positivas,negativas,sinIden)
    print(msg)
    datos=[positivas,negativas]
    u.graficar(datos)
    print("-------------------------------------\n")
   

if __name__=='__main__':
    print("-------------------------------------")
    print("Palabras positivas: ",len(POSITIVOS))
    print("Palabras negativas: ",len(NEGATIVOS))
    print("Comentarios cargados (Archivo 1): ",len(COMENTARIOS))
    print("-------------------------------------\n")
    bandera=True
    opcion=""
    #Menu
    while bandera:
        os.system ("cls") 
        menu="**** Analazador de comentarios ****\n"
        print("[Comentarios cargados: ",len(COMENTARIOS),"]")
        menu+="[1] Calificar individualmente\n[2] Calificar de manera global"
        menu+="\n[3] Cargar Archivo 1 comentarios (4)\n[4] Cargar Archivo 2 comentarios (500) \n[s] Salir"
        print(menu)
        opcion=input("-> ")

        if opcion=="1":
            individual()
        elif opcion=="2":
            os.system ("cls") 
            todos()
        elif opcion=="3":
            COMENTARIOS = u.CargarComentarios(u.RUTA_COMENTARIOS)
        elif opcion=="4":
            COMENTARIOS = u.CargarComentarios(u.RUTA_COMENTARIOS2)
        elif opcion=="s":
            bandera=False
        else:
             print("Ingresa una opcion valida")



