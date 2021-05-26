// archivo de google docs original : https://docs.google.com/document/d/1NtpaNDxD6KHn7PYRUwNpE46LWRMBlCwDFKODrPHmYRo/edit
// video de quantum fracture : https://www.youtube.com/watch?v=DQ5qqHukkAc

/*
 
  ██████╗ ██╗   ██╗ █████╗ ███╗   ██╗████████╗██╗   ██╗███╗   ███╗    ███████╗██████╗  █████╗  ██████╗████████╗██╗   ██╗██████╗ ███████╗
 ██╔═══██╗██║   ██║██╔══██╗████╗  ██║╚══██╔══╝██║   ██║████╗ ████║    ██╔════╝██╔══██╗██╔══██╗██╔════╝╚══██╔══╝██║   ██║██╔══██╗██╔════╝
 ██║   ██║██║   ██║███████║██╔██╗ ██║   ██║   ██║   ██║██╔████╔██║    █████╗  ██████╔╝███████║██║        ██║   ██║   ██║██████╔╝█████╗
 ██║▄▄ ██║██║   ██║██╔══██║██║╚██╗██║   ██║   ██║   ██║██║╚██╔╝██║    ██╔══╝  ██╔══██╗██╔══██║██║        ██║   ██║   ██║██╔══██╗██╔══╝
 ╚██████╔╝╚██████╔╝██║  ██║██║ ╚████║   ██║   ╚██████╔╝██║ ╚═╝ ██║    ██║     ██║  ██║██║  ██║╚██████╗   ██║   ╚██████╔╝██║  ██║███████╗
  ╚══▀▀═╝  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═══╝   ╚═╝    ╚═════╝ ╚═╝     ╚═╝    ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝╚══════╝
 
                                                            PRESENTA
                   _____________________________________________________________________________________________
                                 _                                  _              _
                                ' )   | | _ _    _| _       _  _   (  _  _. _    /| ) _  _.| _  _ \
                                ._).  |_|_\(_)  (_|(/_  |_|| |(_|  _)(/_| |(/_  | |_)(_|_\||(/_(_| |
                                                                                 \                /
 
 Qué pasa chavales, muy buenas a todos, aquí Crespo comentando (xD en serio, willy pls). Con este código, escrito en C++, vamos a hacer
 que este ordenador calcule pi utilizando el método favorito de todo el mundo: el uso de Series... No particularmente la serie que vamos
 a usar, pero cogéis la idea.
 Si quieres saber las ideas básicas de este algoritmo o no sabes como coj***s has llegado aquí y qué es este código
 hablandome así wtf, te recomiendo pasarte por YouTube y verte este vídeo
 -->  https://youtu.be/DQ5qqHukkAc  <--.
 
 Si no ves un montón de símbolos raros, te recomiendo que estires el tamaño de tu ventana, te llevarás una sorpresa --->
 
 Vamos allá: como habéis visto, vamos a explotar esto:
 
                                        _____
                                        \       1      pi^2
                                        /     ----- = ------
                                       /_____  n^2      6
                                          n
 
 Si no sabes lo que quiere decir el primer símbolo: es un sumatorio. Quiere decir que sumamos todos los términos que contengan una n,
 empezando por el 1 y (en nuestro caso) no terminando nunca. Las series son sumas infinitas de términos... pero si cogemos bastantes 
 al menos nos aproximaremos a pi.
 
 Por cierto, si quieres saber como Euler obtuvo este resultado, puedes consulta una demostración aquí
    ---->  http://gaussianos.com/el-problema-de-basilea/
 Puede que necesites saber algo de Análisis para entenderlo... :P
 
 Si te has paseado por los otros códigos (Polígonos y Montecarlo) te habrás dado cuenta que tales programas aparte de dar un valor
 apróximado de pi, dan también el error que cometemos; dan el rango en el que el valor real de pi está. Bien, en este caso no he 
 sabido programar unas cotas. Cuando se ejecuta la suma infinita se llega al valor de pi, pero si no sumas infinitos términos siempre
 estarás POR DEBAJO de tal cifra. Hubiera sido genial encontrar una cota superior que también convergiera a pi para N muy grande, pero
 no la he encontrado. Si eres un matemático muy listo y sabes como hacerlo, hazmelo saber; no tanto por corregir el código, si no por
 curiosidad (--> qfracture@gmail.com)
 
 Así he nombrado cada variable:
 
   *  N   : el número de términos que vamos a sumar.
   *  S   : es la suma de los N términos.
   *  pi  : valor de pi obtenido multiplicando la suma por 6 y haciendo la raiz cuadrada (tal y como indica la serie).
 
 */


