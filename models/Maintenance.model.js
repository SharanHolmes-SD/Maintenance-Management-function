import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    petId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    userId: {
        type: String,
        required: true,
        trim: true
    },
    contact: {
        type: String,
        required: true,
        trim: true
    },
    m_mail: {
        type: String,
        required: true,
        trim: true
    },
    bus_details: {
        type: String,
        required: true,
        trim: true
    },
    main_type: {
        type: String,
        required: true,
        trim: true
    },
    issue_des: {
        type: String,
        required: true,
        trim: true
    },
    ser_date: {
        type: String,
        required: true,
        trim: true
    },
    urg_level: {
        type: String,
        required: true,
        trim: true
    },
   
  
  
}, { timestamps: true });

const Maintenance = mongoose.model("Maintenance", itemSchema);

export default Maintenance;
