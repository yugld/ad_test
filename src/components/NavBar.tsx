import { NavLink } from 'react-router-dom';
export const Navbar = () => {
  return (
    <nav>
      <NavLink
        to="/list"
        className={({ isActive }) => (isActive ? 'active' : '')}
      >
        Список
      </NavLink>
      <NavLink
        to="/form"
        className={({ isActive }) => (isActive ? 'active' : '')}
      >
        Разместить объявление
      </NavLink>
      <NavLink
        to="/error"
        className={({ isActive }) => (isActive ? 'active' : '')}
      >
        Ошибка
      </NavLink>
    </nav>
  );
};
