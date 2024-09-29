import { App, Card, Col, Descriptions, Modal, Tooltip } from "antd"
import { useGetRecipesQuery, useDeleteRecipeMutation } from "./recipesApiSlice"
import { DeleteOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getErrorMessage } from '../../components/Errors';

interface Props {
    recipeId: number,
    showDelete: boolean,
}

const RecipeCard = (props: Props) => {
    const navigate = useNavigate();
    const { recipe } = useGetRecipesQuery(undefined, {
        selectFromResult: ({ data }) => ({
            recipe: data?.entities[props.recipeId]
        })
    });

    const [open, setOpen] = useState(false);

    const [deleteRecipe] = useDeleteRecipeMutation();
    const { message: antdMessage }= App.useApp();

    const handleOnInfoClick = () => {
        navigate(`/recipes/${props.recipeId}`);
    }

    const handleOnDeleteClick = () => {
        setOpen(true);
    }

    const handleModalConfirm = async () => {
        try {
            await deleteRecipe({ id: recipe?.id }).unwrap();
            antdMessage.success('Recipe deleted successfully.', 5);
            setOpen(false);
        } catch (err: any) {
            antdMessage.error(getErrorMessage(err), 10);
        }
    };

    const handleModalCancel = () => {
        setOpen(false);
    };

    const cardActions = [<InfoCircleOutlined key="info" onClick={handleOnInfoClick} />];

    if (props.showDelete) {
        cardActions.push(<DeleteOutlined key="delete" onClick={handleOnDeleteClick}/>);
    }

    let content =
        <Col key={props.recipeId}>

            <Card
                title={(
                    <Tooltip title={recipe?.title}>
                        {recipe?.title}
                    </Tooltip>
                )}
                style={{ maxWidth: 250}}
                actions={cardActions}
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
        { content }
        </>
    )
}

const memoizedRecipeCard = memo(RecipeCard);

export default memoizedRecipeCard;
