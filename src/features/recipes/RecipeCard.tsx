import { App, Card, Col, Descriptions, Modal, Tooltip } from "antd"
import { useGetRecipesQuery, useDeleteRecipeMutation } from "./recipesApiSlice"
import { DeleteOutlined, HeartOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getErrorMessage } from '../../components/Errors';
import { useAuth } from '../../hooks/useAuth';
import { isNotNil } from 'ramda';
import { isUserFavorite } from './RecipeList';

interface Props {
    recipeId: number,
    showDelete: boolean,
}

const RecipeCard = (props: Props) => {
    const navigate = useNavigate();
    const { username } = useAuth();
    const { recipe } = useGetRecipesQuery({}, {
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

    const cardActions = [
        (
            <Tooltip title='View Details' color='blue'>
                <InfoCircleOutlined key="info" onClick={handleOnInfoClick} style={{ color: 'blue' }}/>
            </Tooltip>
        ),
    ];

    if (isNotNil(recipe) && isUserFavorite(recipe.favorites, username)) {
        cardActions.push(
            <Tooltip title='Your Favorite' color='red' className='default-cursor'>
                <HeartOutlined style={{ color: 'red' }} />
            </Tooltip>
        );
    }

    if (props.showDelete || recipe?.author.username === username) {
        cardActions.push(
            <Tooltip title='Delete Recipe' color='orange' className='default-cursor'>
                <DeleteOutlined key="delete" onClick={handleOnDeleteClick} style={{ color: 'orange' }} />
            </Tooltip>
        );
    }

    let cardClass = 'card';

    if (!recipe?.isPublished) {
        cardClass = 'unpublished-card';
    } else if (recipe?.author.username === username) {
        cardClass = 'owner-card'
    }

    let content =
        <Col key={props.recipeId}>
            <Card
                title={(
                    <Tooltip title={recipe?.title} color='green' className='default-cursor'>
                        {recipe?.title}
                    </Tooltip>
                )}
                className={cardClass}
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
