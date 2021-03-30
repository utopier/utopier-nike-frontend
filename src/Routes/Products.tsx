import React from 'react';
import { gql, useQuery,useLazyQuery,useReactiveVar  } from '@apollo/client';
import { meDataVar , getProductsVar, productList} from '../Apollo/LocalState'

import ProductCard from '../Components/ProductCard';
import ProductsHeader from '../Components/ProductsHeader';

import styled from 'styled-components';

import Loader from '../Components/Shared/Loader';
import Error from '../Components/Shared/Error';


const ProductsWapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
  padding: 150px 5px 20px 5px;
  @media(max-width: 960px){
      padding-top: 100px;
  }
  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 580px) {
    grid-template-columns: repeat(1, 1fr);  
  }
`;

const ProductsContainer = styled.div`
  padding-top: 50px;
  @media (max-width: 960px) {
    padding-top: 50px;
  }
`;

export const GET_PRODUCTS = gql`
  query getProducts($filter: String, $skip: Int, $take: Int, $orderBy: ProductsOrderByInput) {
    getProducts(filter: $filter, skip: $skip, take: $take, orderBy: $orderBy) {
      id
      title
      subtitle
      price
      imageUrls {
        url
      }
    }
  }
`;


interface IProductsPageProduct {
  __typename?: string;
  id: string;
  title: string;
  subtitle: string;
  price: string;
  imageUrls : IProductPageProductImgUrls[];
}

interface IProductPageProductImgUrls {
  url: string;
}

interface IGetProducts {
  getProducts: IProductsPageProduct[];
}

export const ME = gql`
  query me {
    me {
      id
      username
      email
      likes{
        id
        product{
          id
        }
      }
    }
  }
`

export interface IMeResult {
  me: IMeResultObj
}

interface IMeResultObj {
  id: string;
  username: string;
  email: string;
  likes?: IMeResultObjLike[];
}

interface IMeResultObjLike{
  id: string;
  product:{id: string};
}

let productCount

const Products : React.FC= React.memo(() => {
  useReactiveVar(getProductsVar)
  const { loading, error, data} = useQuery<IGetProducts>(GET_PRODUCTS, {variables:getProductsVar()});
  const [getNewProducts, {loading: newProductsLoading, error: newProductsError, data: newProductsData}] = useLazyQuery(GET_PRODUCTS);
  const {data: meData, loading: meLoading, error: meError} = useQuery<IMeResult>(ME)

	React.useEffect(() => {
		window.addEventListener('scroll',handleScroll)
			return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	})
  console.log('meLoading : ', meLoading);
  if(loading && meLoading) return <Loader/>;
  console.log('meData : ', meData);
  if(error && meError && newProductsError) return <Error error={error || meError}/>;
  
  const handleScroll = () => {
    if(document.documentElement.scrollHeight - (document.documentElement.scrollTop + document.documentElement.clientHeight) <= 280){
      if(getProductsVar().skip < productCount){
        getProductsVar({...getProductsVar(),skip:productList().length})
        productCount = productCount + 10;
        getNewProducts({variables:getProductsVar()});
      }
		}		
   }

   console.log('meData : ', meData);
   if(meData && meData.me){
      console.log('meData : ', meData);
      meDataVar({...meData.me})
   }

  if (data){
      const getProducts = data.getProducts;
      if(getProductsVar().skip === 0){
        productCount = getProducts.length
        productList([...getProducts]) 
      }
  }
  if(newProductsData){
    productList([...productList(), ...newProductsData.getProducts])
  }

  return (
    <>
      <ProductsContainer>
        <ProductsHeader />
        <ProductsWapper>
          {productList() && productList().map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                imageUrls={product.imageUrls[0]}
                price={product.price}
                title={product.title}
                subtitle={product.subtitle}
              />
            ))}
            {newProductsLoading ? <Loader/> : null}
        </ProductsWapper>
      </ProductsContainer>
    </>
  );
});

export default Products;
