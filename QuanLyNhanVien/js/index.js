var employees = []; // Mảng lưu trữ danh sách nhân viên
var currentIndex = -1; // Biến lưu chỉ số của nhân viên đang được cập nhật

// Hàm khởi tạo đối tượng Employee
function Employee(
  account,
  name,
  email,
  password,
  date,
  salary,
  position,
  hours
) {
  this.account = account;
  this.name = name;
  this.email = email;
  this.password = password;
  this.date = date;
  this.salary = salary;
  this.position = position;
  this.hours = hours;
  this.totalSalary = calculateTotalSalary(salary, position); // Tính lương tổng
  this.type = determineEmployeeType(hours); // Xác định loại nhân viên
}

// Hàm tính lương tổng dựa trên lương cơ bản và chức vụ
function calculateTotalSalary(salary, position) {
  salary = parseFloat(salary);
  if (position === "Giám đốc") {
    return salary * 3;
  } else if (position === "Trưởng phòng") {
    return salary * 2;
  } else {
    return salary;
  }
}

// Hàm xác định loại nhân viên dựa trên số giờ làm
function determineEmployeeType(hours) {
  hours = parseFloat(hours);
  if (hours >= 192) {
    return "Xuất sắc";
  } else if (hours >= 176) {
    return "Giỏi";
  } else if (hours >= 160) {
    return "Khá";
  } else {
    return "Trung bình";
  }
}

// Gắn sự kiện nhấn nút thêm và cập nhật nhân viên
document.getElementById("btnThemNV").addEventListener("click", addEmployee);
document.getElementById("btnCapNhat").addEventListener("click", updateEmployee);

// Lấy dữ liệu từ Local Storage khi tải trang
window.onload = function () {
  loadFromLocalStorage(); // Tải dữ liệu từ Local Storage
  displayEmployees(); // Hiển thị danh sách nhân viên
};

// Hàm validation kiểm tra dữ liệu đầu vào
function validate() {
  var account = document.getElementById("tknv").value.trim();
  var name = document.getElementById("name").value.trim();
  var email = document.getElementById("email").value.trim();
  var password = document.getElementById("password").value.trim();
  var date = document.getElementById("datepicker").value.trim();
  var salary = document.getElementById("luongCB").value.trim();
  var position = document.getElementById("chucvu").value;
  var hours = document.getElementById("gioLam").value.trim();

  var valid = true;
  var errorMessage = "";

  // Tài khoản
  if (!account.match(/^\d{4,6}$/)) {
    errorMessage += "Tài khoản phải là 4-6 ký số.\n";
    valid = false;
  }

  // Họ và tên
  if (!name.match(/^[a-zA-Z\s]+$/)) {
    errorMessage += "Tên nhân viên phải là chữ.\n";
    valid = false;
  }

  // Email
  if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
    errorMessage += "Email không hợp lệ.\n";
    valid = false;
  }

  // Mật khẩu
  if (!password.match(/^(?=.*[A-Z])(?=.*\d)(?=.*\W).{6,10}$/)) {
    errorMessage +=
      "Mật khẩu phải từ 6-10 ký tự, chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt.\n";
    valid = false;
  }

  // Ngày làm
  if (!date.match(/^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/)) {
    errorMessage += "Ngày làm không hợp lệ. Định dạng mm/dd/yyyy.\n";
    valid = false;
  }

  // Lương cơ bản
  if (
    !salary.match(/^\d+$/) ||
    parseFloat(salary) < 1000000 ||
    parseFloat(salary) > 20000000
  ) {
    errorMessage += "Lương cơ bản phải từ 1,000,000 đến 20,000,000.\n";
    valid = false;
  }

  // Chức vụ
  if (["Giám đốc", "Trưởng phòng", "Nhân viên"].indexOf(position) === -1) {
    errorMessage += "Chức vụ không hợp lệ.\n";
    valid = false;
  }

  // Giờ làm
  if (
    !hours.match(/^\d+$/) ||
    parseFloat(hours) < 80 ||
    parseFloat(hours) > 200
  ) {
    errorMessage += "Giờ làm phải từ 80 đến 200 giờ.\n";
    valid = false;
  }

  if (!valid) {
    alert(errorMessage); // Hiển thị thông báo lỗi
  }

  return valid; // Trả về hợp lệ
}

// Hàm thêm nhân viên
function addEmployee() {
  if (validate()) {
    // Kiểm tra dữ liệu hợp lệ
    var account = document.getElementById("tknv").value.trim();
    var name = document.getElementById("name").value.trim();
    var email = document.getElementById("email").value.trim();
    var password = document.getElementById("password").value.trim();
    var date = document.getElementById("datepicker").value.trim();
    var salary = document.getElementById("luongCB").value.trim();
    var position = document.getElementById("chucvu").value;
    var hours = document.getElementById("gioLam").value.trim();

    var employee = new Employee(
      account,
      name,
      email,
      password,
      date,
      salary,
      position,
      hours
    ); // Tạo đối tượng Employee
    employees.push(employee); // Thêm vào mảng nhân viên
    saveToLocalStorage(); // Lưu vào Local Storage
    displayEmployees(); // Hiển thị danh sách nhân viên
    clearForm(); // Xóa dữ liệu trong form
  }
}

// Hàm xóa nhân viên
function deleteEmployee(index) {
  employees.splice(index, 1); // Xóa nhân viên theo chỉ số
  saveToLocalStorage(); // Lưu lại vào Local Storage
  displayEmployees(); // Hiển thị danh sách nhân viên
}

