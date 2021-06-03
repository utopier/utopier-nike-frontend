import React from 'react'

interface ICartProductCartProps {
    id: string;
    product: ICartProduct;
    onClickDeleteBtn: (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

interface ICartProduct {
    id: string;
    title: string;
    subtitle: string;
    price: string;
    color: string;
    imageUrls: ICartProductImgUrls[];
  }
    
  interface ICartProductImgUrls{
    url: string;
  }

const CartProductCart:React.FC<ICartProductCartProps> = React.memo(({id,product,onClickDeleteBtn}) => {
    console.log(product);
    return(
        <>
            <div className="cart__body--product-card">
                <div className="cart__body--product-card--img">
                      <img src={product && product.imageUrls[0].url} alt={product && product.title} width="150px" height="120px" />
                </div>
                <div className="cart__body--product-card--info">
                      <div>
                        <h3>{product && product.title}</h3>
                      </div>
                      <div>
                        <span>{product && product.subtitle}</span>
                      </div>
                      <div>
                        <span>{product && product.color}</span>
                      </div>
                      <div>
                        <span>{product && product.price}</span>
                      </div>
                </div>
                <div className="cart__body--product-card--delete-btn">
                      <button data-id={id} type="button" onClick={onClickDeleteBtn}>
                        X
                      </button>
                </div>
            </div>
        </>
    )
})

export default CartProductCart;