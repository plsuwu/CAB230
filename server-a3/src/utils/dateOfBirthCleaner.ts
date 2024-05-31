export function cleanDateOfBirth(dob: Date) {
    if (dob) {
        const d = dob.toISOString();
        return d.replace(/T\d\d:\d\d:\d\d\.\d\d\dZ/, '');
    } else {
        return null;
    }
}
