import { useNavigate } from 'react-router-dom';
import { Button, TabsProps, Tabs } from 'antd';
import RecipeList from './RecipeList';
import { useGetRecipesQuery } from './recipesApiSlice';

const OwnerHome = () => {
    const { data, isSuccess, isLoading, error } = useGetRecipesQuery({});

    const navigate = useNavigate();

    const gotoRecipes = () => {
        navigate('/recipes');
    };

    const backToRecipes = <Button type='primary' onClick={gotoRecipes}>Published Recipes</Button>;

    const items: TabsProps['items'] = [
        {
            key: 'owner',
            label: 'My Recipes',
            children: ( <RecipeList tabKey='owner' data={data} isSuccess={isSuccess} isLoading={isLoading} error={error} />)
        }
    ];

    return <Tabs tabBarExtraContent={backToRecipes} items={items} />;
}

export default OwnerHome;
