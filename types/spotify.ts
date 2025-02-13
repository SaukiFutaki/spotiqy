export type TypePlaylist = {
  collaborative: boolean;
  description: string;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: {
    height: number;
    url: string;
    width: number;
  }[];
  name: string;
  owner: {
    display_name: string;
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    type: string;
    uri: string;
  };
  primary_color: string;
  public: boolean;
  snapshot_id: string;
  tracks: {
    href: string;
    total: number;
  };
  type: string;
  uri: string;
  className?: string;
};

export type TypePlaylistDetail = {
  collaborative: boolean;
  description: string;
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string;
    total: number;
  };
  href: string;
  id: string;
  images: {
    height: number;
    url: string;
    width: number;
  }[];
  name: string;
  owner: {
    display_name: string;
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    type: string;
    uri: string;
  };
  primary_color: string;
  public: boolean;
  snapshot_id: string;
  tracks: {
    items: {
      added_at: string;
      added_by: {
        external_urls: {
          spotify: string;
        };
        href: string;
        id: string;
        type: string;
        uri: string;
      };
      is_local: boolean;
      primary_color: string;
      track: {
        album: {
          album_type: string;
          artists: {
            external_urls: {
              spotify: string;
            };
            href: string;
            id: string;
            name: string;
            type: string;
            uri: string;
          }[];
          external_urls: {
            spotify: string;
          };
          href: string;
          id: string;
          images: {
            height: number;
            url: string;
            width: number;
          }[];
          name: string;
          release_date: string;
          release_date_precision: string;
          total_tracks: number;
          type: string;
          uri: string;
        };
        artists: {
          external_urls: {
            spotify: string;
          };
          href: string;
          id: string;
          name: string;
          type: string;
          uri: string;
        }[];
        available_markets: string[];
        disc_number: number;
        duration_ms: number;
        explicit: boolean;
        external_ids: {
          isrc: string;
        };
        external_urls: {
          spotify: string;
        };
        href: string;
        id: string;
        is_local: boolean;
        name: string;
        popularity: number;
        preview_url: string;
        track_number: number;
        type: string;
        uri: string;
      }
    }[]
    total: number;
    next: string;
    previous: string;
  };
  type: string;
  uri: string;
};
