
export interface URLInterface {
    status: string;
    matchDate: string;
    slug: string;
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