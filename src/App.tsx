import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Welcome from './features/auth/Welcome';
import RecipesHome from './features/recipes/RecipesHome';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import Prefetch from './features/auth/Prefetch';
import PersistLogin from './features/auth/PersistLogin';
import './App.css';
import AppLayout from './components/AppLayout';
import { useTitle } from './hooks/useTitle';
import NewRecipeForm from './features/recipes/NewRecipeForm';
import EditRecipeForm from './features/recipes/EditRecipeForm';
import RecipeDetails from './features/recipes/RecipeDetails';
import { ERROR_500, NOT_FOUND_404 } from './components/Results';
import UsersHome from './features/users/UsersHome';
import RequireAuth from './features/auth/RequireAuth';
import EditUserForm from './features/users/EditUserForm';
import RequireEnv from './components/RequireEnv';
import RecipeTab from './features/recipes/RecipeTab';

const App = () => {
    useTitle('Recipe Finder');

    return (
        <BrowserRouter>
            <Routes>
                {/* Public routes */}
                <Route index element={<Welcome />} />

                <Route element={<RequireEnv />}>
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                </Route>

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

                            <Route path=":id">
                                <Route index
                                    element={
                                        <AppLayout>
                                            <RecipeDetails />
                                        </AppLayout>
                                        }
                                />

                                {/* <Route element={<RequireAuth />}> */}
                                    <Route path="edit"
                                        element={
                                        <AppLayout>
                                            <EditRecipeForm />
                                        </AppLayout>
                                        }
                                    />
                                {/* </Route> */}
                            </Route>
                        </Route>

                        <Route path="owner"
                            element={
                                <AppLayout>
                                    <RecipeTab tabKey='owner' tabLabel='My Recipes' />
                                </AppLayout>
                            }
                        />

                        <Route path="favorite"
                            element={
                                <AppLayout>
                                    <RecipeTab tabKey='favorite' tabLabel='My Favorites' />
                                </AppLayout>
                            }
                        />

                        <Route element={<RequireAuth />}>
                            <Route path="users">
                                <Route
                                    index
                                    element={
                                        <AppLayout>
                                            <UsersHome />
                                        </AppLayout>
                                    }
                                />
                                <Route path=":id/edit"
                                    element={
                                        <AppLayout>
                                            <EditUserForm />
                                        </AppLayout>
                                    }
                                />
                            </Route>
                            <Route path="unpublished"
                                element={
                                    <AppLayout>
                                        <RecipeTab tabKey='unpublished' tabLabel='Unpublished' />
                                    </AppLayout>
                                }
                            />
                        </Route>
                    </Route>
                </Route>

                <Route
                    path="*"
                    element={
                        <div className='login-container'>
                            <NOT_FOUND_404 extra={<Link to="/">Back Home</Link>} />
                        </div>
                    }
                    errorElement={
                        <div className='login-container'>
                            <ERROR_500 extra={<Link to="/">Back Home</Link>} />
                        </div>
                    }
                />
            </Routes>
        </BrowserRouter>

    )
};

export default App;
