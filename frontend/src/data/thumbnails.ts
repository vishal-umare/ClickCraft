import gaming from '@/assets/thumbs/gaming.jpg'
import tech from '@/assets/thumbs/tech.jpg'
import travel from '@/assets/thumbs/travel.jpg'
import fitness from '@/assets/thumbs/fitness.jpg'
import education from '@/assets/thumbs/education.jpg'
import business from '@/assets/thumbs/business.jpg'
import cinematic from '@/assets/thumbs/cinematic.jpg'
import minimal from '@/assets/thumbs/minimal.jpg'

// New additions for Gallery
import food from '@/assets/thumbs/gpt-image-2_Create_a_premium_food_and_lifestyle_YouTube_thumbnail_in_16_9_landscape_format._-0.jpg'
import lifestyle from '@/assets/thumbs/gpt-image-2_Create_a_premium_lifestyle_YouTube_thumbnail_in_16_9_landscape_format._Scene_A_y-0.jpg'
import clickthrough from '@/assets/thumbs/gpt-image-2_Create_a_premium_high-click-through_YouTube_thumbnail_in_16_9_landscape_format._-0.jpg'
import techRealistic from '@/assets/thumbs/gpt-image-2_Create_a_premium_photorealistic_technology_YouTube_thumbnail_in_16_9_landscape_f-0.jpg'
import illustrated from '@/assets/thumbs/gpt-image-2_a_surreal_and_vibrant_cinematic_photo_of_Create_a_premium_illustrated_YouTube_th-0.jpg'

export type Category = 'Gaming' | 'Tech' | 'Finance' | 'Education' | 'Travel' | 'Lifestyle' | 'Food' | 'Business' | 'Creative'
export type Theme = 'Cinematic' | 'Gaming' | 'Tech' | 'Minimal' | 'Illustrated'

export interface Thumbnail {
  id: string
  src: string
  title: string
  category: Category
  theme: Theme
}

export const thumbnails: Thumbnail[] = [
  { id: 'cinematic', src: cinematic, title: 'The Last Night in Tokyo', category: 'Travel', theme: 'Cinematic' },
  { id: 'gaming', src: gaming, title: '1 HP Clutch', category: 'Gaming', theme: 'Gaming' },
  { id: 'tech', src: tech, title: 'I Tested It for 30 Days', category: 'Tech', theme: 'Tech' },
  { id: 'minimal', src: minimal, title: 'I Quit My Phone', category: 'Business', theme: 'Minimal' },
  { id: 'travel', src: travel, title: 'Hidden Norway', category: 'Travel', theme: 'Cinematic' },
  { id: 'food', src: food, title: 'Perfect Steak', category: 'Food', theme: 'Cinematic' },
  { id: 'clickthrough', src: clickthrough, title: 'The $1M Setup', category: 'Finance', theme: 'Minimal' },
  { id: 'tech2', src: techRealistic, title: 'AI in 2026', category: 'Tech', theme: 'Tech' },
  { id: 'illustrated', src: illustrated, title: 'Lost in the Woods', category: 'Creative', theme: 'Illustrated' },
  { id: 'lifestyle', src: lifestyle, title: 'My Morning Routine', category: 'Lifestyle', theme: 'Minimal' },
  { id: 'education', src: education, title: 'How Big Is It?', category: 'Education', theme: 'Tech' },
  { id: 'business', src: business, title: '$0 to $10K', category: 'Business', theme: 'Minimal' },
]

export const categories: ('All' | Category)[] = ['All', 'Gaming', 'Tech', 'Finance', 'Education', 'Travel', 'Lifestyle', 'Food', 'Business', 'Creative']
export const themes: Theme[] = ['Cinematic', 'Gaming', 'Tech', 'Minimal', 'Illustrated']
