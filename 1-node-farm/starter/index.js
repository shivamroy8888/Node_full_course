const fs = require("fs");
const http = require("http");
const url = require("url");
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);
// const textOut = `this is what we know: ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut)

// non - blocking asynchronous
fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
  fs.readFile(`./txt/${data1}`, "utf-8", (err, data2) => {
    console.log(data2);
    fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
      console.log(data3);

      fs.writeFile(`./txt/final.txt`, `${data2}\n${data3}`, "utf-8", (err) => {
        console.log("Your file has been written");
      });
    });
  });
});
console.log("will read new files!");

// server
const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);

  if (!product.organic)
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  return output;
};
//top level code execute only once as a synchronous
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  console.log(req.url);
  const path = req.url;
  //overview page
  if (path === "/" || path === "/overview") {
    res.writeHead(404, { "Content-Type": "text/html" });

    const cardshtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardshtml)
    res.end(output);
    //product page
  } else if (path === "/product") {
    res.end("This is product");
    // api
  } else if (path === "/api") {
    // fs.readFile(`${__dirname}/dev-data/data.json`, "utf-8", (err, data) => {
    //   const productData = JSON.parse(data); // used that code on top level
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
  } else {
    // not found
    res.writeHead(404, {
      "Content-Type": "text/html",
      "my-own-header": "hello-world",
    });
    res.end("<h1>Page not Found</h1>");
  }
});

server.listen(4000, () => {
  console.log("server is running on port 4000");
});
