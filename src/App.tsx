import React from 'react';
import TopBarNav from './components/TopBarNav';
import style from './app.module.scss';


function App() {
  return (
    <div className={style['App']}>
      <TopBarNav/> 
    </div>
  );
}

export default App;
