import { 
    getMin,
    getMax,
    getProduct,
    generateReportLine,
 } from '../utils';

describe('Data import tests', () => {
    test('getMin returns lower number', () => {
        let result = getMin(1, 2);
        expect(result).toBe(1);

        result = getMin(1, undefined);
        expect(result).toBe(1);
    });

    test('getMax returns higher number', () => {
        let result = getMax(1, 2);
        expect(result).toBe(2);

        result = getMax(1, undefined);
        expect(result).toBe(1);
    });

    test('Product is formatted correctly', () => {
        const product = 'Product,79.99,49.98,5,false';
        const result = getProduct(product);

        expect(result).toEqual({
            normalPrice: 79.99,
            clearancePrice: 49.98,
            quantityInStock: 5,
            addedToCart: false
        });
    });

    test('ReportLine is generated correctly with range', () => {
        const data = {
            items: 5,
            low: 19.99,
            high: 29.99,
            name: "Test"
        };
        const reportString = `Test 5 products @ $19.99-$29.99`;

        const result = generateReportLine(data);
        expect(result).toEqual(reportString);
    });

    test('ReportLine is generated correctly without', () => {
        const data = {
            items: 5,
            low: 19.99,
            high: 19.99,
            name: "Test"
        };
        const reportString = `Test 5 products @ $19.99`;

        const result = generateReportLine(data);
        expect(result).toEqual(reportString);
    });
});