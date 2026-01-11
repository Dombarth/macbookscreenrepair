/**
 * Area Page Generator
 * Generates HTML pages for all service areas from data/suburbs.json
 * 
 * Usage: node scripts/generate-area-pages.js
 */

const fs = require('fs');
const path = require('path');

// Load suburb data
const suburbData = require('../data/suburbs.json');

// Template for area pages
function generateAreaPage(suburb) {
    const content = generateContentVariations(suburb);
    
    return `<!DOCTYPE html>
<html lang="en-AU">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MacBook Screen Repair ${suburb.name} | LCD Replacement ${suburb.postcode}</title>
    <meta name="description" content="MacBook screen repair for ${suburb.name} and ${suburb.region}. LCD only and full display replacement. Drop off service for ${suburb.name} MacBook owners.">
    <link rel="canonical" href="https://macbookscreenrepair.com.au/areas/${suburb.slug}/">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Inter+Tight:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="/css/style.css">
    
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "MacBook Screen Repair ${suburb.name}",
        "description": "MacBook LCD panel replacement and full display replacement for ${suburb.name} and ${suburb.region}.",
        "provider": {
            "@type": "LocalBusiness",
            "name": "MacBook Screen Repair"
        },
        "areaServed": {
            "@type": "City",
            "name": "${suburb.name}"
        }
    }
    </script>
</head>
<body>
    <!-- Header -->
    <header class="header">
        <div class="header-inner">
            <a href="/" class="logo">
                <img src="/images/logo.svg" alt="MacBook Screen Repair" width="200" height="45">
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
                        <a href="/models/macbook-air-13-m3-screen-repair/">MacBook Air M3</a>
                        <a href="/models/macbook-pro-14-m3-screen-repair/">MacBook Pro 14" M3</a>
                        <a href="/models/">All Models</a>
                    </div>
                </div>
                <div class="dropdown">
                    <a href="/areas/" class="dropdown-toggle">Areas</a>
                    <div class="dropdown-menu">
                        <a href="/areas/parramatta/">Parramatta</a>
                        <a href="/areas/castle-hill/">Castle Hill</a>
                        <a href="/areas/">All Areas</a>
                    </div>
                </div>
                <a href="/pricing-guide/">Pricing</a>
                <a href="/contact/">Contact</a>
                <div class="mobile-cta">
                    <a href="/book/" class="btn btn-primary">Book Repair</a>
                </div>
            </nav>
            <div class="header-actions">
                <a href="/book/" class="btn btn-primary">Book Repair</a>
                <button class="mobile-toggle" aria-label="Toggle menu">
                    <i class="fas fa-bars"></i>
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </div>
    </header>

    <!-- Page Hero -->
    <section class="page-hero">
        <div class="container">
            <h1>MacBook Screen Repair ${suburb.name}</h1>
            <p>LCD only and full display replacement for ${suburb.name} and ${suburb.region}</p>
        </div>
    </section>

    <!-- Breadcrumb -->
    <div class="container">
        <div class="breadcrumb">
            <a href="/">Home</a>
            <span>/</span>
            <a href="/areas/">Areas</a>
            <span>/</span>
            ${suburb.name}
        </div>
    </div>

    <!-- Main Content -->
    <section class="section section-light">
        <div class="container">
            <div class="two-col-content">
                <div class="content-block">
                    <h2>MacBook Screen Repair for ${suburb.name}</h2>
                    ${content.intro}
                    
                    ${content.localContext}
                    
                    ${content.specialisation}

                    <h2>LCD Only Replacement</h2>
                    ${content.lcdOnly}
                    
                    ${content.lcdEligibility}
                    
                    <div class="info-box">
                        <p><strong>LCD Only Eligibility:</strong> Display housing must be undamaged with no dents, bends, liquid exposure or frame warping. Assessment determines eligibility.</p>
                    </div>

                    <h2>Full Display Replacement</h2>
                    ${content.fullDisplay}
                    
                    ${content.fullDisplayDetail}

                    <h2>Common Screen Issues</h2>
                    ${content.commonIssues}
                    
                    ${content.additionalIssues}

                    <h2>${suburb.region} Service</h2>
                    ${content.serviceArea}
                    
                    ${content.howItWorks}

                    <div class="info-box">
                        <p><strong>MacBook screen damaged in ${suburb.name}?</strong> Drop off for assessment. We check the damage and give you honest pricing before any work starts.</p>
                    </div>
                </div>

                <!-- Sidebar -->
                <div class="sidebar">
                    <div class="sidebar-box">
                        <h5>Services</h5>
                        <div class="sidebar-links">
                            <a href="/services/lcd-only-macbook-screen-repair/">LCD Only Replacement</a>
                            <a href="/services/full-display-macbook-screen-replacement/">Full Display Replacement</a>
                            <a href="/pricing-guide/">Pricing Guide</a>
                            <a href="/warranty/">Warranty</a>
                        </div>
                    </div>
                    <div class="sidebar-box">
                        <h5>Nearby Areas</h5>
                        <div class="sidebar-links">
                            ${content.nearbyAreas}
                            <a href="/areas/">All Areas</a>
                        </div>
                    </div>
                    <div class="sidebar-box" style="background: var(--primary-accent); color: white;">
                        <h5 style="color: white;">Book Assessment</h5>
                        <p style="font-size: 14px; margin-bottom: 1rem;">Drop off your MacBook for screen assessment.</p>
                        <a href="/book/" class="btn btn-white w-100">Book Now</a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- FAQ Section -->
    <section class="section section-gray">
        <div class="container">
            <h2 class="text-center mb-4">${suburb.name} MacBook Screen Repair Questions</h2>
            <div style="max-width: 800px; margin: 0 auto;">
                <div class="accordion">
                    <div class="accordion-item active">
                        <div class="accordion-header">
                            <span>Do you service MacBooks from ${suburb.name}?</span>
                            <i class="fas fa-chevron-down"></i>
                        </div>
                        <div class="accordion-body">
                            Yes we service MacBook owners from ${suburb.name} and all of ${suburb.region}. Drop off your MacBook for assessment and we can check the screen damage.
                        </div>
                    </div>
                    <div class="accordion-item">
                        <div class="accordion-header">
                            <span>How long does a screen repair take?</span>
                            <i class="fas fa-chevron-down"></i>
                        </div>
                        <div class="accordion-body">
                            Most LCD only repairs are same day if we have parts in stock for your model. Full display replacement can take longer depending on parts availability. We give you a timeframe at assessment.
                        </div>
                    </div>
                    <div class="accordion-item">
                        <div class="accordion-header">
                            <span>Can you repair my MacBook if the frame is dented?</span>
                            <i class="fas fa-chevron-down"></i>
                        </div>
                        <div class="accordion-body">
                            Frame damage means LCD only replacement isnt possible. Full display replacement is the alternative which replaces the entire assembly including the housing. We explain options and pricing at assessment.
                        </div>
                    </div>
                    <div class="accordion-item">
                        <div class="accordion-header">
                            <span>What warranty do you offer?</span>
                            <i class="fas fa-chevron-down"></i>
                        </div>
                        <div class="accordion-body">
                            We provide a 60 day limited warranty on LCD panel replacements. This covers the replaced component and our workmanship. Physical damage and liquid damage occurring after repair are not covered.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA -->
    <section class="cta-section">
        <div class="container">
            <h2>MacBook Screen Damaged in ${suburb.name}?</h2>
            <p>Drop off your MacBook for assessment. We check the damage and give you honest pricing.</p>
            <a href="/book/" class="btn btn-white">Book Assessment</a>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-brand">
                    <a href="/" class="logo">
                        <img src="/images/logo.svg" alt="MacBook Screen Repair" width="180" height="40">
                    </a>
                    <p>MacBook screen repair specialists serving Western Sydney, The Hills District and North West Sydney.</p>
                </div>
                <div class="footer-links">
                    <h5>Services</h5>
                    <a href="/services/lcd-only-macbook-screen-repair/">LCD Only Replacement</a>
                    <a href="/services/full-display-macbook-screen-replacement/">Full Display Replacement</a>
                    <a href="/services/true-tone-missing-after-screen-repair/">True Tone Information</a>
                    <a href="/pricing-guide/">Pricing Guide</a>
                </div>
                <div class="footer-links">
                    <h5>Information</h5>
                    <a href="/about/">About Us</a>
                    <a href="/warranty/">Warranty</a>
                    <a href="/book/">Book Repair</a>
                    <a href="/contact/">Contact</a>
                </div>
                <div class="footer-links">
                    <h5>Areas</h5>
                    <a href="/areas/parramatta/">Parramatta</a>
                    <a href="/areas/castle-hill/">Castle Hill</a>
                    <a href="/areas/blacktown/">Blacktown</a>
                    <a href="/areas/">All Service Areas</a>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2025 MacBook Screen Repair. All rights reserved.</p>
                <div><a href="/warranty/">Warranty Policy</a></div>
            </div>
        </div>
    </footer>

    <script src="/js/main.js"></script>
</body>
</html>`;
}

