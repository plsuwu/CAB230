import { z } from 'zod';
import { __AUTH, __GENERAL, __USER, __VOLCANO, __VOLCANOES } from './constants';

/* ZOD SCHEMA
*
* schema for each specified endpoint to validate user input, flagging
* any invalid content to be handled as an error in the `errorHandler` middleware
*
*/

export const volcanoIdSchema = z
    .object({
        id: z.coerce
            .number({ message: __VOLCANO.NOT_FOUND.message })
            .positive({ message: __VOLCANO.NOT_FOUND.message })
            .lt(1343, { message: __VOLCANO.NOT_FOUND.message }),
    })
    .strict({ message: __GENERAL.INVALID.QUERY.message });

export const registerSchema = z.object({
    email: z
        .string({ message: __GENERAL.INCOMPLETE.BODY.message })
        .min(1, { message: __GENERAL.INCOMPLETE.BODY.message }),
    password: z
        .string({ message: __GENERAL.INCOMPLETE.BODY.message })
        .min(1, { message: __GENERAL.INCOMPLETE.BODY.message }),
});

export const loginSchema = z.object({
    email: z
        .string({ message: __GENERAL.INCOMPLETE.BODY.message })
        .min(1, { message: __GENERAL.INCOMPLETE.BODY.message }),
    password: z
        .string({ message: __GENERAL.INCOMPLETE.BODY.message })
        .min(1, { message: __GENERAL.INCOMPLETE.BODY.message }),
});

export const filterFavoritesSchema = z.object({
    email: z.string({ message: 'invalid filter option' }).email().optional(),
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
            message: __USER.PROFILE.UPDATE.NONSTRING.message,
        }),
        lastName: z.string({
            message: __USER.PROFILE.UPDATE.NONSTRING.message,
        }),
        dob: z
            .string({ message: __USER.PROFILE.UPDATE.NONSTRING.message })
            .date(__USER.PROFILE.UPDATE.INVALID_DOB.FORMAT.message)

            // make sure specified date of birth is in the past
            .refine((date) => new Date(date) < new Date(Date.now()), {
                message: __USER.PROFILE.UPDATE.INVALID_DOB.IN_FUTURE.message,
            }),
        address: z.string({
            message: __USER.PROFILE.UPDATE.NONSTRING.message,
        }),
    })
    .strict({ message: __USER.PROFILE.UPDATE.INCOMPLETE.message })
    .required();

export const countriesSchema = z
    .object({})
    .strict({ message: __GENERAL.INVALID.QUERY.message });

export const volcanoesSchema = z
    .object({
        country: z.string({ message: __VOLCANOES.MISSING.COUNTRY.message }),
        populatedWithin: z
            .string()
            .refine(
                // request parameter if one of the values in this constant
                (p: any) => __VOLCANOES.COLS.POP_WITHIN.includes(p),
                {
                    message: __VOLCANOES.INVALID.POP_WITHIN.message,
                }
            )
            .optional(),
    })
    .strict({ message: __VOLCANOES.INVALID.QUERY.message });
