// plugins/toJSON.js
// plugins/toJSON.js
export default function toJSON(schema) {
  schema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: (_, ret) => {
      ret.id = ret._id; // keep id
      delete ret._id;   // remove _id
    },
  });
}
