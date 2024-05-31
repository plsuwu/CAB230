import { __ME_STUDENT_NAME, __ME_STUDENT_NUM } from '$src/utils/constants';

export const Me = {
    details: async () => {
        const name = __ME_STUDENT_NAME;
        const student_number = __ME_STUDENT_NUM;

        return { name, student_number };
    },
};


