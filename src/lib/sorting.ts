

// not actually fzf i just think its a cool contraction :))
type SearchResult = {
    item: string;
    score: number;
};

export function fzf(query: string, data: string[]): string[] {
    query = query.toLowerCase();

    const scoreItem = (item: string): number => {
        let score = 0;
        let queryIndex = 0;
        const lowerItem = item.toLowerCase();

        for (let i = 0; i < lowerItem.length && queryIndex < query.length; i++) {
            if (lowerItem[i] === query[queryIndex]) {
                score++;
                queryIndex++;
            }
        }

        return score;
    };


    return data
        .map((item) => ({ item, score: scoreItem(item) }))
        .filter(({ score }) => score > query.length - 1)
        .sort((a, b) => b.score - a.score)
        .map(({ item }) => item);
}
