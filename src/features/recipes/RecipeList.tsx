import { Alert, Empty, Row, Spin } from 'antd';
import RecipeCard from './RecipeCard';
import { useAuth } from '../../hooks/useAuth';
import { Recipe } from '../../models/recipe';
import { EntityState } from '@reduxjs/toolkit';
import { isNotEmpty, pluck, includes } from 'ramda';

interface Props {
    tabKey: string;
    data: EntityState<Recipe, number> | undefined;
    isSuccess: boolean;
    isLoading: boolean;
    error: any;
}

const RecipeList = (props: Props) => {
    const { username, isAdmin } = useAuth();

    let content;

    if (props.isLoading) {
        content = (
            <div className='spin-container'>
                <Spin />
            </div>
        )
    }

    if (props.isSuccess) {
        const { ids, entities } = props.data!;

        let recipeIds: number[] = [];

        let showDelete = false;

        if ((props.tabKey === 'owner') || (props.tabKey === 'unpublished' && isAdmin)) {
            showDelete = true;
        }

        if (props.tabKey === 'owner') {
            recipeIds = ids.filter(recipeId =>
                entities[recipeId].author?.username === username
            );
        } else if (props.tabKey === 'published') {
            recipeIds = ids.filter(recipeId =>
                entities[recipeId].isPublished === true
            );
        } else if (props.tabKey === 'favorite') {
            recipeIds = ids.filter(recipeId => {
                const recipe = entities[recipeId];
                if (isNotEmpty(recipe.favorites)) {
                    const users = pluck('user', recipe?.favorites!);
                    const usernames = pluck('username', users);
                    return includes(username, usernames);
                } else {
                    return false;
                }
            });
        } else if (props.tabKey === 'unpublished') {
            recipeIds = ids.filter(recipeId =>
                entities[recipeId].isPublished === false
            );
        }

        const recipeCards = recipeIds.map(recipeId => <RecipeCard
            key={recipeId}
            recipeId={recipeId}
            showDelete={showDelete}
        />)

        if (recipeCards.length) {
            content = (
                <>
                    <Row gutter={[25, 25]}>
                        {recipeCards}
                    </Row>
                </>
            )
        } else {
            content = <Empty />
        }
    }

    let errorContent
    if (props.error) {
        content = <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        if ('status' in props.error) {
            let message;
            if ('error' in props.error) {
                message = props.error.error;
            } else {
                const rawMessage = JSON.stringify(props.error.data);
                message = JSON.parse(rawMessage).message;
            }
            errorContent = <Alert message={`Error: ${props.error?.status}`} description={message} type='error'/>
        }
    }

    return (
        <>
            { props.error && errorContent }
            { content }
        </>
    );
};

export default RecipeList;
