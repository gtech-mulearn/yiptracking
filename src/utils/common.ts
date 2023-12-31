export const convertToSimpleDate = (dateString: string) => {
    let date = new Date(dateString);
    if (isNaN(date.getTime())) date = new Date();
    return date.toISOString().split("T")[0];
};
