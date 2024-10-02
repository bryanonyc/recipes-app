import { App, Button, Card, Descriptions, Space } from 'antd';
import { useAppSelector } from '../../app/hooks';
import { selectRecipesById, usePublishRecipeMutation } from './recipesApiSlice';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { isNil, isNotNil } from 'ramda';
import { FORBIDDEN_403, NOT_FOUND_404 } from '../../components/Results';
import { getErrorMessage } from '../../components/Errors';

const { Meta } = Card;

const RecipeDetails = () => {
    const { id } = useParams();
    const { email, isAdmin } = useAuth();
    const navigate = useNavigate();

    const recipe = useAppSelector(state => selectRecipesById(state, Number(id)));

    const { message: antdMessage } = App.useApp();
    const [publishRecipe] = usePublishRecipeMutation();

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
                email
            }
        };

        try {
            await publishRecipe(body).unwrap();
            antdMessage.success('Recipe updated successfully.', 5);
            navigate('/recipes');
        } catch (err: any) {
            antdMessage.error(getErrorMessage(err), 10);
        }
    };

    const isAuthor = isNotNil(recipe.author) ? email === recipe.author.email : false;

    const getAuthorDisplayName = () => {
        let displayName = 'Unknown';
        if (isNotNil(recipe.author)) {
            const pattern = /^\w+\s?./; // match first name and first character of last name
            if (isNotNil(recipe.author.name.match(pattern))) {
                displayName = recipe.author.name.match(pattern)![0];
            }
            return displayName;
        }
    }

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
