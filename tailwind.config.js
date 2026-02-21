/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html"],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                surface: { DEFAULT: '#F5F5F7', dark: '#121212' },
                ink: { DEFAULT: '#1D1D1F', dark: '#F5F5F7' },
                muted: { DEFAULT: '#86868B', dark: '#8E8E93' },
                'surface-elevated': { DEFAULT: '#FFFFFF', dark: '#1C1C1E' },
                divider: { DEFAULT: '#E5E5E7', dark: '#2C2C2E' },
            },
            fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
            borderRadius: { '2xl': '1rem', '3xl': '1.5rem' },
        },
    },
    plugins: [],
}
