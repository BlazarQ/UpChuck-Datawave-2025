/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1717202528")

  // remove field
  collection.fields.removeById("number564787089")

  // remove field
  collection.fields.removeById("number3436259764")

  // add field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "number1997922972",
    "max": null,
    "min": null,
    "name": "63",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "number511942527",
    "max": null,
    "min": null,
    "name": "91",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(6, new Field({
    "hidden": false,
    "id": "number94419918",
    "max": null,
    "min": null,
    "name": "182",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(7, new Field({
    "hidden": false,
    "id": "number113497997",
    "max": null,
    "min": null,
    "name": "365",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // update field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "number3477060368",
    "max": null,
    "min": null,
    "name": "35",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1717202528")

  // add field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "number564787089",
    "max": null,
    "min": null,
    "name": "initial_deposit",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "number3436259764",
    "max": null,
    "min": null,
    "name": "min_monthly_ad",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // remove field
  collection.fields.removeById("number1997922972")

  // remove field
  collection.fields.removeById("number511942527")

  // remove field
  collection.fields.removeById("number94419918")

  // remove field
  collection.fields.removeById("number113497997")

  // update field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "number3477060368",
    "max": null,
    "min": null,
    "name": "interest_per_annum",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
})
