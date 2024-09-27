import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Welcome from './features/auth/Welcome';
import RecipesHome from './features/recipes/RecipesHome';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import Prefetch from './features/auth/Prefetch';
import PersistLogin from './features/auth/PersistLogin';
import './App.css';
import { Result } from 'antd';
import AppLayout from './components/AppLayout';
import { useTitle } from './hooks/useTitle';
import NewRecipeForm from './features/recipes/NewRecipeForm';

const App = () => {
  useTitle('Recipe Finder');

  return (
    <div className='app-container'>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route
            index
            element={<Welcome />}
          />
          <Route
            path="login"
            element={<Login />}
          />
          <Route
            path="register"
            element={<Register />}
          />

          {/* Protected routes */}
          <Route
            element={<PersistLogin />}
          >
            <Route
              element={<Prefetch />}
            >
                <Route
                  path="recipes"
                  element={
                    <AppLayout>
                      <RecipesHome />
                    </AppLayout>
                  }
                />
                <Route
                  path="recipes/new"
                  element={
                    <AppLayout>
                      <NewRecipeForm />
                    </AppLayout>
                  }
                />
            </Route>
          </Route> {/* End Protected routes */}

          <Route
              path="*"
              element={
                <div className='login-container'>
                    <Result
                        status="404"
                        title="404"
                        subTitle="Sorry, the page you requested does not exist."
                        extra={
                          <Link to="/">Back Home</Link>
                        }
                    />
                </div>
              }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;
