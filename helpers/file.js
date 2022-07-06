const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../', '/data.json');

const file = {
    GetData: () => {
        let data = fs.readFileSync(filePath);
        data = JSON.parse(data);
        data = data.books;
        return data;
    },
    UpdateJson: (massiv) => {
        let newData = {
            books: massiv
        };
        newData = JSON.stringify(newData);
        fs.writeFileSync(filePath, newData);
    }
};

module.exports = file;