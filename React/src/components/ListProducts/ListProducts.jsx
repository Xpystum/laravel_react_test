import { useState } from 'react';

import Product from "../Product/Product";
import styles from "./ListProducts.module.scss";
import Cart from '../Cart/Cart';

export default function ListProducts(props){

    let [addProductCart, setAddProductCart] = useState();

    let state = props.state;
    
    const results = [];

    

    return (
        <div className={styles.ListProducts}>

            <Cart 
                state={state} 
                onEditCountProduct={props.onEditCountProduct}
                onDeleteProductCart={props.onDeleteProductCart}
            />

            <div className="container">
                <div className="row mb--n30">
                    
                    {
                        state.products.map((product)=>
                            <Product 
                                key={product.id} 
                                product={product} 
                                onAddProductCart={props.onAddProductCart}
                            />
                        )
                    }

                </div>
            </div>
            
            
        </div>
    );
}