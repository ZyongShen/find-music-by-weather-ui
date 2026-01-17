export type ResultItem = {
    image: string;
    external_link: string;
    name: string
};

export type MusicResultsData = {
    albums: ResultItem;
    playlists: ResultItem;
    tracks: ResultItem;
};