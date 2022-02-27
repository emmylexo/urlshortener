import Joi from "joi";


export default {
    encode: {
        body: {
            schema: Joi.object({
                url: Joi.string().uri().required()
                    .messages({
                        'string.required': 'URL is required'
                    })
            })
        }
    },

    decode: {
        query: {
            schema: Joi.object({
                url: Joi.string().uri().required()
            })
        }
    },

    statistics: {
        params: {
            schema: Joi.object({
                path: Joi.string().required()
            })
        }
    },
}