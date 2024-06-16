var employees = [];

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
  this.totalSalary = calculateTotalSalary(salary, position);
  this.type = determineEmployeeType(hours);
}

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

document.getElementById('btnThemNV').addEventListener('click', addEmployee);

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

    // Tài khoản
    if (!account.match(/^\d{4,6}$/)) {
        document.getElementById("tbTKNV").innerText = "Tài khoản phải là 4-6 ký số.";
        valid = false;
    } else {
        document.getElementById("tbTKNV").innerText = "";
    }

    // Họ và tên
    if (!name.match(/^[a-zA-Z\s]+$/)) {
        document.getElementById("tbTen").innerText = "Tên nhân viên phải là chữ.";
        valid = false;
    } else {
        document.getElementById("tbTen").innerText = "";
    }

    // Email
    if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
        document.getElementById("tbEmail").innerText = "Email không hợp lệ.";
        valid = false;
    } else {
        document.getElementById("tbEmail").innerText = "";
    }

    // Mật khẩu
    if (!password.match(/^(?=.*[A-Z])(?=.*\d)(?=.*\W).{6,10}$/)) {
        document.getElementById("tbMatKhau").innerText = "Mật khẩu phải từ 6-10 ký tự, chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt.";
        valid = false;
    } else {
        document.getElementById("tbMatKhau").innerText = "";
    }

    // Ngày làm
    if (!date.match(/^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/)) {
        document.getElementById("tbNgay").innerText = "Ngày làm không hợp lệ. Định dạng mm/dd/yyyy.";
        valid = false;
    } else {
        document.getElementById("tbNgay").innerText = "";
    }

    // Lương cơ bản
    if (!salary.match(/^\d+$/) || parseFloat(salary) < 1000000 || parseFloat(salary) > 20000000) {
        document.getElementById("tbLuongCB").innerText = "Lương cơ bản phải từ 1,000,000 đến 20,000,000.";
        valid = false;
    } else {
        document.getElementById("tbLuongCB").innerText = "";
    }

    // Chức vụ
    if (["Giám đốc", "Trưởng phòng", "Nhân viên"].indexOf(position) === -1) {
        document.getElementById("tbChucVu").innerText = "Chức vụ không hợp lệ.";
        valid = false;
    } else {
        document.getElementById("tbChucVu").innerText = "";
    }

    // Giờ làm
    if (!hours.match(/^\d+$/) || parseFloat(hours) < 80 || parseFloat(hours) > 200) {
        document.getElementById("tbGiolam").innerText = "Giờ làm phải từ 80 đến 200 giờ.";
        valid = false;
    } else {
        document.getElementById("tbGiolam").innerText = "";
    }

    return valid;
}

function addEmployee() {
    if (validate()) {
        var account = document.getElementById("tknv").value.trim();
        var name = document.getElementById("name").value.trim();
        var email = document.getElementById("email").value.trim();
        var password = document.getElementById("password").value.trim();
        var date = document.getElementById("datepicker").value.trim();
        var salary = document.getElementById("luongCB").value.trim();
        var position = document.getElementById("chucvu").value;
        var hours = document.getElementById("gioLam").value.trim();

        var employee = new Employee(account, name, email, password, date, salary, position, hours);
        employees.push(employee);
        displayEmployees();
    }
}

function displayEmployees() {
  var tableBody = document.getElementById("tableDanhSach");
  tableBody.innerHTML = "";

  employees.forEach(function (employee) {
    var row = tableBody.insertRow();
    row.insertCell(0).innerText = employee.account;
    row.insertCell(1).innerText = employee.name;
    row.insertCell(2).innerText = employee.email;
    row.insertCell(3).innerText = employee.date;
    row.insertCell(4).innerText = employee.salary;
    row.insertCell(5).innerText = employee.position;
    row.insertCell(6).innerText = employee.hours;
    row.insertCell(7).innerText = employee.totalSalary;
    row.insertCell(8).innerText = employee.type;
  });
}
