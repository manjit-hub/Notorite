import mongoose from "mongoose";

const NoteSchema = mongoose.Schema({
    fileName: {
        type: String,
        required: true,
    },
    fileDescription: {
        type: String,
        required: true,
    },
    tags: {
        type: [{ type: String }],
        required: true,
    },
    files: {
        type: String,
        required: true,
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

const Notes = mongoose.model("Notes", NoteSchema);

export default Notes;