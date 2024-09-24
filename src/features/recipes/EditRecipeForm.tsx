import { message, Card, Form } from 'antd';
import { Tag } from '../../models/tag';
import { selectRecipesById, useAddNewRecipeMutation } from './recipesApiSlice';
import { isNil } from 'ramda';
import { useAuth } from '../../hooks/useAuth';
import RecipeForm, { RecipeFormData } from './RecipeForm';
import { Recipe } from '../../models/recipe';
import { useAppSelector } from '../../app/hooks';

interface Props {
    recipeId: number
}

const EditRecipeForm = (props: Props) => {
    const recipe = useAppSelector(state => selectRecipesById(state, props.recipeId));

    const { email, name } = useAuth();

    const [form] = Form.useForm();
    const [antdMessage, antDMessageContent] = message.useMessage();
    const [addNewRecipe] = useAddNewRecipeMutation();

    const parseTags = (tags: string) => {
        if (isNil(tags)) {
            return [];
        }
        const requestedTags: Tag[] = [];
        const raw = tags.split(",");
        raw.map((tag) => {
            if (tag !== "") {
                requestedTags.push({ "name" : tag.trim() });
            }
        });
        return requestedTags;
    }

    const resetForm = () => {
        form.resetFields();
    };

    const handleSubmit = async (values: RecipeFormData) => {
        // const { tags } = values;
        // const requestedTags = parseTags(tags);
        // const body = {
        //     ...values,
        //     author: {
        //         email,
        //         name,
        //     },
        //     tags: requestedTags
        // };

        // try {
        //     await addNewRecipe(body).unwrap();
        //     antdMessage.open({
        //         type: 'success',
        //         content: 'New recipe successfully submitted.',
        //         duration: 5,
        //       });
        //       resetForm();
        // } catch (err: any) {
        //     console.error('New recipe submission error', err);
        //     if (!err.status) {
        //         console.log('no error status');
        //     } else if (err.status === 401) {
        //         console.log('error status');
        //     } else {
        //         console.log('error message', err.data?.message);
        //     }
        // }
    };

    const content = (
        <>
            { antDMessageContent }
            <Card
                title="Edit Recipe"
                style={{ width: '100%' }}
            >
                <RecipeForm handleSubmit={handleSubmit} recipeId={props.recipeId} />
            </Card>
        </>
    );

    return (
        <div className='submit-new-container'>
            { content }
        </div>
    );
}

export default EditRecipeForm;
