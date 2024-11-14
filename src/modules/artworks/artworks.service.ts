import { ArtworkRepository } from "./artworks.repository";
import { GetArtworksByClassificationDto } from "./dtos/get-artworks-by-classification.dto";

export class ArtworkService {
  constructor(private artworkRepository: ArtworkRepository) {}

  findByClassification = (data: GetArtworksByClassificationDto) => {
    return this.artworkRepository.findByClassification(data);
  };
}
