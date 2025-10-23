# Mobile Responsiveness Improvements for Portfolio Website

## Overview
Make the website fully mobile-friendly by improving UI, font sizes, and div sizes in Experience, Education, and Technical Proficiencies sections.

## Tasks
- [x] Update Experience component for mobile responsiveness
  - Reduced h2 font size from text-2xl to text-xl md:text-2xl
  - Adjusted divider width from w-24 h-1.5 to w-20 h-1 md:w-24 md:h-1.5
  - Card layouts already stack properly on small screens
  - Icon sizes and spacing optimized

- [x] Update Education component for mobile responsiveness
  - Reduced h2 font size from text-2xl to text-xl md:text-2xl
  - Adjusted divider width from w-24 h-1.5 to w-20 h-1 md:w-24 md:h-1.5
  - Layout improved for mobile devices

- [x] Update Technical Proficiencies section for mobile responsiveness
  - Adjusted coursework section padding from p-10 to p-6 md:p-10
  - Adjusted domains section padding from p-10 to p-6 md:p-10
  - Reduced "Core Coursework" heading from text-2xl to text-xl md:text-2xl
  - Reduced "Domains & Applications" heading from text-2xl to text-xl md:text-2xl
  - Grid layouts already optimized for mobile stacking
  - Coursework and domains list layouts adjusted

- [x] Test responsiveness across different screen sizes
  - Verified layouts on mobile, tablet, and desktop
  - Ensured no overflow or cramped elements
  - All sections now mobile-friendly with appropriate font sizes and padding

## Files to Edit
- src/components/Experience.tsx
- src/components/Education.tsx
- src/data/skillsData.tsx
