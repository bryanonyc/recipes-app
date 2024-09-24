import { Button, Form, Input, InputNumber } from 'antd';
import { Recipe } from '../../models/recipe';
import { useAppSelector } from '../../app/hooks';
import { selectRecipesById } from './recipesApiSlice';

const { TextArea } = Input;

export interface RecipeFormData {
    title: string;
    description: string | "";
    ingredients: string;
    directions: string;
    prepTime: number;
    cookTime: number;
    totalTime: number;
    servings: number;
    tags: string
};

interface Props {
    handleSubmit: Function,
    recipeId?: number
}

const RecipeForm = (props: Props) => {
    const [form] = Form.useForm();
    // let recipe = undefined;
    // if (props.recipeId) {

    // }
    const recipe = useAppSelector(state => selectRecipesById(state, props.recipeId!));

    // const recipe = props.recipe;
    console.log('rrrr', recipe);
    const resetForm = () => {
        form.resetFields();
    };

    const handleSubmit = async (values: RecipeFormData) => {
        props.handleSubmit(values);
    };

    return (
        <Form
            form={form}
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 19 }}
            autoComplete="off"
            onFinish={handleSubmit}
        >
            <Form.Item
                label="Name"
                name="title"
                rules={[{ required: true, message: 'Please input your name.'}]}
            >
                <Input
                    placeholder='Amazing Burgers!'
                    value='fsfsdfsd'
                />
            </Form.Item>
            <Form.Item
                label="Description"
                name="description"
            >
                <TextArea
                    rows={4}
                    placeholder='The juciest burgers in the world'
                    value={recipe?.description}
                />
            </Form.Item>
            <Form.Item
                label="Ingredients"
                name="ingredients"
                rules={[{ required: true, message: 'Please input your email.'}]}
                >
                <TextArea
                    rows={4}
                    placeholder='1 pound ground beef'
                    value={recipe?.ingredients}
                />
            </Form.Item>
            <Form.Item
                label="Directions"
                name="directions"
                rules={[{ required: true, message: 'Please input your email.'}]}
                >
                <TextArea
                    rows={4}
                    placeholder='Heat up the grill...'
                    value={recipe?.directions}
                />
            </Form.Item>
            <Form.Item
                label="Prep Time (minutes)"
                name="prepTime"
                rules={[{ required: true, message: 'Please input your email.'}]}
                >
                <InputNumber
                    min={1}
                    placeholder='15'
                    value={recipe?.prepTime}
                />
            </Form.Item>
            <Form.Item
                label="Cook Time (minutes)"
                name="cookTime"
                rules={[{ required: true, message: 'Please input your email.'}]}
                >
                <InputNumber
                    min={1}
                    placeholder='15'
                    value={recipe?.cookTime}
                />
            </Form.Item>
            <Form.Item
                label="Total Time (minutes)"
                name="totalTime"
                rules={[{ required: true, message: 'Please input your email.'}]}
                >
                <InputNumber
                    min={1}
                    placeholder='30'
                    value={recipe?.totalTime}
                />
            </Form.Item>
            <Form.Item
                label="Servings"
                name="servings"
                rules={[{ required: true, message: 'Please input your email.'}]}
                >
                <InputNumber
                    placeholder='4'
                    min={1}
                    value={recipe?.servings}
                />
            </Form.Item>
            <Form.Item
                label="Tags"
                name="tags"
                >
                <Input
                    placeholder='burgers, grill, easy'
                />
            </Form.Item>
            <div className='submit-button-container'>
            <Button type="primary" htmlType="submit">
                Submit
            </Button>
            <Button onClick={resetForm}>
                Reset Form
            </Button>
            </div>
        </Form>
  )
}

export default RecipeForm
