import React from "react";
import styles from '../Styles/Paginado.module.css';

export default function Paginado ({videogamesPerPage, allVideogames, paginado}){
    const pageNumbers = []
      //aca redondeo mis videogames sobre los que tengo por pagina
    for(let i=0; i<=Math.ceil(allVideogames/videogamesPerPage); i++){
        pageNumbers.push(i+1)
    }

    

    return (
        <div className={styles.container}>
            
                {pageNumbers && pageNumbers.map(number => ( 
                    
                        <button key={number} className={styles.btn} onClick={() => paginado(number)}>{number}</button>
                  
                ))}
           
        </div>
    )
}