import { useState } from "react";
import axios from "axios";
const AddCommentFrom = ({ articleName, onArticleUpdated }) => {
    const [name, setName] = useState('');
    const [commentText, setCommentText] = useState('');

    const addComment = async () => {
        const res = await axios.post(`/api/articles/${articleName}/comments`, {
            postedBy: name,
            text: commentText,
        });
        onArticleUpdated(res.data)
        setName('');
        setCommentText('');
    }
    return (
        <div id="add-comment-form">
            <h3>Add a Comment</h3>
            <label>
                Name:
                <input type="text" value={name} onChange={e => setName(e.target.value)} />
            </label>
            <label>
                Name:
                <textarea rows="4" cols="50" value={commentText} onChange={e => setCommentText(e.target.value)} />
            </label>
            <button onClick={addComment}>Add Comment</button>
        </div >
    )
}

export default AddCommentFrom;