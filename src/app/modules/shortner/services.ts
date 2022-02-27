import { nanoid } from "nanoid";
import { getRedis, setRedis } from "../../utils/redis";
import { encodeAndDecodeURLFunction, URLInterface } from "./interface";


export const encode: encodeAndDecodeURLFunction = async (body) => {
    const { url } = body;
    let code = nanoid(8);
    // CHECK IF THE GENERATED CODE EXISTS AND KEEP GENERATING UNTIL NOT FOUND
    if (await getRedis(code, true)) {
        while (await getRedis(code, true)) {
            code = nanoid(8);
        }
    }
    const data: URLInterface = {
        url,
        code,
        shortUrl: process.env.ENCODED_URL_BASE + `/${code}`,
        clickedCount: 0
    };

    await setRedis(code, data);

    return {
        success: true,
        message: `Short URL generated successfully`,
        data
    }
}