# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a GitHub Pages static website project (`mswnlz/mswnlz.github.io`) built with VitePress, showcasing content from all resource repositories in the mswnlz ecosystem. The repository includes:

- VitePress-based static site generator configuration
- Documentation pages linking to all ecosystem repositories
- GitHub Pages deployment automation
- Responsive design with modern UI/UX

## Architecture

### Repository Structure
- `docs/` - VitePress documentation directory
- `docs/.vitepress/` - VitePress configuration and build output
- `docs/.vitepress/config.ts` - Site configuration file
- `docs/.vitepress/dist/` - Build output directory for GitHub Pages
- `docs/public/` - Static assets and resources
- `package.json` - Node.js dependencies for VitePress
- `CNAME` - Custom domain configuration
- `WARP.md` - This configuration file

### VitePress Configuration
The site configuration includes:
- Multi-language support for internationalization
- Responsive navigation and sidebar
- SEO optimization with meta tags
- Social media integration
- Search functionality

## Common Commands

### Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### GitHub Pages Deployment
```bash
# Build and deploy to GitHub Pages
npm run build
git add docs/.vitepress/dist
git commit -m "Update build artifacts"
git push origin main
```

### Content Management
```bash
# Update repository content
git add docs/
git commit -m "Update documentation content"
git push origin main

# Sync with all ecosystem repositories
git submodule update --recursive --remote
```

## Content Guidelines

### Documentation Structure
- Keep navigation simple and intuitive
- Organize content by repository category
- Include search-friendly page titles and descriptions
- Maintain consistent formatting across all pages

### Website Maintenance
- Regularly update build artifacts after content changes
- Monitor GitHub Pages deployment status
- Ensure all external links remain functional
- Keep VitePress dependencies up to date

## Ecosystem Integration

This website serves as the central hub for the entire mswnlz project ecosystem:

### Resource Repositories
- `tools` - Software tools and utilities
- `cross-border` - E-commerce resources
- `healthy` - Health and fitness content
- `curriculum` - Educational materials
- `AIknowledge` - AI and technology resources
- `auto` - Automation tools and scripts
- `book` - Literature and reading materials
- `movies` - Entertainment and media content
- `self-media` - Social media resources
- `edu-knowledge` - Educational knowledge base
- `chinese-traditional` - Traditional culture content

### Technical Infrastructure
- Automated build and deployment pipeline
- SEO optimization for search engines
- Mobile-responsive design
- Fast loading times with static generation

## Multilingual Support

The website supports multiple languages through VitePress i18n:
- Primary: Chinese (Simplified and Traditional)
- Secondary: English for international users
- Additional language support can be configured as needed

## Performance Optimization

### Build Optimization
- Static site generation for fast loading
- Automatic code splitting and lazy loading
- Image optimization and compression
- CSS and JavaScript minification

### SEO Features
- Automatic sitemap generation
- Meta tags optimization
- Social media previews (Open Graph, Twitter Cards)
- Schema.org structured data

## Deployment Pipeline

The site uses GitHub Pages with automated deployment:
1. Content updates trigger VitePress build
2. Build artifacts are committed to repository
3. GitHub Pages automatically deploys from `docs/.vitepress/dist`
4. Changes are live within minutes of pushing
