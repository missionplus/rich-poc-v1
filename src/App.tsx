// src/App.tsx
import React from 'react';
import Chat from './components/Chat';
import Footer from './components/Footer'; // Update the path as per your directory structure


const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
         {/* align center */}
         <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', width: '100%' }}>
        <h1 style={{ textAlign: 'center', margin: '0', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>Welcome to Rich! 🤑</h1>
        <h3 style={{paddingRight: '10px', fontSize: '18px'}}><a style={{textDecoration: 'none', color: '#68b2a0'}} href="https://docs.google.com/forms/d/e/1FAIpQLSf4MWTrAqlGoPivFT06nX7nuywsNmUyg-7k9Pfkp4u9ZIeFQQ/viewform">How did I do?</a></h3>
        </div>
      </header>
      <main className='main-content'>
        <Chat />
      </main>
      <Footer/>
    </div>

  );
};

export default App;
