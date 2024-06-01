import { z } from 'zod';
import {
    __AUTH_INCOMPLETE_BODY,
    __COMMON_INVALID_QUERY_PARAM,
    __PROFILE_UPDATE_REQUEST_DOB_INVALID_DATE,
    __PROFILE_UPDATE_REQUEST_DOB_FUTURE_DATE,
    __PROFILE_UPDATE_REQUEST_INCOMPLETE,
    __PROFILE_UPDATE_REQUEST_STRING_ONLY,
    __VOLCANOES_INVALID_QUERY_PARAM,
    __VOLCANOES_MISSING_PARAM,
    __VOLCANOES_POPULATED_WITHIN_INVALID,
    __VOLCANOES_POPULATED_WITHIN_PARAMS,
    __VOLCANOID_VOLCANO_NOT_FOUND,
} from './constants';
import { RequiredData } from '$src/types';
import { profile } from 'console';

export const volcanoIdSchema = z
    .object({
        id: z.coerce
            .number({ message: __VOLCANOID_VOLCANO_NOT_FOUND.message })
            .positive({ message: __VOLCANOID_VOLCANO_NOT_FOUND.message })
            .lt(1343, { message: __VOLCANOID_VOLCANO_NOT_FOUND.message }),
    })
    .strict({ message: __COMMON_INVALID_QUERY_PARAM.message });

export const registerSchema = z.object({
    email: z
        .string({ message: __AUTH_INCOMPLETE_BODY.message })
        .min(1, { message: __AUTH_INCOMPLETE_BODY.message }),
    password: z
        .string({ message: __AUTH_INCOMPLETE_BODY.message })
        .min(1, { message: __AUTH_INCOMPLETE_BODY.message }),
});

export const loginSchema = z.object({
    email: z
        .string({ message: __AUTH_INCOMPLETE_BODY.message })
        .min(1, { message: __AUTH_INCOMPLETE_BODY.message }),
    password: z
        .string({ message: __AUTH_INCOMPLETE_BODY.message })
        .min(1, { message: __AUTH_INCOMPLETE_BODY.message }),
});

/* *
*

curl -X 'POST' --insecure -vvv \
  'https://localhost:3000/favorites/mike%40gmail.com' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer your-jwt-token' \
  -H 'Content-Type: application/json' \
  -d '{
  "action": "add",
  "id": 1
}'

* */

export const filterFavoritesSchema = z.object({
    email: z.string({ message: "invalid filter option" }).email().optional(),
});

export const updateFavoritesSchema = z.object({
    action: z.enum(['add', 'delete']),
    id: z.coerce.number().positive().lt(1344),
});

export const getUserSchema = z.object({
    email: z.string().email(),
});

export const updateUserSchema = z
    .object({
        firstName: z.string({
            message: __PROFILE_UPDATE_REQUEST_STRING_ONLY.message,
        }),
        lastName: z.string({
            message: __PROFILE_UPDATE_REQUEST_STRING_ONLY.message,
        }),
        dob: z
            .string({ message: __PROFILE_UPDATE_REQUEST_STRING_ONLY.message })
            .date(__PROFILE_UPDATE_REQUEST_DOB_INVALID_DATE.message)
            .refine((date) => new Date(date) < new Date(Date.now()), {
                message: __PROFILE_UPDATE_REQUEST_DOB_FUTURE_DATE.message,
            }),
        address: z.string({
            message: __PROFILE_UPDATE_REQUEST_STRING_ONLY.message,
        }),
    })
    .strict({ message: __PROFILE_UPDATE_REQUEST_INCOMPLETE.message })
    .required()

export const countriesSchema = z
    .object({})
    .strict({ message: __COMMON_INVALID_QUERY_PARAM.message });

export const volcanoesSchema = z
    .object({
        country: z.string({ message: __VOLCANOES_MISSING_PARAM.message }),
        populatedWithin: z
            .string()
            .refine(
                (p: any) => __VOLCANOES_POPULATED_WITHIN_PARAMS.includes(p),
                {
                    message: __VOLCANOES_POPULATED_WITHIN_INVALID.message,
                }
            )
            .optional(),
    })
    .strict({ message: __VOLCANOES_INVALID_QUERY_PARAM.message });
