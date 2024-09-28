import { Button, Form, FormInstance, Input, InputNumber } from 'antd';
import { Recipe } from '../../models/recipe';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isNil } from 'ramda';

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
    recipe?: Recipe,
    form: FormInstance
}

const RecipeForm = (props: Props) => {
    const navigate = useNavigate();
    const recipe = props.recipe;

    const gotoRecipes = () => {
        navigate('/recipes');
    }

    const handleCancel = () => {
        props.form.resetFields();
        if (isNil(recipe)) {
            gotoRecipes();
        } else {
            navigate(`/recipes/${recipe.id}`)
        }
    };

    const handleSubmit = async (values: RecipeFormData) => {
        props.handleSubmit(values);
    };

    useEffect(() => {
        props.form.setFieldsValue({
            title: recipe?.title,
            description: recipe?.description,
            ingredients: recipe?.ingredients,
            directions: recipe?.directions,
            prepTime: recipe?.prepTime,
            cookTime: recipe?.cookTime,
            totalTime: recipe?.totalTime,
            servings: recipe?.servings,
            tags: recipe?.tags,
        });
    }, [props.form, recipe]);

    return (
        <Form
            form={props.form}
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
                    defaultValue={recipe?.title}
                />
            </Form.Item>
            <Form.Item
                label="Description"
                name="description"
            >
                <TextArea
                    rows={4}
                    placeholder='The juciest burgers in the world'
                    defaultValue={recipe?.description}
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
                    defaultValue={recipe?.ingredients}
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
                    defaultValue={recipe?.directions}
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
                    defaultValue={recipe?.prepTime}
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
                    defaultValue={recipe?.cookTime}
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
                    defaultValue={recipe?.totalTime}
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
                    defaultValue={recipe?.servings}
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
                <Button onClick={handleCancel}>
                    Cancel
                </Button>
            </div>
        </Form>
  )
}

export default RecipeForm
