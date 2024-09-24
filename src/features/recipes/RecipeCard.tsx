import { message, Card, Col, Descriptions, Modal } from "antd"
import { useGetRecipesQuery, useDeleteRecipeMutation } from "./recipesApiSlice"
import { Recipe } from "../../models/recipe";
import { DeleteOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { memo } from 'react';

interface Props {
    recipeId: number,
    showDelete: boolean,
    setSelectedRecipe: React.Dispatch<React.SetStateAction<Recipe | undefined>>,
}

const RecipeCard = (props: Props) => {
    const { recipe } = useGetRecipesQuery(undefined, {
        selectFromResult: ({ data }) => ({
            recipe: data?.entities[props.recipeId]
        })
    });

    // const recipe = useAppSelector(state => selectRecipesById(state, props.recipeId));
    const [open, setOpen] = useState(false);

    const [deleteRecipe] = useDeleteRecipeMutation();
    const [antdMessage, antDMessageContent] = message.useMessage();

    const handleOnCardClick = (evt: EventTarget) => {
        const target = evt as HTMLElement;

        if (target.nodeName !== 'svg') {
            props.setSelectedRecipe(recipe);
        }
    }

    const handleOnDeleteClick = (evt: EventTarget) => {
        const target = evt as HTMLElement;

        if (target.nodeName === 'svg') {
            console.log('delete');
            setOpen(true);
        }
    }

    const handleModalConfirm = async () => {
        try {
            await deleteRecipe({ id: recipe?.id }).unwrap();
            antdMessage.open({
                type: 'success',
                content: 'Recipe deleted successfully.',
                duration: 5,
            });
            setOpen(false);
        } catch (err: any) {
            console.error('Delete recipe error', err);
            if (!err.status) {
                console.log('no error status');
            } else if (err.status === 401) {
                console.log('error status');
            } else {
                console.log('error message', err.data?.message);
            }
        }
    };

    const handleModalCancel = () => {
        setOpen(false);
    };

    let content =
        <Col key={props.recipeId}>
            <Card
                hoverable
                extra={props.showDelete && (
                    <DeleteOutlined onClick={(evt) => handleOnDeleteClick(evt.target)}/>
                )}
                title={recipe?.title}
                style={{ maxWidth: 250}}
                onClick={(evt) => handleOnCardClick(evt.target)}
            >
                <Descriptions column={1}>
                    <Descriptions.Item label="Prep Time">{recipe?.prepTime} minutes</Descriptions.Item>
                    <Descriptions.Item label="Cook Time">{recipe?.cookTime} minutes</Descriptions.Item>
                    <Descriptions.Item label="Total Time">{recipe?.totalTime} minutes</Descriptions.Item>
                    <Descriptions.Item label="Servings">{recipe?.servings}</Descriptions.Item>
                </Descriptions>
            </Card>
        </Col>;

    return (
        <>
        <Modal
            title={`Delete ${recipe?.title}`}
            open={open}
            onOk={handleModalConfirm}
            onCancel={handleModalCancel}
        >
            <p>Would you like to delete this recipe?</p>
        </Modal>
        { antDMessageContent }
        { content }
        </>
    )
}

const memoizedRecipeCard = memo(RecipeCard);

export default memoizedRecipeCard;
