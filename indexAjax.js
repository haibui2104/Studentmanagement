function renderTableSinhVien(arrSV) {
    //input
    var stringHTML = "";
    for (var i = 0; i < arrSV.length; i++) {
      // Moi lan duyet lay ra 1 sv trong mang Sinh Vien
      var sv = arrSV[i];
      // duyet qua 1 diu tuong sinh vien thi tao ra 1 the tr tuong ung + dong vao string HTML
      stringHTML += `
              <tr>
              <td>${sv.maSinhVien}</td>
              <td>${sv.tenSinhVien}</td>
              <td>${sv.email}</td>
              <td>${sv.soDienThoai}</td>
              <td>${sv.loaiSinhVien}</td>
              <td>
              <button class="btn btn-outline-danger" onclick="removeSt('${sv.maSinhVien}')">Remove</button>
              <button class="btn btn-outline-danger" onclick="adjustIn('${sv.maSinhVien}')">Adjust</button>
              </td>
              </tr>
         `;
    }
    // dom den the tbody viet lai phan innerHTML cua the
    document.querySelector("tbody").innerHTML = stringHTML;
}

function getApiSinhVien(){
    var promise = axios({
        url:'http://svcy.myclass.vn/api/SinhVienApi/LayDanhSachSinhVien', //duong dan api do back end quy dinh
        method:'GET', // phuong thuc do back end quy dinh
    });
    //Xu li khi goi api thanh cong
    promise.then(function(result){
        console.log('Ket Qua',result.data)
        renderTableSinhVien(result.data);
    })

    promise.catch(function(error){
        console.log(error)
    })
}
getApiSinhVien();

document.querySelector('#confirm').onclick = function(){
    //tao ra format data nhu backend yeu cau de chua du lieu tu nguoi dung nhap
    var sv = new SinhVien();
    sv.maSinhVien = document.getElementById("maSinhVien").value;
    sv.tenSinhVien = document.getElementById("tenSinhVien").value;
    sv.loaiSinhVien = document.getElementById("loaiSinhVien").value;
    sv.diemRenLuyen = document.getElementById("diemRenLuyen").value;
    sv.email = document.getElementById("email").value;
    sv.soDienThoai = document.getElementById("soDienThoai").value;
    sv.diemToan = document.getElementById("diemToan").value;
    sv.diemLy = document.getElementById("diemLy").value;
    sv.diemHoa = document.getElementById("diemHoa").value;
    console.log('sv',sv);
    /* var sv = {
        maSinhVien: document.querySelector('#maSinhVien').value,
        tenSinhVien: document.querySelector('#tenSinhVien').value,
    }
     */
    var promise = axios({
        url:'http://svcy.myclass.vn/api/SinhVienApi/ThemSinhVien', //backend cung cap
        method:'POST', //backend cung cap
        data:sv //{maSinhVien:'',tenSinhVien:'',...} format dung backend yeu cau\
    });
    promise.then(function(result){
        console.log('result',result.data);
        getApiSinhVien();
    })
    promise.catch(function(error){
        console.log(error);
    })

}
function removeSt(maSV){
    var promise = axios({
        url:'http://svcy.myclass.vn/api/SinhVienApi/XoaSinhVien?maSinhVien=' +maSV,
        method:'DELETE',
    })
    promise.then(function(result){
        console.log(result.data);
        //Neu xoa thanh cong thi goi lai api lay du lieu sinh vien tu tren sever ve lai
        getApiSinhVien();
    });
    promise.catch(function(error){
        console.log(error.data);
    });
}

function adjustIn(maSinhVien){

    var promise = axios({
        url:'http://svcy.myclass.vn/api/SinhVienApi/LayThongTinSinhVien?maSinhVien='+maSinhVien,
        method:'GET',
    });

    promise.then(function(result){
        console.log(result.data);
        //lay du lieu load len cac input
        //Dua du lieu len form
        var sinhVien = result.data;
        document.querySelector('#maSinhVien').value = sinhVien.maSinhVien;
        document.querySelector('#tenSinhVien').value = sinhVien.tenSinhVien;
        document.querySelector('#email').value = sinhVien.email;
        document.querySelector('#diemToan').value = sinhVien.diemToan;
        document.querySelector('#diemLy').value = sinhVien.diemLy;
        document.querySelector('#diemHoa').value = sinhVien.diemHoa;
        document.querySelector('#soDienThoai').value = sinhVien.soDienThoai;
        document.querySelector('#diemRenLuyen').value = sinhVien.diemRenLuyen;

    })

    promise.catch(function(error){
        console.log(error);
    })
}

document.querySelector('#update').onclick =function(){
    var sv = new SinhVien();
    sv.maSinhVien = document.getElementById("maSinhVien").value;
    sv.tenSinhVien = document.getElementById("tenSinhVien").value;
    sv.loaiSinhVien = document.getElementById("loaiSinhVien").value;
    sv.diemRenLuyen = document.getElementById("diemRenLuyen").value;
    sv.email = document.getElementById("email").value;
    sv.soDienThoai = document.getElementById("soDienThoai").value;
    sv.diemToan = document.getElementById("diemToan").value;
    sv.diemLy = document.getElementById("diemLy").value;
    sv.diemHoa = document.getElementById("diemHoa").value;

    var promise = axios({
        url:'http://svcy.myclass.vn/api/SinhVienApi/CapNhatThongTinSinhVien?maSinhVien='+sv.maSinhVien,
        method:'PUT',
        data:sv
    });

    promise.then(function(result){
        console.log('result',result.data);
        getApiSinhVien();
    })
    promise.catch(function(error){
        console.log(error);
    })

}
