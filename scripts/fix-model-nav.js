const fs = require('fs');
const path = require('path');

// List of all model directories that need updating
const modelsDir = path.join(__dirname, '..', 'models');

// The correct header HTML
const correctHeader = `    <header class="header">
        <div class="header-inner">
            <a href="/" class="logo">
                <img src="/images/logo.svg" alt="Mac Screen Repair Sydney" width="180" height="40">
            </a>
            <nav class="nav-menu">
                <a href="/">Home</a>
                <div class="dropdown">
                    <a href="/services/" class="dropdown-toggle">Services</a>
                    <div class="dropdown-menu">
                        <a href="/services/lcd-only-macbook-screen-repair/">LCD Only Replacement</a>
                        <a href="/services/full-display-macbook-screen-replacement/">Full Display Replacement</a>
                        <a href="/services/true-tone-missing-after-screen-repair/">True Tone Explained</a>
                    </div>
                </div>
                <div class="dropdown">
                    <a href="/models/" class="dropdown-toggle">Models</a>
                    <div class="dropdown-menu">
                        <a href="/models/">All MacBook Models</a>
                        <a href="/models/macbook-air-13-m3-screen-repair/">MacBook Air 13" M3</a>
                        <a href="/models/macbook-pro-14-m3-screen-repair/">MacBook Pro 14" M3</a>
                        <a href="/models/macbook-pro-16-m3-screen-repair/">MacBook Pro 16" M3</a>
                    </div>
                </div>
                <div class="dropdown">
                    <a href="/areas/" class="dropdown-toggle">Areas</a>
                    <div class="dropdown-menu">
                        <a href="/areas/">All Service Areas</a>
                        <a href="/areas/parramatta/">Parramatta</a>
                        <a href="/areas/castle-hill/">Castle Hill</a>
                        <a href="/areas/penrith/">Penrith</a>
                    </div>
                </div>
                <a href="/pricing-guide/">Pricing</a>
                <a href="/contact/">Contact</a>
            </nav>
            <div class="header-actions">
                <a href="/book/" class="btn btn-primary">Book Repair</a>
                <button class="mobile-toggle" aria-label="Toggle menu">
                    <i class="fas fa-bars"></i>
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </div>
    </header>`;

// The correct footer HTML
const correctFooter = `    <footer class="footer">
        <div class="footer-grid">
            <div class="footer-brand">
                <img src="/images/logo.svg" alt="Mac Screen Repair Sydney" width="150" height="33">
                <p>Sydney's trusted MacBook screen repair specialists. LCD repairs and full display replacements for all MacBook models.</p>
            </div>
            <div class="footer-links">
                <h4>Services</h4>
                <ul>
                    <li><a href="/services/lcd-only-macbook-screen-repair/">LCD Only Repair</a></li>
                    <li><a href="/services/full-display-macbook-screen-replacement/">Full Display Replacement</a></li>
                    <li><a href="/services/true-tone-missing-after-screen-repair/">True Tone Explained</a></li>
                </ul>
            </div>
            <div class="footer-links">
                <h4>Quick Links</h4>
                <ul>
                    <li><a href="/models/">All Models</a></li>
                    <li><a href="/areas/">Service Areas</a></li>
                    <li><a href="/pricing-guide/">Pricing Guide</a></li>
                    <li><a href="/warranty/">Warranty</a></li>
                    <li><a href="/contact/">Contact</a></li>
                </ul>
            </div>
            <div class="footer-links">
                <h4>Contact</h4>
                <ul>
                    <li>Sydney, Australia</li>
                    <li>Mon-Sat: 8am-6pm</li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2025 Mac Screen Repair Sydney. All rights reserved.</p>
        </div>
    </footer>`;

// Correct head section imports
const correctHeadImports = `    <link rel="stylesheet" href="/css/style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Inter+Tight:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">`;

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if file needs updating (has old nav-links)
    if (!content.includes('nav-links')) {
        console.log(`Skipping ${filePath} - already updated`);
        return false;
    }
    
    // Replace relative URLs with absolute
    content = content.replace(/href="\.\.\/\.\.\//g, 'href="/');
    content = content.replace(/href="\.\.\/"/g, 'href="/models/"');
    content = content.replace(/href="\.\.\//g, 'href="/');
    content = content.replace(/src="\.\.\/\.\.\//g, 'src="/');
    
    // Fix CSS link
    content = content.replace(/<link rel="stylesheet" href="\/css\/style\.css">[\s\S]*?<link href="https:\/\/fonts\.googleapis\.com\/css2\?family=Inter[^"]*" rel="stylesheet">/,
        correctHeadImports);
    
    // Also handle the case where it might have different font imports
    content = content.replace(/<link rel="stylesheet" href="\/css\/style\.css">\s*<link rel="preconnect" href="https:\/\/fonts\.googleapis\.com">\s*<link rel="preconnect" href="https:\/\/fonts\.gstatic\.com" crossorigin>\s*<link href="https:\/\/fonts\.googleapis\.com\/css2\?family=Inter[^"]*" rel="stylesheet">/,
        correctHeadImports);
    
    // Replace old header with new header
    const headerRegex = /<header class="header">[\s\S]*?<\/header>/;
    content = content.replace(headerRegex, correctHeader);
    
    // Replace old footer with new footer
    const footerRegex = /<footer class="footer">[\s\S]*?<\/footer>/;
    content = content.replace(footerRegex, correctFooter);
    
    // Fix breadcrumb links
    content = content.replace(/<a href="\/\/">Home<\/a>/g, '<a href="/">Home</a>');
    content = content.replace(/<a href="\/models\/\/">Models<\/a>/g, '<a href="/models/">Models</a>');
    
    // Fix script src
    content = content.replace(/src="\/js\/main\.js"/g, 'src="/js/main.js"');
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
    return true;
}

// Get all subdirectories in models folder
const modelDirs = fs.readdirSync(modelsDir).filter(item => {
    const itemPath = path.join(modelsDir, item);
    return fs.statSync(itemPath).isDirectory();
});

let updatedCount = 0;
let skippedCount = 0;

modelDirs.forEach(dir => {
    const indexPath = path.join(modelsDir, dir, 'index.html');
    if (fs.existsSync(indexPath)) {
        if (processFile(indexPath)) {
            updatedCount++;
        } else {
            skippedCount++;
        }
    }
});

console.log(`\nDone! Updated ${updatedCount} files, skipped ${skippedCount} files.`);