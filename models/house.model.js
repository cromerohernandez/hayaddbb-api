const mongoose = require('mongoose')

const houseSchema = new mongoose.Schema({
  address: {
    city: {
      type: String,
      required: [true, 'city is required'],
    },
    door: {
      type: String,
    },
    floor: {
      type: String,
    },
    street_type: {
      type: String,
      required: [true, 'road_type is required'],
      enum: ['Avenida', 'Bulevar', 'Calle', 'Callejón', 'Camino', 'Pasaje', 'Plaza', 'Ronda', 'Travesía']
    },
    street_name: {
      type: String,
      required: [true, 'road_name is required'],
    },
    street_number: {
      type: Number,
      required: [true, 'road_number is required'],
    }
  },
  area : {
    type: Number
  },
  description: {
    type: String
  },
  features: {
    bathrooms: {
      type: Number
    },  
    bedrooms: {
      type: Number
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
    }
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