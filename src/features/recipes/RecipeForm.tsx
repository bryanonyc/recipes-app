import { Button, Form, FormInstance, Input, InputNumber } from 'antd';
import { Recipe } from '../../models/recipe';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
    form: FormInstance,
    isLoading: boolean,
}

const RecipeForm = (props: Props) => {
    const navigate = useNavigate();
    const recipe = props.recipe;

    const handleCancel = () => {
        props.form.resetFields();
        // if (isNil(recipe)) {
        //     navigate(-1);
        // } else {
        //     navigate(-1);
        // }
        navigate(-1);
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
                rules={[{ required: true, message: 'Please input the name.'}]}
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
                rules={[{ required: true, message: 'Please input the ingredients.'}]}
                >
                <TextArea
                    rows={4}
                    placeholder='1 pound ground beef'
                />
            </Form.Item>
            <Form.Item
                label="Directions"
                name="directions"
                rules={[{ required: true, message: 'Please input the directions.'}]}
                >
                <TextArea
                    rows={4}
                    placeholder='Heat up the grill...'
                />
            </Form.Item>
            <Form.Item
                label="Prep Time (minutes)"
                name="prepTime"
                rules={[{ required: true, message: 'Please input the prep time.'}]}
                >
                <InputNumber
                    min={1}
                    placeholder='15'
                />
            </Form.Item>
            <Form.Item
                label="Cook Time (minutes)"
                name="cookTime"
                rules={[{ required: true, message: 'Please input the cook time.'}]}
                >
                <InputNumber
                    min={1}
                    placeholder='15'
                />
            </Form.Item>
            <Form.Item
                label="Total Time (minutes)"
                name="totalTime"
                rules={[{ required: true, message: 'Please input the total time.'}]}
                >
                <InputNumber
                    min={1}
                    placeholder='30'
                />
            </Form.Item>
            <Form.Item
                label="Servings"
                name="servings"
                rules={[{ required: true, message: 'Please input the number of servings.'}]}
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
                    placeholder='comma separated (burger, grill, easy)'
                />
            </Form.Item>
            <div className='submit-button-container'>
                <Button type="primary" htmlType="submit" disabled={props.isLoading}>
                    Submit
                </Button>
                <Button onClick={handleCancel} disabled={props.isLoading}>
                    Cancel
                </Button>
            </div>
        </Form>
  )
}

export default RecipeForm
