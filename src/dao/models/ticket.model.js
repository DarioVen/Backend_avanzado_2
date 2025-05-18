import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
    code: {
        type: String,
        unique: true,
        required: true
    },
    purchase_datetime: {
        type: Date,
        default: Date.now
    },
    amount: {
        type: Number,
        required: true
    },
    purchaser: {
        type: String,
        required: true
    }
});

// Middleware para autogenerar el código único
ticketSchema.pre('save', async function(next) {
    if (!this.code) {
        const count = await mongoose.models.Ticket.countDocuments();
        this.code = `TICKET-${count + 1}`;
    }
    next();
});

export const Ticket = mongoose.model('Ticket', ticketSchema);