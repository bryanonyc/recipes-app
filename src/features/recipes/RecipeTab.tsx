import { useNavigate } from 'react-router-dom';
import { Button, TabsProps, Tabs, Tooltip, Space } from 'antd';
import RecipeList from './RecipeList';
import { useGetRecipesQuery } from './recipesApiSlice';
import { ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons';

interface Props {
    tabKey: string,
    tabLabel: string
}

const RecipeTab = (props: Props) => {
    const { data, isSuccess, isLoading, error } = useGetRecipesQuery({});

    const navigate = useNavigate();

    const goToPrevious = () => {
        navigate(-1);
    };

    const gotoNewRecipe = () => {
        navigate('/recipes/new');
    };

    const backToRecipes = (
    <>
        <Space>
        <Tooltip title='Back to published recipes' color='blue' placement='left'>
            <Button type='primary' onClick={goToPrevious}>
                <ArrowLeftOutlined/>
            </Button>
        </Tooltip>
        <Tooltip title='Submit a new recipe' color='blue' placement='bottom'>
            <Button type='primary' onClick={gotoNewRecipe}>
                <PlusOutlined/>
            </Button>
        </Tooltip>
        </Space>
    </>
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
