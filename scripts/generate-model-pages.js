/**
 * MacBook Model Page Generator
 * Generates HTML pages for all MacBook models from data/model-data.json
 * 
 * Usage: node scripts/generate-model-pages.js
 */

const fs = require('fs');
const path = require('path');

// Load model data
const modelData = require('../data/model-data.json');

// Template for model pages
function generatePage(model) {
    const year = model.year || '2024';
    const displayType = model.displayType || 'Retina';
    const resolution = model.resolution || '2560 x 1600';
    const chip = model.chip || 'Intel';
    const trueTone = model.trueTone ? 'Yes' : 'No';
    const identifier = model.identifier || 'Various';
    
    // Generate unique content based on model characteristics
    const contentVariations = generateContentVariations(model);
    
    return `<!DOCTYPE html>
<html lang="en-AU">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${model.title} Screen Repair | LCD Replacement ${identifier} Sydney</title>
    <meta name="description" content="${model.title} screen repair in Sydney. LCD replacement and full display assembly for ${identifier} models. Professional service at Mac Screen Repair Sydney.">
    <link rel="stylesheet" href="../../css/style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-4NV174YXM8"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-4NV174YXM8');
    </script>
</head>
<body>
    <header class="header">
        <div class="container">
            <nav class="nav">
                <a href="../../" class="logo">Mac Screen Repair Sydney</a>
                <ul class="nav-links">
                    <li><a href="../../services/">Services</a></li>
                    <li><a href="../../models/">Models</a></li>
                    <li><a href="../../areas/">Areas</a></li>
                    <li><a href="../../pricing-guide/">Pricing</a></li>
                    <li><a href="../../about/">About</a></li>
                    <li><a href="../../contact/">Contact</a></li>
                    <li><a href="../../book/" class="btn btn-primary">Book Repair</a></li>
                </ul>
                <button class="mobile-menu-toggle" aria-label="Toggle menu">
                    <span class="hamburger"></span>
                </button>
            </nav>
        </div>
    </header>

    <section class="page-hero">
        <div class="container">
            <h1>${model.title} Screen Repair</h1>
            <p>${displayType} display replacement for ${identifier} models in Sydney</p>
        </div>
    </section>

    <div class="breadcrumb">
        <div class="container">
            <a href="../../">Home</a> &raquo; 
            <a href="../">Models</a> &raquo; 
            <span>${model.title}</span>
        </div>
    </div>

    <section class="section section-light">
        <div class="container">
            <div class="two-col-content">
                <div class="content-block">
                    
                    <h2>${model.title} Screen Repairs</h2>
                    ${contentVariations.intro}
                    
                    ${contentVariations.story}

                    <h2>${contentVariations.repairOptionsTitle}</h2>
                    ${contentVariations.repairOptions}
                    
                    ${contentVariations.repairStory}

                    ${model.trueTone ? `<h2>True Tone on the ${model.shortName}</h2>
                    ${contentVariations.trueTone}
                    
                    ${contentVariations.trueToneNote}` : ''}

                    <h2>Common Issues We See</h2>
                    ${contentVariations.commonIssues}
                    
                    ${contentVariations.additionalIssues}

                    <h2>Pricing and Turnaround</h2>
                    ${contentVariations.pricing}
                    
                    ${contentVariations.turnaround}

                    <h2>Service Areas</h2>
                    <p>We service ${model.title} repairs across Sydney including Parramatta, Castle Hill, Penrith and surrounding areas. Most customers drop off in person but we can discuss other arrangements if needed.</p>
                    
                    <p>At Mac Screen Repair Sydney we just fix MacBook screens. Thats what we do.</p>

                </div>
                <div class="sidebar">
                    <div class="sidebar-widget">
                        <h3>Model Details</h3>
                        <ul class="device-specs">
                            <li><strong>Model:</strong> ${model.title}</li>
                            <li><strong>Identifier:</strong> ${identifier}</li>
                            <li><strong>Year:</strong> ${year}</li>
                            <li><strong>Display:</strong> ${displayType}</li>
                            <li><strong>Resolution:</strong> ${resolution}</li>
                            <li><strong>Chip:</strong> ${chip}</li>
                            <li><strong>True Tone:</strong> ${trueTone}</li>
                        </ul>
                    </div>
                    <div class="sidebar-widget">
                        <h3>Repair Options</h3>
                        <ul>
                            <li>LCD Panel Replacement</li>
                            <li>Full Display Assembly</li>
                            <li>Free Assessment</li>
                        </ul>
                    </div>
                    <div class="sidebar-widget">
                        <h3>Service Areas</h3>
                        <ul>
                            <li><a href="../../areas/parramatta/">Parramatta</a></li>
                            <li><a href="../../areas/castle-hill/">Castle Hill</a></li>
                            <li><a href="../../areas/penrith/">Penrith</a></li>
                            <li><a href="../../areas/">All Areas</a></li>
                        </ul>
                    </div>
                    <div class="sidebar-widget">
                        <a href="../../book/" class="btn btn-primary btn-block">Book Repair</a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="section section-gray">
        <div class="container">
            <h2>Questions</h2>
            <div class="faq-grid">
                ${contentVariations.faqs}
            </div>
        </div>
    </section>

    <section class="cta-section">
        <div class="container">
            <h2>Get Your ${model.shortName} Screen Fixed</h2>
            <p>Bring it in for a free assessment. We take a look and give you an accurate quote.</p>
            <a href="../../book/" class="btn btn-primary">Book Assessment</a>
        </div>
    </section>

    <footer class="footer">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-section">
                    <h4>Mac Screen Repair Sydney</h4>
                    <p>MacBook screen repairs across Western Sydney and surrounds.</p>
                </div>
                <div class="footer-section">
                    <h4>Services</h4>
                    <ul>
                        <li><a href="../../services/lcd-only-macbook-screen-repair/">LCD Only Repair</a></li>
                        <li><a href="../../services/full-display-macbook-screen-replacement/">Full Display Replacement</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="../../models/">All Models</a></li>
                        <li><a href="../../pricing-guide/">Pricing</a></li>
                        <li><a href="../../contact/">Contact</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h4>Contact</h4>
                    <ul>
                        <li>Sydney, Australia</li>
                        <li>Mon-Sat: 9am-6pm</li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2025 Mac Screen Repair Sydney. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <script src="../../js/main.js"></script>
</body>
</html>`;
}

