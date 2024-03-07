// src/App.tsx
import React from 'react';
import Chat from './components/Chat';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
         {/* align center */}
        <h1 style={{ textAlign: 'center' }}>Welcome to Rich! 🤑</h1>
      </header>
      <main>
        <Chat />
      </main>
      <footer>
        <p style={{ fontSize:'6px', textAlign: 'center', position: 'absolute', bottom: '5px', left: '5px'  }}>*Advice should be sought from a financial adviser regarding the suitability of the investment product, taking into account the specific investment objectives, financial situation or particular needs of any person in receipt of the recommendation, before the person makes a commitment to purchase the investment product. Should the person choose not to do so, he should consider carefully whether the product is suitable for him. In particular, all relevant documentations pertaining to the product should be read to make an independent assessment of the appropriateness of the transaction.
The advertisement has not been reviewed by the Monetary Authority of Singapore, or any regulatory authority elsewhere.* </p>

      </footer>

    </div>
  );
};

export default App;
