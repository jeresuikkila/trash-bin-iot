require('dotenv').config({ path: '../.env' });

const models = require('./models')






//real
models.sensorbin.findOrCreate({
  where: {
    id: 1
  },
  defaults: {
    id: 1,
    default_pitch: null,
    default_roll: null,
    location: "60.18095,24.82242",
    taglocation: "lid",
    trashbinId: 1,
    touchtagDevEui: "70b3d54b1c0019f9"
  }
}).then(() => {
  models.sensorbin.findOne({
    where: {
      id: "1"
    },
    include: [
      { model: models.trashbin, attributes: ['id'] },
      { model: models.touchtag, attributes: ['dev_eui'] },
    ]
  })
});

//real
models.sensorbin.findOrCreate({
  where: {
    id: 2
  },
  defaults: {
    default_pitch: null,
    default_roll: null,
    location: "60.18015,24.82762",
    taglocation: "lid",
    trashbinId: 2,
    touchtagDevEui: "70b3d54b1c001871"
  }
}).then(() => {
  models.sensorbin.findOne({
    where: {
      id: "2"
    },
    include: [
      { model: models.trashbin, attributes: ['id'] },
      { model: models.touchtag, attributes: ['dev_eui'] },
    ]
  })
});

//test
models.sensorbin.findOrCreate({
  where: {
    id: 3
  },
  defaults: {
    default_pitch: null,
    default_roll: null,
    location: "60.18015,24.82762",
    taglocation: "lid",
    trashbinId: 4,
    touchtagDevEui: "70b3d54b1c0018b9"
  }
}).then(() => {
  models.sensorbin.findOne({
    where: {
      id: "3"
    },
    include: [
      { model: models.trashbin, attributes: ['id'] },
      { model: models.touchtag, attributes: ['dev_eui'] },
    ]
  })
});