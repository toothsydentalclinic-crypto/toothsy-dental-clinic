// Shared service data for consistency across the app
export const services = [
  {
    id: 'tooth-cleaning',
    title: 'Tooth Cleaning',
    desc: 'A thorough professional cleaning that removes plaque and tartar, keeping your teeth and gums healthy.',
    link: '/book-appointment',
    image: '/clean-teeth.jpeg',
    category: 'Preventive Care',
    includes: ['Plaque & tartar removal', 'Polishing', 'Gum health check'],
  },
  {
    id: 'dental-filling',
    title: 'Dental Filling',
    desc: 'Restore decayed or damaged teeth with a filling that blends naturally with your smile.',
    link: '/book-appointment',
    image: '/dental-filling.jpg',
    category: 'Restorative',
    includes: ['Cavity assessment', 'Decay removal', 'Tooth-colored filling'],
  },
  {
    id: 'tooth-extraction',
    title: 'Tooth Extraction',
    desc: 'Gentle removal of damaged, infected, or crowded teeth for both kids and adults.',
    link: '/book-appointment',
    image: '/dental-extraction.png',
    category: 'Surgical',
    includes: ['Examination & X-ray', 'Local anesthesia', 'Safe tooth removal'],
  },
  {
    id: 'wisdom-teeth-surgery',
    title: 'Wisdom Teeth Surgery',
    desc: 'Comfortable surgical removal of impacted or problematic wisdom teeth.',
    link: '/book-appointment',
    image: '/wisdom-teeth-surgy.jpg',
    category: 'Surgical',
    includes: ['X-ray assessment', 'Surgical extraction', 'Aftercare guidance'],
  },
  {
    id: 'root-canal-treatment',
    title: 'Root Canal Treatment',
    desc: 'Relieve pain and save an infected tooth with careful root canal therapy.',
    link: '/book-appointment',
    image: '/Root-Canal-Treatment.jpg',
    category: 'Restorative',
    includes: ['Infection diagnosis', 'Root canal procedure', 'Protective crown fitting'],
  },
  {
    id: 'dental-crown',
    title: 'Dental Crown',
    desc: 'Durable ceramic or zirconium crowns that restore the strength and look of damaged teeth.',
    link: '/book-appointment',
    image: '/dental-crowns.jpg.webp',
    category: 'Restorative',
    includes: ['Tooth preparation', 'Custom crown fitting', 'Final polish'],
  },
  {
    id: 'dental-veneer',
    title: 'Dental Veneer',
    desc: 'Thin custom shells that instantly improve the shape and color of your smile.',
    link: '/book-appointment',
    image: '/Dental-veneer.webp',
    category: 'Cosmetic',
    includes: ['Smile consultation', 'Custom veneer fitting', 'Final bonding'],
  },
  {
    id: 'dental-implant',
    title: 'Dental Implant',
    desc: 'A permanent, natural-looking replacement for missing teeth, topped with a durable crown.',
    link: '/book-appointment',
    image: '/temporary-tooth-dental-implant-crown.jpg',
    category: 'Restorative',
    includes: ['Consultation & imaging', 'Implant placement', 'Crown attachment'],
  },
  {
    id: 'orthodontics',
    title: 'Orthodontics',
    desc: 'Straighten teeth at any age with braces designed for comfortable, lasting results.',
    link: '/book-appointment',
    image: '/Orthodontic.jpg',
    category: 'Alignment',
    includes: ['Initial consultation', 'Custom treatment plan', 'Regular adjustment visits'],
  },
  {
    id: 'denture',
    title: 'Denture',
    desc: 'Dentures are custom-made, removable prosthetic devices designed to replace missing teeth. They restore chewing function, support facial muscles, and improve speech and appearance.',
    link: '/book-appointment',
    image: '/Denture.jpg',
    category: 'Alignment',
    includes: ['Consultation and Exam', 'Mouth Impressions', 'Bite Registration'],
  },
  {
    id: 'teeth-whitening',
    title: 'Teeth Whitening',
    desc: 'Professional-grade whitening that works in a single visit — safe, even, and lasting.',
    link: '/book-appointment',
    image: '/teeth-whitening.webp',
    category: 'Cosmetic',
    includes: ['Shade consultation', 'Single-visit whitening', 'Aftercare tips'],
  },
]

// Helper to get service titles for dropdown
export const serviceTitles = services.map(s => s.title)

// Helper to find service by title (for query param matching)
export function getServiceByTitle(title: string) {
  return services.find(s => s.title === title)
}

// Helper to find service by ID (for Strapi integration)
export function getServiceById(id: string) {
  return services.find(s => s.id === id)
}