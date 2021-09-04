import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './stylesheets/Exercises.css';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Popover } from '@material-ui/core';
import { backendUrl } from '../config';
import { addComment, addLikedExercise, removeLikedExercise, addRating, removeExercise, updateRating } from '../store/actions/exercises';
import ExerciseForm from './ExerciseForm';
import ExerciseFormEdit from './ExerciseFormEdit';
import ReactStars from 'react-stars';
import Comment from './Comment';

function Exercises() {
    const exerciseState = useSelector(state => state.exercises);
    const exercises = Object.values(exerciseState.list);
    const userId = localStorage.getItem("userId");
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorElEdit, setAnchorElEdit] = useState(null);
    const [currentExerciseId, setCurrentExerciseId] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {

    }, [exerciseState]);

    const ratingChanged = async (score, exercise) => {
        // Check if user has already voted on this exercise
        for (let i = 0; i < exercise.voterIds.length; i++) {
            let vote = exercise.voterIds[i];
            if (Number(userId) === vote[0]) {
                // Voter has voted, so we need to do a PUT and update
                const response = await fetch(`${backendUrl}/api/exercises/${exercise.id}/ratings`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ score, userId })
                });

                if (response.ok) {
                    const { rating, oldScore } = await response.json();
                    dispatch(updateRating(exercise.id, rating, userId, oldScore));
                    return true;
                }
            }
        }

        // If never rated, add rating
        const response = await fetch(`${backendUrl}/api/exercises/${exercise.id}/ratings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ score, userId })
        });

        if (response.ok) {
            const rating = await response.json();

            // Push userId to exercise so we get a re-render
            dispatch(addRating(exercise.id, rating, userId));
            return true;
        }
    };

    const handleDelete = async (exerciseId) => {
        async function deleteExercise(exerciseId) {
            const response = await fetch(`${backendUrl}/api/exercises/${exerciseId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) return true;
        }
        const deleted = await deleteExercise(exerciseId);
        if (deleted) {
            dispatch(removeExercise(exerciseId));
        }
    };

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleClickEdit = (e, exerciseId) => {
        setAnchorElEdit(e.currentTarget);
        setCurrentExerciseId(exerciseId);
    };


    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCloseEdit = () => {
        setAnchorElEdit(null);
    };


    const handleSubmit = async (exerciseId, commentInput) => {
        // Create Comment on Exercise

        const response = await fetch(`${backendUrl}/api/exercises/${exerciseId}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId, commentInput })
        });

        if (response.ok) {
            const comment = await response.json();
            dispatch(addComment(comment));
            return true;
        }
    };

    const mapRatings = (exercise, liked) => {
        for (let i = 0; i < exercise.voterIds.length; i++) {
            let vote = exercise.voterIds[i];
            if (Number(userId) === vote[0]) {
                return (
                    <div className="exercise__row1">
                        <div className="exercise__userRating" key={ i }>
                            <ReactStars
                                count={ 5 }
                                value={ vote[1] }
                                onChange={ (rating) => {
                                    ratingChanged(rating, exercise);
                                } }
                                size={ 24 }
                                color2={ '#ffd700' } />
                            <FavoriteIcon className="exercise__liked" style={ { fill: liked } } onClick={ () => {
                                updateLiked(exercise);
                            } } />
                        </div>
                        💪💪💪Thanks for rating!💪💪💪
                    </div>
                );
            }
        }
        return (
            <div className="exercise__row1">
                <div className="exercise__userRating" key={ Math.random() }>
                    <ReactStars
                        count={ 5 }
                        value={ 0 }
                        onChange={ (rating) => {
                            ratingChanged(rating, exercise);
                        } }
                        size={ 24 }
                        color2={ '#ffd700' } />
                    <FavoriteIcon className="exercise__liked" style={ { fill: liked } } onClick={ () => {
                        updateLiked(exercise);
                    } } />
                </div>
                Rate this exercise!
            </div>
        );
    };

    const updateLiked = async (exercise) => {
        const response = await fetch(`${backendUrl}/api/exercises/${exercise.id}/liked/${userId}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json();
            if (isNaN(data)) {
                // If data is not a number, we need to add the like to the exercises Likeds
                dispatch(addLikedExercise(data));
            } else {
                dispatch(removeLikedExercise(data, userId));
            }
        }
    };

    const open = Boolean(anchorEl);
    const openEdit = Boolean(anchorElEdit);


    return (
        <div className="exercises">
            <div className="addExerciseIcon" onClick={ handleClick }>
                Add A New Exercise <AddIcon style={ { fontSize: 40 } } />
            </div>
            <Popover
                open={ open }
                anchorEl={ anchorEl }
                onClose={ handleClose }
                anchorOrigin={ { vertical: 'top', horizontal: 'left' } }
                transformOrigin={ { vertical: 'top', horizontal: 'left' } }>
                <ExerciseForm handleClose={ handleClose } />
            </Popover>

            {
                exercises ? exercises.map((exercise, index) => {
                    let liked = 'gray';
                    for (let i = 0; i < exercise.Likeds.length; i++) {
                        if (exercise.Likeds[i].user_id === Number(userId)) {
                            liked = 'red';
                        }
                    }

                    let descriptionSteps;
                    if (exercise.description) {
                        descriptionSteps = exercise.description.split(`\n`);
                    }
                    return (
                        <React.Fragment key={ index }>
                            <div className="exercise__info">
                                {
                                    exercise.voterIds && exercise.voterIds.length ? (
                                        mapRatings(exercise, liked)
                                    ) : (
                                            <div className="exercise__row1">
                                                <div className="exercise__userRating" key={ index }>
                                                    <ReactStars
                                                        count={ 5 }
                                                        value={ 0 }
                                                        onChange={ (rating) => {
                                                            ratingChanged(rating, exercise);
                                                        } }
                                                        size={ 24 }
                                                        color2={ '#ffd700' } />
                                                    <FavoriteIcon className="exercise__liked" style={ { fill: liked } } onClick={ () => {
                                                        updateLiked(exercise);
                                                    } } />
                                                </div>
                                                Rate this exercise!
                                            </div>
                                        )
                                }
                                <div className="exercise__ratings">
                                    <span className="exercise__stars">
                                        <ReactStars
                                            count={ 5 }
                                            value={ exercise.averageRating }
                                            size={ 24 }
                                            edit={ false }
                                            color2={ '#ffd700' } />
                                        ({ exercise.ratingCount })
                                    </span>
                                    <span className="exercise__owner">
                                        {
                                            Number(userId) === exercise.user_id ?
                                                <>
                                                    <DeleteIcon onClick={ () => {
                                                        handleDelete(exercise.id);
                                                    } } /> <EditIcon value={ exercise.id } onClick={ (e) => {
                                                        handleClickEdit(e, exercise.id);
                                                    }
                                                    } />
                                                </>
                                                : null
                                        }
                                    </span>
                                </div>
                                <div>
                                    <span className="exercise__title">
                                        { exercise.title } - { exercise.type }
                                    </span>
                                </div>
                                <Popover
                                    open={ openEdit }
                                    anchorEl={ anchorElEdit }
                                    onClose={ handleCloseEdit }
                                    anchorOrigin={ { vertical: 'top', horizontal: 'left' } }
                                    transformOrigin={ { vertical: 'top', horizontal: 'left' } }>
                                    <ExerciseFormEdit handleCloseEdit={ handleCloseEdit } exerciseId={ currentExerciseId } />
                                </Popover>
                                <div className="exercise__difficulty">
                                    <span>
                                        Difficulty:
                                    </span>
                                    { exercise.difficulty }
                                </div>
                                <div className="exercise__equipment">
                                    <span>
                                        Equipment:
                                    </span>
                                    { exercise.equipment }
                                </div>
                            </div>
                            <div className="exercise__steps">
                                { descriptionSteps.map((step, index) => (
                                    <div key={ index } className="exercise__step">
                                        <span className="exercise__stepNumber">
                                            { index + 1 }.
                                        </span>
                                        { step }
                                    </div>
                                )) }
                            </div>
                            <div>
                                {/* <ReactPlayer className="exercise__video" url={ exercise.video_url } controls={ true } /> */ }
                                <iframe id="ytplayer" type="text/html" width="640" height="360"
                                    src={ exercise.video_url }
                                    frameBorder="0"
                                    title={ exercise.id }></iframe>
                            </div>
                            <div className="exercise__comments">
                                <span className="exercise__commentsHeader">
                                    Comments
                                </span>
                                <div className="exercise__commentsContainer">
                                    {/* Map Through Comments */ }
                                    {
                                        exercise.Comments ?
                                            exercise.Comments.map((comment, index) => {
                                                console.log(comment);
                                                if (comment.User.username) {
                                                    return (<Comment key={ index } author={ comment.User.username } authorId={ comment.user_id } content={ comment.content } date={ comment.createdAt } id={ comment.commentableId } commentId={ comment.id } type='Exercise' />);
                                                } else {
                                                    return null;
                                                }
                                            })
                                            : null
                                    }
                                </div>
                                <div className="exercise__commentsInput">
                                    <form onSubmit={ (e) => {
                                        e.preventDefault();
                                        if (e.target[0].value === '') return;
                                        handleSubmit(exercise.id, e.target[0].value);
                                        e.target[0].value = '';
                                    } }>
                                        <input type="text" className="exercise__commentsInputText" placeholder="Leave A Comment!"
                                        />
                                    </form>
                                </div>
                            </div>
                            <span className="exercise__end"></span>
                        </React.Fragment >
                    );
                }) : null
            }
        </div>
    );
}

export default Exercises;
