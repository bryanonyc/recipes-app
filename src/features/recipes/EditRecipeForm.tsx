import { App, Card, Form } from 'antd';
import { useUpdateRecipeMutation, useGetRecipesQuery } from './recipesApiSlice';
import { useAuth } from '../../hooks/useAuth';
import RecipeForm, { RecipeFormData } from './RecipeForm';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FORBIDDEN_403 } from '../../components/Results';

const EditRecipeForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { recipe } = useGetRecipesQuery(undefined, {
        selectFromResult: ({ data }) => ({
            recipe: data?.entities[Number(id)]
        })
    });

    const { email, name } = useAuth();
    const [form] = Form.useForm();
    const { message: antdMessage }= App.useApp();
    const [updateRecipe] = useUpdateRecipeMutation();

    const handleSubmit = async (values: RecipeFormData) => {
        const body = {
            ...values,
            id: Number(id),
            author: {
                email,
                name,
            }
        };

        try {
            await updateRecipe(body).unwrap();
            antdMessage.success('Recipe updated successfully.', 5);
            navigate('/recipes');
        } catch (err: any) {
            antdMessage.error('Edit recipe submission error.', 5);
            console.error('Edit recipe submission error', err);
            if (!err.status) {
                console.log('no error status');
            } else if (err.status === 401) {
                console.log('error status');
            } else {
                console.log('error message', err.data?.message);
            }
        }
    };

    let content;
    if (email === recipe?.author.email) {
        content = (
            <>
                <Card
                    title="Edit Recipe"
                    style={{ width: '100%' }}
                >
                    <RecipeForm handleSubmit={handleSubmit} recipe={recipe} form={form} />
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
