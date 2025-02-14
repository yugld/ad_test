import NavBar from '@components/navBar/NavBar';
import CssBaseline from '@mui/material/CssBaseline';
import AdForm from '@pages/form/AdForm';
import ItemPage from '@pages/item/ItemPage';
import ListPage from '@pages/list/ListPage';
import { NotFound } from '@pages/notFound/NotFound';
import AppTheme from '@theme/AppTheme';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App(props: { disableCustomTheme?: boolean }) {
  return (
    <>
      <AppTheme {...props}>
        <CssBaseline enableColorScheme />
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<ListPage />} />
            <Route path="/list" element={<ListPage />} />
            <Route path="/form" element={<AdForm />} />
            <Route path="/item/:id" element={<ItemPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AppTheme>
    </>
  );
}

export default App;
