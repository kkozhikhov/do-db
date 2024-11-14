import { ArtistsRepository } from "./artists.repository";
import { FindWithoutArtworksDto } from "./dtos/find-with-no-artworks.dto";

export class ArtistsService {
  constructor(private artistsRepository: ArtistsRepository) {}

  findOne = (id: number) => {
    return this.artistsRepository.findOne(id);
  };

  findWithoutArtworks = (data: FindWithoutArtworksDto) => {
    return this.artistsRepository.findWithoutArtworks(data);
  };
}
