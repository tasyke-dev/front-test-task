const cargoList = [
    {
      id: "CARGO001",
      name: "Строительные материалы",
      status: "В пути",
      origin: "Москва",
      destination: "Казань",
      departureDate: "2024-11-24",
    },
    {
      id: "CARGO002",
      name: "Хрупкий груз",
      status: "Ожидает отправки",
      origin: "Санкт-Петербург",
      destination: "Екатеринбург",
      departureDate: "2024-11-26",
    },
  ];
  
  const statusColors = {
    "Ожидает отправки": "status-waiting",
    "В пути": "status-in-transit",
    "Доставлен": "status-delivered",
  };
  
  const tableBody = document.getElementById("cargoTable");
  const statusFilter = document.getElementById("statusFilter");
  
  function updateTable() {
    const filter = statusFilter.value;
    tableBody.innerHTML = "";
  
    cargoList
      .filter((cargo) => !filter || cargo.status === filter)
      .forEach((cargo, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${index + 1}</td>
          <td>${cargo.name}</td>
          <td>
            <div class="d-flex align-items-center">
              <span class="status-indicator ${statusColors[cargo.status]} me-2"></span>
              <select onchange="updateStatus(${index}, this.value)" class="form-select w-auto">
                <option value="Ожидает отправки" ${cargo.status === "Ожидает отправки" ? "selected" : ""}>Ожидает отправки</option>
                <option value="В пути" ${cargo.status === "В пути" ? "selected" : ""}>В пути</option>
                <option value="Доставлен" ${cargo.status === "Доставлен" ? "selected" : ""}>Доставлен</option>
              </select>
            </div>
          </td>
          <td>${cargo.origin}</td>
          <td>${cargo.destination}</td>
          <td>${cargo.departureDate}</td>
        `;
        tableBody.appendChild(row);
      });
  }
  

  function updateStatus(index, newStatus) {
    const cargo = cargoList[index];
    if (newStatus === "Доставлен" && new Date(cargo.departureDate) > new Date()) {
      alert("Ошибка: Нельзя доставить груз, если дата отправления в будущем.");
      return;
    }
    cargo.status = newStatus;
    updateTable();
  }
  

  document.getElementById("addCargoButton").addEventListener("click", () => {
    const name = document.getElementById("cargoName").value;
    const origin = document.getElementById("origin").value;
    const destination = document.getElementById("destination").value;
    const departureDate = document.getElementById("departureDate").value;
  
    if (!name || !origin || !destination || !departureDate) {
      alert("Ошибка: Все поля должны быть заполнены.");
      return;
    }
  
    cargoList.push({
      id: `CARGO${String(cargoList.length + 1).padStart(3, "0")}`,
      name,
      status: "Ожидает отправки",
      origin,
      destination,
      departureDate,
    });
  
    document.getElementById("addCargoForm").reset();
    bootstrap.Modal.getInstance(document.getElementById("addCargoModal")).hide();
    updateTable();
  });
  
  statusFilter.addEventListener("change", updateTable);
  
  updateTable();
  