export interface Project {
  _id: string; // ✅ Mongoose returns this
  name: string;
  description?: string;
  createdBy: string;
  teamId: string;
}
