var mangSinhVien = [];
var validator = new Validation();
document.getElementById("confirm").onclick = function () {
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


  var valid = true;
  valid =
    valid &&
    validator.blankTesting(
      sv.maSinhVien,
      "#error_required_maSinhVien",
      "Ma sinh vien khong duoc bo trong"
    ) &&
    validator.stringLength(sv.maSinhVien, 4, 10, "#error_required_maSinhVien") && validator.sameStudentCodeCheck(sv.maSinhVien,"#error_required_maSinhVien", mangSinhVien);
  valid &=
    validator.blankTesting(
      sv.tenSinhVien,
      "#error_required_tenSinhVien",
      "Ten sinh vien khong duoc bo trong"
    ) &&
    validator.stringLength(
      sv.tenSinhVien,
      6,
      15,
      "#error_required_tenSinhVien"
    ) &&
    validator.letterTypeTesting(sv.tenSinhVien, "#error_required_tenSinhVien");
  valid &= validator.blankTesting(
    sv.diemRenLuyen,
    "#error_required_diemRenLuyen",
    "Diem ren luyen khong duoc bo trong"
  ) && validator.numberCheck(sv.diemRenLuyen, "#error_required_diemRenLuyen") && validator.scoreCheck(sv.diemRenLuyen * 1,"#error_required_diemRenLuyen");
  valid &= validator.blankTesting(
    sv.email,
    "#error_required_email",
    "Email khong duoc bo trong"
  );
  valid &= validator.blankTesting(
    sv.soDienThoai,
    "#error_required_soDienThoai",
    "So dien thoai khong duoc bo trong"
  );
  valid &= validator.blankTesting(
    sv.diemToan,
    "#error_required_diemToan",
    "Diem toan khong duoc bo trong"
  );
  valid &= validator.blankTesting(
    sv.diemLy,
    "#error_required_diemLy",
    "Diem ly khong duoc bo trong"
  );
  valid &= validator.blankTesting(
    sv.diemHoa,
    "#error_required_diemHoa",
    "Diem hoakhong duoc bo trong"
  );

  if (!valid) {
    return; //Dừng không chạy tiếp
  }
  // kiem tra du lieu nguoi dung nhap co hop le hay khong
  // if(sv.maSinhVien.trim() === ''){
  //     document.querySelector('#error_required_maSinhVien').innerHTML = 'Ma sinh vien khong duoc bo trong!'

  //     valid = false;
  // }
  // else{
  //     document.querySelector('#error_required_maSinhVien').innerHTML = '';
  // }
  // if(sv.tenSinhVien.trim() === ''){
  //     document.querySelector('#error_required_tenSinhVien').innerHTML = 'Ten sinh vien khong duoc bo trong!'
  //     valid = false;
  // }
  // else{
  //     document.querySelector('#error_required_tenSinhVien').innerHTML = '';
  // }
  // if (!valid){
  //     return; //Dung khong chay tiep
  // }
  console.log(sv);
  mangSinhVien.push(sv);

  console.log("mangSinhVien", mangSinhVien);
  renderTableSinhVien(mangSinhVien);
  // create the display
  // b1: create tr tag
  //document.createElement('tagName'): syntax to create1 tlmk = js
  // var trSinhVien = document.createElement('tr');

  // // b2: create td tags that contain student info
  // var tdMaSinhVien = document.createElement('td');
  // tdMaSinhVien.innerHTML = sv.maSinhVien;

  // var tdTenSinhVien = document.createElement('td');
  // tdTenSinhVien.innerHTML = sc.tenSinhVien;

  // var tdLoaiSinhVien = document.createElement('td');
  // tdLoaiSinhVien.innerHTML = sc.loaiSinhVien;

  // var tdEmail = document.createElement('td');
  // tdEmail.innerHTML = sc.email;

  // var tdSoDienThoai = document.createElement('td');
  // tdSoDienThoai.innerHTML = sc.soDienThoai;

  // //td function

  // var tdFunction = document.createElement('td');

  // var btnRemove = document.createElement('button');
  // btnRemove.className = 'btn btn-outline-danger';
  // btnRemove.innerHTML = 'Remove';
  // btnRemove.onclick = function(){
  //     // remove is a method to delete the tag
  //     // btn.Remove.remove();
  //     // var td = btnRemove.parentElement;
  //     // var tr = td.parentElement;
  //     //tr.Remove();
  //     // btn.parentElement.parentElement.Remove();
  //     //
  //     btnRemove.closest('tr').remove();
  // }
  // // b3: bringing td tag inside tr tag
  // trSinhVien.appendChild(tdMaSinhVien);
  // trSinhVien.appendChild(tdTenSinhVien);
  // trSinhVien.appendChild(tdLoaiSinhVien);
  // trSinhVien.appendChild(tdEmail);
  // trSinhVien.appendChild(tdSoDienThoai);
  saveLocalStorage();
  resetForm();
};
// document.querySelector('tbody').appendChild(trSinhVien);
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
function removeSt(maSVClick) {
  // tu ma sinh vien tim ra vi tri sinh vien trong mang => xu li xoa
  for (var index = mangSinhVien.length - 1; index >= 0; index--) {
    var sv = mangSinhVien[index];
    if (sv.maSinhVien === maSVClick) {
      // So sanh ma sv trong tung object cua mang co trung voi ma sinh vien click o giao dien hay khong
      mangSinhVien.splice(index, 1);
    }
  }
  //Sau khi xoa xong goi ham tao lai bang table sinh vien
  renderTableSinhVien(mangSinhVien);
  saveLocalStorage();
}
function resetForm() {
  // document.getElementById('maSinhVien').value
  var arrInput = document.querySelectorAll("#formSinhVien input");
  for (var index = 0; index < arrInput.length; index++) {
    var input = arrInput[index];
    input.value = "";
  }
}
//mangSinhVien = [{maSinhVien:1, tenSinhVien:'Nguyen van a'},]
function adjustIn(maSVClick) {
  console.log("maSVClick", maSVClick);
  //Tu ma SV click tim ra doi tuong sinh vien trong mang
  for (var index = 0; index < mangSinhVien.length; index++) {
    var sinhVien = mangSinhVien[index];
    if (mangSinhVien[index].maSinhVien === maSVClick) {
      //Neu bang ma sv click thi load du lieu len cac the input phia tren
      document.getElementById("maSinhVien").value = sinhVien.maSinhVien;
      document.getElementById("tenSinhVien").value = sinhVien.tenSinhVien;
      document.getElementById("loaiSinhVien").value = sinhVien.loaiSinhVien;
      document.getElementById("diemToan").value = sinhVien.diemToan;
      document.getElementById("diemLy").value = sinhVien.diemLy;
      document.getElementById("diemHoa").value = sinhVien.diemHoa;
      document.getElementById("diemRenLuyen").value = sinhVien.diemRenLuyen;
      document.getElementById("email").value = sinhVien.email;
      document.getElementById("soDienThoai").value = sinhVien.soDienThoai;
    }
  }
  document.getElementById("maSinhVien").disabled = true;
  //Lock the input for maSinhVien
}