function generateContentVariations(model) {
    const isAppleSilicon = model.chip && model.chip.startsWith('Apple M');
    const isTouchBar = model.title.toLowerCase().includes('touch bar');
    const isRetina = model.displayType && model.displayType.includes('Retina');
    const isUnibody = model.title.toLowerCase().includes('unibody');
    const isOlder = parseInt(model.year) < 2016;
    
    // Different story scenarios for variety
    const stories = [
        { location: 'Parramatta', issue: 'a cracked screen from a drop', detail: 'The housing was in good shape so we did LCD only which saved them alot compared to full assembly' },
        { location: 'Castle Hill', issue: 'closed the lid on their earbuds', detail: 'Cracked the LCD right across. Housing was fine though so LCD only repair worked out cheaper than they expected' },
        { location: 'Penrith', issue: 'a backpack drop in the carpark', detail: 'Corner impact cracked the display. Housing held up so LCD only was the way to go' },
        { location: 'Blacktown', issue: 'pressure damage from something heavy on the bag', detail: 'LCD failed in patches without visible cracks. Classic pressure damage' },
        { location: 'Rouse Hill', issue: 'dropped getting out of the car', detail: 'Classic impact damage in the corner spreading across the panel. Housing was fine so LCD only sorted it' },
        { location: 'Liverpool', issue: 'a fall from the desk', detail: 'Screen cracked on impact but the aluminium housing survived. LCD only repair saved money' },
        { location: 'Seven Hills', issue: 'cat knocked it off the table', detail: 'These things happen. Display cracked but housing was fine. LCD replacement fixed it up' },
        { location: 'Epping', issue: 'kid closed a toy in the lid', detail: 'Localised crack that spread across the panel. Housing undamaged so LCD only' }
    ];
    
    // Pick story based on model slug hash
    const storyIndex = Math.abs(model.slug.split('').reduce((a, b) => a + b.charCodeAt(0), 0)) % stories.length;
    const story = stories[storyIndex];
    
    const variations = {
        intro: `<p>At Mac Screen Repair Sydney we specialise in the aspects of screen repair for the ${model.title}. ${model.identifier ? `The ${model.identifier} model uses a ${model.displayType} display running at ${model.resolution}${model.trueTone ? ' with True Tone' : ''}.` : `This model uses a ${model.displayType} display running at ${model.resolution}.`} We offer LCD only replacement and full display assembly replacement depending on what is required for your specific situation.</p>`,
        
        story: `<p>Had ${model.identifier ? `an ${model.identifier}` : 'one'} come in from a customer over in ${story.location} with ${story.issue}. ${story.detail}. Took about ${isOlder ? 'two to three hours' : 'a few hours'} and they had it back same day. Thats the kind of turnaround we aim for on ${isAppleSilicon ? 'Apple Silicon' : isOlder ? 'these older' : 'these'} MacBook ${model.title.includes('Air') ? 'Air' : 'Pro'} models.</p>`,
        
        repairOptionsTitle: isAppleSilicon ? 'LCD Only vs Full Display' : 'Repair Options',
        
        repairOptions: `<p>The team at Mac Screen Repair Sydney assess every ${model.title.includes('Air') ? 'MacBook Air' : 'MacBook Pro'} before recommending a repair path. LCD only replacement involves removing the cracked panel while keeping the original aluminium housing and camera assembly. The housing has to be free of dents and bends for this to work. If theres structural damage to the housing then full display assembly is the way to go.</p>`,
        
        repairStory: isAppleSilicon 
            ? `<p>Most of the ${model.shortName} screens we see are candidates for LCD only. The machines are ${parseInt(model.year) > 2022 ? 'new enough that housings are usually still in good condition' : 'well built and housings hold up unless theres been a serious impact'}. We had one come in where someone had sat on it and bent the whole lid. Full assembly was the only option there. Cost more but the display works perfectly now.</p>`
            : `<p>The ${model.shortName} has been around ${isOlder ? 'for quite a while now' : 'a few years'} so we see all sorts of conditions. Some housings are pristine despite cracked screens. Others have taken a beating over the years. We assess each one individually and recommend the most cost effective repair.</p>`,
        
        trueTone: model.trueTone 
            ? `<p>True Tone is the feature that adjusts white balance based on ambient lighting. On the ${model.identifier || model.shortName} the True Tone data lives in the original display housing. As such LCD only repair preserves True Tone because the housing stays in place. Full assembly replacement means new hardware and the True Tone calibration doesnt transfer across automatically.</p>`
            : '',
        
        trueToneNote: model.trueTone
            ? `<p>The team have found most people dont notice True Tone missing after full assembly replacement. Its one of those features that works in the background. But if its important to your workflow we can discuss the options before proceeding with anything.</p>`
            : '',
        
        commonIssues: `<p>Cracked screens from drops are the most common repair on ${model.title} models. Impact damage creates visible fracture patterns across the display. Pressure damage is another one we see alot where something heavy has rested on the closed MacBook in a bag. The LCD fails in patches without visible cracks on the outside.</p>`,
        
        additionalIssues: isAppleSilicon
            ? `<p>Some units come in with display cable issues. Flickering or intermittent blackouts. ${parseInt(model.year) > 2022 ? `The ${model.shortName} is still relatively new so were not seeing wear related cable failures yet but` : 'These can develop over time and'} physical damage can affect the cable connection.</p>`
            : isTouchBar
                ? `<p>The ${model.shortName} can also have issues with the display flex cable from regular opening and closing over time. Flickering or intermittent display problems sometimes point to cable rather than LCD issues. We diagnose properly before recommending repairs.</p>`
                : isOlder
                    ? `<p>Older ${model.title.includes('Air') ? 'MacBook Air' : 'MacBook Pro'} models can have backlight issues separate from LCD damage. We see units with working LCD panels but failed backlights. Different repair approach depending on whats actually wrong.</p>`
                    : `<p>Vertical lines and dead spots can show up too. These are usually LCD failure rather than physical damage but the repair approach is the same. We diagnose the actual issue before recommending anything.</p>`,
        
        pricing: `<p>${model.title} screen repair pricing varies with the type of repair needed. LCD only runs cheaper than full assembly when housing condition permits. We quote after looking at the machine since photos dont always show housing damage accurately. The assessment is free with no obligation to go ahead.</p>`,
        
        turnaround: `<p>For LCD only repairs on ${model.identifier || model.shortName} models we can usually turn around same day if parts are in stock. Full assembly might take a day or two depending on availability. The team are happy to discuss timeline when you get in touch.</p>`,
        
        faqs: generateFAQs(model)
    };
    
    return variations;
}

