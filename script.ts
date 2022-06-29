import { Product, Report } from "./types"
import { getProduct, getMax, getMin, generateReportLine } from "./utils"

// Make sure we got a filename on the command line.
if (process.argv.length < 3) {
    console.log('Usage: ts-node ' + process.argv[1] + ' FILENAME');
    process.exit(1);
}

export const formatDataProducts = (data: string): Product[] => {

    const products: Product[] = []
    data
        .split("\r")
        .map(str => str.trim())
        .map(str => {
            // if (str.startsWith("Type")) type.push(str.split(","))
            if (str.startsWith("Product")) {
                products.push(getProduct(str))
            }
        })
    return products
}

const generateReport = (products: Product[]): void => {
    const clearance: Report = { name: "Clearance Price:", items: 0 };
    const normal: Report = { name: 'Normal Price:', items: 0 };
    const cart: Report = { name: 'Price In Cart:', items: 0 };

    products.forEach((p) => {
        // We can't allow products with less than 3 in stock to be sold to customers, 
        // so exclude those from your report
        if (p.quantityInStock >= 3) {
            // check if item is on clearance or normal
            if (p.normalPrice !== p.clearancePrice) {
                clearance.items++;
                clearance.low = getMin(p.clearancePrice, clearance.low);
                clearance.high = getMax(p.clearancePrice, clearance.high);
            } else {
                normal.items++;
                normal.low = getMin(p.normalPrice, normal.low);
                normal.high = getMax(p.normalPrice, normal.high);
            }

            // check if item must be added to cart
            if (p.addedToCart) cart.items++;
        }
    });

    //Sort the output in descending order by how many products that met the inclusion criteria
    // are in each price type.
    [clearance, normal, cart]
        .sort((a: Report, b: Report) => b.items - a.items)
        .map((p: Report ): void => console.log(generateReportLine(p)))
}


// Read the file and print its contents.
const fs = require('fs')
const filename = process.argv[2];

fs.readFile(filename, 'utf8', function (err: any, data: string) {
    if (err) throw err;

    const products: Product[] = formatDataProducts(data) // updates products 

    generateReport(products) // generate report 

});
