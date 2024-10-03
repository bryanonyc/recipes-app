import { useNavigate } from 'react-router-dom';
import { Button, TabsProps, Tabs } from 'antd';
import RecipeList from './RecipeList';
import { useGetRecipesQuery } from './recipesApiSlice';

const UnpublishedHome = () => {
    const { data, isSuccess, isLoading, error } = useGetRecipesQuery({});

    const navigate = useNavigate();

    const gotoRecipes = () => {
        navigate('/recipes');
    };

    const backToRecipes = <Button type='primary' onClick={gotoRecipes}>Back To Recipes</Button>;

    const items: TabsProps['items'] = [
        {
            key: 'unpublished',
            label: 'Unpublished Recipes',
            children: ( <RecipeList tabKey='unpublished' data={data} isSuccess={isSuccess} isLoading={isLoading} error={error} />)
        }
    ];

    return <Tabs tabBarExtraContent={backToRecipes} items={items} />;
}

export default UnpublishedHome;
