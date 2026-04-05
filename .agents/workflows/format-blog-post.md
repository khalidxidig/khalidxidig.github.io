---
description: How to format and style new technical blog posts for Khalid's portfolio
---

# Blog Post Formatting Workflow

Whenever creating or polishing a new blog post for the website, follow these strict style guidelines deduced from past preferences (specifically the "Slab Concrete Design" post):

1. **Content Layout & Wrap:** 
   - DO NOT use CSS Flexbox to constrain text and images rigidly side-by-side. 
   - Instead, use `float: right; width: 40%; max-width: 400px; margin: 0 0 20px 40px;` on the image container so the text flows naturally around it and wraps underneath when the image ends (magazine style text-wrap). Use `display: flow-root;` on the parent container.

2. **Typography & Headings:**
   - Always include FontAwesome icons next to headings (`<h2>`, `<h3>`, `<h4>`) and important key points to make the post visually modern. Example: `<h2><i class="fas fa-layer-group" style="color: var(--primary); margin-right: 10px;"></i>Title</h2>`
   - Use `color: var(--text);` for headings `h2, h3, h4` so they automatically invert correctly in Night Mode (do not hardcode `#111`).
   - For lists, use the custom `fa-chevron-right` (\f054) bullet pseudo-class CSS or simply use `<i class="fas fa-chevron-right"></i>` to make it look professional.

3. **Avoid Clutter Badges:**
   - When specifying measurements or short emphasized text (e.g., "Thickness: 100mm - 200mm"), DO NOT wrap it in a colored background badge or block. Just keep it as plain single-line heading text, accompanied by an icon. Example: `<h2><i class="fas fa-arrows-alt-v"></i> Dhumucda Slab-ka (Thickness) - Caadi ahaan: 100mm - 200mm</h2>`

4. **Author Meta Data:**
   - Format the author name as "Eng. Khalid Mohamed Ali".
   - Include icons. Example: 
     `<span class="author"><i class="fas fa-user-circle"></i> Eng. Khalid Mohamed Ali</span>`
     `<span class="date"><i class="fas fa-calendar-alt"></i> March 4, 2026</span>`

5. **Image Zoom functionality:**
   - All article diagrams/images must be wrapped in an `.img-container` and have the class `.zoomable-img` with the Lightbox feature enabled. Ensure the zoom overlay (`<span class="zoom-overlay"><i class="fas fa-search-plus"></i> Guji Si Aad U Weynayso</span>`) is implemented.

6. **Related Posts Logic:**
   - The "Aqri Sidoo Kale" (Related Posts) section at the bottom MUST ONLY show articles from the EXACT SAME category.
   - If there are no other articles in the same category, do NOT show a random post. Instead, display an empty state placeholder that says: 
     `Ma jiraan maqaallo kale oo la xiriira qaybta <strong>[Category Name]</strong> hadda.` with a `fa-folder-open` folder icon.
