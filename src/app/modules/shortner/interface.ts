
export interface URLInterface {
    url: string;
    shortUrl: string;
    code: string;
    clickedCount: number;
    createdAt: number;
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

export type statisticFunction = (
    path: string
) => Promise<defaultResponseInterface>;