# Personal Website SEO Best Practices

Want your portfolio to stand out on Google? Here’s a comprehensive guide to SEO for personal websites.

## Why SEO Matters

Even as a developer, you want recruiters and clients to find you. Good SEO can be the difference between being invisible and appearing on the first page of search results.

## Technical SEO Basics

### 1. Meta Tags

Every page should have unique meta tags:

```html
<head>
    <title>Puppy | Web Developer Portfolio</title>
    <meta name="description" content="Full-stack developer..." />
    <meta name="keywords" content="web developer, react, portfolio" />
</head>
```

### 2. Open Graph Tags

Used for social media sharing:

```html
<meta property="og:title" content="LumiYi Portfolio" />
<meta property="og:description" content="..." />
<meta property="og:image" content="https://..." />
<meta property="og:url" content="https://Puppyz4nx.dev" />
```

### 3. Semantic HTML

Use proper heading hierarchy:

```html
<h1>Main Title</h1>      <!-- Only one per page -->
<h2>Section Title</h2>
<h3>Subsection</h3>
```

## Performance Optimization

### Core Web Vitals

1. **LCP (Largest Contentful Paint)**: < 2.5s
2. **FID (First Input Delay)**: < 100ms
3. **CLS (Cumulative Layout Shift)**: < 0.1

### Image Optimization

* Use modern formats (WebP, AVIF)
* Implement lazy loading
* Provide meaningful `alt` text

```html
<img 
    src="photo.webp" 
    alt="Project screenshot showing dashboard interface"
    loading="lazy"
/>
```

## Content Strategy

### 1. Update Your Blog Regularly

Fresh content signals to Google that your site is active.

### 2. Use Long-Tail Keywords

*"React developer portfolio Vietnam"* > *"developer portfolio"*

### 3. Internal Linking

Create natural links between your pages.

## Structured Data

Help search engines understand your content:

```json
{
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "puppy",
    "jobTitle": "Developer",
    "url": "https://puppyz4nx.dev"
}
```

## Recommended Tools

| Tool                  | Purpose                    |
| --------------------- | -------------------------- |
| Google Search Console | Monitor search performance |
| Lighthouse            | Audit performance & SEO    |
| GTmetrix              | Speed analysis             |
| Ahrefs/SEMrush        | Keyword research           |

## Quick Checklist

* [ ] Unique title tag (< 60 characters)
* [ ] Meta description (< 160 characters)
* [ ] Mobile responsive design
* [ ] Fast loading speed
* [ ] SSL certificate (HTTPS)
* [ ] XML sitemap
* [ ] robots.txt file
* [ ] Image alt attributes

## Conclusion

SEO is a marathon, not a sprint. Stick to these practices and watch your visibility grow over time! 📈
