import { Input, Tabs, TabsProps } from 'antd';
import RecipeList from './RecipeList';
import { useAuth } from '../../hooks/useAuth';
import { useMemo, useState } from 'react';
import { isNil, isNotEmpty, isNotNil } from 'ramda';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useGetRecipesQuery } from './recipesApiSlice';

const { Search } = Input;

interface StringMap {
    [key: string]: string;
}

const RecipesHome = () => {
    const { isAdmin } = useAuth();
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
    // const { data, isSuccess, error } = useGetRecipesQuery(undefined, {
    //     pollingInterval: 15000,
    //     refetchOnFocus: true,
    //     refetchOnMountOrArgChange: true
    // });

    // Comment below for polling

    const { data, isSuccess, error } = useGetRecipesQuery(buildQueryString);

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
            className='search-input'
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

    if (isAdmin) {
      items.push(
        {
          key: 'unpublished',
          label: 'Unpublished Recipes',
          children: ( <RecipeList tabKey='unpublished' data={data} isSuccess={isSuccess} error={error} />)
        }
      )
    }

    return (
        <Tabs tabBarExtraContent={extraContent} items={items} />
    );
};

export default RecipesHome;
