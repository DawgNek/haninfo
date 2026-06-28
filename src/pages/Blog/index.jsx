import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import blogPosts from "../../config/blog";
import routes from "../../config/routes";
import { FaCalendarAlt, FaTag } from "react-icons/fa";
import useSEO from "../../hooks/useSEO";
import { pageVariants, itemVariants } from "../../config/animations";

function Blog() {
    useSEO({
        title: "Blog",
        description: "Share my thoughts and coding journey.",
        keywords: "blog, devlog, coding, tutorial",
        url: "https://puppyz4nx.is-a.dev/blog"
    });

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={pageVariants}
            className="font-extrabold text-neutral-800 dark:text-neutral-200 w-full pb-20 px-4 md:px-8"
        >
            {/* Title */}
            <motion.div
                className="mb-12 flex items-center gap-3 text-3xl font-extrabold"
                variants={itemVariants}
            >
                <div className="bg-neutral-800 dark:bg-white h-[36px] w-2 rounded"></div>
                <h2>Blog & Devlog ✍️</h2>
            </motion.div>

            {/* Blog Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {blogPosts.map((post) => (
                    <motion.div
                        key={post.id}
                        variants={itemVariants}
                        whileHover={{ scale: 1.02 }}
                        className="h-full"
                    >
                        <Link
                            to={routes.blog + "/" + post.id}
                            className="flex flex-col h-full p-5 rounded-xl border bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all duration-300"
                        >
                            {/* Title */}
                            <h3 className="text-base font-bold text-slate-800 dark:text-white mb-2 line-clamp-2">
                                {post.title}
                            </h3>

                            {/* Meta: Date & Tags */}
                            <div className="flex flex-wrap gap-3 text-xs text-slate-500 dark:text-slate-400 mb-3 font-medium">
                                <div className="flex items-center gap-1">
                                    <FaCalendarAlt className="text-[10px]" />
                                    <span>{post.date}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <FaTag className="text-[10px]" />
                                    <div className="flex gap-1.5 flex-wrap">
                                        {post.tags.slice(0, 3).map((tag) => (
                                            <span key={tag}>#{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-3 line-clamp-2 flex-1">
                                {post.description}
                            </p>

                            {/* Read More */}
                            <div className="mt-auto pt-3 border-t border-slate-100 dark:border-slate-700">
                                <span className="text-sm font-bold text-slate-800 dark:text-white">
                                    Read More →
                                </span>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

export default Blog;
