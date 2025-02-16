import NavBar from '@components/navBar/NavBar';
import CssBaseline from '@mui/material/CssBaseline';
import FormPage from '@pages/form/FormPage';
import ItemPage from '@pages/item/ItemPage';
import ListPage from '@pages/list/ListPage';
import { NotFound } from '@pages/notFound/NotFound';
import AppTheme from '@theme/AppTheme';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <AppTheme>
        <CssBaseline enableColorScheme />
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<ListPage />} />
            <Route path="/list" element={<ListPage />} />
            <Route path="/form" element={<FormPage />} />
            <Route path="/item/:id" element={<ItemPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AppTheme>
    </>
  );
}

export default App;
