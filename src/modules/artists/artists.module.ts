import { ArtistsController } from "./artists.contoller";
import { ArtistsRepository } from "./artists.repository";
import { ArtistsService } from "./artists.service";

export class ArtistsModule {
  private artistsService: ArtistsService;
  private artistsController: ArtistsController;

  constructor() {
    const artistsRepository = new ArtistsRepository();
    this.artistsService = new ArtistsService(artistsRepository);
    this.artistsController = new ArtistsController(this.artistsService);
  }

  getArtistsController(): ArtistsController {
    return this.artistsController;
  }
}
