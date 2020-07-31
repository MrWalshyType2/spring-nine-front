(() => {
  let clientName = document.querySelector("#clientName");
  let consultantContainer = document.querySelector("#consultantContainer");
  clientName.innerText = sessionStorage.getItem("client");

  consultantRowBuilder = (data) => {
    let row = document.createElement("tr");
    let consultantId = document.createElement("th");
    let name = document.createElement("td");
    let address = document.createElement("td");
    let technology = document.createElement("td");
    let salary = document.createElement("td");
    let marks = document.createElement("td");

    consultantId.innerText = data.id;
    name.innerText = data.name;
    address.innerText = data.address;
    technology.innerText = data.technology;
    salary.innerText = data.salary;
    marks.innerText = data.marks;

    row.appendChild(consultantId);
    row.appendChild(name);
    row.appendChild(address);
    row.appendChild(technology);
    row.appendChild(salary);
    row.appendChild(marks);

    return row;
  };

  let clientUrl = `http://localhost:8081/client/consultants/c/${sessionStorage.getItem(
    "client"
  )}`;

  clientDataRequest = (url) => {
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject({
            status: response.status,
            statusText: response.statusText,
          });
        }
      })
      .then((data) => {
        let dataCount = data.length;
        console.log(data);
        for (let i = 0; i < dataCount; i++) {
          let row = consultantRowBuilder(data[i]);
          consultantContainer.appendChild(row);
        }
      })
      .catch((error) => {
        console.log(`Error: ${error.status}, ${error.statusText}`);
      });
  };

  clientDataRequest(clientUrl);
})(window);
