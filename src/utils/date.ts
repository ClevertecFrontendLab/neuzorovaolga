const getTimeHelper = (data: string) => {
    const date = new Date(data);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day.toString().length < 2 ? '0' + day : day}.${
        month.toString().length < 2 ? '0' + month : month
    }.${year}`;
};
