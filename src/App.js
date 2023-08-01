import Main from './pages/Main/Main';
import Table from './pages/Table/Table';
import NotFound from './pages/NotFound/NotFound';
import Header from './views/Header/Header';
import Footer from './views/Footer/Footer';
import Spiner from './views/Spiner/Spiner';

import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchTables } from './Redux/tablesReducer';
import { routing } from './common/routing';

import { Container } from 'react-bootstrap';

function App() {
  const dispatch = useDispatch();

  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState('');

  const initData = () => {
    setLoading(true);
    fetchTables(dispatch, setError);
    setLoading(false);
  };

  useEffect(initData, [dispatch]);

  return (
    <Container>
      <Header />

      {loading && <Spiner />}
      {error && <p>Error: {error}</p>}

      <Routes>
        <Route path={routing.main} element={<Main />} />
        <Route path={routing.table} element={<Table />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </Container>
  );
}

export default App;
