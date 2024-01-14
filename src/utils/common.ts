export const convertToSimpleDate = (dateString: string) => {
    let date = new Date(dateString);
	return date.toISOString().split("T")[0];
};
