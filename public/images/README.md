# Image Management

This directory contains all images used in the resume website.

## Image Organization

- `profile.jpg` - Main profile picture (used in hero section)
- `projects/` - Project screenshots and thumbnails
- `icons/` - Custom icons or logos
- `background/` - Background images or patterns

## Adding Images

1. **Profile Image**: 
   - Add your profile picture as `profile.jpg` (recommended size: 400x400px)
   - Supported formats: JPG, PNG, WebP

2. **Project Images**:
   - Add project screenshots to `projects/` folder
   - Use descriptive names like `ecommerce-platform.jpg`
   - Recommended size: 800x600px or 16:9 aspect ratio

3. **Optimization**:
   - Use WebP format for better performance
   - Compress images to reduce file size
   - Consider using Next.js Image component for automatic optimization

## Usage in Code

```jsx
import Image from 'next/image';

// Profile image
<Image 
  src="/images/profile.jpg" 
  alt="Sean Rizarre Reyes" 
  width={400} 
  height={400} 
/>

// Project image
<Image 
  src="/images/projects/ecommerce-platform.jpg" 
  alt="E-commerce Platform" 
  width={800} 
  height={600} 
/>
```

## Tips

- Always include descriptive alt text for accessibility
- Use appropriate image formats (WebP for modern browsers, JPG/PNG as fallback)
- Consider responsive images for different screen sizes
- Optimize images before uploading to reduce load times