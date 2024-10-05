import { Button, Tabs, TabsProps, Tooltip } from 'antd';
import RecipeList from './RecipeList';
import { useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGetRecipesQuery } from './recipesApiSlice';
import StickyBox from 'react-sticky-box';
import { buildQueryParamMap, buildQueryParams} from './SearchRecipes';
import { PlusOutlined } from '@ant-design/icons';

let pollInterval = process.env.POLLING_INTERVAL ? Number(process.env.POLLING_INTERVA) : Number(process.env.REACT_APP_POLLING_INTERVAL);

const RecipesHome = () => {
    const navigate = useNavigate();

    if (isNaN(pollInterval)) {
      pollInterval = 0;
    }

    const [urlSearchParams] = useSearchParams();

    const queryParamMap = buildQueryParamMap(urlSearchParams);

    const queryString = useMemo(
        () => buildQueryParams(queryParamMap),
        [queryParamMap]
    );

    // Uncomment below for polling
    const { data, isSuccess, error, isLoading } = useGetRecipesQuery(queryString, {
        pollingInterval: pollInterval,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    });

    // Comment below for polling
    // const { data, isSuccess, error } = useGetRecipesQuery(buildQueryString);

    const gotoNewRecipe = () => {
        navigate('/recipes/new');
    };

    const extraContent = (
        <Tooltip title='Submit a new recipe' color='blue' placement='left'>
            <Button type='primary' onClick={gotoNewRecipe}>
                <PlusOutlined/>
            </Button>
        </Tooltip>
    )

    const items: TabsProps['items'] = [
        {
          key: 'published',
          label: 'Published Recipes',
          children: ( <RecipeList tabKey='published' data={data} isSuccess={isSuccess} isLoading={isLoading} error={error} />)
        },
      ];

    const renderTabBar: TabsProps['renderTabBar'] = (props, DefaultTabBar) => (
        <StickyBox offsetTop={64} offsetBottom={20} style={{ zIndex: 1 }}>
            <DefaultTabBar {...props} style={{ background: '#f5f5f5' }} />
        </StickyBox>
    );

    return (
        <Tabs
          tabBarExtraContent={extraContent}
          items={items}
          renderTabBar={renderTabBar}
        />
    );
};

export default RecipesHome;
