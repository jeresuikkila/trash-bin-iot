const app = require("./app");
const models = require("./models")

const port = 3000;
console.log(Date.now())

async() => {
    const location = await models.location.create({
        address: "BETONIMIEHENKUJA 5, 02150, Espoo",
        lat: 60.18097,
        lng: 24.83166,
    });
    const bin = await models.trashbin.create({
        wasteType: "General",
        size: 660,
    })
}

app.listen(port, () => console.log(`Server listening on port ${port}!`));

