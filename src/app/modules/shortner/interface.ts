
export interface URLInterface {
    url: string;
    shortUrl: string;
    code: string;
    clickedCount: number;
}

interface defaultResponseInterface {
    success: boolean,
    message: string,
    data: URLInterface | [URLInterface] | unknown
}

export type encodeAndDecodeURLFunction = (
    body: {
        url: string
    },
) => Promise<defaultResponseInterface>;