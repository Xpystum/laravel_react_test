import ListProducts from "../components/ListProducts/ListProducts";

export default function PageListProducts(props){
    let state = props.state;

    return(
        <div>
            <ListProducts 
                state={state}
                onEditCountProduct={props.onEditCountProduct}
                onDeleteProductCart={props.onDeleteProductCart}
                onAddProductCart={props.onAddProductCart}
            />
        </div>
    )
}