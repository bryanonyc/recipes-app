import { Tabs, TabsProps } from 'antd';
import RecipeList from './RecipeList';
import NewRecipeForm from '../../features/recipes/NewRecipeForm';

const RecipesHome = () => {
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
        {
          key: 'new',
          label: 'Submit New Recipe',
          children: (<NewRecipeForm />)
        },
      ];

    return (
        <Tabs items={items} />
    );
};

export default RecipesHome;
