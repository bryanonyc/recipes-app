import { App, Button, Card, Descriptions, Space } from 'antd';
import { useAppSelector } from '../../app/hooks';
import { selectRecipesById, usePublishRecipeMutation } from './recipesApiSlice';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { isNil, isNotNil } from 'ramda';
import { FORBIDDEN_403, NOT_FOUND_404 } from '../../components/Results';

const { Meta } = Card;

const RecipeDetails = () => {
    const { id } = useParams();
    const { email, isAdmin } = useAuth();
    const navigate = useNavigate();

    const recipe = useAppSelector(state => selectRecipesById(state, Number(id)));

    const { message: antdMessage } = App.useApp();
    const [publishRecipe] = usePublishRecipeMutation();

    const handleCancel = () => {
        navigate('/recipes');
    };

    const handleEdit = () => {
        navigate(`/recipes/${recipe.id}/edit`);
    };

    const handlePublish = async () => {
        const body = {
            id: Number(id),
            author: {
                email
            }
        };

        try {
            await publishRecipe(body).unwrap();
            antdMessage.success('Recipe updated successfully.', 5);
            navigate('/recipes');
        } catch (err: any) {
            console.error('Edit recipe submission error', err);
            antdMessage.error('Edit recipe submission error', 5);
            if (!err.status) {
                console.log('no error status');
            } else if (err.status === 401) {
                console.log('error status');
            } else {
                console.log('error message', err.data?.message);
            }
        }
    };

    const isAuthor = isNotNil(recipe.author) ? email === recipe.author.email : false;
    const authorDisplayName =  isNotNil(recipe.author) ? recipe.author?.email.substring(0, recipe.author?.email.indexOf('@')) : 'Unknown';

    let content;

    if (isNil(recipe)) {
        content = <NOT_FOUND_404 extra={<Link to="/recipes">Back</Link>} />
    } else if (!recipe.isPublished && !isAdmin && !isAuthor) {
        content = <FORBIDDEN_403 extra={<Link to="/recipes">Back</Link>} />
    } else {
        content = (<>
            <Card>
                <Meta
                    title={recipe.title}
                    description={`Submitted by: ${authorDisplayName}`}
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
                    <Descriptions.Item label="Tags">{recipe.tags}</Descriptions.Item>
                </Descriptions>
            </Card>
            <Space>
                { isAdmin && !recipe.isPublished &&
                    <Button type="primary" onClick={handlePublish}>
                        Publish
                    </Button>
                }
                { isAuthor &&
                    <Button type="primary" onClick={handleEdit}>
                        Edit
                    </Button>
                }
                <Button onClick={handleCancel}>
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
