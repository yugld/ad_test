import { Link } from 'react-router-dom';
export const Navbar = () => {
  return (
    <nav>
      <Link to="/list">Список</Link>
      <Link to="/form">Разместить объявление</Link>
    </nav>
  );
};
