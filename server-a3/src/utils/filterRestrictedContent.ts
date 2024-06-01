import { getColumnNames } from '$utils/getColumnNames';

export async function restrictContent(table: string, restrict: string[]) {

    // find the specified table's column names
    const cols = await getColumnNames(table);

    // const filtered = cols
    //     .map((col: any) => col.column_name) // foolish, naive (local mariadb uses lowercase col names)
    //     .filter((col: string) => !restrict.includes(col));

    // map the column names to an array and filter out anything that the user cannot
    // access
    const filtered = cols
        .map((col: any) => col.COLUMN_NAME) // working (mysql apparently uses uppercase col names)
        .filter((col: string) => !restrict.includes(col));

    return filtered;
}
