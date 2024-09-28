import { message, Card, Form } from 'antd';
import { useAddNewRecipeMutation } from './recipesApiSlice';
import { useAuth } from '../../hooks/useAuth';
import RecipeForm, { RecipeFormData } from './RecipeForm';
import { useNavigate } from 'react-router-dom';

const NewRecipeForm = () => {
    const navigate = useNavigate();
    const { email, name } = useAuth();

    const [form] = Form.useForm();
    const [antdMessage, antDMessageContent] = message.useMessage();
    const [addNewRecipe] = useAddNewRecipeMutation();

    // const parseTags = (tags: string) => {
    //     if (isNil(tags)) {
    //         return '';
    //     }
    //     const requestedTags: string[] = [];
    //     const raw = tags.split(",");
    //     raw.map((tag) => {
    //         if (tag !== "") {
    //             requestedTags.push({ "name" : tag.trim() });
    //         }
    //     });
    //     return requestedTags;
    // }

    const resetForm = () => {
        form.resetFields();
    };

    const handleSubmit = async (values: RecipeFormData) => {
        // const { tags } = values;
        // const requestedTags = parseTags(tags);
        const body = {
            ...values,
            author: {
                email,
                name,
            }
        };

        try {
            await addNewRecipe(body).unwrap();
            antdMessage.open({
                type: 'success',
                content: 'New recipe successfully submitted.',
              });
              resetForm();
              navigate('/recipes');
        } catch (err: any) {
            console.error('New recipe submission error', err);
            if (!err.status) {
                console.log('no error status');
            } else if (err.status === 401) {
                console.log('error status');
            } else {
                console.log('error message', err.data?.message);
            }
        }
    };

    const content = (
        <>
            { antDMessageContent }
            <Card
                title="Recipe Submission"
                style={{ width: '100%' }}
            >
                <RecipeForm handleSubmit={handleSubmit} form={form} />
            </Card>
        </>
    );

    return (
        <div className='submit-new-container'>
            { content }
        </div>
    );
}

export default NewRecipeForm;
