import { CartService } from '../services/cart.service.js';

export class CartController {
    constructor() {
        this.cartService = new CartService();
    }

    async purchase(req, res) {
        try {
            const result = await this.cartService.processPurchase(req.params.cid, req.user.email);
            return res.status(result.status === "success" ? 200 : 400).json(result);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}