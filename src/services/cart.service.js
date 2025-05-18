import { CartRepository } from '../dao/repositories/cart.repository.js';
import { TicketRepository } from '../dao/repositories/ticket.repository.js';

export class CartService {
    constructor() {
        this.cartRepository = new CartRepository();
        this.ticketRepository = new TicketRepository();
    }

    async processPurchase(cartId, userEmail) {
        const cart = await this.cartRepository.findById(cartId);
        const { productsToProcess, failedProducts, totalAmount } = await this.processProducts(cart);

        if (productsToProcess.length === 0) {
            return {
                status: "error",
                message: "No se pudo procesar ningún producto",
                failedProducts
            };
        }

        const ticket = await this.ticketRepository.create({
            amount: totalAmount,
            purchaser: userEmail
        });

        await this.updateCart(cart, failedProducts);

        return {
            status: "success",
            ticket,
            failedProducts
        };
    }

    async processProducts(cart) {
        const productsToProcess = [];
        const failedProducts = [];
        let totalAmount = 0;

        for (const item of cart.products) {
            if (await this.hasEnoughStock(item)) {
                await this.updateProductStock(item);
                totalAmount += item.product.price * item.quantity;
                productsToProcess.push(item);
            } else {
                failedProducts.push(item._id);
            }
        }

        return { productsToProcess, failedProducts, totalAmount };
    }
}