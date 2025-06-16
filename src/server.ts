import app from './app';
import mongoose from 'mongoose';
import config from './app/config';

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();

// mongodb+srv://admin_mahi:E7QT5H81i7LIA0GM@cluster0.yvhfr2x.mongodb.net/first-project?retryWrites=true&w=majority&appName=Cluster0
