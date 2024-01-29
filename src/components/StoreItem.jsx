import React from "react";
import {Button, Card} from "react-bootstrap";
import {formatCurrency} from "../utils/formatCurrency.js";

/**
 * @typedef {object} StoreItemProps
 * @property {number} id
 * @property {string} name
 * @property {number} price
 * @property {string} imgUrl
 */


/** @param props {StoreItemProps} */
export function StoreItem({id, name, price, imgUrl}) {
    /** @type {number} */
    const quantity = 0
    return (
        <Card className="h-100">
            <Card.Img
                variant="top"
                src={imgUrl}
                height="200px"
                style={{objectFit: "cover" }}
            />
            <Card.Body className="d-flex flex-column">
                <Card.Title className="d-flex justify-content-space-between align-items-baseline mb-4">
                    <span className="fs-2">{name}</span>
                    <span className="ms-2 text-muted">{formatCurrency(price)}</span>
                </Card.Title>
                <div className="mt-auto">
                    {quantity === 0 ? (
                        <Button className="w-100"
                                // onClick={() => increaseCartQuantity(id)}
                        >
                            + Add To Cart
                        </Button>
                    ) : (
                        <div
                            className="d-flex align-items-center flex-column"
                            style={{ gap: ".5rem" }}
                        >
                            <div
                                className="d-flex align-items-center justify-content-center"
                                style={{ gap: ".5rem" }}
                            >
                                <Button >-</Button>
                                <div>
                                    <span className="fs-3">{quantity}</span> in cart
                                </div>
                                <Button >+</Button>
                            </div>
                            <Button
                                // onClick={() => removeFromCart(id)}
                                variant="danger"
                                size="sm"
                            >
                                Remove
                            </Button>
                        </div>
                    )}
                </div>
            </Card.Body>
        </Card>
    )
}