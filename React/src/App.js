
import './App.css';
import { useEffect, useState } from 'react';
import ListProducts from './components/ListProducts/ListProducts';
import 'bootstrap/dist/css/bootstrap.css';
import { Route, Routes } from 'react-router-dom';
import PageListProducts from './pages/PageListProducts';
import PageProduct from './pages/PageProduct';
import axios from 'axios'


function App() {

  let [stateRequest, setStateRequest] = useState([]);

  let [statePreloader, setPreloader] = useState({
    loading: true
  });

  function onAddProductCart(id_product, id_characteristic){



    let flag = false;
    for(let product of state.cart){
      if(product.id_product == id_product){
        flag = true;

        if(searchProduct(id_product).maxCount > product.count)
        {
          product.count++;
        }
        else{
          product.overflow_count = true;
        }
        
      }
    }

    if(!flag){

      state.cart.push({
        'id_product': id_product,
        count: 1,
        'id_characteristic': id_characteristic,
      })

    }
    setState(Object.assign({}, state));


    // setAddProductCart({
    //     'id_product': id_product,
    //     count: 2,
    //     'id_characteristic': id_characteristic,
    // })
  }
/*
  useEffect(() => {
    request()
  }, []);
*/

  function request(){
    
    axios.get('https://liblessons.ru/ajax/data2.php')
      .then(function (response) {
        // обработка успешного запроса
        if(response.status == 200){

          setStateRequest(response.data);

          statePreloader.loading = false;
          setPreloader(Object.assign({}, statePreloader));

        }

        
      })
      .catch(function (error) {
        // обработка ошибки
        console.log(error);
      })
  }



  let [state, setState] = useState({
    products : [
                {
                    id:1,
                    title: "Amazon Cloud Cam Security Camera",
                    img: ["product5.webp", "product6.webp"],
                    price: 1000,
                    old_price: 1100,
                    reviews: {count: 123, average_value:4},
                    maxCount: 7,
                    characteristics: [
                      {id: 1, value: "зеленый", name: "Color"},
                      {id: 2, value: "черный", name: "Color"}
                    ]
                },
                {
                    id:2,
                    title: "Lorem ipsum dolor, sit amet adipisi elit.",
                    img: ["product5.webp", "product6.webp"],
                    price: 2000,
                    old_price: null,
                    reviews: {count: 100, average_value:3},
                    maxCount: 13,
                    characteristics: [
                      {id: 1, value: "зеленый", name: "Color"},
                      {id: 2, value: "черный", name: "Color"}
                    ]
                },
                {
                    id:3,
                    title: "Taboriosam asnda et itaque expcabo.",
                    img: ["product5.webp", "product6.webp"],
                    price: 3000,
                    old_price: 3400,
                    reviews: {count: 999, average_value:5, average_my_value: 3},
                    maxCount: 100,
                    characteristics: [
                      {id: 1, value: "зеленый", name: "Color"},
                      {id: 2, value: "черный", name: "Color"}
                    ]
                },
            ],
    cart: 
        [
            {
              id_product: 1,
              count: 4,
              id_characteristic: 1,
              overflow_count: false,
            },
            {
              id_product: 2,
              count: 2,
              id_characteristic: 1,
              overflow_count: false,
            }
        ]
  }

      
  );


  // index : продукта, количество которого изменяем
  // action [true/false] : инкремент/дикремент
  function onEditCountProduct(evt, index, parametrs = {}){

    state.cart[index].overflow_count = false;

    if(parametrs.action && parametrs.action != undefined){
      if(state.cart[index].count + 1 > searchProduct(state.cart[index].id_product).maxCount){
        state.cart[index].overflow_count = true;
      }
      else{
        state.cart[index].count++;
      }
    }


    if(!parametrs.action && parametrs.action != undefined){

      if(state.cart[index].count - 1 == 0){
        onDeleteProductCart(index);
      }
      else{
        state.cart[index].count--;
      }
      
    }
      

    if(evt.target.hasOwnProperty("value")){
      state.cart[index].count = evt.target.value;
    }
  
    setState(Object.assign({}, state));
  }


  function onDeleteProductCart(index){
    let cart = state.cart;
    cart.slice(cart.splice(index, 1))

    state.cart = [];
    state.cart = cart;

    setState(Object.assign({}, state));
  }


  function searchProduct(index){
    for(let product of state.products){
        for(let productCart of state.cart){
            if(productCart.id_product == product.id && product.id == index){
              return product;
            }
        } 
    }
    return 0;
  }





  return (
    <div className="App">

      <button onClick={request}>запрос</button>

      <Routes>

        <Route
          path="/"
          element={
                    <PageListProducts 
                      state={state} 
                      onEditCountProduct={onEditCountProduct}
                      onDeleteProductCart={onDeleteProductCart}
                      onAddProductCart={onAddProductCart}
                    />
                  }
        />
        <Route
          path="page/:id"
          element={<PageProduct />}
        />

      </Routes>


      
      {
        stateRequest.map((post, index)=>
          <div key={index}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </div>
        )
      }

      {
        (statePreloader.loading)? <div>Гружу, чё</div>: ""
      }

    </div>
  );
}

export default App;
