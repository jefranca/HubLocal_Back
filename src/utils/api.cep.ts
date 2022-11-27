import axios from "axios";

const URL = "https://viacep.com.br/ws/";

function getAdress(cep:number) {
  return axios.get(`${URL}${cep}/json/`);
}

export { getAdress }