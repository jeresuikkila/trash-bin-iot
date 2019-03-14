const app = require("./app");
const models = require("./models")

const port = 3000;
console.log(Date.now())

a = async() => {
    // const location = await models.location.create({
    //     address: "BETONIMIEHENKUJA 5, 02150, Espoo",
    //     lat: 60.18097,
    //     lng: 24.83166,
    // });
    // const bin = await models.trashbin.create({
    //     wasteType: "General",
    //     size: 660,
    //     locationId: 4
    // });
    // await models.trashbin.findOne({
    //     where: {
    //         id: bin.id
    //     },
    //     include: [
    //         { model: models.location, attributes: ['id'] },
    //     ],
    // });
    // const sensor = await models.sensor.create({
    //     taglocation: "lid",
    //     battery: 50,
    //     lat: "60.18097",
    //     lng: "24.83166",
    //     trashbinId: 1
    // });
    // await models.sensor.findOne({
    //     where: {
    //         id: sensor.id
    //     },
    //     include: [
    //         { model: models.trashbin, attributes: ['id'] },
    //     ],
    // });
}

//a()

app.listen(port, () => console.log(`Server listening on port ${port}!`));

