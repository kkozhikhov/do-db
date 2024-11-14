export interface IArtwork {
  id: number;
  name: string;
  classification: string;
  artist_name: string;
  gallery_name: string | null;
  total_artist_portfolio_value: string;
  avg_classification_price: string;
}