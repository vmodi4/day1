import { useState } from "react";

type CartItem = {
    id: number; 
    title: string; 
    price: string; 
    [key: string]: any;
}


function useCart() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const add = (item: CartItem) => {
        console.log("Adding item to cart:", item)
        setCartItems((prevItems) => [...prevItems, item]);
    };

    const remove = (id: number) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    const clear = () => {
        setCartItems([]);
    };

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => {
            const price = parseFloat(item.price.replace("$", ""));
            return total + price;
        }, 0);
    };

    const getTotalItems = () => {
        return cartItems.length;
    }

    return {
        cartItems,
        add,
        remove,
        clear,
        getTotalPrice,
        getTotalItems
    };
}

export default useCart;