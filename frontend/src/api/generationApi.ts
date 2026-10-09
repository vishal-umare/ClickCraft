import api from './axios';
import type { Generation } from '@/contexts/GenerationContext';

// Map backend Thumbnail object to frontend Generation
const mapToGeneration = (data: any): Generation => {
  return {
    id: data._id,
    userId: data.userId,
    title: data.title,
    format: data.aspect_ratio === '9:16' ? 'shorts' : 'youtube',
    style: data.style,
    colorScheme: data.colorScheme,
    prompt: data.user_prompt || data.prompt_used || '',
    imageUrl: data.image_url || '',
    createdAt: data.createdAt,
  };
};

export const generationApi = {
  getGenerations: async (): Promise<Generation[]> => {
    const response = await api.get('/users/thumbnails');
    return response.data.thumbnail.map(mapToGeneration);
  },

  createGeneration: async (
    title: string,
    format: 'youtube' | 'shorts',
    style: string,
    colorScheme: string,
    prompt: string
  ): Promise<Generation> => {
    const aspect_ratio = format === 'youtube' ? '16:9' : '9:16';
    const response = await api.post('/thumbnails/generate', {
      title,
      aspect_ratio,
      style,
      colorScheme,
      prompt,
    });
    return mapToGeneration(response.data.thumbnail);
  },

  deleteGeneration: async (id: string): Promise<void> => {
    await api.delete(`/thumbnails/delete/${id}`);
  },
};
