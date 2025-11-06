import React from "react";
import { useState } from "react";

const clientesIniciales = [
{ id: 1, nombre: "Laura González", telefono: "644123123" },
{ id: 2, nombre: "Carlos Ruiz", telefono: "655321321" },
{ id: 3, nombre: "Carlos Ruiz", telefono: "698896983" },
{ id: 4, nombre: "Marta Pérez", telefono: "699112233" },
];

function PeluControl(){
    const [buscar, setbuscar] = useState("");

    const Filtrados = clientesIniciales.filter((e) =>
    e.nombre.toLowerCase().includes(buscar) ||
    e.telefono.includes(buscar)
    );

    return(
        <div>
            <h1>Barra de busqueda de clientes</h1>
            <input type="text" name="busqueda" onChange={(e) => setbuscar(e.target.value)} ></input> 
        
        <ul>
            {Filtrados.map((c) => (
                <li key={c.id}>{c.nombre} <br/> {c.telefono}<br/><br/></li>
                
            ))}
        </ul>
        </div> 
    );
}

export default PeluControl;




