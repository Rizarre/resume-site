# Sean Rizarre Reyes - Resume Website

A modern, responsive resume website built with Next.js 14, TypeScript, Tailwind CSS, and shadcn/ui components.

## ✨ Features

- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile devices
- 🎨 **Modern Design** - Clean, professional aesthetic with smooth animations
- 🌙 **Dark Mode** - Toggle between light and dark themes
- ⚡ **Fast Performance** - Optimized with Next.js 14 and App Router
- 🎯 **Accessible** - Built with accessibility in mind
- 🖼️ **Easy Image Management** - Organized image structure for easy updates
- 📱 **Mobile Navigation** - Collapsible mobile menu for better UX
- 🚀 **Production Ready** - Optimized for deployment

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Font**: Inter (via next/font)

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sean-resume
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 📝 Customization

### 1. Personal Information
Edit the following variables in `src/app/page.tsx`:
- Name and title
- Location
- Bio description
- Contact information

### 2. Experience & Projects
Update the `experiences` and `projects` arrays in `src/app/page.tsx` with your own data.

### 3. Skills
Modify the `skills` array to reflect your technical expertise.

### 4. Images
- Add your profile photo as `public/images/profile.jpg`
- Add project screenshots to `public/images/projects/`
- See `public/images/README.md` for detailed image management guide

### 5. Styling
- Customize colors in `tailwind.config.ts`
- Modify component styles in respective files
- Update CSS variables in `src/app/globals.css`

## 📂 Project Structure

```
sean-resume/
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── components/
│       ├── ui/              # shadcn/ui components
│       ├── mobile-nav.tsx   # Mobile navigation
│       └── theme-toggle.tsx # Dark mode toggle
├── public/
│   └── images/              # Image assets
└── README.md
```

## 🎨 Color Scheme

- **Primary**: Blue (#2563eb)
- **Secondary**: Purple (#7c3aed)
- **Neutral**: Slate grays
- **Accent**: Various shades for highlights

## 📱 Responsive Design

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect to Vercel
3. Deploy automatically

### Netlify
1. Build the project: `npm run build`
2. Deploy the `out` folder

### Other Platforms
The project is compatible with any platform that supports Next.js static exports.

## 🔧 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📄 License

MIT License - feel free to use this template for your own resume website!

## 🤝 Contributing

Feel free to submit issues and pull requests to improve this template.

---

Made with ❤️ by Sean Rizarre Reyes
