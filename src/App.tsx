import { Navbar } from '@components/NavBar';
import { FormPage } from '@pages/form/FormPage';
import { ItemPage } from '@pages/item/ItemPage';
import { ListPage } from '@pages/list/ListPage';
import { NotFound } from '@pages/notFound/NotFound';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<ListPage />} />
          <Route path="/list" element={<ListPage />} />
          <Route path="/form" element={<FormPage />} />
          <Route path="/item/:id" element={<ItemPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
