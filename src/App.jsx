import React from 'react';
import Board from './Board.jsx';
import './AppStyles.css';

function App() {
  return (
		<div className='flexbox-container'>
			<h1>Kat's Tic-Tac-Toe Game</h1>
			<Board />
		</div>
  );
}

export default App;