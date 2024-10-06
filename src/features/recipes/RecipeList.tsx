import { Alert, Empty, Row, Spin } from 'antd';
import RecipeCard from './RecipeCard';
import { useAuth } from '../../hooks/useAuth';
import { Recipe } from '../../models/recipe';
import { EntityState } from '@reduxjs/toolkit';
import { isNotEmpty, pluck, includes } from 'ramda';
import { Favorite } from '../../models/favorite';

interface Props {
    tabKey: string;
    data: EntityState<Recipe, number> | undefined;
    isSuccess: boolean;
    isLoading: boolean;
    error: any;
}

export const isUserFavorite = (recipeFavorites: Favorite[], username: string) => {
    if (isNotEmpty(recipeFavorites)) {
        const users = pluck('user', recipeFavorites);
        const usernames = pluck('username', users);
        return includes(username, usernames);
    }
    return false;
};

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

    let emptyDescription;
    let warningContent;
    if (props.isSuccess) {
        const { ids, entities } = props.data!;

        let recipeIds: number[] = [];

        let showDelete = false;

        if ((props.tabKey === 'owner') || (props.tabKey === 'unpublished' && isAdmin)) {
            showDelete = true;
        }

        if (props.tabKey === 'owner') {
            emptyDescription = 'You have not submitted any recipes.';
            warningContent = (
                <div className='demo-warning'>
                    <Alert type='warning' message='You are in demo mode.  Any submitted recipes will be deleted once you log out.' />
                </div>
            )
            recipeIds = ids.filter(recipeId =>
                entities[recipeId].author?.username === username
            );
        } else if (props.tabKey === 'published') {
            recipeIds = ids.filter(recipeId =>
                entities[recipeId].isPublished === true
            );
        } else if (props.tabKey === 'favorite') {
            emptyDescription = 'You have no favorite recipes.';
            warningContent = (
                <div className='demo-warning'>
                    <Alert className='demo-warning' type='warning' message='You are in demo mode.  Any favorite recipes will be deleted once you log out.' />
                </div>
            )
            recipeIds = ids.filter(recipeId => {
                const recipe = entities[recipeId];
                return isUserFavorite(recipe.favorites, username);
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

            content = <Empty description={emptyDescription} />
        }
    }

    let errorContent;
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
            { username === 'demo' && warningContent}
            { content }
        </>
    );
};

export default RecipeList;
