import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import articles from "./article-content";
import NotFound from "./NotFound";
import axios from 'axios';
import CommentList from "../components/CommentsList";

const ArticlePage = () => {

    const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] });

    const { articleId } = useParams();
    useEffect(() => {
        const loadArticleInfo = async () => {

            const res = await axios.get(`/api/articles/${articleId}`);
            const newArticleInfo = res.data;
            setArticleInfo(newArticleInfo);
        }
        loadArticleInfo();
    }, []);
    const article = articles.find(x => x.name === articleId);

    const addUpvote = async () => {
        const res = await axios.put(`/api/articles/${articleId}/upvote`);
        const updateArticle = res.data;
        setArticleInfo(updateArticle);
        // setArticleInfo(res.data);
    }

    if (!article) {
        return <NotFound />
    }
    return (
        <>
            <h1>{article.title}</h1>
            <div className="upvotes-section">
                <button onClick={addUpvote}>Upvote</button>
                <p>this article has {articleInfo.upvotes} upvote(s)</p>
            </div>
            {article.content.map((p, i) => (
                <p key={i} >{p}</p>
            ))}
            <CommentList comments={articleInfo.comments} />
        </>
    );
}

export default ArticlePage;