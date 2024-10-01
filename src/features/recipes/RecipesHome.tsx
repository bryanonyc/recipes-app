import { Input, Tabs, TabsProps } from 'antd';
import RecipeList from './RecipeList';
import { useMemo, useState } from 'react';
import { isNil, isNotEmpty, isNotNil } from 'ramda';
import { createSearchParams, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useGetRecipesQuery } from './recipesApiSlice';
import StickyBox from 'react-sticky-box';

const { Search } = Input;

interface StringMap {
    [key: string]: string;
}

let pollInterval = process.env.POLLING_INTERVAL ? Number(process.env.POLLING_INTERVA) : Number(process.env.REACT_APP_POLLING_INTERVAL);

const RecipesHome = () => {
    if (isNaN(pollInterval)) {
      pollInterval = 0;
    }

    const location = useLocation();
    const activeKey = location.hash.substring(1); // remove the leading #

    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();
    const [urlSearchParams] = useSearchParams();

    const buildQueryParamMap = (searchParams: URLSearchParams) => {
        const params: StringMap = {};
        searchParams.forEach((value, key) => {
            if (isNotEmpty(value) && isNotNil(value)) {
                params[key] = value;
            }
        });
        return params;
    }

    const buildQueryParams = (paramMap: StringMap) => {
        if (isNil(paramMap['search'])) {
            return {};
        }

        return {
            search: paramMap['search']
        }
    }

    const queryParamMap = buildQueryParamMap(urlSearchParams);

    const buildQueryString = useMemo(
        () => buildQueryParams(queryParamMap),
        [queryParamMap]
    );

    // Uncomment below for polling
    const { data, isSuccess, error } = useGetRecipesQuery(buildQueryString, {
        pollingInterval: pollInterval,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    });

    // Comment below for polling
    // const { data, isSuccess, error } = useGetRecipesQuery(buildQueryString);

    const doSearch = async () => {
        const queryObject = {
            pathname: '/recipes',
            search: createSearchParams({}).toString()
        };

        if (isNotEmpty(searchText) && isNotNil(searchText)) {
            queryObject.search = createSearchParams({ search: searchText }).toString()
        }

        navigate(queryObject);
    };

    const initialSearchTerm = isNotNil(urlSearchParams.get('search')) ? urlSearchParams.get('search') : '';

    const extraContent = (
        <Search
            placeholder="Search recipes"
            onChange={(e) => setSearchText(e.target.value)}
            onSearch={doSearch}
            defaultValue={initialSearchTerm!}
            enterButton
        />
    )

    const items: TabsProps['items'] = [
        {
          key: 'published',
          label: 'Published Recipes',
          children: ( <RecipeList tabKey='published' data={data} isSuccess={isSuccess} error={error} />)
        },
        {
          key: 'owner',
          label: 'My Recipes',
          children: ( <RecipeList tabKey='owner' data={data} isSuccess={isSuccess} error={error} />)
        }
      ];

    const renderTabBar: TabsProps['renderTabBar'] = (props, DefaultTabBar) => (
        <StickyBox offsetTop={64} offsetBottom={20} style={{ zIndex: 1 }}>
            <DefaultTabBar {...props} style={{ background: '#f5f5f5' }} />
        </StickyBox>
    );

    return (
        <Tabs
          defaultActiveKey={activeKey}
          tabBarExtraContent={extraContent}
          items={items}
          renderTabBar={renderTabBar}
          onTabClick={(key) => { window.location.hash = key; }}
        />
    );
};

export default RecipesHome;
