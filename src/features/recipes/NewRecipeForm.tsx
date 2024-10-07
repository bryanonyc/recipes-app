import { App, Card, Form } from 'antd';
import { useAddNewRecipeMutation } from './recipesApiSlice';
import { useAuth } from '../../hooks/useAuth';
import RecipeForm, { RecipeFormData } from './RecipeForm';
import { useNavigate } from 'react-router-dom';
import { getErrorMessage } from '../../components/Errors';

const NewRecipeForm = () => {
    const navigate = useNavigate();
    const { username, name } = useAuth();

    const [form] = Form.useForm();
    const { message: antdMessage } = App.useApp();
    const [addNewRecipe, { isLoading }] = useAddNewRecipeMutation();

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
                username,
                name,
            }
        };

        try {
            await addNewRecipe(body).unwrap();
            const msg = (<>
                Your recipe has been submitted. Once reviewed by an admin,<br />
                it will appear in the Published Recipes tab.
            </>);
            antdMessage.success(msg, 5);
            resetForm();
            navigate(-1);
        } catch (err: any) {
            antdMessage.error(getErrorMessage(err), 10);
        }
    };

    const content = (
        <>
            <Card
                title="Recipe Submission"
                style={{
                    border: '1px solid black',
                    width: '100%'
                }}
            >
                <RecipeForm handleSubmit={handleSubmit} form={form} isLoading={isLoading} />
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
