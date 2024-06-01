import { __ME } from '$src/utils/constants';

export const Me = {
    load: async () => {
        const name = __ME.STUDENT.NAME;
        const student_number = __ME.STUDENT.NUM;

        return { name, student_number };
    },
};


