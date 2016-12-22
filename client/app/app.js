import ReactDom from 'react-dom';
import React from 'react';
 


ReactDom.render(
  <h1>Hello, world!</h1>,
  document.getElementById('root'),
  () => console.log('got it')
);