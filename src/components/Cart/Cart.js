import classes from './Cart.module.css'
import Modal from '../UI/Modal'
import CartContext from '../../store/cart-context'
import { useContext } from 'react'
import CartItem from './CartItem'

const Cart = (props) => {
    const cartCtx = useContext(CartContext)         // tạo ra store mà có thể sử dụng đc ở tất cả các file 

    // them so luong san pham 
    const handleOnAddToCart = (item) => {           
        cartCtx.addItem({...item, amount : 1})
    }
    // giam so luong sp
    const handleOnRemoveToCart = (id) => {
        cartCtx.removeItem(id)
    }
    // tinh gia
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`
    const hasItems = cartCtx.items.length > 0
    return (
        <Modal onCloseModal={props.onCloseCart}>
            <ul className={classes['cart-items']}>
                {cartCtx.items.map((item) => (
                    <CartItem
                        key={item.id}
                        name={item.name}
                        amount={item.amount}
                        price={item.price}
                        onAdd={handleOnAddToCart.bind(null,item)}
                        onRemove={handleOnRemoveToCart.bind(null,item.id)}
                    >
                    </CartItem>
                ))}
            </ul>
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onCloseCart}>Close</button>
                {hasItems && <button className={classes.button}>Order</button>}
            </div>
        </Modal>
    )
}

export default Cart;