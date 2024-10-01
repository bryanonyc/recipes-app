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

    const handleCancel = () => {
        props.form.resetFields();
        if (isNil(recipe)) {
            navigate(-1);
        } else {
            navigate(`/recipes/#owner`)
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
                />
            </Form.Item>
            <Form.Item
                label="Description"
                name="description"
            >
                <TextArea
                    rows={4}
                    placeholder='The juciest burgers in the world'
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
