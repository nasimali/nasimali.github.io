// nasim-ali-portfolio/tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}", // This ensures Tailwind scans all relevant files in src
    ],
    darkMode: "class", // Enable class-based dark mode
    theme: {
        container: { // Optional: configure global container settings
            center: true,
            padding: {
                DEFAULT: '1rem', // Default padding for container
                sm: '2rem',
                lg: '4rem',
                xl: '5rem',
            },
        },
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'], // Set Inter as the default sans-serif font
            },
            colors: { // These are crucial for Shadcn/UI theming and custom colors
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
            },
            borderRadius: { // Consistent with Shadcn/UI theming
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            keyframes: { // For custom animations
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" }, // Used by Shadcn accordion
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" }, // Used by Shadcn accordion
                },
                "tilt": { // For the subtle tilt animation on the About Me image
                    '0%, 100%': { transform: 'rotate(-1deg)' },
                    '50%': { transform: 'rotate(1deg)' },
                },
                "gradient-animation": { // For the animated gradient text in Hero
                    '0%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                    '100%': { backgroundPosition: '0% 50%' },
                }
            },
            animation: { // Assigning keyframes to animation utilities
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                "tilt": 'tilt 10s infinite linear alternate',
                "gradient-text": 'gradient-animation 3s linear infinite', // Utility class for gradient text
            },
        },
    },
    plugins: [
            require('@tailwindcss/typography'), // Typography plugin for better prose styling
    require('tailwindcss-animate')
    ],
};