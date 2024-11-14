import express, { Router } from "express";

import { ArtworksModule } from "./modules/artworks/artworks.module";
import { ArtistsModule } from "./modules/artists/artists.module";

const PORT = 3000;

const app = express();
const router = Router();

const artworkModule = new ArtworksModule();
const artworkController = artworkModule.getArtworkController();

const artistsModule = new ArtistsModule();
const artistsController = artistsModule.getArtistsController();

router.use("/artworks/", artworkController.getRouter());
router.use("/artists/", artistsController.getRouter());
app.use("/api", router);

app.listen(PORT, () => console.log(`Server started at port ${PORT}!`));
