import gaming from "@/assets/thumbs/gaming.jpg";
import tech from "@/assets/thumbs/tech.jpg";
import travel from "@/assets/thumbs/travel.jpg";
import fitness from "@/assets/thumbs/fitness.jpg";
import education from "@/assets/thumbs/education.jpg";
import business from "@/assets/thumbs/business.jpg";
import cinematic from "@/assets/thumbs/cinematic.jpg";
import minimal from "@/assets/thumbs/minimal.jpg";

export type Category = "Gaming" | "Technology" | "Education" | "Fitness" | "Travel" | "Business";
export type Theme = "Cinematic" | "Gaming" | "Tech" | "Minimal";

export interface Thumbnail {
  id: string;
  src: string;
  title: string;
  category: Category;
  theme: Theme;
}

// Demo content. Replace with API data once the generator exists.
export const thumbnails: Thumbnail[] = [
  { id: "cinematic", src: cinematic, title: "The Last Night in Tokyo", category: "Travel", theme: "Cinematic" },
  { id: "gaming", src: gaming, title: "1 HP Clutch", category: "Gaming", theme: "Gaming" },
  { id: "tech", src: tech, title: "I Tested It for 30 Days", category: "Technology", theme: "Tech" },
  { id: "minimal", src: minimal, title: "I Quit My Phone", category: "Business", theme: "Minimal" },
  { id: "travel", src: travel, title: "Hidden Norway", category: "Travel", theme: "Cinematic" },
  { id: "fitness", src: fitness, title: "100 Days Later", category: "Fitness", theme: "Gaming" },
  { id: "education", src: education, title: "How Big Is It?", category: "Education", theme: "Tech" },
  { id: "business", src: business, title: "$0 to $10K", category: "Business", theme: "Minimal" },
];

export const categories: ("All" | Category)[] = ["All", "Gaming", "Technology", "Education", "Fitness", "Travel", "Business"];
export const themes: Theme[] = ["Cinematic", "Gaming", "Tech", "Minimal"];
