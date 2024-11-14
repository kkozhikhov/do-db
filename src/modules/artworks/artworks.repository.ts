import { db } from "../../database";
import { IArtwork } from "./artworks.interfaces";
import { GetArtworksByClassificationDto } from "./dtos/get-artworks-by-classification.dto";

export class ArtworkRepository {
  findByClassification = ({
    classification,
    limit,
    offset,
  }: GetArtworksByClassificationDto): Promise<IArtwork[]> | undefined => {
    try {
      return db<IArtwork>("artworks")
        .select(
          "artworks.id",
          "artworks.name",
          "c.name AS classification",
          "a.name_original AS artist_name",
          "g.name AS gallery_name",
          "artist_artworks_sum.total_artist_portfolio_value",
          "classification_avg_price.avg_classification_price"
        )
        .leftJoin(
          "artworks_classifications AS ac",
          "artworks.id",
          "ac.artwork_id"
        )
        .join("classifications AS c", "ac.classification_id", "c.id")
        .leftJoin("artworks_artists AS aa", "artworks.id", "aa.artwork_id")
        .join("artists AS a", "aa.artist_id", "a.id")
        .leftJoin("galleries AS g", "a.gallery_id", "g.id")
        .join(
          db("artworks")
            .select("aa.artist_id")
            .sum({ total_artist_portfolio_value: "artworks.price" })
            .join("artworks_artists AS aa", "artworks.id", "aa.artwork_id")
            .groupBy("aa.artist_id")
            .as("artist_artworks_sum"),
          "a.id",
          "artist_artworks_sum.artist_id"
        )
        .join(
          db("artworks")
            .select("c.id AS classification_id")
            .avg({ avg_classification_price: "artworks.price" })
            .join(
              "artworks_classifications AS ac",
              "artworks.id",
              "ac.artwork_id"
            )
            .join("classifications AS c", "ac.classification_id", "c.id")
            .groupBy("c.id")
            .as("classification_avg_price"),
          "c.id",
          "classification_avg_price.classification_id"
        )
        .modify((queryBuilder) => {
          if (classification) {
            queryBuilder.where("c.name", classification);
          }
        })
        .whereNull("artworks.deleted_at")
        .whereNull("a.deleted_at")
        .whereNull("g.deleted_at")
        .orderBy("artworks.id")
        .limit(limit)
        .offset(offset);
    } catch (error) {
      console.error("Error while artworks by classification:", error);
    }
  };
}
