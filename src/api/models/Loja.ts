import type { Produto } from "./Produto";

export interface Loja {
    id: string;
    nome: string;
    banner: string;
    icone: string;
    cor_loja: string;
    produtos: Produto[]
}