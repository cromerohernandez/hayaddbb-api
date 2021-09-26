const mongoose = require('mongoose')

const houseSchema = new mongoose.Schema({
  ref: {
    type: String,
    required: [true, 'ref is required'],
    unique: true
  },
  address_city: {
    type: String,
    required: [true, 'city is required'],
  },
  address_door: {
    type: String,
  },
  address_floor: {
    type: String,
  },
  address_rest: {
    type: String,
  },
  address_street_type: {
    type: String,
    required: [true, 'street_type is required'],
    enum: ['Avenida', 'Bulevar', 'Calle', 'Callejón', 'Camino', 'Pasaje', 'Plaza', 'Ronda', 'Travesía']
  },
  address_street_name: {
    type: String,
    required: [true, 'street_name is required'],
  },
  address_street_number: {
    type: String,
    required: [true, 'street_number is required'],
  },
  area : {
    type: Number
  },
  bathrooms: {
    type: Number
  },  
  bedrooms: {
    type: Number
  },
  description: {
    type: String
  },
  garage: {
    type: Boolean
  },
  garden: {
    type: Boolean
  },
  terrace: {
    type: Boolean
  },
  type: {
    type: String,
    enum: ['Ático', 'Bajo', 'Casa', 'Chalet independiente', 'Chalet adosado', 'Piso']
  },
  price: {
    type: Number,
    required: [true, 'price is required'],
  }
},
{ timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      ret.id = doc._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
})

const House = mongoose.model('House', houseSchema)

module.exports = House