import { ObjectId } from "mongodb";

export async function convertObjectIdUtil(id: string | ObjectId) {
  try {
    return new ObjectId(id);
  } catch (_) {
    return Promise.reject("Invalid ID conversion to ObjectId");
  }
}
