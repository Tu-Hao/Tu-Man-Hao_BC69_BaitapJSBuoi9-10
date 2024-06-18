// var employees = [];
// var currentIndex = -1; // Biến lưu chỉ số của nhân viên đang được cập nhật

// function Employee(account, name, email, password, date, salary, position, hours) {
//     this.account = account;
//     this.name = name;
//     this.email = email;
//     this.password = password;
//     this.date = date;
//     this.salary = salary;
//     this.position = position;
//     this.hours = hours;
//     this.totalSalary = calculateTotalSalary(salary, position);
//     this.type = determineEmployeeType(hours);
// }

// function calculateTotalSalary(salary, position) {
//     salary = parseFloat(salary);
//     if (position === "Giám đốc") {
//         return salary * 3;
//     } else if (position === "Trưởng phòng") {
//         return salary * 2;
//     } else {
//         return salary;
//     }
// }

// function determineEmployeeType(hours) {
//     hours = parseFloat(hours);
//     if (hours >= 192) {
//         return "Xuất sắc";
//     } else if (hours >= 176) {
//         return "Giỏi";
//     } else if (hours >= 160) {
//         return "Khá";
//     } else {
//         return "Trung bình";
//     }
// }

// document.getElementById('btnThemNV').addEventListener('click', addEmployee);
// document.getElementById('btnCapNhat').addEventListener('click', updateEmployee);

// function validate() {
//     var account = document.getElementById("tknv").value.trim();
//     var name = document.getElementById("name").value.trim();
//     var email = document.getElementById("email").value.trim();
//     var password = document.getElementById("password").value.trim();
//     var date = document.getElementById("datepicker").value.trim();
//     var salary = document.getElementById("luongCB").value.trim();
//     var position = document.getElementById("chucvu").value;
//     var hours = document.getElementById("gioLam").value.trim();

//     var valid = true;
//     var errorMessage = "";

//     // Tài khoản
//     if (!account.match(/^\d{4,6}$/)) {
//         errorMessage += "Tài khoản phải là 4-6 ký số.\n";
//         valid = false;
//     }

//     // Họ và tên
//     if (!name.match(/^[a-zA-Z\s]+$/)) {
//         errorMessage += "Tên nhân viên phải là chữ.\n";
//         valid = false;
//     }

//     // Email
//     if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
//         errorMessage += "Email không hợp lệ.\n";
//         valid = false;
//     }

//     // Mật khẩu
//     if (!password.match(/^(?=.*[A-Z])(?=.*\d)(?=.*\W).{6,10}$/)) {
//         errorMessage += "Mật khẩu phải từ 6-10 ký tự, chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt.\n";
//         valid = false;
//     }

//     // Ngày làm
//     if (!date.match(/^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/)) {
//         errorMessage += "Ngày làm không hợp lệ. Định dạng mm/dd/yyyy.\n";
//         valid = false;
//     }

//     // Lương cơ bản
//     if (!salary.match(/^\d+$/) || parseFloat(salary) < 1000000 || parseFloat(salary) > 20000000) {
//         errorMessage += "Lương cơ bản phải từ 1,000,000 đến 20,000,000.\n";
//         valid = false;
//     }

//     // Chức vụ
//     if (["Giám đốc", "Trưởng phòng", "Nhân viên"].indexOf(position) === -1) {
//         errorMessage += "Chức vụ không hợp lệ.\n";
//         valid = false;
//     }

//     // Giờ làm
//     if (!hours.match(/^\d+$/) || parseFloat(hours) < 80 || parseFloat(hours) > 200) {
//         errorMessage += "Giờ làm phải từ 80 đến 200 giờ.\n";
//         valid = false;
//     }

//     if (!valid) {
//         alert(errorMessage);
//     }

//     return valid;
// }

// function addEmployee() {
//     if (validate()) {
//         var account = document.getElementById("tknv").value.trim();
//         var name = document.getElementById("name").value.trim();
//         var email = document.getElementById("email").value.trim();
//         var password = document.getElementById("password").value.trim();
//         var date = document.getElementById("datepicker").value.trim();
//         var salary = document.getElementById("luongCB").value.trim();
//         var position = document.getElementById("chucvu").value;
//         var hours = document.getElementById("gioLam").value.trim();

//         var employee = new Employee(account, name, email, password, date, salary, position, hours);
//         employees.push(employee);
//         displayEmployees();
//         clearForm();
//     }
// }

// function deleteEmployee(index) {
//     employees.splice(index, 1);
//     displayEmployees();
// }

// function editEmployee(index) {
//     currentIndex = index;
//     var employee = employees[index];
//     document.getElementById("tknv").value = employee.account;
//     document.getElementById("name").value = employee.name;
//     document.getElementById("email").value = employee.email;
//     document.getElementById("password").value = employee.password;
//     document.getElementById("datepicker").value = employee.date;
//     document.getElementById("luongCB").value = employee.salary;
//     document.getElementById("chucvu").value = employee.position;
//     document.getElementById("gioLam").value = employee.hours;
// }

// function updateEmployee() {
//     if (currentIndex >= 0 && validate()) {
//         var account = document.getElementById("tknv").value.trim();
//         var name = document.getElementById("name").value.trim();
//         var email = document.getElementById("email").value.trim();
//         var password = document.getElementById("password").value.trim();
//         var date = document.getElementById("datepicker").value.trim();
//         var salary = document.getElementById("luongCB").value.trim();
//         var position = document.getElementById("chucvu").value;
//         var hours = document.getElementById("gioLam").value.trim();

