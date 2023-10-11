import './Cart.css';

export default function Cart(props){

    let products = props.state.products;
    //let cart = props.cart;


    let state = props.state;



/*
    if(props.newProduct){
        cart.push(props.newProduct);
        setCart(cart.slice(cart));
    }
*/

    function convertProduct(obj){
        
        for(let product of products){
            if(obj.id_product == product.id){
                return product;
            }
        }

    }

    function onDeleteProductCart(index){
        //setCart(cart.slice(cart.splice(index, 1)));
    }

    function totalPriceProducts(){
        /*
        let totalPrice = 0;

        for(let product of products){
            for(let productCart of cart){
                if(productCart.id_product == product.id){
                    totalPrice += product.price * productCart.count;
                }
            }
        }

        return totalPrice;*/
    }

   

    function onDeleteCountProduct(index){
        //cart[index].count--;
        //setCart(cart.slice(cart));
    }

    
    return (
        <div>
            <div className="offCanvas__minicart active">
                <div className="minicart__header ">
                    <div className="minicart__header--top d-flex justify-content-between align-items-center">
                        <h3 className="minicart__title"> Shopping Cart</h3>
                        <button className="minicart__close--btn" aria-label="minicart close btn" data-offcanvas="">
                            <svg className="minicart__close--icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M368 368L144 144M368 144L144 368"></path></svg>
                        </button>
                    </div>
                    <p className="minicart__header--desc">The organic foods products are limited</p>
                </div>
                <div className="minicart__product">
                    {
                        state.cart.map((index_product, index)=>
                            <div className="minicart__product--items d-flex" key={index_product.id_product + "_" + index_product.id_characteristic}>
                                <div className="minicart__thumb">
                                    <a href="product-details.html">
                                        <img src={process.env.PUBLIC_URL+convertProduct(index_product).img[0]} alt="prduct-img"/>
                                    </a>
                                </div>
                                <div className="minicart__text">
                                    <h4 className="minicart__subtitle"><a href="product-details.html">
                                        { convertProduct(index_product).title }    
                                    </a></h4>
                                    <span className="color__variant"><b>Color:</b> Beige</span>
                                    <div className="minicart__price">
                                        <span className="minicart__current--price">${convertProduct(index_product).price}</span>
                                        <span className="minicart__old--price">${convertProduct(index_product).old_price}</span>
                                    </div>
                                    <div className="minicart__text--footer d-flex align-items-center">
                                        <div className="quantity__box minicart__quantity">
                                            <button type="button" className="quantity__value decrease" 
                                            aria-label="quantity value"
                                             value="Decrease Value" 
                                             onClick={(evt)=>props.onEditCountProduct(evt, index, {action:false})}
                                            >-</button>
               
                                            <label>
                                                {index_product.overflow_count}
                                                <input type="number" 
                                                className={"quantity__number " + (index_product.overflow_count? "error": "")} 
                                                value={index_product.count} 
                                                data-counter="" 
                                                onChange={(evt)=>props.onEditCountProduct(evt, index)}/>
                                            </label>

                                            <button type="button" className="quantity__value increase"
                                             aria-label="quantity value" 
                                             value="Increase Value" 
                                             onClick={(evt)=>props.onEditCountProduct(evt, index, {action:true})}
                                            >+</button>
                                        </div>
                                        <button className="minicart__product--remove" 
                                            type="button"  
                                            onClick={()=>{props.onDeleteProductCart(index)}}
                                        >Remove</button>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    
                </div>
                <div className="minicart__amount">
                    <div className="minicart__amount_list d-flex justify-content-between">
                        <span>Sub Total:</span>
                        <span><b>$240.00</b></span>
                    </div>
                    <div className="minicart__amount_list d-flex justify-content-between">
                        <span>Total:</span>
                        <span><b>${totalPriceProducts()}</b></span>
                    </div>
                </div>
                <div className="minicart__conditions text-center">
                    <input className="minicart__conditions--input" type="checkbox"/>
                    <label className="minicart__conditions--label">I agree with the 
                    <a className="minicart__conditions--link" href="privacy-policy.html">Privacy Policy</a></label>
                </div>
                <div className="minicart__button d-flex justify-content-center">
                    <a className="primary__btn minicart__button--link" href="cart.html">View cart</a>
                    <a className="primary__btn minicart__button--link" href="checkout.html">Checkout</a>
                </div>
            </div>
        </div>
    );
}

