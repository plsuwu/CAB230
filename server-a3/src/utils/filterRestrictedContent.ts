import { getColumnNames } from '$utils/getColumnNames';

export async function restrictContent(table: string, restrict: string[]) {

    const cols = await getColumnNames(table);

    // const lcfiltered = cols
    //     .map((col: any) => col.column_name) // foolish, naive
    //     .filter((col: string) => !restrict.includes(col));

    const filtered = cols
        .map((col: any) => col.COLUMN_NAME) // working
        .filter((col: string) => !restrict.includes(col));

    return filtered;
}
