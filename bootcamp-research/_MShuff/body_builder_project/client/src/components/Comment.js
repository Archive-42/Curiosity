import React, { useEffect, useState } from 'react';
import './stylesheets/Comment.css';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Popover } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { backendUrl } from '../config';
import { removeComment, updateComment } from '../store/actions/exercises';

function Comment({ author, authorId, content, date, id, commentId, type }) {
    const userId = localStorage.getItem("userId");
    const [anchorEl, setAnchorEl] = useState(null);
    const dispatch = useDispatch();
    const open = Boolean(anchorEl);
    const [editComment, setEditComment] = useState(content);

    useEffect(() => {

    }, [anchorEl, editComment]);

    const handleClick = (e) => {
        console.log(editComment);
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = async () => {
        if (Number(userId) !== authorId) return;
        // Delete comment on exercise
        const response = await fetch(`${backendUrl}/api/exercises/${id}/comments/${commentId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const { deletedCommentId, exerciseId } = await response.json();
            dispatch(removeComment(deletedCommentId, exerciseId));
        }
    };

    const updateCurrentComment = (e) => {
        if (!e.target) return;
        console.log(e.target);
        setEditComment(e.target.value);
    };

    const handleSubmit = async () => {
        // Update a comment on exercise
        const response = await fetch(`${backendUrl}/api/exercises/${id}/comments`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId, editComment, commentId })
        });

        if (response.ok) {
            const { updatedComment, exerciseId } = await response.json();
            dispatch(updateComment(updatedComment, exerciseId));
            return true;
        }
    };

    return (
        <div className="comment">
            <div className="comment__header">
                <span className="comment__author">
                    { author }
                </span>
                <span className="comment__date">
                    { date }
                </span>
                {
                    Number(userId) === authorId ?
                        (
                            <span className="comment__icons">
                                <DeleteIcon className="comment__deleteIcon" onClick={ handleDelete } />
                                <EditIcon className="comment__editIcon" onClick={ handleClick } />
                                <Popover
                                    open={ open }
                                    anchorEl={ anchorEl }
                                    onClose={ handleClose }
                                    anchorOrigin={ { vertical: 'top', horizontal: 'left' } }
                                    transformOrigin={ { vertical: 'top', horizontal: 'left' } }>
                                    <div className="comment__editTextDiv">
                                        <h4>Edit Comment</h4>
                                        <form onSubmit={ (e) => {
                                            e.preventDefault();
                                            handleClose();
                                            if (type === 'Exercise') {
                                                handleSubmit();
                                                e.target[0].value = '';
                                            }
                                        } }>
                                            <input type="text" className="comment__editText" placeholder="Enter New Comment"
                                                onChange={ updateCurrentComment }
                                            />
                                        </form>
                                    </div>
                                </Popover>
                            </span>
                        )
                        : null
                }
            </div>
            <div className="comment__content">
                { content }
            </div>
        </div>
    );
}

export default Comment;
