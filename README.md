# Proyecto de Estructuras de Datos - App de Restaurante

Este proyecto presenta una aplicación desarrollada en TypeScript y React que implementa distintas estructuras de datos clásicas, aplicadas a un entorno de gestión de restaurante. Cada estructura se utiliza en un contexto funcional que refleja su uso real, permitiendo reforzar conceptos fundamentales de estructuras de datos mediante ejemplos prácticos.

## Estructuras implementadas

### Lista enlazada simple
Se emplea para gestionar pedidos en secuencia. Permite recorrer elementos en orden y añadir nuevos al final de forma eficiente.

### Lista doblemente enlazada
Permite la navegación en ambas direcciones entre elementos. Útil para moverse adelante y atrás entre elementos de menú o historial.

### Lista circular doblemente enlazada
Ideal para representar menús cíclicos donde, al llegar al final, se vuelve automáticamente al inicio sin intervención externa.

### Árbol binario
Usado para organizar y clasificar productos del menú por categorías, facilitando búsquedas y ordenamientos jerárquicos.

### Grafo
Modela el mapa del restaurante. Cada nodo representa una estación, puerta o mesa, y las conexiones permiten calcular rutas o relaciones espaciales.

### Tabla hash
Permite almacenar y acceder rápidamente a datos clave-valor, como combinaciones de ingredientes o disponibilidad por código.

### Cola (Queue)
Utilizada para gestionar pedidos en espera. Garantiza que los pedidos se atiendan en el orden en que fueron ingresados (FIFO).

## Estructura del proyecto

- src/data-structures/: Contiene las implementaciones de cada estructura.
- src/components/: Componentes funcionales que integran las estructuras con la interfaz del restaurante.
- src/context/: Manejo global del estado y funciones compartidas.

## Tecnologías utilizadas

- TypeScript
- React
- Vite
- Tailwind CSS

## Objetivo académico

Este proyecto fue desarrollado con fines educativos para aplicar y demostrar el uso de estructuras de datos fundamentales en un contexto práctico e interactivo. Cada estructura resuelve una necesidad real dentro del flujo de una aplicación de restaurante.

## Instrucciones de ejecución

1. Clona el repositorio:
