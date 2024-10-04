import { useNavigate } from 'react-router-dom';
import { Button, TabsProps, Tabs } from 'antd';
import RecipeList from './RecipeList';
import { useGetRecipesQuery } from './recipesApiSlice';

const FavoriteHome = () => {
    const { data, isSuccess, isLoading, error } = useGetRecipesQuery({});

    const navigate = useNavigate();

    const gotoRecipes = () => {
        navigate('/recipes');
    };

    const backToRecipes = <Button type='primary' onClick={gotoRecipes}>Published Recipes</Button>;

    const items: TabsProps['items'] = [
        {
            key: 'favorite',
            label: 'My Favorite Recipes',
            children: ( <RecipeList tabKey='favorite' data={data} isSuccess={isSuccess} isLoading={isLoading} error={error} />)
        }
    ];

    return <Tabs tabBarExtraContent={backToRecipes} items={items} />;
}

export default FavoriteHome;
