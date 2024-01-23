export const convertToSimpleDate = (dateString: string | null) => {
    if (dateString) {
		let date = new Date(dateString);
		return date.toISOString().split("T")[0];
	}
	return null;
};
