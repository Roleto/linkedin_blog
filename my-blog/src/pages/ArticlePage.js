import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import articles from "./article-content";
import NotFound from "./NotFound";
import axios from 'axios';
import CommentList from "../components/CommentsList";
import AddCommentFrom from "../components/AddCommentFrom";
import useUser from "../hooks/useUser";

const ArticlePage = () => {

    const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [], canUpvote: false });
    const { articleId } = useParams();

    const { user, isLoading } = useUser();

    useEffect(() => {
        const loadArticleInfo = async () => {
            const token = user && await user.getIdToken();
            const headers = token ? { authtoken: token } : {};
            const res = await axios.get(`/api/articles/${articleId}`, { headers });
            const newArticleInfo = res.data;
            setArticleInfo(newArticleInfo);
        }
        if (isLoading) {
            loadArticleInfo();
        }
    }, [isLoading, user]);
    const article = articles.find(x => x.name === articleId);

    const addUpvote = async () => {
        const token = user && await user.getIdToken();
        const headers = token ? { authtoken: token } : {};
        const res = await axios.put(`/api/articles/${articleId}/upvote`, null, { headers });
        setArticleInfo(res.data);
    }

    if (!article) {
        return <NotFound />
    }

    if (isLoading) {
        return <h1>is Loading ...</h1>
    }

    return (
        <>
            <h1>{article.title}</h1>
            <div className="upvotes-section">
                {user
                    ? <button onClick={addUpvote}>{articleInfo.canUpvote ? 'Up vote' : 'Already Upvoted'}</button>
                    : <button>Log in to upvote</button>
                }
                <p>this article has {articleInfo.upvotes} upvote(s)</p>
            </div>
            {article.content.map((p, i) => (
                <p key={i} >{p}</p>
            ))}
            {user
                ? <AddCommentFrom articleName={articleId} onArticleUpdated={updateArticle => setArticleInfo(updateArticle)} />
                : <button>Log in to write comment.</button>
            }
            <CommentList comments={articleInfo.comments} />
        </>
    );
}

export default ArticlePage;