function generateContentVariations(suburb) {
    // Get nearby suburbs based on region
    const allSuburbs = suburbData.suburbs;
    const nearbySuburbs = allSuburbs
        .filter(s => s.region === suburb.region && s.slug !== suburb.slug)
        .slice(0, 4);
    
    // If not enough from same region, add from other regions
    if (nearbySuburbs.length < 3) {
        const otherSuburbs = allSuburbs
            .filter(s => s.region !== suburb.region && s.slug !== suburb.slug)
            .slice(0, 4 - nearbySuburbs.length);
        nearbySuburbs.push(...otherSuburbs);
    }
    
    const nearbyAreaLinks = nearbySuburbs
        .map(s => `<a href="/areas/${s.slug}/">${s.name}</a>`)
        .join('\n                            ');
    
    // Generate varied content based on suburb characteristics
    const isHills = suburb.region === 'The Hills District';
    const isWestern = suburb.region === 'Western Sydney';
    const isNorthWest = suburb.region === 'North West Sydney';
    
    // Use the local_context_text from the data if available
    const localContextText = suburb.local_context_text || 
        `${suburb.name} is part of ${suburb.region}. We see MacBooks from across the area when people need screen repairs done properly.`;
    
    return {
        intro: `<p>At MacBook Screen Repair we service customers from ${suburb.name} and the surrounding ${suburb.region} area. The team provide LCD only replacement and full display assembly replacement for MacBook Air and MacBook Pro models. All repairs are drop off only with proper assessment before any work starts.</p>`,
        
        localContext: `<p>${localContextText}</p>`,
        
        specialisation: `<p>We dont do general computer repairs or phone repairs. Just MacBook screens. This specialisation means the team know what theyre doing when it comes to display issues. Cracked screens, dead panels, flickering displays, backlight problems. Weve seen most of it from MacBooks across the ${suburb.name} area.</p>`,
        
        lcdOnly: `<p>LCD only replacement is our preferred repair when the conditions are right. We swap just the internal LCD panel while keeping your original display housing intact. The metal frame, camera module, backlight layers and lid electronics all stay in place. Its more targeted than full display replacement.</p>`,
        
        lcdEligibility: `<p>But LCD only has strict eligibility requirements. The display housing needs to be undamaged. No dents, bends or warping in the frame. No signs of liquid exposure around the display area. Bezel and corners in good condition. We check all of this when you drop off and wont proceed if the requirements arent met.</p>`,
        
        fullDisplay: `<p>Full display replacement is necessary when LCD only isnt possible. This happens when theres frame damage, liquid exposure, bent corners or structural issues with the housing. We replace the entire display assembly including housing, panel, camera and all internal components.</p>`,
        
        fullDisplayDetail: `<p>Full display replacement costs more than LCD only because youre getting the complete assembly not just one component. But when the housing is damaged theres no alternative. A new panel in a damaged housing creates problems. We explain the situation at assessment and give you honest pricing.</p>`,
        
        commonIssues: `<p>MacBooks from around ${suburb.name} come in with the usual range of screen issues. Cracked screens from drops are common. Sometimes the MacBook gets knocked off a desk or catches on something when being pulled out of a bag. The screen cracks but the rest of the machine is fine.</p>`,
        
        additionalIssues: `<p>Dead panels where the screen just wont display anything. Sometimes after an impact, sometimes seemingly random. Flickering screens that flash or strobe. Lines running vertically or horizontally across the display. Backlight issues where parts of the screen are dimmer than others. Most of these can be fixed with LCD only replacement if the housing is undamaged.</p>`,
        
        serviceArea: `<p>We service MacBook owners across ${suburb.region}. ${suburb.name} and the surrounding suburbs. Most customers drop off in person which lets us assess the machine properly and give accurate pricing.</p>`,
        
        howItWorks: `<p>You bring your MacBook in for assessment. The team check the screen damage and inspect the display housing condition. We look for frame damage, liquid indicators, bezel condition. This takes a few minutes. Then we explain what repair is needed. LCD only if the housing qualifies. Full display replacement if it doesnt. We give you accurate pricing and let you decide whether to proceed. No obligation until you approve the work.</p>`,
        
        nearbyAreas: nearbyAreaLinks
    };
}

// Main execution
function main() {
    const areasDir = path.join(__dirname, '..', 'areas');
    
    console.log('Area Page Generator');
    console.log('===================\n');
    
    let created = 0;
    let updated = 0;
    
    suburbData.suburbs.forEach(suburb => {
        const suburbDir = path.join(areasDir, suburb.slug);
        const htmlFile = path.join(suburbDir, 'index.html');
        
        // Create directory if it doesn't exist
        if (!fs.existsSync(suburbDir)) {
            fs.mkdirSync(suburbDir, { recursive: true });
            console.log(`Created directory: ${suburb.slug}/`);
        }
        
        // Generate and write HTML
        const html = generateAreaPage(suburb);
        const existed = fs.existsSync(htmlFile);
        
        fs.writeFileSync(htmlFile, html);
        
        if (existed) {
            updated++;
            console.log(`Updated: ${suburb.slug}/index.html`);
        } else {
            created++;
            console.log(`Created: ${suburb.slug}/index.html`);
        }
    });
    
    console.log('\n===================');
    console.log(`Summary: ${created} created, ${updated} updated`);
    console.log(`Total areas: ${suburbData.suburbs.length}`);
}

main();