#include <iostream>  // Cargo librerías (colecciones de funciones ya hechas que hacen cositas): "iostream" me permite sacar texto
#include <cmath>     // y números por el terminal, para que puedas ver el valor de pi, y "cmath" es una colección de funciones
#include <fstream>   // matemáticas que necesito, como elevar al cuadrado y hacer la raiz cuadrada.

using namespace std;  // A efectos práticos, esto es para no tener que poner "std" todo el rato.

int main(){           // ¡Comenzamos!
    
    // Imprimimos en el terminal... la bienvenida ;)
    
    cout<<endl<<endl;
    cout<<"                       ╔═╗ ┬ ┬┌─┐┌┐┌┌┬┐┬ ┬┌┬┐  ╔═╗┬─┐┌─┐┌─┐┌┬┐┬ ┬┬─┐┌─┐"<<endl;
    cout<<"                       ║═╬╗│ │├─┤│││ │ │ ││││  ╠╣ ├┬┘├─┤│   │ │ │├┬┘├┤"<<endl;
    cout<<"                       ╚═╝╚└─┘┴ ┴┘└┘ ┴ └─┘┴ ┴  ╚  ┴└─┴ ┴└─┘ ┴ └─┘┴└─└─┘"<<endl;
    cout<<"            ______________________________________________________________________     "<<endl<<endl;
    cout<<"                                          PRESENTA...                                  "<<endl;
    cout<<endl;
    cout<<"                  ╔═╗┌─┐┬  ┌─┐┬ ┬┬  ┌─┐  ┌┬┐┌─┐  ╔═╗┬       ╔═╗┌─┐┬─┐┬┌─┐┌─┐"<<endl;
    cout<<"                  ║  ├─┤│  │  │ ││  │ │   ││├┤   ╠═╝│  ───  ╚═╗├┤ ├┬┘│├┤ └─┐"<<endl;
    cout<<"                  ╚═╝┴ ┴┴─┘└─┘└─┘┴─┘└─┘  ─┴┘└─┘  ╩  ┴       ╚═╝└─┘┴└─┴└─┘└─┘"<<endl;
    
    cout<<endl<<"                  Sumas infinitas... ¡Al alcance de tu propio dispositivo!"<<endl<<endl;
    
    cout<<"_____________________________________________________________________________________________"<<endl<<endl;
    cout<<"                                         ADVERTENCIA                                     "<<endl;
    cout<<"Si está usando este código en un compilador online, puede ser que utilizar un número excesivo"<<endl;
    cout<<" de términos haga que el cálculo necesite tanto tiempo para ser computado que el compilador lo"<<endl;
    cout<<"               aborte automáticamente. En ese caso, pruebe un número menor."<<endl;
    
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    double N = 12345;         // NÚMERO DE TÉRMINOS A SUMAR. ¡CAMBIAD ESTO!
    
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    // Se introduce tal número por terminal:
    
    cout<<endl<<"  ╔═════════════════════════════════════════════════════════════════════════════════════════════╗";
    cout<<endl<<"  ║                      Número de términos que quierer sumar : "<<N;
    cout<<endl<<"  ╚═════════════════════════════════════════════════════════════════════════════════════════════╝";
    
    double S=0;  // Defino la suma total de los términos y la inicializo a 0.

    for (int i=0; i<N; i++) {  // Bucle, recorre todo los naturales hasta N.
        S=S+ 1/pow(i+1,2);     // En cada vuelta se añade a S el siguiente término.
    }
    
    double pi=sqrt(6*S);       // Se calcula pi.
    
    
    cout.precision(15); // Estos son el número de digitos que quiero que se expulsen por pantalla. Puedes aumentarlo si quieres.
    
    // Sacamos los resultados por pantalla para disfrute del usuario:
    
    cout<<endl<<"  ╔════════════════════════════════════════════════════════════════════════════════════════╗";
    cout<<endl<<"  ║                            "<<"Pi = "<<pi;
    cout<<endl<<"  ║";
    cout<<endl<<"  ║                "<<"El valor real de pi se encuentra algo más arriba";
    cout<<endl<<"  ╚════════════════════════════════════════════════════════════════════════════════════════╝"<<endl<<endl;
    
    
    return 0;  // Y hemos terminado. Cerramos el chiringuito.

}