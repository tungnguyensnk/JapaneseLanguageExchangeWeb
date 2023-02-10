import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomepageLayout from './layouts/HomepageLayout';
import Homepage from './pages/Homepage/Homepage';
import BlogDetail from './pages/BlogDetail/BlogDetail';
import SearchPage from "./pages/Search/SearchPage";
import Login from './pages/Login/Login';
import Signin from './pages/Signin/Signin';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={
            <HomepageLayout>
              <Homepage />
            </HomepageLayout>}
          />
          <Route path='/question' element={
            <MainLayout>

            </MainLayout>
          }/>
          <Route path="/search" element={
            <MainLayout>
              <SearchPage />
            </MainLayout>
          } />
          <Route path='/videocall' element={<MainLayout />} />
          <Route path='/login' element={<Login/>} />
          <Route path='/signin' element={<Signin/>} />
        </Routes>
        <Routes>
          <Route path='/blog/1' element={
            <MainLayout>
              <BlogDetail/>
            </MainLayout>
          }/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
