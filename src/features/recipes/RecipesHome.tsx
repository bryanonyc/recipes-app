import { useNavigate } from 'react-router-dom';
import { Button, Tabs, TabsProps } from 'antd';
import RecipeList from './RecipeList';
import { useAuth } from '../../hooks/useAuth';

const RecipesHome = () => {
    const navigate = useNavigate();

    const gotoNewRecipe = () => {
        navigate('/recipes/new');
    };

    const { isAdmin } = useAuth();

    const newRecipeButton = <Button type='primary' onClick={gotoNewRecipe}>Submit New Recipe</Button>;

    const items: TabsProps['items'] = [
        {
          key: 'published',
          label: 'Published Recipes',
          children: ( <RecipeList tabKey='published' />)
        },
        {
          key: 'owner',
          label: 'My Recipes',
          children: ( <RecipeList tabKey='owner' />)
        }
      ];

    if (isAdmin) {
      items.push(
        {
          key: 'unpublished',
          label: 'Unpublished Recipes',
          children: ( <RecipeList tabKey='unpublished' />)
        }
      )
    }

    return (
        <Tabs tabBarExtraContent={newRecipeButton} items={items} />
    );
};

export default RecipesHome;
