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
import EditRecipeForm from './features/recipes/EditRecipeForm';
import RecipeDetails from './features/recipes/RecipeDetails';
import RequireAuth from './features/auth/RequireAuth';

const App = () => {
    useTitle('Recipe Finder');

    return (
        <div className='app-container'>
            <BrowserRouter>
                <Routes>
                    {/* Public routes */}
                    <Route index element={<Welcome />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />

                    {/* Protected routes */}
                    <Route element={<PersistLogin />}>
                        <Route element={<Prefetch />}>
                            <Route path='recipes'>
                                <Route index
                                    element={
                                      <AppLayout>
                                          <RecipesHome />
                                      </AppLayout>
                                    }
                                />
                                <Route path="new"
                                    element={
                                      <AppLayout>
                                          <NewRecipeForm />
                                      </AppLayout>
                                    }
                                />
                                <Route path=":id"
                                    element={
                                      <AppLayout>
                                          <RecipeDetails />
                                      </AppLayout>
                                    }
                                />

                                <Route element={<RequireAuth />}>
                                    <Route path=":id/edit"
                                        element={
                                          <AppLayout>
                                              <EditRecipeForm />
                                          </AppLayout>
                                        }
                                    />
                                </Route>
                            </Route>
                        </Route>
                    </Route>

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
    )
};

export default App;
