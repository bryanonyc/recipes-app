import { Alert, Empty, Row } from 'antd';
import { useGetRecipesQuery } from '../../features/recipes/recipesApiSlice';
import RecipeCard from './RecipeCard';
import { useAuth } from '../../hooks/useAuth';

interface Props {
    filterByOwner: boolean;
}

const RecipeList = (props: Props) => {
    const { email } = useAuth();

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
        let recipeIds;
        if (props.filterByOwner) {
            recipeIds = ids.filter(recipeId =>
                entities[recipeId].author.email === email
            );
        } else {
            recipeIds = [...ids];
        }
        const recipeCards = recipeIds.map(recipeId => <RecipeCard
            key={recipeId}
            recipeId={recipeId}
            showDelete={props.filterByOwner}
        />)

        if (ids?.length) {
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
