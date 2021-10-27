__autor__ = "Tlacaelel Icpac"
__email__= "tlacaelel.icpac@gmail.com"

import matplotlib.pyplot as plt
import numpy as np
from matplotlib.animation import FuncAnimation

vy = (2**2 - (1)**2)**(1/2)
vertices = [[0,0], [2, 0], [1, vy]]

azar = np.random.randint(0, 3, 2500)

fig = plt.figure()
puntos, = plt.plot([], [], 'o', ms=2)
#Dibuja los vértices del triángulo
plt.plot([0, 2, 1], [0, 0, vy], 'o', color='red')

#punto semilla
x = [-2.9, -1.9]
xdata, ydata = [], []
plt.plot(x[0], x[1], 'o', color='black', ms=2)

"""
for i in range(1500):
    plt.plot(x[0], x[1], 'o', color='black', ms=2)
    x[0] = (vertices[azar[i]][0] + x[0]) / 2
    x[1] = (vertices[azar[i]][1] + x[1]) / 2"""
    
def animacion(i):
    xdata.append(x[0])
    ydata.append(x[1])
    puntos.set_data(xdata, ydata)
    x[0] = (vertices[azar[i]][0] + x[0]) / 2
    x[1] = (vertices[azar[i]][1] + x[1]) / 2
    return puntos

    
ani = FuncAnimation(fig, animacion, frames=2500, interval=10)
plt.show()