function generateFAQs(model) {
    const faqs = [
        {
            q: 'How long does the repair take?',
            a: 'LCD only usually same day. Full assembly can be a day or two.'
        },
        {
            q: model.trueTone ? 'Will True Tone still work?' : 'Is LCD only cheaper than full assembly?',
            a: model.trueTone 
                ? 'With LCD only yes. Full assembly replacement and it wont transfer.'
                : 'Yes LCD only costs less when your housing is in good condition.'
        },
        {
            q: model.identifier 
                ? `Is ${model.identifier} the ${model.shortName}?`
                : 'How do I know which model I have?',
            a: model.identifier
                ? `Yes ${model.identifier} is the ${model.title} ${model.year ? `from ${model.year}` : ''}.`
                : 'Check Apple menu > About This Mac or look at the model number on the bottom case.'
        },
        {
            q: 'Do you need to keep the MacBook overnight?',
            a: 'Not usually for LCD only repairs. Depends on parts availability.'
        }
    ];
    
    return faqs.map(faq => `
                <div class="faq-item">
                    <h3>${faq.q}</h3>
                    <p>${faq.a}</p>
                </div>`).join('');
}

// Generate models index page
function generateIndexPage(models) {
    // Group models by category
    const categories = {
        'MacBook Air - Apple Silicon': [],
        'MacBook Air - Intel': [],
        'MacBook Pro 14" & 16" - Apple Silicon': [],
        'MacBook Pro 13" - Apple Silicon': [],
        'MacBook Pro - Touch Bar Intel': [],
        'MacBook Pro - Retina Intel': [],
        'MacBook Pro - Unibody': [],
        'MacBook 12"': []
    };
    
    models.forEach(model => {
        if (model.category && categories[model.category]) {
            categories[model.category].push(model);
        }
    });
    
    let modelGrids = '';
    for (const [category, categoryModels] of Object.entries(categories)) {
        if (categoryModels.length > 0) {
            modelGrids += `
            <h2>${category}</h2>
            <div class="model-grid">
                ${categoryModels.map(m => `
                <a href="${m.slug}/" class="model-card">
                    <h3>${m.title}</h3>
                    <p>${m.year} • ${m.identifier || m.displayType}</p>
                </a>`).join('')}
            </div>
            `;
        }
    }
    
    return `<!DOCTYPE html>
<html lang="en-AU">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MacBook Models | Screen Repair for All MacBook Pro & Air Models Sydney</title>
    <meta name="description" content="Screen repair for all MacBook Pro and MacBook Air models from 2008-2026. Find your model and book a repair at Mac Screen Repair Sydney.">
    <link rel="stylesheet" href="../css/style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-4NV174YXM8"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-4NV174YXM8');
    </script>
</head>
<body>
    <header class="header">
        <div class="container">
            <nav class="nav">
                <a href="../" class="logo">Mac Screen Repair Sydney</a>
                <ul class="nav-links">
                    <li><a href="../services/">Services</a></li>
                    <li><a href="./" class="active">Models</a></li>
                    <li><a href="../areas/">Areas</a></li>
                    <li><a href="../pricing-guide/">Pricing</a></li>
                    <li><a href="../about/">About</a></li>
                    <li><a href="../contact/">Contact</a></li>
                    <li><a href="../book/" class="btn btn-primary">Book Repair</a></li>
                </ul>
                <button class="mobile-menu-toggle" aria-label="Toggle menu">
                    <span class="hamburger"></span>
                </button>
            </nav>
        </div>
    </header>

    <section class="page-hero">
        <div class="container">
            <h1>MacBook Models We Repair</h1>
            <p>Screen repairs for every MacBook Pro and MacBook Air from 2008 to present</p>
        </div>
    </section>

    <div class="breadcrumb">
        <div class="container">
            <a href="../">Home</a> &raquo; 
            <span>Models</span>
        </div>
    </div>

    <section class="section section-light">
        <div class="container">
            <p class="intro-text">We repair screens on all MacBook Pro and MacBook Air models. Find your model below or <a href="../contact/">get in touch</a> if youre not sure which one you have.</p>
            
            ${modelGrids}
        </div>
    </section>

    <section class="cta-section">
        <div class="container">
            <h2>Not Sure Which Model You Have?</h2>
            <p>No worries. Get in touch and we can help you identify it.</p>
            <a href="../contact/" class="btn btn-primary">Contact Us</a>
        </div>
    </section>

    <footer class="footer">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-section">
                    <h4>Mac Screen Repair Sydney</h4>
                    <p>MacBook screen repairs across Western Sydney and surrounds.</p>
                </div>
                <div class="footer-section">
                    <h4>Services</h4>
                    <ul>
                        <li><a href="../services/lcd-only-macbook-screen-repair/">LCD Only Repair</a></li>
                        <li><a href="../services/full-display-macbook-screen-replacement/">Full Display Replacement</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="./">All Models</a></li>
                        <li><a href="../pricing-guide/">Pricing</a></li>
                        <li><a href="../contact/">Contact</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h4>Contact</h4>
                    <ul>
                        <li>Sydney, Australia</li>
                        <li>Mon-Sat: 9am-6pm</li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2025 Mac Screen Repair Sydney. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <script src="../js/main.js"></script>
</body>
</html>`;
}

