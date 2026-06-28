// Blog Configuration
export const blogConfig = {
    postsPerPage: 6,
    showReadTime: true,
    enableComments: false,
    categories: ["devlog", "tutorial", "personal", "tech", "projects"],
    defaultThumbnail: "/images/blog/default.png",
    author: {
        name: "han",
        avatar: "/images/avatar.png",
    },
};

const blogPosts = [
    {
        id: "hello-world",
        title: "Hello World!: My first blog post",
        description: "Welcome to my devlog! Here, I will share my journey of exploring web development.",
        date: "2026-06-27",
        tags: ["general", "intro"],
        filename: "hello-world.md",
        thumbnail: "/images/blog/",
        readTime: "2 min",
        author: "han",
        featured: true,
        category: "personal",
    },
];

export default blogPosts;