document.querySelector("#update").onclick = function () {
  var updatingInfo = new SinhVien();
  updatingInfo.maSinhVien = document.querySelector("#maSinhVien").value;
  updatingInfo.tenSinhVien = document.querySelector("#tenSinhVien").value;
  updatingInfo.loaiSinhVien = document.querySelector("#loaiSinhVien").value;
  updatingInfo.diemToan = document.querySelector("#diemToan").value;
  updatingInfo.diemLy = document.querySelector("#diemLy").value;
  updatingInfo.diemHoa = document.querySelector("#diemHoa").value;
  updatingInfo.diemRenLuyen = document.querySelector("#diemRenLuyen").value;
  updatingInfo.email = document.querySelector("#email").value;
  updatingInfo.soDienThoai = document.querySelector("#soDienThoai").value;
  for (var index = 0; index < mangSinhVien.length; index++) {
    var arrStudent = mangSinhVien[index];
    if (arrStudent.maSinhVien === updatingInfo.maSinhVien) {
      //Tim sinh vien trong mang co ma trung voi sinh vien sau khi nguoi dung cap nhat du lieu
      // arrStudent.maSinhVien = updatingInfo.maSinhVien;
      arrStudent.tenSinhVien = updatingInfo.tenSinhVien;
      arrStudent.loaiSinhVien = updatingInfo.loaiSinhVien;
      arrStudent.diemToan = updatingInfo.diemToan;
      arrStudent.diemLy = updatingInfo.diemLy;
      arrStudent.diemHoa = updatingInfo.diemHoa;
      arrStudent.diemRenLuyen = updatingInfo.diemRenLuyen;
      arrStudent.email = updatingInfo.email;
      arrStudent.soDienThoai = updatingInfo.soDienThoai;
    }
  }
  //Mo khoa ma sinh vien
  document.querySelector("#maSinhVien").disabled = false;
  //Tao lai table voi noi dung moi
  renderTableSinhVien(mangSinhVien);
  //resetform
  resetForm();
};
function saveLocalStorage() {
  //Luu mang sinh vien (mangSinhVien)
  var sArrStudent = JSON.stringify(mangSinhVien);
  //Bien doi mang object sinh vien thanh chuoi
  // Luu chuoi do vao storage
  localStorage.setItem("mangSinhVien", sArrStudent);
}
function getStoringData() {
  // Kiem tra du llieu trong localstorage
  if (localStorage.getItem("mangSinhVien")) {
    var sArrStudent = localStorage.getItem("mangSinhVien");
    //chuyen chuoi duoc luu tu local storage => mang
    mangSinhVien = JSON.parse(sArrStudent);
    //goi ham tao bang
    renderTableSinhVien(mangSinhVien);
  }
}
getStoringData();

document.querySelector("#btnSearch").onclick = function () {
  //lay ra tu khoa nguoi dung nhap
  // .toLowerCase(): Ham bien doi tat ca ve chu thuong
  // .trim(): ham loai bo khoang trong dau va cuoi cua chuoi
  //input: keyWord, mangSinhVien
  var keyWord = document
    .querySelector("#txtKeyWord")
    .value.toLowerCase()
    .trim();
  //output: mang chua cac sinh vien
  var arrStudentSearch = [];
  console.log("keyWord", keyWord);
  //duyet qua mang sinh vien lay ra ten tung sinh vien kiem tra voi tu khoa xem co chua tu khoa hay khong
  for (var index = 0; index < mangSinhVien.length; index++) {
    //moi lan duyet lay ra 1 sinh vien trong mang
    var sinhVien = mangSinhVien[index];
    if (
      sinhVien.tenSinhVien.toLowerCase().trim().search(keyWord) !== -1 ||
      sinhVien.soDienThoai.trim().search(keyWord) !== -1
    ) {
      arrStudentSearch.push(sinhVien);
    }
  }
  //goi ham tao lai table
  renderTableSinhVien(arrStudentSearch);
};
