import { App, Card, Form } from 'antd';
import { useUpdateRecipeMutation, useGetRecipesQuery } from './recipesApiSlice';
import { useAuth } from '../../hooks/useAuth';
import RecipeForm, { RecipeFormData } from './RecipeForm';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FORBIDDEN_403 } from '../../components/Results';
import { getErrorMessage } from '../../components/Errors';

const EditRecipeForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { recipe } = useGetRecipesQuery({}, {
        selectFromResult: ({ data }) => ({
            recipe: data?.entities[Number(id)]
        })
    });

    const { username, name } = useAuth();
    const [form] = Form.useForm();
    const { message: antdMessage }= App.useApp();
    const [updateRecipe, { isLoading }] = useUpdateRecipeMutation();

    const handleSubmit = async (values: RecipeFormData) => {
        const body = {
            ...values,
            id: Number(id),
            author: {
                username,
                name,
            }
        };

        try {
            await updateRecipe(body).unwrap();
            antdMessage.success('Recipe updated successfully.', 5);
            navigate('/recipes');
        } catch (err: any) {
            antdMessage.error(getErrorMessage(err), 10);
        }
    };

    let content;
    if (username === recipe?.author.username) {
        content = (
            <>
                <Card
                    title="Edit Recipe"
                    style={{ width: '100%' }}
                >
                    <RecipeForm handleSubmit={handleSubmit} recipe={recipe} form={form} isLoading={isLoading} />
                </Card>
            </>
        );
    } else {
        content = <FORBIDDEN_403 extra={<Link to="/recipes">Back</Link>} />
    }

    return (
        <div className='submit-new-container'>
            { content }
        </div>
    );
}

export default EditRecipeForm;
