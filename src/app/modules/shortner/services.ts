import { dateFormat, NotFoundError } from "iyasunday";
import { nanoid } from "nanoid";
import { getRedis, setRedis } from "../../utils/redis";
import { encodeAndDecodeURLFunction, statisticFunction, URLInterface } from "./interface";


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
        clickedCount: 0,
        createdAt: Date.now()
    };

    await setRedis(code, data);

    delete data.clickedCount;
    delete data.createdAt;
    return {
        success: true,
        message: `Short URL generated successfully`,
        data
    }
}

export const decode: encodeAndDecodeURLFunction = async (query) => {
    const { url } = query;
    const code = url.split('/').pop();
    // GET URL DATA FROM REDIS
    const data = await getRedis(code, true);

    if (!data) throw new NotFoundError(`URL for supplied short URL not found`);

    data.clickedCount = parseInt(data.clickedCount) + 1;

    await setRedis(code, data);

    delete data.clickedCount;
    delete data.createdAt;
    return {
        success: true,
        message: `Url decoded successfully`,
        data
    }
}

export const statistic: statisticFunction = async (path) => {
    const key = path;;
    // GET URL DATA FROM REDIS
    const data = await getRedis(key, true);
    if (!data) throw new NotFoundError(`URL for supplied short URL not found`);
    data.createdAt = dateFormat(new Date(data.createdAt), 'YYYY-MM-DD')
    return {
        success: true,
        message: `Statistic for your URL`,
        data
    }
}