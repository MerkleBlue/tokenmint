import React from 'react';
import ReactDOM from 'react-dom';
import TokenType from './TokenType';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TokenType />, div);
  ReactDOM.unmountComponentAtNode(div);
});