// Main execution
function main() {
    const modelsDir = path.join(__dirname, '..', 'models');
    
    console.log('MacBook Model Page Generator');
    console.log('============================\n');
    
    // Generate individual model pages
    let created = 0;
    let updated = 0;
    
    modelData.models.forEach(model => {
        const modelDir = path.join(modelsDir, model.slug);
        const htmlFile = path.join(modelDir, 'index.html');
        
        // Create directory if it doesn't exist
        if (!fs.existsSync(modelDir)) {
            fs.mkdirSync(modelDir, { recursive: true });
            console.log(`Created directory: ${model.slug}/`);
        }
        
        // Generate and write HTML
        const html = generatePage(model);
        const existed = fs.existsSync(htmlFile);
        
        fs.writeFileSync(htmlFile, html);
        
        if (existed) {
            updated++;
            console.log(`Updated: ${model.slug}/index.html`);
        } else {
            created++;
            console.log(`Created: ${model.slug}/index.html`);
        }
    });
    
    // Generate index page
    const indexHtml = generateIndexPage(modelData.models);
    fs.writeFileSync(path.join(modelsDir, 'index.html'), indexHtml);
    console.log('\nUpdated: models/index.html');
    
    console.log('\n============================');
    console.log(`Summary: ${created} created, ${updated} updated`);
    console.log(`Total models: ${modelData.models.length}`);
}

main();