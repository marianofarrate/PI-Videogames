import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {Link} from 'react-router-dom';
import { getVideogames } from '../actions';
import styles from '../Styles/LandingPage.module.css';



export default function LandingPage(){
   const dispatch = useDispatch();
   useEffect(() => dispatch(getVideogames()), [dispatch])

    return (
      <div >
        <div className={styles.containerLanding}>
        
        

          <div>
            <h1 className={styles.title}>Game<span className={styles.span}>Server</span></h1>
          </div>
          <div>
            <Link to ='/home'>
                <button className={styles.startBtn}>Start Game</button>
            </Link>
          </div>
        </div>
      </div>
    )
}