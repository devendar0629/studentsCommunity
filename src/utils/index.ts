export function extractSearchParamsToObject(searchParams: URLSearchParams): Record<string, string | null> {
    const params: Record<string, string | null> = {};
    searchParams.forEach((value, key) => {
        if (value?.trim())
            params[key] = value;
    });
    return params;
}