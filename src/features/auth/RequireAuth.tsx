import { Link, Outlet, useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useGetRecipesQuery } from '../recipes/recipesApiSlice';
import AppLayout from '../../components/AppLayout';
import { useEffect, useRef } from 'react';
import { Forbidden } from '../../components/Results';


const RequireAuth = () => {
    const { id } = useParams();
    const { email } = useAuth();
    const effectRan = useRef(false);
    const { recipe } = useGetRecipesQuery(undefined, {
        selectFromResult: ({ data }) => ({
            recipe: data?.entities[Number(id)]
        })
    });

    let content;

    useEffect(() => {
        return () => {
            effectRan.current = true;
        }
    }, [recipe]);

    if (effectRan.current === true) {
        if (email === recipe?.author.email) {
            content = <Outlet />;
        } else {
            content = (
                <AppLayout>
                    <Forbidden extra={<Link to="/recipes">Back</Link>} />
                </AppLayout>
            )
        }
    }

    return (
        <>
            { content }
        </>
    )
}

export default RequireAuth;
