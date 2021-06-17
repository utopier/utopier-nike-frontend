import { makeVar } from '@apollo/client';

interface ICartProduct {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  color: string;
  imageUrls: ICartProductImgUrls[];
}

interface ICartProductImgUrls {
  url: string;
}

interface ICartProducts {
  id: string;
  product: ICartProduct;
}

const initGetTodosVar = {
  filter: '',
  orderBy: {},
  skip: 0,
  take: 10,
};

interface IMeDataVar {
  __typename?: string;
  id?: string;
  username?: string;
  email?: string;
  likes?: IMeDataVarLike[];
}

interface IMeDataVarLike {
  __typename?: string;
  id: string;
  product: { id: string };
}

export const isLoggedInVar = makeVar(!!localStorage.getItem('token'));
export const meDataVar = makeVar<IMeDataVar | undefined>(undefined);
export const cartProductsVar = makeVar<ICartProducts[]>([] as ICartProducts[]);
export const getProductsVar = makeVar(initGetTodosVar);
export const productList = makeVar([]);
