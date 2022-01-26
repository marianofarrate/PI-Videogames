import React from "react";
import {Link} from 'react-router-dom';
import styles from '../Styles/Card.module.css';


export default function Card({ name, image, genre, id, rating }) {
    return (
       <div key={id} className={styles.card}>
        <Link className={styles.link} to={'/videogame/' + id} >
            <h3 className={styles.cardName}>{name}</h3>
             <h3 className={styles.rating}>Rating: {rating}⭐</h3>
            <h5 >{genre}</h5>
            <img className={styles.cardImage} src={image} alt="videogame_image" type="image/png" width="280" height="250"/>
        </Link>
        </div>
    );
}