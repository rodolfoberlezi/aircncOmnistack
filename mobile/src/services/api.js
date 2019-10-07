import axios from "axios";

const api = axios.create({
    //se estiver no expo, pode usar http://192.168.0.15:3333 (IP da máquina)
    baseURL: "http://localhost:3333"
});

//adb reverse tcp:3333 tcp:3333
//(quando está com o emulador/dispositivo do android, 
//deve utilizar esse comando para o localhost do Android achar o da API)

export default api;