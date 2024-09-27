import { useNavigate } from 'react-router-dom';
import { Button, Tabs, TabsProps } from 'antd';
import RecipeList from './RecipeList';

const RecipesHome = () => {
    const navigate = useNavigate();

    const gotoNewRecipe = () => {
        navigate('/recipes/new');
    };

    const newRecipeButton = <Button type='primary' onClick={gotoNewRecipe}>Submit New Recipe</Button>;

    const items: TabsProps['items'] = [
        {
          key: 'all',
          label: 'All Recipes',
          children: ( <RecipeList filterByOwner={false} />)
        },
        {
          key: 'mine',
          label: 'My Recipes',
          children: ( <RecipeList filterByOwner={true} />)
        },
      ];

    return (
        <Tabs tabBarExtraContent={newRecipeButton} items={items} />
    );
};

export default RecipesHome;
