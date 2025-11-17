import { Outlet } from 'react-router-dom';
import './Layout.css';

const Layout = () => {
  return (
    <div className="layout-container">
      <main className="main-content">
        <Outlet />
      </main>
      <footer className="app-footer">
        <p>Blackjack Game v1.0.0 ({new Date().toLocaleDateString()}) | © 2024</p>
      </footer>
    </div>
  );
};

export default Layout;