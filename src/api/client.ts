import axios from "axios";

import type { Loja } from "./models/Loja";
import type { Produto } from "./models/Produto";

export const apiClient = axios.create({
  baseURL: "https://encoinfo27fastapi.fly.dev",
});

export async function fetchLojas(): Promise<Loja[]> {
  const { data } = await apiClient.get<Loja[]>("/lojas");
  return data;
}

export async function fetchLoja(lojaId: string): Promise<Loja> {
  const { data } = await apiClient.get<Loja>(`/lojas/${lojaId}`);
  return data;
}

export async function createLoja(nome: string, banner: string, icone: string, cor_loja: string): Promise<Loja> {
  const { data } = await apiClient.put<Loja>(
    "/loja/add/", 
    undefined, 
    {
      params: {
        nome,
        banner,
        icone,
        cor_loja,
      },
    }
  );

  return data;
}

export async function createProduto(lojaId: string, nome: string, icone: string): Promise<Produto> {
  const { data } = await apiClient.put<Produto>(
    `/loja/${lojaId}/produto/add/`,
    undefined,
    {
      params: {
        nome,
        icone,
      },
    }
  );

  return data;
}