
export type formatUrlPageGanerProps = {
    url: string,
    page: number,
    gener: number
}

export const formatUrlPageGener = (props: formatUrlPageGanerProps): string => {

    let urlString = `${props.url}&page=${props.page}`;

    if (props.gener != -1) {
        urlString += `&with_genres=${props.gener}`
    }

    return urlString;
}