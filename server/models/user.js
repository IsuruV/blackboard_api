import mongoose from 'mongoose';
import Class from './class';

const { Schema } = mongoose;

mongoose.Promise = global.Promise;

const userSchema = new Schema({
  name:{
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  classes: [{ type: Schema.Types.ObjectId, ref: 'Class' }]
});

// Write some encrption for Password

const User = mongoose.model('User', userSchema);
export default User;
