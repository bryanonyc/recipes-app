import { isNil, isNotEmpty, isNotNil } from 'ramda';
import { useState } from 'react';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Input } from 'antd';

const { Search } = Input;

interface StringMap {
    [key: string]: string;
}

export const buildQueryParamMap = (searchParams: URLSearchParams) => {
    const params: StringMap = {};
    searchParams.forEach((value, key) => {
        if (isNotEmpty(value) && isNotNil(value)) {
            params[key] = value;
        }
    });
    return params;
}

export const buildQueryParams = (paramMap: StringMap) => {
    if (isNil(paramMap['search'])) {
        return {};
    }

    return {
        search: paramMap['search']
    }
}

const SearchRecipes = () => {
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();
    const [urlSearchParams] = useSearchParams();

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

    return (
        <Search
            placeholder="Search recipes"
            onChange={(e) => setSearchText(e.target.value)}
            onSearch={doSearch}
            defaultValue={initialSearchTerm!}
            enterButton
        />
    )
}

export default SearchRecipes;
