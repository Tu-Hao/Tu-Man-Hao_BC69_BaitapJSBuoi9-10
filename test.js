// Mảng lưu trữ danh sách nhân viên
var employees = [];

// Class đối tượng Nhân viên
class Employee {
  constructor(
    taiKhoan,
    hoTen,
    email,
    matKhau,
    ngayLam,
    luongCB,
    chucVu,
    gioLam
  ) {
    this.taiKhoan = taiKhoan;
    this.hoTen = hoTen;
    this.email = email;
    this.matKhau = matKhau;
    this.ngayLam = ngayLam;
    this.luongCB = luongCB;
    this.chucVu = chucVu;
    this.gioLam = gioLam;
    this.tongLuong = 0;
    this.loaiNV = "";
  }

  // Phương thức tính tổng lương
  tinhTongLuong() {
    switch (this.chucVu) {
      case "Giám đốc":
        this.tongLuong = this.luongCB * 3;
        break;
      case "Trưởng phòng":
        this.tongLuong = this.luongCB * 2;
        break;
      case "Nhân viên":
        this.tongLuong = this.luongCB;
        break;
      default:
        this.tongLuong = 0;
        break;
    }
  }

  // Phương thức xếp loại nhân viên
  xepLoaiNV() {
    if (this.gioLam >= 192) {
      this.loaiNV = "Xuất sắc";
    } else if (this.gioLam >= 176) {
      this.loaiNV = "Giỏi";
    } else if (this.gioLam >= 160) {
      this.loaiNV = "Khá";
    } else {
      this.loaiNV = "Trung bình";
    }
  }
}

// Hàm hiển thị danh sách nhân viên lên bảng
function hienThiDanhSachNV() {
  var html = "";
  employees.forEach(function (nv, index) {
    html += `
          <tr>
            <td>${nv.taiKhoan}</td>
            <td>${nv.hoTen}</td>
            <td>${nv.email}</td>
            <td>${nv.ngayLam}</td>
            <td>${nv.chucVu}</td>
            <td>${nv.tongLuong.toLocaleString()} VND</td>
            <td>${nv.loaiNV}</td>
            <td>
              <button class="btn btn-info btn-sm mr-1" onclick="suaNhanVien(${index})">Sửa</button>
              <button class="btn btn-danger btn-sm" onclick="xoaNhanVien(${index})">Xóa</button>
            </td>
          </tr>
        `;
  });
  // $("#tableDanhSach").html(html);
  document.getElementById("#tableDanhSach").innerHTML = html;

}

// Thêm nhân viên mới
$("#btnThemNV").click(function () {
  var taiKhoan = $("#tknv").val().trim();
  var hoTen = $("#name").val().trim();
  var email = $("#email").val().trim();
  var matKhau = $("#password").val().trim();
  var ngayLam = $("#datepicker").val().trim();
  var luongCB = parseInt($("#luongCB").val().trim());
  var chucVu = $("#chucvu").val();
  var gioLam = parseInt($("#gioLam").val().trim());

  // Validation
  if (
    validateForm(
      taiKhoan,
      hoTen,
      email,
      matKhau,
      ngayLam,
      luongCB,
      chucVu,
      gioLam
    )
  ) {
    var newEmployee = new Employee(
      taiKhoan,
      hoTen,
      email,
      matKhau,
      ngayLam,
      luongCB,
      chucVu,
      gioLam
    );
    newEmployee.tinhTongLuong();
    newEmployee.xepLoaiNV();
    employees.push(newEmployee);
    hienThiDanhSachNV();
    saveLocalStorage();
    $("#myModal").modal("hide");
    resetForm();
  }
});

// Xóa nhân viên
window.xoaNhanVien = function (index) {
  employees.splice(index, 1);
  hienThiDanhSachNV();
  luuLocalStorage();
};

// Sửa nhân viên
window.suaNhanVien = function (index) {
  var nv = employees[index];
  $("#tknv").val(nv.taiKhoan);
  $("#name").val(nv.hoTen);
  $("#email").val(nv.email);
  $("#password").val(nv.matKhau);
  $("#datepicker").val(nv.ngayLam);
  $("#luongCB").val(nv.luongCB);
  $("#chucvu").val(nv.chucVu);
  $("#gioLam").val(nv.gioLam);

  $("#btnThemNV").hide();
  $("#btnCapNhat").show();
  $("#btnCapNhat").click(function () {
    var taiKhoan = $("#tknv").val().trim();
    var hoTen = $("#name").val().trim();
    var email = $("#email").val().trim();
    var matKhau = $("#password").val().trim();
    var ngayLam = $("#datepicker").val().trim();
    var luongCB = parseInt($("#luongCB").val().trim());
    var chucVu = $("#chucvu").val();
    var gioLam = parseInt($("#gioLam").val().trim());

    if (
      validateForm(
        taiKhoan,
        hoTen,
        email,
        matKhau,
        ngayLam,
        luongCB,
        chucVu,
        gioLam
      )
    ) {
      nv.taiKhoan = taiKhoan;
      nv.hoTen = hoTen;
      nv.email = email;
      nv.matKhau = matKhau;
      nv.ngayLam = ngayLam;
      nv.luongCB = luongCB;
      nv.chucVu = chucVu;
      nv.gioLam = gioLam;
      nv.tinhTongLuong();
      nv.xepLoaiNV();
      hienThiDanhSachNV();
      luuLocalStorage();
      $("#myModal").modal("hide");
      resetForm();
      $("#btnThemNV").show();
      $("#btnCapNhat").hide();
    }
  });
};

// Tìm nhân viên theo loại
$("#btnTimNV").click(function () {
  var keyword = $("#searchName").val().trim().toLowerCase();
  var filteredEmployees = employees.filter(function (nv) {
    return nv.loaiNV.toLowerCase().includes(keyword);
  });
  var html = "";
  filteredEmployees.forEach(function (nv, index) {
    html += `
          <tr>
            <td>${nv.taiKhoan}</td>
            <td>${nv.hoTen}</td>
            <td>${nv.email}</td>
            <td>${nv.ngayLam}</td>
            <td>${nv.chucVu}</td>
            <td>${nv.tongLuong.toLocaleString()} VND</td>
            <td>${nv.loaiNV}</td>
            <td>
              <button class="btn btn-info btn-sm mr-1" onclick="suaNhanVien(${index})">Sửa</button>
              <button class="btn btn-danger btn-sm" onclick="xoaNhanVien(${index})">Xóa</button>
            </td>
          </tr>
        `;
  });
  $("#tableDanhSach").html(html);
});

// Validate form
function validateForm(
  taiKhoan,
  hoTen,
  email,
  matKhau,
  ngayLam,
  luongCB,
  chucVu,
  gioLam
) {
  var isValid = true;

  // Tài khoản
  if (!/^\d{4,6}$/.test(taiKhoan)) {
    $("#tbTKNV").html("Tài khoản từ 4 đến 6 ký số.");
    isValid = false;
  } else {
    $("#tbTKNV").html("");
  }

  // Họ tên
  if (!/^[a-zA-Z\s]+$/.test(hoTen)) {
    $("#tbTen").html("Họ tên chỉ được chứa chữ và không để trống.");
    isValid = false;
  } else {
    $("#tbTen").html("");
  }

  // Email
  if (!/\S+@\S+\.\S+/.test(email)) {
    $("#tbEmail").html("Email phải đúng định dạng và không để trống.");
    isValid = false;
  } else {
    $("#tbEmail").html("");
  }

  // Mật khẩu
  if (!/^.{6,10}$/.test(matKhau)) {
  }
}
