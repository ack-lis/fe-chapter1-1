import Nav from './Nav.js';

export default function renderLayout() {
  const root = document.getElementById('root');

  root.innerHTML = `
      ${Nav()}
      <main id="app"></main>
  `;
}
