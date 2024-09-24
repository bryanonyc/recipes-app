import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { store } from '../../app/store';
import { recipesApiSlice } from '../recipes/recipesApiSlice';

const Prefetch = () => {
    useEffect(() => {
        store
            .dispatch(
                recipesApiSlice.util.prefetch('getRecipes', undefined, { force: true})
            );
    }, []); // leave dependency array empty so that it only runs when the component mounts.

  return (
    <Outlet />
  )
};

export default Prefetch;
