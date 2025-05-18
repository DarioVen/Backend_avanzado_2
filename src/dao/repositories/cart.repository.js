import Cart from '../dao/models/cart.model.js';

export class CartRepository {
    async findById(id) {
        return await Cart.findById(id).populate('products.product');
    }

    async update(id, cartData) {
        return await Cart.findByIdAndUpdate(id, cartData, { new: true });
    }

    async addProduct(cartId, productId, quantity) {
        const cart = await this.findById(cartId);
        cart.products.push({ product: productId, quantity });
        return await cart.save();
    }
}