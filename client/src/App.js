import './App.css';
import {BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import VideogameCreate from './components/VideogameCreate';
import Detail from './components/Detail';
import NotFound from './components/404';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
       <Route exact path= '/' element= {<LandingPage/>}/>
       <Route path = '/home' element= {<Home/>} />
       <Route exact path= '/videogame' element={<VideogameCreate/>}/>
       <Route exact path= '/videogame/:id' element={<Detail/>}/>
       <Route path='*' element={<NotFound/>}/>
      </Routes>  
      </div>
    </BrowserRouter>
  );
}



export default App;