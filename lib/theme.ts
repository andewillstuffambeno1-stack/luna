'use client';

export function getTimeBasedTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') {
    return 'dark'; // Default to dark for SSR
  }
  
  const hour = new Date().getHours();
  // Light mode: 6 AM - 6 PM (6 to 17)
  // Dark mode: 6 PM - 6 AM (18 to 5)
  // For now, always return dark as per design requirements
  return 'dark';
}

export function applyTheme(theme: 'light' | 'dark') {
  if (typeof document === 'undefined') return;
  
  const html = document.documentElement;
  html.classList.remove('light', 'dark');
  html.classList.add(theme);
  
  // Update data attribute for CSS
  html.setAttribute('data-theme', theme);
}

export function initializeTheme() {
  const theme = getTimeBasedTheme();
  applyTheme(theme);
  
  // Check every minute to update theme if needed
  setInterval(() => {
    const newTheme = getTimeBasedTheme();
    if (newTheme !== theme) {
      applyTheme(newTheme);
    }
  }, 60000); // Check every minute
}

