import { ArtworkService } from "./artworks.service";

import { Router, Request, Response } from "express";

export class ArtworkController {
  private router: Router;

  constructor(private artworkService: ArtworkService) {
    this.router = Router();
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get("/", this.getByClassification);
  }

  getRouter(): Router {
    return this.router;
  }

  private getByClassification = async (req: Request, res: Response) => {
    const { classification, limit, offset } = req.query;
    if (!limit || !offset) {
      res.status(400).json({ error: "Limit and offset param are required!" });
    }

    const artworks = await this.artworkService.findByClassification({
      classification: classification as string,
      limit: Number(limit),
      offset: Number(offset),
    });
    if (!artworks?.length) {
      res.status(404).json({ error: "Arworks not found" });
    }

    res.json(artworks).status(200);
  };
}
