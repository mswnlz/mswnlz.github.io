// Debug script to check for layout issues on production site
// Run this in the browser console on https://doc.869hr.uk/

console.log('=== Layout Debug Script ===');

// Check if VitePress has loaded
console.log('VitePress app:', document.querySelector('#app'));

// Check for JavaScript errors
window.addEventListener('error', (e) => {
  console.error('JavaScript Error:', e.error);
});

// Check for unhandled promise rejections
window.addEventListener('unhandledrejection', (e) => {
  console.error('Unhandled Promise Rejection:', e.reason);
});

// Check CSS loading
console.log('Stylesheets loaded:');
Array.from(document.styleSheets).forEach((sheet, index) => {
  try {
    console.log(`${index + 1}. ${sheet.href} - Rules: ${sheet.cssRules?.length || 'N/A'}`);
  } catch (e) {
    console.log(`${index + 1}. ${sheet.href} - Error accessing rules:`, e.message);
  }
});

// Check for VPFeatures grid
const features = document.querySelector('.VPHomeFeatures .items');
if (features) {
  console.log('Features container found:', features);
  console.log('Grid template columns:', getComputedStyle(features).gridTemplateColumns);
  console.log('Feature items count:', features.children.length);
  
  // Check each feature item
  Array.from(features.children).forEach((item, index) => {
    const vpFeature = item.querySelector('.VPFeature');
    if (vpFeature) {
      const computedStyle = getComputedStyle(vpFeature);
      console.log(`Feature ${index + 1}:`, {
        width: computedStyle.width,
        height: computedStyle.height,
        display: computedStyle.display,
        position: computedStyle.position
      });
    }
  });
} else {
  console.warn('Features container not found');
}

// Check for CommitHistory component
const commitHistory = document.querySelector('.commit-history-container');
if (commitHistory) {
  console.log('CommitHistory found:', commitHistory);
} else {
  console.warn('CommitHistory not found');
}

// Check Vue app mounting
setTimeout(() => {
  const vueApp = document.querySelector('#app').__vue_app__;
  if (vueApp) {
    console.log('Vue app mounted successfully');
  } else {
    console.warn('Vue app not found or not mounted');
  }
}, 2000);

console.log('=== Debug script complete ===');
