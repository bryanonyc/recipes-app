import { useNavigate } from 'react-router-dom';
import { Button, TabsProps, Tabs, Tooltip } from 'antd';
import RecipeList from './RecipeList';
import { useGetRecipesQuery } from './recipesApiSlice';
import { ArrowLeftOutlined } from '@ant-design/icons';

interface Props {
    tabKey: string,
    tabLabel: string
}

const RecipeTab = (props: Props) => {
    const { data, isSuccess, isLoading, error } = useGetRecipesQuery({});

    const navigate = useNavigate();

    const gotoRecipes = () => {
        navigate('/recipes');
    };

    const backToRecipes = (
        <Tooltip title='Back to published recipes' color='blue' placement='left'>
            <Button type='primary' onClick={gotoRecipes}>
                <ArrowLeftOutlined/>
            </Button>
        </Tooltip>
    );

    const items: TabsProps['items'] = [
        {
            key: props.tabKey,
            label: props.tabLabel,
            children: ( <RecipeList tabKey={props.tabKey} data={data} isSuccess={isSuccess} isLoading={isLoading} error={error} />)
        }
    ];

    return <Tabs tabBarExtraContent={backToRecipes} items={items} />;
}

export default RecipeTab;
