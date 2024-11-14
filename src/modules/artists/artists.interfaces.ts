export interface IArtist {
  id: number;
  name: string;
  photo_id?: string;
}

export interface IArtistWithoutArtworks extends IArtist {
  gallery_name: string;
}

export interface IArtistWithArtworkCount extends IArtist {
  artwork_count: number;
}
