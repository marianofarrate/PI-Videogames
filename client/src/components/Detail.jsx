import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetails } from '../actions/index';
import { useEffect } from 'react';
import { resetDetail } from '../actions/index';
import loading from '../media/loading.png';
import imageNotFound from '../media/imageNotFound.png';
import { useParams } from 'react-router';
import styles from '../Styles/Detail.module.css';





export default function Detail() {

    
    const dispatch = useDispatch();

    const { id } = useParams();
  
    useEffect(() => {
      dispatch(getDetails(id));
    }, [id, dispatch]);

    

    const myVideogame = useSelector((state) => state.detail)
    console.log(myVideogame)

    return (
        <div  className={styles.general}>
            <div  className={styles.navbar}>
                 <Link to='/home' className={styles.link}><h1 className={styles.logo}>Game<span className={styles.logo2}>Server</span></h1></Link>
                 <Link to='/home'><button  className={styles.btn}>Previous Stage</button></Link>
            </div>
       
             {
                myVideogame.length > 0 ?

                    <div key={myVideogame[0].id} className={styles.container} >
                         

                         <div className={styles.fatherLeft}>
                            <img className={styles.img} src={myVideogame[0].img ? myVideogame[0].img : imageNotFound/* myVideogame[0].image */} alt="" width="500px" height="700px" />
                        </div>


                        <div className={styles.fatherRight}>
                            <div className={styles.son1}>
                                <h2 className={styles.title}>{myVideogame[0].name}</h2>
                            </div>

                        

                        <div className={styles.son3}>
                            <div className={styles.siblings}>
                                <h3 className={styles.insideSiblingsTitle}>Genres:</h3>
                                <div className={styles.insideSiblingsText}>{myVideogame[0].genres ? myVideogame[0].genres.map((g, index) => <p key={index}>{g}</p>) : 'No Genres Available'}
                            </div>
                            </div>

                            

                            <div className={styles.siblings}>
                                <h3 className={styles.insideSiblingsTitle}>Platforms:</h3>
                                <div className={styles.insideSiblingsText2}>{myVideogame[0].platforms ? myVideogame[0].platforms.map((g, index) => <p key={index}>{g}</p>)  : 'No Platforms available'}</div>
                            </div>
                        </div>
                             <div className={styles.son2}>
                                <div className={styles.siblings}>
                                <h3 className={styles.insideSiblingsTitle}>Rating: </h3>
                                <p className={styles.insideSiblingsText}>{myVideogame[0].rating}</p>
                             </div>
                             <div className={styles.siblings}>
                                <h3 className={styles.insideSiblingsTitle}>Release Date:</h3>
                                <p className={styles.insideSiblingsText}>{myVideogame[0].released}</p>
                            </div>
                        </div>
                    
                    </div>
                      <div className={styles.back}>
                        <div className={styles.son1}>
                                 <h2 className={styles.title}>{myVideogame[0].name}</h2>
                             </div>
                         <p className={styles.description}>{myVideogame[0].description?.replace(/<[^>]*>?/g, '')}</p>
                      </div>

                </div>

             : <img  src={loading}type="jpeg" alt="Loading..." />
        }
                   
                         
            
                   
    </div>
    )
}