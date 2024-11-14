import { ArtistsService } from "./artists.service";

import { Router, Request, Response } from "express";

export class ArtistsController {
  private router: Router;

  constructor(private artistsService: ArtistsService) {
    this.router = Router();
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get("/without-artworks", this.getWithoutArtworks);
    this.router.get("/:id", this.getArtist);
  }

  getRouter(): Router {
    return this.router;
  }

  private getArtist = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ error: "Artist ID is required" });
    }

    const artist = await this.artistsService.findOne(Number(req.params?.id));
    if (!artist) {
      res.status(404).json({ error: "Artist not found" });
    }

    res.json(artist).status(200);
  };

  private getWithoutArtworks = async (req: Request, res: Response) => {
    const artists = await this.artistsService.findWithoutArtworks({
      limit: Number(req.query?.limit || 10),
      offset: Number(req.query?.offset || 0),
    });

    if (!artists?.length) {
      res.status(404).json({ error: "Artists not found" });
    }

    res.json(artists).status(200);
  };
}
