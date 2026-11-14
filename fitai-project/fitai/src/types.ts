export type ClothingItem = {
  id: string; name: string; category: string; primary_color: string | null;
  is_clean: boolean; created_at: string;
};
export type Outfit = { id: string; name: string; occasion: string | null; tags: string[]; created_at: string };
