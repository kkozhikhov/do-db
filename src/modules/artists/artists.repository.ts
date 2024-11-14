import { db } from "../../database";
import { IArtist, IArtistWithArtworkCount } from "./artists.interfaces";
import { FindWithoutArtworksDto } from "./dtos/find-with-no-artworks.dto";

export class ArtistsRepository {
  findOne = (id: number): Promise<IArtistWithArtworkCount[]> | undefined => {
    try {
      return db<IArtistWithArtworkCount>("artists")
        .select(
          "artists.id",
          db.raw(
            "COALESCE(artists.name_english, artists.name_original) AS name"
          ),
          "photo_id"
        )
        .first()
        .leftJoin("artworks_artists AS aa", "artists.id", "aa.artist_id")
        .where("artists.id", id)
        .whereNull("artists.deleted_at")
        .groupBy("artists.id")
        .count("aa.artwork_id as artwork_count");
    } catch (error) {
      console.error("Error fetching artist with artwork count:", error);
    }
  };

  findWithoutArtworks = ({
    limit,
    offset,
  }: FindWithoutArtworksDto): Promise<IArtist[]> | undefined => {
    try {
      return db<IArtist[] | []>("artists")
        .select(
          "artists.id",
          db.raw(
            "COALESCE(artists.name_english, artists.name_original) AS name"
          ),
          "g.name AS gallery_name"
        )
        .leftJoin("artworks_artists AS aa", "artists.id", "aa.artist_id")
        .leftJoin("galleries AS g", "artists.gallery_id", "g.id")
        .whereNull("artists.deleted_at")
        .whereNull("g.deleted_at")
        .whereNull("aa.artwork_id")
        .limit(limit)
        .offset(offset);
    } catch (error) {
      console.error("Error while fetching artitst without artworks:", error);
    }
  };
}
