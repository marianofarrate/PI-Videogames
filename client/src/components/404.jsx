import React from 'react';
import {Link} from 'react-router-dom';
import pageNotFound from '../media/pageNotFound.png';
import styles from '../Styles/NotFound.module.css';


export default function NotFound(){
    return (
        <div className={styles.container} >
            <img src={pageNotFound} className={styles.image} type="png" alt="image404" />
            <h2 className={styles.text}>Sorry, Page Not Found</h2>
            <Link to='/home'><button className={styles.btn}>Previous Stage</button></Link>

        </div>
    )
}