import React, { useEffect } from "react";
import { useState } from "react";

const clientesIniciales = [
{ id: 1, nombre: "Laura González", telefono: "644123123" },
{ id: 2, nombre: "Carlos Ruiz", telefono: "655321321" },
{ id: 3, nombre: "Carlos Ruiz", telefono: "698896983" },
{ id: 4, nombre: "Marta Pérez", telefono: "699112233" },
];

function PeluControl(){
    const [clientes, setClientes] = useState([]);   //Lista de clientes que empieza vacia
    const [cargando, setCargando] = useState(true); //Para saber si los datos se estan cargando
    const [error, setError] = useState(true); //Para simular el error de carga
    const [buscar, setbuscar] = useState("");   //Guarda texto de busqueda que empieza vacio
    const [paginaActual, setPaginaActual] = useState(1);   //Pagina actual de la paginacion, la primera es la 1
    const [porPagina, setPorPagina] = useState(2);  //Aqui ponemos cuantos resultados mostramos por pagina, pondremos 2 para probar
    const [ordenarPor, setOrdenarPor] = useState("nombre"); //Aqui ponemos el campo por el que ordenara que puede ser nombre o telefono
    const [orden, setOrden] = useState("asc");  //Ordenamos por ascendente o descendente

    //Simulamos la carga de clientes
    useEffect(() => {
        //ponemos dos segundos como si estuviera cargando la lista de clientes
        const timer = setTimeout(() => {
            setClientes(clientesIniciales);
            setCargando(false); //Desactivamos el estado de cargando
        }, 2000);
    }, [cargando])

    //Si esta cargando saldra este mensaje
    if (cargando) return <h1>Cargando clientes...</h1>;

    //Si da error saldra un mensaje de error y un boton para reintentar la conexion que hará que funcione 
    if (error == true) return(
        <div>
            <h3>Error al cargar los datos</h3>
        <button onClick={() => { 
                setError(false);
                setCargando(true);
            }}>Reintentar Conexion</button>
        </div>
    );
    

    //Aqui se crea un array que guarda solo los clientes que coincida alguno de sus campos con la busqueda
    const Filtrados = clientes.filter((e) =>
    e.nombre.toLowerCase().includes(buscar.toLowerCase()) || e.telefono.includes(buscar)
    );

    //Ordenamos el array ya filtrado
    const ordenados = Filtrados.sort((a, b) => {
        //Tomamos dinamicamente la propiedad a[nombre o telefono] que seria "ordenarPor"
        //Nececitamos dos if uno para cuando "a" es menor y cuando "a" es mayor
        /*
        El primer if es que si "a" es menor que "b", "a" va antes que "b" 
        Si orden es "asc" devolvera -1 para que "a" vaya delante pero si es "desc" devolvera 1
        para que "b" vaya delante de "a"
        */
        if (a[ordenarPor] < b[ordenarPor]){ 
            return orden === "asc" ? -1 : 1;
        }


        /*
        El segundo if es que si "a" es mayor que "b", si el orden es "asc" se devolvera 1 y hara 
        que "a" vaya detras de "b" y si es "desc" devolvera -1 y "a" ira antes.
        */
        if (a[ordenarPor] > b[ordenarPor]) {
            return orden === "asc" ? 1 : -1;
        }
        

        //Si "a" y "b" son iguales devolvera 0 para que mantengan el mismo orden que tenian
        return 0;
        });

        //creamos una constante que calculara el total de paginas que nececitamos para ello hacemos:
        /*
        dividimos los clientes que nos quedan despues de haberlos filtrado y ordenados por los clientes que nos salgan 
        por pagina que en este caso seran 2, si ese numero da decimal lo redondeara hacia arriba 
        con el metodo Math.ceil
        */
        const totalPaginas = Math.ceil(ordenados.length / porPagina);


        /*
        calculamos desde que posicion del array debemos empezar a mostrar a los clientes filtrados
        porque empieza en uno pero el array la posicion inicial es 0 
        */
        const inicio = (paginaActual - 1) * porPagina; 


        //Calcula hasta donde tenemos que cortar el array
        const fin = inicio + porPagina;


        //Devolvemos una parte del array que sera desde la posicion inicio hasta la anterior de fin
        const clientesPagina = ordenados.slice(inicio, fin);

        /*
        Aqui en este metodo se recibe la pagina deseada y se actualiza si es posible cambiar de pagina
        a traves de los botones en el return
        */
        const cambiarPagina = (nuevaPagina) => {
        if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
            setPaginaActual(nuevaPagina);
        }
        };


    return(
        <div>
            <h1>Barra de busqueda de clientes</h1>
            <input type="text" name="busqueda" onChange={(e) => {
                {/*e.target.value guarda el texto actual del input en este caso en buscar*/}
                setbuscar(e.target.value);
                setPaginaActual(1);
                }}/>
        <div>
            {/*Primer select para elegir por que campo queremos ordenar*/} 
            <select value={ordenarPor} onChange={(e) => {
                setOrdenarPor(e.target.value);
                setPaginaActual(1);
            }}>
            <option value="nombre">Nombre</option>
            <option value="telefono">Teléfono</option>
            </select>

            {/*Segundo select para elegir si queremos por orden ascendente y descendente*/}
            <select value={orden} onChange={(e) => {
                setOrden(e.target.value);
                setPaginaActual(1);
            }}>
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
            </select>
        </div>
            {/*Select para que se pueda elegir los clientes que salgan por pagina*/}
        <div>
            <label>Elige cuantos resultados quiere por pagina: </label>
            <select value={porPagina} onChange={(e) => {
                setPorPagina(parseInt(e.target.value));
                setPaginaActual(1);
            }}
            >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            </select>
      </div>
            {/*Listamos los clientes*/}
        <ul>
            {clientesPagina.map((c) => (
                <li key={c.id}>{c.nombre} <br/> {c.telefono}<br/><br/></li>
                
            ))}
        </ul>
            {/*Botones para cambiar de pagina*/}
        <div>
            <button onClick={() => cambiarPagina(paginaActual - 1)} >Atras</button>
            <button onClick={() => cambiarPagina(paginaActual + 1)}>Siguiente</button>
      </div>
        </div> 
    );
}

export default PeluControl;




