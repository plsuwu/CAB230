export function cleanDateOfBirth(dob: Date) {

    // if there is a date of birth, clean off the trailing timer string
    // T00:00:00.000Z
    if (dob) {
        const d = dob.toISOString();
        return d.replace(/T\d\d:\d\d:\d\d\.\d\d\dZ/, '');
    } else {
        return null;
    }
}
