import { Tabs, TabsProps } from 'antd';
import RecipeList from './RecipeList';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useGetRecipesQuery } from './recipesApiSlice';
import StickyBox from 'react-sticky-box';
import SearchRecipes, { buildQueryParamMap, buildQueryParams} from './SearchRecipes';

let pollInterval = process.env.POLLING_INTERVAL ? Number(process.env.POLLING_INTERVA) : Number(process.env.REACT_APP_POLLING_INTERVAL);

const RecipesHome = () => {
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

    const extraContent = <SearchRecipes />;

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
