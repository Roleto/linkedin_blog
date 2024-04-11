import { useParams } from "react-router-dom";
import articles from "./article-content";
import NotFound from "./NotFound";
const ArticlePage = () => {
    const { articleId } = useParams();
    const article = articles.find(x => x.name === articleId);

    if (!article) {
        return <NotFound />
    }
    return (
        <>
            <h1>{article.title}</h1>
            {article.content.map((p, i) => (
                <p key={i} >{p}</p>
            ))}
        </>
    );
}

export default ArticlePage;