import mongoose from 'mongoose';
import User from './user';

const { Schema } = mongoose;

mongoose.Promise = global.Promise;

const classSchema = new Schema({
  className:{
    type: String,
    required: true
  },
  classId:{
      type: String,
      required: true
  },
  students : [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

