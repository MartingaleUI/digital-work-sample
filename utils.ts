import { Product, Report } from "./types"

export const getProduct = (input: string): Product => {
    const [, normal, clearance, quantity, isHidden] = input.split(",")

    return {
        normalPrice: parseFloat(normal),
        clearancePrice: parseFloat(clearance),
        quantityInStock: parseInt(quantity),
        addedToCart: Boolean(eval(isHidden))
    }
}

export const getMin = (newNumber: number, oldNumber: number | undefined): number => {
    if (!oldNumber) return newNumber;
    return newNumber < oldNumber ? newNumber : oldNumber;
};

export const getMax = (newNumber: number, oldNumber: number | undefined): number => {
    if (!oldNumber) return newNumber;
    return newNumber > oldNumber ? newNumber : oldNumber;
};

export const generateReportLine = (data: Report): string => {
    const { items, low, high, name } = data;
    let line: string = `${name} ${items} product${items !== 1 ? 's' : ''}`;

    if (low && high) {
        let range: string = '';

        // if range is the same, only display one number
        // otherwise, show range
        if (low === high) {
            range = `$${low}`;
        } else {
            range = `$${low}-$${high}`;
        }

        line = `${line} @ ${range}`;
    }

    return line;
}

