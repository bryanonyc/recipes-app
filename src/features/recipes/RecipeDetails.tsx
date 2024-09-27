import { Button, Card, Descriptions, Result, Space } from 'antd';
import { useAppSelector } from '../../app/hooks';
import { selectRecipesById } from './recipesApiSlice';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { isNil } from 'ramda';
const RecipeDetails = () => {
    const { id } = useParams();
    const { email } = useAuth();
    const navigate = useNavigate();

    const recipe = useAppSelector(state => selectRecipesById(state, Number(id)));

    const handleCancel = () => {
        navigate('/recipes');
    };

    const handleEdit = () => {
        navigate(`/recipes/${recipe.id}/edit`);
    };

    let content;

    if (isNil(recipe)) {
        content = <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you requested does not exist."
            extra={
                <Link to="/recipes">Back</Link>
            }
        />
    } else {
        content = (<>
            <Card
                title={recipe.title}
            >
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
                { email === recipe.author.email &&
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
