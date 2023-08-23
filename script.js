const employeeTable = document.getElementById("employee-table");
const addButton = document.getElementById("add-button");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const employeeForm = document.getElementById("employee-form");
const closeButton = document.getElementById("close-button");
const saveButton = document.getElementById("save-button");

let employees = [
    { id: 1, name: "John Doe", position: "Manager" },
    { id: 2, name: "Jane Smith", position: "Developer" }
];

function renderEmployees() {
    employeeTable.innerHTML = `
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Position</th>
            <th>Action</th>
        </tr>
        ${employees.map(employee => `
            <tr>
                <td>${employee.id}</td>
                <td>${employee.name}</td>
                <td>${employee.position}</td>
                <td>
                    <button class="edit-button" data-id="${employee.id}">Edit</button>
                    <button class="delete-button" data-id="${employee.id}">Delete</button>
                </td>
            </tr>
        `).join("")}
    `;
}

function openModal(title) {
    modalTitle.textContent = title;
    modal.style.display = "block";
}

function closeModal() {
    modal.style.display = "none";
    employeeForm.reset();
}

addButton.addEventListener("click", () => {
    openModal("Add Employee");
});

closeButton.addEventListener("click", () => {
    closeModal();
});

saveButton.addEventListener("click", event => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const position = document.getElementById("position").value;
    
    if (modalTitle.textContent === "Add Employee") {
        const newEmployee = { id: employees.length + 1, name, position };
        employees.push(newEmployee);
    } else if (modalTitle.textContent === "Edit Employee") {
        const id = parseInt(saveButton.getAttribute("data-id"));
        const employee = employees.find(emp => emp.id === id);
        employee.name = name;
        employee.position = position;
    }
    
    renderEmployees();
    closeModal();
});

employeeTable.addEventListener("click", event => {
    const target = event.target;
    if (target.classList.contains("edit-button")) {
        const id = parseInt(target.getAttribute("data-id"));
        const employee = employees.find(emp => emp.id === id);
        document.getElementById("name").value = employee.name;
        document.getElementById("position").value = employee.position;
        saveButton.textContent = "Update";
        saveButton.setAttribute("data-id", id);
        openModal("Edit Employee");
    } else if (target.classList.contains("delete-button")) {
        const id = parseInt(target.getAttribute("data-id"));
        employees = employees.filter(emp => emp.id !== id);
        renderEmployees();
    }
});

renderEmployees();
