console.log(axios);
function getData() {
    //Goi ham axios truyen vao object 
    var promise = axios({
        url:'../Data/data.txt', //Duong dan den file hoac link api backend
        method:'GET',
        responseType:'text',
    })
    /* promise laf doi tuong co 2 phuong thuc can nho:
    + then(): nhan vao 1 ham khi request thanh cong
    + catch(): nhan vao 1 ham khi request that bai
     */
    //Xu li thanh cong
    promise.then(function(ketQua){
        console.log('ketQua',ketQua.data);
        document.querySelector('#content').innerHTML = 'Ho va ten: '+ ketQua.data;
    });
    //Xu li that bai
    promise.catch(function(error){
        console.log('error',error);
    });
}
getData()

function getDataXML(){
    var promise = axios({
        url:'../Data/data.xml',
        method:'GET',
        responseType:'document',
    });
    promise.then(function(ketQua){
        console.log('ketQua', ketQua.data);
        var hoTen = ketQua.data.querySelector('hoten').innerHTML;
        document.querySelector('#content').innerHTML = '<h1>' + hoTen +'</h1>';
    });
    promise.catch(function(error){
        console.log('error',error);
    })
}
getDataXML();

function getDataJson(){
    var promise = axios({
        url:'../Data/data.json',
        method:'GET',
        responseType:'json',
    });
    promise.then(function(ketQua){
        console.log('ketQua', ketQua.data);
        document.querySelector('#content').innerHTML += '<h3>' + ketQua.data.hoTen +'</h3>'; //Data la object co thuoc tinh hoten
    });
    promise.catch(function(error){
        console.log('error',error);
    })
}
getDataJson();