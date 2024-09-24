import { Button, Card, Descriptions, Space } from 'antd';
import { Recipe } from '../../models/recipe';
import { join, pluck } from 'ramda';
import { useState } from 'react';
import EditRecipeForm from './EditRecipeForm';
import { useAppSelector } from '../../app/hooks';
import { selectRecipesById } from './recipesApiSlice';

interface Props {
    recipeId: number
    setSelectedRecipe: React.Dispatch<React.SetStateAction<Recipe | undefined>>,
}

export const recipeTagsToString = (recipe: Recipe) => {
    return join(', ', pluck('name', recipe.tags));
}

const RecipeDetails = (props: Props) => {
    const [edit, setEdit] = useState(false);
    const recipe = useAppSelector(state => selectRecipesById(state, props.recipeId));

    const handleCancel = () => {
        props.setSelectedRecipe(undefined);
    };

    const handleEdit = () => {
       setEdit(true);
    };

    // let content;

    // if (edit) {
    //     console.log(edit);
    //     content = <EditRecipeForm recipe={recipe} />
    // } else {
    //     content = (
    //         <>
    //     <Card
    //         title={recipe.title}
    //     >
    //         <Descriptions column={1} bordered>
    //             <Descriptions.Item label="Description">{recipe.description}</Descriptions.Item>
    //             <Descriptions.Item label="Ingriedients">{recipe.ingredients}</Descriptions.Item>
    //             <Descriptions.Item label="Directions">{recipe.directions}</Descriptions.Item>
    //             <Descriptions.Item label="Prep Time">{recipe.prepTime} minutes</Descriptions.Item>
    //             <Descriptions.Item label="Cook Time">{recipe.cookTime} minutes</Descriptions.Item>
    //             <Descriptions.Item label="Total Time">{recipe.totalTime} minutes</Descriptions.Item>
    //             <Descriptions.Item label="Servings">{recipe.servings}</Descriptions.Item>
    //             <Descriptions.Item label="Tags">{parseTags()}</Descriptions.Item>
    //         </Descriptions>
    //     </Card>
    //     <Space>
    //         <Button type="primary" onClick={handleEdit}>
    //             Edit
    //         </Button>
    //         <Button onClick={handleCancel}>
    //             Cancel
    //         </Button>
    //     </Space>
    //     </>
    //     )
    // }

    return (
        <>
            { edit && (
                <>
                {/* <div className='submit-new-container'> */}
                <EditRecipeForm recipeId={props.recipeId} />
                <Button onClick={handleCancel}>
                    Cancel
                </Button>
                {/* </div> */}
                </>
            )}

            { !edit && (
                <>
                <div className='details-container preserve-newlines'>
                <Card
                    title={recipe.title}
                >
                    <Descriptions column={1} bordered>
                        <Descriptions.Item label="Description">{recipe.description}</Descriptions.Item>
                        <Descriptions.Item label="Ingriedients">{recipe.ingredients}</Descriptions.Item>
                        <Descriptions.Item label="Directions">{recipe.directions}</Descriptions.Item>
                        <Descriptions.Item label="Prep Time">{recipe.prepTime} minutes</Descriptions.Item>
                        <Descriptions.Item label="Cook Time">{recipe.cookTime} minutes</Descriptions.Item>
                        <Descriptions.Item label="Total Time">{recipe.totalTime} minutes</Descriptions.Item>
                        <Descriptions.Item label="Servings">{recipe.servings}</Descriptions.Item>
                        <Descriptions.Item label="Tags">{recipeTagsToString(recipe)}</Descriptions.Item>
                    </Descriptions>
                </Card>
                <Space>
                    <Button type="primary" onClick={handleEdit}>
                        Edit
                    </Button>
                    <Button onClick={handleCancel}>
                        Cancel
                    </Button>
                </Space>
                </div>
                </>
            )}
        </>
    );
}

export default RecipeDetails
