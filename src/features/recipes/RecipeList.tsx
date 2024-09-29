import { Alert, Empty, Row } from 'antd';
import { useGetRecipesQuery } from '../../features/recipes/recipesApiSlice';
import RecipeCard from './RecipeCard';
import { useAuth } from '../../hooks/useAuth';

interface Props {
    tabKey: string;
}

const RecipeList = (props: Props) => {
    const { email, isAdmin } = useAuth();

    // Uncomment below for polling
    // const { data, isSuccess, error } = useGetRecipesQuery(undefined, {
    //     pollingInterval: 15000,
    //     refetchOnFocus: true,
    //     refetchOnMountOrArgChange: true
    // });

    // Comment below for polling
    const { data, isSuccess, isError, error } = useGetRecipesQuery();

    let content;

    if (isSuccess) {
        const { ids, entities } = data;

        let recipeIds: number[] = [];

        let showDelete = false;

        if ((props.tabKey === 'owner') || (props.tabKey === 'unpublished' && isAdmin)) {
            showDelete = true;
        }

        if (props.tabKey === 'owner') {
            recipeIds = ids.filter(recipeId =>
                entities[recipeId].author.email === email
            );
        } else if (props.tabKey === 'published') {
            // recipeIds = [...ids];
            recipeIds = ids.filter(recipeId =>
                entities[recipeId].isPublished === true
            );
        } else if (props.tabKey === 'unpublished') {
            // recipeIds = [...ids];
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
    if (error) {
        content = <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        if ('status' in error) {
            let message;
            if ('error' in error) {
                message = error.error;
            } else {
                const rawMessage = JSON.stringify(error.data);
                message = JSON.parse(rawMessage).message;
            }
            errorContent = <Alert message={`Error: ${error?.status}`} description={message} type='error'/>
        }
    }

    return (
        <>
            { isError && errorContent }
            { content }
        </>
    );
};

export default RecipeList;
