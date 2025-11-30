import mongoose from 'mongoose';
import kleur from 'kleur';

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    // console.log(`${kleur.green('✓')} Connected`);
    return { connected: true };
  } catch (error) {
    console.log(`${kleur.red('✗')} Connection failed: ${error.message}`);
    return { connected: false };
  }
};

export default dbConnection;
