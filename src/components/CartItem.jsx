import React from "react";
import { Button, Stack } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"
import storeItems from "../data/products.json"
import { formatCurrency } from "../utils/formatCurrency.js";

// type CartItemProps = {
//     id: number
//     quantity: number
// }

/**
 * @typedef {object} CartItemProps
 * @property id {number}
 * @property quantity {number}
 */

/** @param props {CartItemProps} */
export function CartItem({ id, quantity }) {
    const { removeFromCart } = useShoppingCart()
    const item = storeItems.find(i => i.id === id)
    if (item == null) return null

    return (
        <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
            <img
                src={item.imgUrl}
                style={{ width: "125px", height: "75px", objectFit: "cover" }}
            />
            <div className="me-auto">
                <div>
                    {item.name}{" "}
                    {quantity > 1 && (
                        <span className="text-muted" style={{ fontSize: ".65rem" }}>
              x{quantity}
            </span>
                    )}
                </div>
                <div className="text-muted" style={{ fontSize: ".75rem" }}>
                    {formatCurrency(item.price)}
                </div>
            </div>
            <div> {formatCurrency(item.price * quantity)}</div>
            <Button
                variant="outline-danger"
                size="sm"
                onClick={() => removeFromCart(item.id)}
            >
                &times;
            </Button>
        </Stack>
    )
}
