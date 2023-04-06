import { Favorites, Prisma } from "@prisma/client";

export interface FavoriteRepository {
  create(data: Prisma.FavoritesCreateInput): Promise<Favorites>;
  list(): Promise<Favorites[]>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Favorites | null>;
}
