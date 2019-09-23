module.exports = function (mongoose) {
  let modelName = "translation";
  let Types = mongoose.Schema.Types;
  let Schema = new mongoose.Schema({
    key: {
      type: Types.String,
      required: true,
      unique: false
    },
    content_en: {
      type: Types.String,
      required: false,
      unique: false,
      index: false,
    },
    content_de: {
      type: Types.String,
      required: false,
      unique: false,
      index: false,
    },
  });
  
  Schema.statics = {
    collectionName: modelName,
    routeOptions: {
      readAuth: false
    }
  };
  
  return Schema;
};