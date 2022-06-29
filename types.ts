export type Product = {
    normalPrice: number,
    clearancePrice: number,
    quantityInStock: number,
    addedToCart: boolean
}

export type Report = {
    name: string;
    items: number;
    low?: number;
    high?: number;
}