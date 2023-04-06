import { FavoriteDto } from "../dtos/favorite";
import { FavoriteRepository } from "../repositories/favorite-repository";

export class FavoriteService {
  constructor(private favoriteRepository: FavoriteRepository) {}

  async create({ id, title, img }: FavoriteDto) {
    const movie = await this.favoriteRepository.create({ id, title, img });

    return movie;
  }

  async list() {
    const movies = await this.favoriteRepository.list();

    return movies;
  }

  async delete(id: string) {
    await this.favoriteRepository.delete(id);
  }
}
