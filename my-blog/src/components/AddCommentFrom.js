import { useState } from "react";
import axios from "axios";
import useUser from "../hooks/useUser";
const AddCommentFrom = ({ articleName, onArticleUpdated }) => {
    const [name, setName] = useState('');
    const [commentText, setCommentText] = useState('');
    const { user } = useUser();

    const addComment = async () => {
        const token = user && await user.getIdToken();
        const headers = token ? { authtoken: token } : {};
        const res = await axios.post(`/api/articles/${articleName}/comments`, {
            postedBy: name,
            text: commentText,
        }, { headers });
        onArticleUpdated(res.data)
        setName('');
        setCommentText('');
    }
    return (
        <div id="add-comment-form">
            <h3>Add a Comment</h3>
            {user && <p>You are posting as {user.email}</p>}
            <label>
                <textarea rows="4" cols="50" value={commentText} onChange={e => setCommentText(e.target.value)} />
            </label>
            <button onClick={addComment}>Add Comment</button>
        </div >
    )
}

export default AddCommentFrom;