/**
 * Sitemap Generator for MacBook Screen Repair
 * 
 * Run this script to regenerate sitemap.xml whenever pages are added or removed.
 * Usage: node generate-sitemap.js
 */

const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://macbookscreenrepairsydney.com.au';
const ROOT_DIR = __dirname;

// Priority settings based on page type
const PRIORITIES = {
    'index.html': '1.0',           // Homepage
    'services/index.html': '0.9',
    'models/index.html': '0.9',
    'areas/index.html': '0.9',
    'pricing-guide/index.html': '0.9',
    'book/index.html': '0.9',
    'contact/index.html': '0.8',
    'about/index.html': '0.8',
    'warranty/index.html': '0.7',
    'services/': '0.8',            // Service pages
    'models/': '0.7',              // Model pages
    'areas/': '0.6',               // Area pages
    'default': '0.5'
};

// Change frequency settings
const CHANGEFREQ = {
    'index.html': 'weekly',
    'services/': 'monthly',
    'models/': 'monthly',
    'areas/': 'monthly',
    'pricing-guide/': 'weekly',
    'default': 'monthly'
};

/**
 * Get all HTML files recursively
 */
function getHtmlFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            // Skip hidden directories, node_modules, .git, etc.
            if (!file.startsWith('.') && file !== 'node_modules') {
                getHtmlFiles(filePath, fileList);
            }
        } else if (file === 'index.html') {
            fileList.push(filePath);
        }
    }
    
    return fileList;
}

/**
 * Convert file path to URL
 */
function pathToUrl(filePath) {
    let relativePath = path.relative(ROOT_DIR, filePath);
    relativePath = relativePath.replace(/\\/g, '/'); // Windows compatibility
    
    // Remove index.html from the end
    if (relativePath === 'index.html') {
        return DOMAIN + '/';
    }
    
    // Convert folder/index.html to folder/
    relativePath = relativePath.replace('/index.html', '/');
    
    return DOMAIN + '/' + relativePath;
}

/**
 * Get priority for a URL
 */
function getPriority(relativePath) {
    // Check exact matches first
    if (PRIORITIES[relativePath]) {
        return PRIORITIES[relativePath];
    }
    
    // Check prefix matches
    for (const prefix of Object.keys(PRIORITIES)) {
        if (relativePath.startsWith(prefix)) {
            return PRIORITIES[prefix];
        }
    }
    
    return PRIORITIES['default'];
}

/**
 * Get change frequency for a URL
 */
function getChangeFreq(relativePath) {
    for (const prefix of Object.keys(CHANGEFREQ)) {
        if (relativePath.startsWith(prefix)) {
            return CHANGEFREQ[prefix];
        }
    }
    
    return CHANGEFREQ['default'];
}

/**
 * Get file modification date
 */
function getLastMod(filePath) {
    const stat = fs.statSync(filePath);
    return stat.mtime.toISOString().split('T')[0];
}

/**
 * Generate sitemap XML
 */
function generateSitemap() {
    const htmlFiles = getHtmlFiles(ROOT_DIR);
    
    // Sort files for consistent output
    htmlFiles.sort((a, b) => {
        const relA = path.relative(ROOT_DIR, a);
        const relB = path.relative(ROOT_DIR, b);
        return relA.localeCompare(relB);
    });
    
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    
    for (const filePath of htmlFiles) {
        const relativePath = path.relative(ROOT_DIR, filePath).replace(/\\/g, '/');
        const url = pathToUrl(filePath);
        const lastmod = getLastMod(filePath);
        const priority = getPriority(relativePath);
        const changefreq = getChangeFreq(relativePath);
        
        xml += '  <url>\n';
        xml += `    <loc>${url}</loc>\n`;
        xml += `    <lastmod>${lastmod}</lastmod>\n`;
        xml += `    <changefreq>${changefreq}</changefreq>\n`;
        xml += `    <priority>${priority}</priority>\n`;
        xml += '  </url>\n';
    }
    
    xml += '</urlset>\n';
    
    return xml;
}

/**
 * Main function
 */
function main() {
    console.log('Generating sitemap.xml...');
    
    const sitemap = generateSitemap();
    const outputPath = path.join(ROOT_DIR, 'sitemap.xml');
    
    fs.writeFileSync(outputPath, sitemap, 'utf8');
    
    // Count pages
    const pageCount = (sitemap.match(/<url>/g) || []).length;
    
    console.log(`✓ Sitemap generated successfully!`);
    console.log(`✓ Total pages: ${pageCount}`);
    console.log(`✓ Output: ${outputPath}`);
}

main();