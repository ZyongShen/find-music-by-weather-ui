type ResultItem = {
    image: string;
    external_link: string;
    name: string
};

type MusicResults = {
    albums: ResultItem;
    playlists: ResultItem;
    tracks: ResultItem;
};

export type LocationMusicData = {
    zipcode: number;
    musicRecs: MusicResults;
};