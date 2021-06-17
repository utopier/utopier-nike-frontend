import React from 'react';
import { gql, useQuery, useLazyQuery, NetworkStatus } from '@apollo/client';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { getProductsVar, productList } from '../Apollo/LocalState';
import ProductCard from '../Components/ProductCard';
import ProductsHeader from '../Components/ProductsHeader';
import Loader from '../Components/Shared/Loader';
import Error from '../Components/Shared/Error';

const ProductsWapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
  padding: 150px 5px 20px 5px;
  @media (max-width: 960px) {
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

export const SEARCH_PRODUCTS = gql`
  query searchProduct($term: String!) {
    searchProduct(term: $term) {
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
  imageUrls: IProductPageProductImgUrls[];
}

interface IProductPageProductImgUrls {
  url: string;
}

interface IGetProducts {
  getProducts: IProductsPageProduct[];
}

// export const ME = gql`
//   query me {
//     me {
//       id
//       username
//       email
//       likes{
//         id
//         product{
//           id
//         }
//       }
//     }
//   }
// `

// export interface IMeResult {
//   me: IMeResultObj
// }

// interface IMeResultObj {
//   id: string;
//   username: string;
//   email: string;
//   likes?: IMeResultObjLike[];
// }

// interface IMeResultObjLike{
//   id: string;
//   product:{id: string};
// }

let productCount;

const Products: React.FC = React.memo(() => {
  console.log('products Component');
  // useReactiveVar(getProductsVar)

  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const paramSearchTerm = query.get('searchTerm');
  console.log('paramSearchTerm : ', paramSearchTerm);

  const { loading, error, data, refetch, networkStatus } = useQuery<IGetProducts>(GET_PRODUCTS, {
    variables: { skip: 0, take: 10 },
  });
  const [getNewProducts, { loading: newProductsLoading, error: newProductsError, data: newProductsData }] =
    useLazyQuery(GET_PRODUCTS);
  // const {data: meData, loading: meLoading, error: meError, refetch: meRefetch} = useQuery<IMeResult>(ME)
  const [getSearchProducts, { loading: searchProductsLoading, error: searchProductsError, data: searchProductsData }] =
    useLazyQuery(SEARCH_PRODUCTS);

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  React.useEffect(() => {
    console.log('get searchProducts');
    getSearchProducts({ variables: { term: paramSearchTerm } });
  }, [paramSearchTerm]);

  let errorStatus;
  // console.log('meLoading : ', meLoading);
  console.log('getProducts Loading : ', loading);
  console.log('newProductsLoading : ', newProductsLoading);
  console.log('searchProductsLoading : ', searchProductsLoading);
  console.log(networkStatus);
  console.log(networkStatus === NetworkStatus.refetch);
  if (loading) return <Loader />;

  if (error) {
    errorStatus = error;
    console.log(errorStatus);
    console.log(typeof errorStatus.message);
    console.log(
      errorStatus.message.match('findFirst()') ||
        errorStatus.message.match('prisma.imageurl.findFirst()') ||
        errorStatus.message.match('Expected Iterable') ||
        errorStatus.message.match('max_user_connections'),
    );
    console.log('productList is Empty', !!productList());
    if (
      (!!productList() && errorStatus.message.match('findFirst()')) ||
      errorStatus.message.match('prisma.imageurl.findFirst()') ||
      errorStatus.message.match('Expected Iterable') ||
      errorStatus.message.match('max_user_connections')
    ) {
      refetch();
      console.log('refetch...');
      console.log(networkStatus);
      console.log(networkStatus === NetworkStatus.refetch);
      // return <Loader/>;
    } else {
      return <Error error={error} />;
    }
  }

  if (newProductsError) {
    errorStatus = newProductsError;
    if (errorStatus) {
      getNewProducts();
      console.log('getNewProducts...');
    } else {
      return <Error error={error} />;
    }
  }

  if (searchProductsError) {
    console.log('searchProductsError : ', searchProductsError);
  }

  // if(meError){
  //   errorStatus = meError;
  //   console.log(errorStatus);
  //   if(localStorage.getItem('token') && !!meDataVar()) {
  //     meRefetch();
  //     console.log('me refetch...');
  //     console.log(networkStatus);
  //     console.log(networkStatus === NetworkStatus.refetch);
  //   } else {
  //     return <Error error={error || meError}/>;
  //   }
  // }

  const handleScroll = () => {
    if (
      document.documentElement.scrollHeight -
        (document.documentElement.scrollTop + document.documentElement.clientHeight) <=
      280
    ) {
      if (getProductsVar().skip < productCount && !paramSearchTerm) {
        getProductsVar({ ...getProductsVar(), skip: productList().length });
        productCount = productCount + 10;
        getNewProducts({ variables: getProductsVar() });
      }
    }
  };

  //  if(meData && meData.me){
  //     console.log('meData : ', meData);
  //     meDataVar({...meData.me})
  //  }

  if (!searchProductsData && data) {
    const getProducts = data.getProducts;
    if (getProductsVar().skip === 0) {
      productCount = getProducts.length;
      productList([...getProducts]);
    }
  }

  if (searchProductsData) {
    const getProducts = searchProductsData.searchProduct;
    productList([...getProducts]);
  }

  console.log('newProductsError : ', newProductsError);
  console.log('newProductsLoading : ', newProductsLoading);
  if (newProductsData) {
    productList([...productList(), ...newProductsData.getProducts]);
  }

  return (
    <>
      <ProductsContainer>
        <ProductsHeader />
        <ProductsWapper>
          {productList() &&
            productList().map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                imageUrls={product.imageUrls[0]}
                price={product.price}
                title={product.title}
                subtitle={product.subtitle}
              />
            ))}
          {newProductsLoading || newProductsError ? <Loader /> : null}
        </ProductsWapper>
      </ProductsContainer>
    </>
  );
});

export default Products;
