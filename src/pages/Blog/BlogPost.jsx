import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { motion } from "framer-motion";
import blogPosts from "../../config/blog";
import routes from "../../config/routes";
import { FaArrowLeft, FaCalendarAlt, FaTag } from "react-icons/fa";
import useSEO from "../../hooks/useSEO";
import { pageVariants, itemVariants } from "../../config/animations";

function BlogPost() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [content, setContent] = useState("");
    const [post, setPost] = useState(null);

    useEffect(() => {
        const currentPost = blogPosts.find((p) => p.id === id);
        if (!currentPost) {
            navigate(routes.notfound);
            return;
        }
        setPost(currentPost);

        fetch(`/content/blog/${currentPost.filename}`)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to load post");
                return res.text();
            })
            .then((text) => setContent(text))
            .catch((err) => console.error(err));
    }, [id, navigate]);

    useSEO({
        title: post?.title,
        description: post?.description,
        keywords: post?.tags?.join(", "),
        url: post ? `https://puppyz4nx/blog/${post.id}` : undefined
    });

    if (!post) return <div className="p-10 text-center font-bold text-slate-600 dark:text-slate-400">Loading...</div>;

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={pageVariants}
            className="w-full pb-20 px-4 md:px-8"
        >
            <motion.div variants={itemVariants} className="max-w-4xl mx-auto">
                <Link
                    to={routes.blog}
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-[#242424]-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors mb-8 font-bold text-sm"
                >
                    <FaArrowLeft /> Back to Blog
                </Link>

                <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-[#242424]-700 rounded-2xl p-6 md:p-10 shadow-sm">
                    <header className="mb-8 border-b border-slate-200 dark:border-slate-700 pb-8">
                        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 dark:text-white mb-6 leading-tight">
                            {post.title}
                        </h1>
                        <div className="flex flex-wrap gap-4 text-sm text-[#242424]-600 dark:text-slate-400 font-medium">
                            <div className="flex items-center gap-2 bg-white dark:bg-[#242424]-700 px-3 py-1 rounded border border-slate-200 dark:border-slate-600">
                                <FaCalendarAlt className="text-slate-400 dark:text-slate-300" />
                                <span>{post.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FaTag className="text-slate-400 dark:text-slate-300" />
                                <div className="flex gap-2">
                                    {post.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="bg-white dark:bg-slate-700 px-3 py-1 rounded border border-slate-200 dark:border-slate-600 text-[#242424]700 dark:text-slate-300"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </header>

                    <article className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-cyan-600 dark:prose-a:text-cyan-400 hover:prose-a:text-cyan-700 dark:hover:prose-a:text-cyan-300 prose-img:rounded-xl">
                        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>
                    </article>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default BlogPost;

