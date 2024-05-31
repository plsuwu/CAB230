export function nullEmptyFields(fields: any) {

    // mutate the value of an empty string field (`''`) to a null type
    for (const k in fields) {
        if (fields[k as keyof typeof fields] === '') {
            fields[k as keyof typeof fields] = null;
        }
    }

    return fields
}
