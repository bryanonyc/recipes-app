import { Button, Card, Descriptions, Space } from 'antd';
import { useAppSelector } from '../../app/hooks';
import { selectRecipesById } from './recipesApiSlice';
import { useNavigate, useParams } from 'react-router-dom';

const RecipeDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const recipe = useAppSelector(state => selectRecipesById(state, Number(id)));

    const handleCancel = () => {
        navigate('/recipes');
    };

    const handleEdit = () => {
        navigate(`/recipes/${recipe.id}/edit`);
    };

    return (
        (
            <>
            <div className='details-container preserve-newlines'>
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
                    <Button type="primary" onClick={handleEdit}>
                        Edit
                    </Button>
                    <Button onClick={handleCancel}>
                        Cancel
                    </Button>
                </Space>
            </div>
            </>
        )
    );
}

export default RecipeDetails
