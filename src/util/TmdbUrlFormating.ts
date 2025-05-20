export type FormatUrlPageGenreProps = {
    url: string;
    page: number;
    genre: number;
};

export const formatUrlPageGenre = (props: FormatUrlPageGenreProps): string => {
    let urlString = `${props.url}&page=${props.page}`;

    if (props.genre !== -1) {
        urlString += `&with_genres=${props.genre}`;
    }

    return urlString;
};