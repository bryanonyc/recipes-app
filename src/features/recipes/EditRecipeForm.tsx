import { message, Card, Form, Result } from 'antd';
import { useUpdateRecipeMutation, useGetRecipesQuery } from './recipesApiSlice';
import { useAuth } from '../../hooks/useAuth';
import RecipeForm, { RecipeFormData } from './RecipeForm';
import { Link, useNavigate, useParams } from 'react-router-dom';

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
    const [antdMessage, antDMessageContent] = message.useMessage();
    const [updateRecipe, { isLoading }] = useUpdateRecipeMutation();

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
            antdMessage.open({
                type: 'success',
                content: 'Recipe updated successfully.',
                duration: 0,
              });
              navigate('/recipes');
        } catch (err: any) {
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

    if (email !== recipe?.author.email) {
        content = <Result
                    status="403"
                    title="403"
                    subTitle="Sorry, you are not authorized to access this page."
                    extra={
                        <Link to="/recipes">Back</Link>
                    }
                />
    } else {
        content = (
            <>
                { antDMessageContent }
                <Card
                    title="Edit Recipe"
                    style={{ width: '100%' }}
                >
                    <RecipeForm handleSubmit={handleSubmit} recipe={recipe} isLoading={isLoading} form={form} />
                </Card>
            </>
        );
    }

    return (
        <div className='submit-new-container'>
            { content }
        </div>
    );
}

export default EditRecipeForm;
