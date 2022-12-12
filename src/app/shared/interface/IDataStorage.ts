import { ProdutoCarrinho } from "../classes/produto-carrinho";

export interface IDataStorage {
  authorization: string;
	refreshToken?: string;
	data?: string;
	userName?: string;
  carrinho: ProdutoCarrinho[];
  titlePage: string;
}
