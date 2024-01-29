import React from "react";
import storedItems from "../data/products.json"
import {Col, Row} from "react-bootstrap";
import {StoreItem} from "../components/StoreItem";


export function Store() {
    return (
    <>
        <h1>Store</h1>
        <Row md={2} xs={1} lg={3} className="g-3">
            {storedItems.map(item => (
                <Col key={item.id}>
                    <StoreItem {...item} />
                </Col>
            ))}
        </Row>
    </>
    )
}