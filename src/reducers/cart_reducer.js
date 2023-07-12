import { ADD_TO_CART, CLEAR_CART, COUNT_CART_TOTALS, REMOVE_CART_ITEM, TOGGLE_CART_ITEM_AMOUNT } from '../actions';

const cart_reducer = (state, action) => {
	if (action.type === ADD_TO_CART) {
		const { id, color, amount, product } = action.payload;
		const tempItem = state.cart.find((item) => item.id === id + color);
		if (tempItem) {
			const tempCart = state.cart.map((cartItem) => {
				if (cartItem.id === tempItem.id) {
					let newAmount = tempItem.amount + amount;
					if (newAmount > tempItem.max) {
						newAmount = tempItem.max;
					}
					return { ...tempItem, amount: newAmount };
				} else {
					return cartItem;
				}
			});
			return { ...state, cart: tempCart };
		} else {
			const newItem = {
				id: id + color,
				name: product.name,
				color,
				amount,
				image: product.images[0].url,
				price: product.price,
				max: product.stock,
			};
			return { ...state, cart: [...state.cart, newItem] };
		}
	}

	if (action.type === REMOVE_CART_ITEM) {
		const tempCart = state.cart.filter((cartItem) => cartItem.id !== action.payload);
		return { ...state, cart: tempCart };
	}

	if (action.type === CLEAR_CART) {
		return { ...state, cart: [] };
	}

	if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
		const { id, value } = action.payload;
		const tempCart = state.cart.map((cartItem) => {
			if (cartItem.id === id) {
				let newAmount = cartItem.amount;
				if (value === 'increase' && cartItem.amount < cartItem.max) {
					newAmount++;
				}
				if (value === 'decrease' && cartItem.amount > 1) {
					newAmount--;
				}
				return { ...cartItem, amount: newAmount };
			}
			return cartItem;
		});
		return { ...state, cart: tempCart };
	}

	if (action.type === COUNT_CART_TOTALS) {
		// const reduceResult = state.cart.reduce((accumulator, currentIteration/Value) => {}, initialValue)
		const { total_items, total_amount } = state.cart.reduce(
			(total, cartItem) => {
				// return {
				// 	total_items: total.total_items + cartItem.amount,
				// 	total_amount: total.total_amount + cartItem.price * cartItem.amount,
				// }
				total.total_items += cartItem.amount;
				total.total_amount += cartItem.price * cartItem.amount;
				return total;
			},
			{
				total_items: 0,
				total_amount: 0,
			}
		);
		return { ...state, total_items, total_amount };
	}

	throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
