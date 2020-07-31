(() => {
  let clientContainer = document.querySelector("#clientContainer");
  let techContainer = document.querySelector("#techContainer");
  let optionalContainer = document.querySelector("#optionalContainer");
  let lessAvgDropdown = document.querySelector("#lessAvg");
  let highestMarkDropdown = document.querySelector("#highMarks");
  let highSalaryDropdown = document.querySelector("#highSalary");

  clientRowCreator = (clientData) => {
    let row = document.createElement("tr");
    let clientHold = document.createElement("th");
    let clientAnchor = document.createElement("a");

    clientHold.setAttribute("scope", "row");
    clientAnchor.innerText = clientData;

    clientAnchor.addEventListener("click", (event) => {
      sessionStorage.setItem("client", `${clientAnchor.innerText}`);
      window.location.href = "./client.html";
    });

    clientHold.appendChild(clientAnchor);
    row.appendChild(clientHold);
    return row;
  };

  techRowCreator = (techData) => {
    let row = document.createElement("tr");
    let techHold = document.createElement("th");
    let techAnchor = document.createElement("a");

    techHold.setAttribute("scope", "row");
    techAnchor.innerText = techData;

    techAnchor.addEventListener("click", (event) => {
      sessionStorage.setItem("tech", `${techAnchor.innerText}`);
      window.location.href = "./tech.html";
    });

    techHold.appendChild(techAnchor);
    row.appendChild(techHold);
    return row;
  };

  optionalRowBuilder = (data) => {
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

  clientData = (clientUrl) => {
    fetch(clientUrl)
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

        for (let i = 0; i < dataCount; i++) {
          let row = clientRowCreator(data[i]);
          clientContainer.appendChild(row);

          let lessAvgAnchor = document.createElement("a");
          let highestMarksAnchor = document.createElement("a");
          let highestSalaryAnchor = document.createElement("a");
          lessAvgAnchor.classList = "dropdown-item";
          highestMarksAnchor.classList = "dropdown-item";
          highestSalaryAnchor.classList = "dropdown-item";
          lessAvgAnchor.innerText = data[i];
          highestMarksAnchor.innerText = data[i];
          highestSalaryAnchor.innerText = data[i];

          lessAvgAnchor.addEventListener("click", (event) => {
            optionalContainer.innerHTML = "";
            fetch(`http://localhost:8081/client/salary/lessavg/${lessAvgAnchor.innerText}`)
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
                  let row = optionalRowBuilder(data[i]);
                  optionalContainer.appendChild(row);
                }
              })
              .catch((error) => {
                console.log(`Error: ${error.status}, ${error.statusText}`);
              });
          });

          highestMarksAnchor.addEventListener("click", (event) => {
            optionalContainer.innerHTML = "";
            fetch(`http://localhost:8081/client/highestmarks/${highestMarksAnchor.innerText}`)
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
                  let row = optionalRowBuilder(data[i]);
                  optionalContainer.appendChild(row);
                }
              })
              .catch((error) => {
                console.log(`Error: ${error.status}, ${error.statusText}`);
              });
          });

          highestSalaryAnchor.addEventListener("click", (event) => {
            optionalContainer.innerHTML = "";
            fetch(`http://localhost:8081/client/maxSalary/${highestSalaryAnchor.innerText}`)
              .then((response) => {
                  console.log(response);
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
                console.log(dataCount);
                for (let i = 0; i < dataCount; i++) {
                  let row = optionalRowBuilder(data[i]);
                  optionalContainer.appendChild(row);
                }
              })
              .catch((error) => {
                console.log(`Error: ${error.status}, ${error.statusText}`);
              });
          });

          lessAvgDropdown.appendChild(lessAvgAnchor);
          highestMarkDropdown.appendChild(highestMarksAnchor);
          highSalaryDropdown.appendChild(highestSalaryAnchor);
        }
      })
      .catch((error) => {
        console.log(`Error: ${error.status}, ${error.statusText}`);
      });
  };

  techData = (techUrl) => {
    fetch(techUrl)
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
          let row = techRowCreator(data[i]);
          techContainer.appendChild(row);
        }
      })
      .catch((error) => {
        console.log(`Error: ${error.status}, ${error.statusText}`);
      });
  };


  let clientUrl = "http://localhost:8081/client/show/all";
  let techUrl = "http://localhost:8081/tech";
  clientData(clientUrl);
  techData(techUrl);
})(window);
