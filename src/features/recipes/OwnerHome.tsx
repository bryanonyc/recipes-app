import { useNavigate } from 'react-router-dom';
import { Button, TabsProps, Tabs } from 'antd';
import RecipeList from './RecipeList';
import { useGetRecipesQuery } from './recipesApiSlice';

const OwnerHome = () => {
    const { data, isSuccess, error } = useGetRecipesQuery({});

    const navigate = useNavigate();

    const gotoRecipes = () => {
        navigate('/recipes');
    };

    const backToRecipes = <Button type='primary' onClick={gotoRecipes}>Back To Recipes</Button>;

    const items: TabsProps['items'] = [
        {
            key: 'owner',
            label: 'My Recipes',
            children: ( <RecipeList tabKey='owner' data={data} isSuccess={isSuccess} error={error} />)
        }
    ];

    return <Tabs tabBarExtraContent={backToRecipes} items={items} />;
}

export default OwnerHome;