// Hàm chỉnh sửa nhân viên
function editEmployee(index) {
  currentIndex = index; // Lưu lại chỉ số nhân viên đang chỉnh sửa
  var employee = employees[index]; // Lấy thông tin nhân viên
  document.getElementById("tknv").value = employee.account;
  document.getElementById("name").value = employee.name;
  document.getElementById("email").value = employee.email;
  document.getElementById("password").value = employee.password;
  document.getElementById("datepicker").value = employee.date;
  document.getElementById("luongCB").value = employee.salary;
  document.getElementById("chucvu").value = employee.position;
  document.getElementById("gioLam").value = employee.hours;
}

// Hàm cập nhật nhân viên
function updateEmployee() {
  if (currentIndex >= 0 && validate()) {
    // Kiểm tra dữ liệu hợp lệ và chỉ số hợp lệ
    var account = document.getElementById("tknv").value.trim();
    var name = document.getElementById("name").value.trim();
    var email = document.getElementById("email").value.trim();
    var password = document.getElementById("password").value.trim();
    var date = document.getElementById("datepicker").value.trim();
    var salary = document.getElementById("luongCB").value.trim();
    var position = document.getElementById("chucvu").value;
    var hours = document.getElementById("gioLam").value.trim();

    var employee = new Employee(
      account,
      name,
      email,
      password,
      date,
      salary,
      position,
      hours
    ); // Tạo đối tượng Employee
    employees[currentIndex] = employee; // Cập nhật nhân viên
    saveToLocalStorage(); // Lưu lại vào Local Storage
    displayEmployees(); // Hiển thị danh sách nhân viên
    clearForm(); // Xóa dữ liệu trong form
    currentIndex = -1; // Đặt lại chỉ số
  }
}

// Hàm hiển thị danh sách nhân viên
function displayEmployees() {
  var tableBody = document.getElementById("tableDanhSach");
  tableBody.innerHTML = ""; // Xóa nội dung hiện tại

  employees.forEach(function (employee, index) {
    // Lặp qua mảng nhân viên
    var row = document.createElement("tr");
    row.innerHTML = `
          <td>${employee.account}</td>
          <td>${employee.name}</td>
          <td>${employee.email}</td>
          <td>${employee.date}</td>
          <td>${employee.salary}</td>
          <td>${employee.position}</td>
          <td>${employee.hours}</td>
          <td>${employee.totalSalary}</td>
          <td>${employee.type}</td>
          <td>
              <button class="btn btn-primary btn-sm" data-toggle="modal" data-target="#myModal" onclick="editEmployee(${index})">Cập nhật</button>
              <button class="btn btn-danger btn-sm" onclick="deleteEmployee(${index})">Xóa</button>
          </td>
      `;
    tableBody.appendChild(row); // Thêm dòng vào bảng
  });
}

// Hàm xóa dữ liệu trong form
function clearForm() {
  document.getElementById("tknv").value = "";
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  document.getElementById("datepicker").value = "";
  document.getElementById("luongCB").value = "";
  document.getElementById("chucvu").value = "Chọn chức vụ";
  document.getElementById("gioLam").value = "";
}

// Hàm lưu dữ liệu vào Local Storage
function saveToLocalStorage() {
  localStorage.setItem("employees", JSON.stringify(employees));
}

// Hàm tải dữ liệu từ Local Storage
function loadFromLocalStorage() {
  var data = localStorage.getItem("employees");
  if (data) {
    employees = JSON.parse(data); // Chuyển dữ liệu từ JSON thành mảng
    displayEmployees(); // Hiển thị danh sách nhân viên
  }
}

// Hàm loại bỏ dấu câu tiếng việt
function removeVietnameseTones(str) {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
  // Remove extra spaces
  // Bỏ các khoảng trắng liền nhau
  str = str.replace(/ + /g, " ");
  str = str.trim();
  // Remove punctuations
  // Bỏ dấu câu, kí tự đặc biệt
  str = str.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    " "
  );
  return str;
}

// Hàm tìm kiếm nhân viên theo tên
function searchEmployee() {
  var searchName = removeVietnameseTones(
    document.getElementById("searchName").value.trim().toLowerCase()
  );
  var tableBody = document.getElementById("tableDanhSach");
  tableBody.innerHTML = ""; // Xóa nội dung hiện tại

  var filteredEmployees = employees.filter(function (employee) {
    return employee.name.toLowerCase().includes(searchName); // Tìm kiếm tên nhân viên
  });

  filteredEmployees.forEach(function (employee, index) {
    // Lặp qua mảng nhân viên đã lọc
    var row = document.createElement("tr");
    row.innerHTML = `
          <td>${employee.account}</td>
          <td>${employee.name}</td>
          <td>${employee.email}</td>
          <td>${employee.date}</td>
          <td>${employee.salary}</td>
          <td>${employee.position}</td>
          <td>${employee.hours}</td>
          <td>${employee.totalSalary}</td>
          <td>${employee.type}</td>
          <td>
              <button class="btn btn-primary btn-sm" data-toggle="modal" data-target="#myModal" onclick="editEmployee(${index})">Cập nhật</button>
              <button class="btn btn-danger btn-sm" onclick="deleteEmployee(${index})">Xóa</button>
          </td>
      `;
    tableBody.appendChild(row); // Thêm dòng vào bảng
  });
}

// Sự kiện nhấn nút tìm kiếm
document.getElementById("btnTimNV").addEventListener("click", searchEmployee);

// Sự kiện nhấn Enter trong ô tìm kiếm
document
  .getElementById("searchName")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      searchEmployee(); // Gọi hàm tìm kiếm khi nhấn Enter
      event.preventDefault(); // Ngăn chặn hành động mặc định của Enter
    }
  });