//         var employee = new Employee(account, name, email, password, date, salary, position, hours);
//         employees[currentIndex] = employee;
//         displayEmployees();
//         clearForm();
//         currentIndex = -1;
//     }
// }

// function displayEmployees() {
//     var tableBody = document.getElementById("tableDanhSach");
//     tableBody.innerHTML = "";

//     employees.forEach(function(employee, index) {
//         var row = document.createElement('tr');
//         row.innerHTML = `
//             <td>${employee.account}</td>
//             <td>${employee.name}</td>
//             <td>${employee.email}</td>
//             <td>${employee.date}</td>
//             <td>${employee.salary}</td>
//             <td>${employee.position}</td>
//             <td>${employee.hours}</td>
//             <td>${employee.totalSalary}</td>
//             <td>${employee.type}</td>
//             <td>
//                 <button class="btn btn-primary btn-sm" id="btnThem"
//                 data-toggle="modal"
//                 data-target="#myModal" onclick="editEmployee(${index})">Cập nhật</button>
//                 <button class="btn btn-danger btn-sm" onclick="deleteEmployee(${index})">Xóa</button>
//             </td>
//         `;
//         tableBody.appendChild(row);
//     });
// }

// function clearForm() {
//     document.getElementById("tknv").value = "";
//     document.getElementById("name").value = "";
//     document.getElementById("email").value = "";
//     document.getElementById("password").value = "";
//     document.getElementById("datepicker").value = "";
//     document.getElementById("luongCB").value = "";
//     document.getElementById("chucvu").value = "Chọn chức vụ";
//     document.getElementById("gioLam").value = "";
// }

var employees = [];
var currentIndex = -1; // Biến lưu chỉ số của nhân viên đang được cập nhật

function Employee(account, name, email, password, date, salary, position, hours) {
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
document.getElementById('btnCapNhat').addEventListener('click', updateEmployee);

// Lấy dữ liệu từ Local Storage khi tải trang
window.onload = function() {
    loadFromLocalStorage();
    displayEmployees();
};

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
        errorMessage += "Mật khẩu phải từ 6-10 ký tự, chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt.\n";
        valid = false;
    }

    // Ngày làm
    if (!date.match(/^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/)) {
        errorMessage += "Ngày làm không hợp lệ. Định dạng mm/dd/yyyy.\n";
        valid = false;
    }

    // Lương cơ bản
    if (!salary.match(/^\d+$/) || parseFloat(salary) < 1000000 || parseFloat(salary) > 20000000) {
        errorMessage += "Lương cơ bản phải từ 1,000,000 đến 20,000,000.\n";
        valid = false;
    }

    // Chức vụ
    if (["Giám đốc", "Trưởng phòng", "Nhân viên"].indexOf(position) === -1) {
        errorMessage += "Chức vụ không hợp lệ.\n";
        valid = false;
    }

    // Giờ làm
    if (!hours.match(/^\d+$/) || parseFloat(hours) < 80 || parseFloat(hours) > 200) {
        errorMessage += "Giờ làm phải từ 80 đến 200 giờ.\n";
        valid = false;
    }

    if (!valid) {
        alert(errorMessage);
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
        saveToLocalStorage();
        displayEmployees();
        clearForm();
    }
}

function deleteEmployee(index) {
    employees.splice(index, 1);
    saveToLocalStorage();
    displayEmployees();
}

function editEmployee(index) {
    currentIndex = index;
    var employee = employees[index];
    document.getElementById("tknv").value = employee.account;
    document.getElementById("name").value = employee.name;
    document.getElementById("email").value = employee.email;
    document.getElementById("password").value = employee.password;
    document.getElementById("datepicker").value = employee.date;
    document.getElementById("luongCB").value = employee.salary;
    document.getElementById("chucvu").value = employee.position;
    document.getElementById("gioLam").value = employee.hours;
}

function updateEmployee() {
    if (currentIndex >= 0 && validate()) {
        var account = document.getElementById("tknv").value.trim();
        var name = document.getElementById("name").value.trim();
        var email = document.getElementById("email").value.trim();
        var password = document.getElementById("password").value.trim();
        var date = document.getElementById("datepicker").value.trim();
        var salary = document.getElementById("luongCB").value.trim();
        var position = document.getElementById("chucvu").value;
        var hours = document.getElementById("gioLam").value.trim();

        var employee = new Employee(account, name, email, password, date, salary, position, hours);
        employees[currentIndex] = employee;
        saveToLocalStorage();
        displayEmployees();
        clearForm();
        currentIndex = -1;
    }
}

function displayEmployees() {
    var tableBody = document.getElementById("tableDanhSach");
    tableBody.innerHTML = "";

    employees.forEach(function(employee, index) {
        var row = document.createElement('tr');
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
        tableBody.appendChild(row);
    });
}

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

function saveToLocalStorage() {
    localStorage.setItem("employees", JSON.stringify(employees));
}

function loadFromLocalStorage() {
  var data = localStorage.getItem("employees");
  if (data) {
      employees = JSON.parse(data);
      displayEmployees();
  }
}