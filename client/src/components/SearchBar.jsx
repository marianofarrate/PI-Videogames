import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getNameVideogames } from '../actions';
import { Link } from 'react-router-dom';
import styles from '../Styles/SearchBar.module.css'

export default function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState("")

    function handleInputChange(e) {
        e.preventDefault();
        setName(e.target.value);
        
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(getNameVideogames(name))
        setName("")
    }



      return (
        <div className={styles.container}>
          <div className={styles.logo}>
           <Link className={styles.link} to='/'><h1>Game<span className={styles.logo2}>Server</span></h1></Link>
          </div>

        <div className={styles.searchbar}> 
         <input
            className={styles.input}
            type="text"
            placeholder="Search Videogames..."
            value={name}
            onChange={(e) => handleInputChange(e)}
          />
          <button className={styles.btnSearch} type="submit" onClick={(e) => handleSubmit(e)}>Search</button> 
        </div>   
        

          <div className={styles.create}>
           <Link to='/videogame'><button className={styles.btn}>Create your videogame</button></Link>
          </div>

        </div>
             )

   }