import { ArtworkService } from "./artworks.service";
import { ArtworkRepository } from "./artworks.repository";
import { ArtworkController } from "./artworks.controller";

export class ArtworksModule {
  private artworkService: ArtworkService;
  private artworkController: ArtworkController;

  constructor() {
    const artworkRepository = new ArtworkRepository();
    this.artworkService = new ArtworkService(artworkRepository);
    this.artworkController = new ArtworkController(this.artworkService);
  }

  getArtworkController(): ArtworkController {
    return this.artworkController;
  }
}
