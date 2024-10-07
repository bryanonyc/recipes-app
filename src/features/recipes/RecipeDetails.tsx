import { App, Button, Card, Descriptions, Space, Tag } from 'antd';
import { useAppSelector } from '../../app/hooks';
import { selectRecipesById, useAddFavoriteMutation, useDeleteFavoriteMutation, usePublishRecipeMutation } from './recipesApiSlice';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { isNil, isNotEmpty, isNotNil, split } from 'ramda';
import { FORBIDDEN_403, NOT_FOUND_404 } from '../../components/Results';
import { getErrorMessage } from '../../components/Errors';
import { isUserFavorite } from './RecipeList';

const { Meta } = Card;

const RecipeDetails = () => {
    const { id } = useParams();
    const { username, isAdmin } = useAuth();
    const navigate = useNavigate();

    const recipe = useAppSelector(state => selectRecipesById(state, Number(id)));

    const { message: antdMessage } = App.useApp();
    const [publishRecipe, { isLoading: publishIsLoading }] = usePublishRecipeMutation();
    const [addFavorite, { isLoading: addFavoriteIsLoading }] = useAddFavoriteMutation();
    const [deleteFavorite, { isLoading: deleteFavoriteIsLoading }] = useDeleteFavoriteMutation();

    const handleCancel = () => {
        navigate(-1);
    };

    const handleEdit = () => {
        navigate(`/recipes/${recipe.id}/edit`);
    };

    const handlePublish = async () => {
        const body = {
            id: Number(id),
            author: {
                username
            }
        };

        try {
            await publishRecipe(body).unwrap();
            antdMessage.success('Recipe updated successfully.', 5);
            navigate(-1);
        } catch (err: any) {
            antdMessage.error(getErrorMessage(err), 10);
        }
    };

    const handleAddFavorite = async () => {
        const body = {
            recipeId: Number(id),
            username
        };

        try {
            await addFavorite(body).unwrap();
            antdMessage.success('Recipe was added as a favorite.', 5);
            navigate(-1);
        } catch (err: any) {
            antdMessage.error(getErrorMessage(err), 10);
        }
    };

    const handleDeleteFavorte = async () => {
        const body = {
            recipeId: Number(id),
            username
        };

        try {
            await deleteFavorite(body).unwrap();
            antdMessage.success('Recipe was removed as a favorite.', 5);
            navigate(-1);
        } catch (err: any) {
            antdMessage.error(getErrorMessage(err), 10);
        }
    };

    const isAuthor = isNotNil(recipe.author) ? username === recipe.author?.username : false;

    const getAuthorDisplayName = () => {
        let displayName = 'Unknown';
        if (isNotNil(recipe.author)) {
            const pattern = /^\w+\s?./; // match first name and first character of last name
            if (isNotNil(recipe.author?.name.match(pattern))) {
                displayName = recipe.author?.name.match(pattern)![0];
            }
            return displayName;
        }
    }

    const generateTags = () => {
        if (isNotNil(recipe.tags) && isNotEmpty(recipe.tags)) {
            const tagColors = ['red','orange','green','cyan','blue','purple'];

            return split(',', recipe.tags).map(name => {
                const trimmedName = name.trim();
                if (isNotEmpty(trimmedName)) {
                    const color = tagColors[Math.floor(Math.random() * tagColors.length)];
                    return <Tag key={trimmedName} color={color}>{trimmedName}</Tag>
                } else {
                    return <></>
                }
            });
        }
    };

    let borderColor = `black`;
    if (!recipe?.isPublished) {
        borderColor = 'orange';
    } else if (recipe?.author.username === username) {
        borderColor = 'rgb(0, 200, 0)';
    }

    let content;

    if (isNil(recipe)) {
        content = <NOT_FOUND_404 extra={<Link to="/recipes">Back</Link>} />
    } else if (!recipe.isPublished && !isAdmin && !isAuthor) {
        content = <FORBIDDEN_403 extra={<Link to="/recipes">Back</Link>} />
    } else {
        content = (<>
            <Card style={{ border: `1px solid ${borderColor}` }}>
                <Meta
                    title={recipe.title}
                    description={`Submitted by: ${getAuthorDisplayName()}.`}
                    style={{ paddingBottom: '1rem'}}
                />
                <Descriptions column={1} bordered>
                    <Descriptions.Item label="Description">{recipe.description}</Descriptions.Item>
                    <Descriptions.Item label="Ingriedients">{recipe.ingredients}</Descriptions.Item>
                    <Descriptions.Item label="Directions">{recipe.directions}</Descriptions.Item>
                    <Descriptions.Item label="Prep Time">{recipe.prepTime} minutes</Descriptions.Item>
                    <Descriptions.Item label="Cook Time">{recipe.cookTime} minutes</Descriptions.Item>
                    <Descriptions.Item label="Total Time">{recipe.totalTime} minutes</Descriptions.Item>
                    <Descriptions.Item label="Servings">{recipe.servings}</Descriptions.Item>
                    <Descriptions.Item label="Tags">{generateTags()}</Descriptions.Item>
                </Descriptions>
            </Card>
            <Space>
                { isAdmin && !recipe.isPublished &&
                    <Button type="primary" onClick={handlePublish} disabled={publishIsLoading || addFavoriteIsLoading || deleteFavoriteIsLoading}>
                        Publish
                    </Button>
                }
                { !isUserFavorite(recipe.favorites, username) &&
                    <Button type="primary" onClick={handleAddFavorite} disabled={publishIsLoading || addFavoriteIsLoading || deleteFavoriteIsLoading}>
                        Add Favorite
                    </Button>
                }
                { isUserFavorite(recipe.favorites, username) &&
                    <Button type="primary" onClick={handleDeleteFavorte} disabled={publishIsLoading || addFavoriteIsLoading || deleteFavoriteIsLoading}>
                        Remove Favorite
                    </Button>
                }
                { isAuthor &&
                    <Button type="primary" onClick={handleEdit} disabled={publishIsLoading || addFavoriteIsLoading || deleteFavoriteIsLoading}>
                        Edit
                    </Button>
                }
                <Button onClick={handleCancel} disabled={publishIsLoading || addFavoriteIsLoading || deleteFavoriteIsLoading}>
                    Cancel
                </Button>
            </Space>
    </>)}

    return (
        (
            <>
            <div className='details-container preserve-newlines'>
                {content}
            </div>
            </>
        )
    );
}

export default RecipeDetails
