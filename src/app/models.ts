export interface Game {
    id: string;
    name: string;
    background_image: string;
    released: string;
    metacritic_url: string;
    website: string;
    description: string;
    metacritic: number;
    genres: Array<Genre>;
    parent_platforms: Array<ParentPlatform>;
    ratings: Array<Rating>;
    publishers: Array<Publishers>;
}

export interface APIResponse<T> {
    results: Array<T>;
}

interface Genre {
    name: string;
}

interface ParentPlatform {
    platform: {
        name: string;
    };
}

interface Rating {
    id: number;
    count: number;
    title: string;
  }

interface Publishers {
    name: string;
}