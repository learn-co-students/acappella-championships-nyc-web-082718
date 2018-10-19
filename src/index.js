ACAURL = 'http://localhost:3000/a_cappella_groups';
ACA = new URL(ACAURL);
WINNERID = 0;

const row = (group) => {
  return `<tr><td>${group.college.name}</td> <td>${group.name}</td> <td>${group.membership}</td> <td>${group.college.division}</td> <td><img src='./assets/trophy.png' onClick="winning(this)" data-id='${group.id}' style="width: 25px"/></td> <td><img src='https://mbtskoudsalg.com/images/trash-can-emoji-png-4.png' onClick="deleteGroup(${group.id})" data-id='${group.id}' style="width: 25px"/></td> </tr>`;
};

const displayGroups = (groups) => {
  return document.getElementById('table-body').innerHTML = groups.map(group => row(group)).join('');
};

const winning = (row) => {
  WINNERID = row.dataset.id;
  showBanner(row.parentElement.parentElement);
  fetchGroups();
};

const fetchGroups = (search=false, deep=false, attr="") => {
  fetch(ACA)
    .then(resp => resp.json())
    .then(groupsJSON => {
      if (search && deep) {
        displayGroups(sortGroupsDeeply(groupsJSON, attr));
      } else if (search) {
        displayGroups(sortGroups(groupsJSON, attr));
      } else if (WINNERID === 0) {
        displayGroups(groupsJSON);
      } else {
        displayGroups(filterGroups(groupsJSON, WINNERID));
      }
    })
};

const filterGroups = (groups, id) => {
  return groups.filter(group => group.id !== parseInt(id));
};

const showBanner = (row) => {
  const banner = document.getElementById('winner');
  const college = row.querySelectorAll('td')[0].innerText;
  const group = row.querySelectorAll('td')[1].innerText;
  banner.innerText = `Winner: ${college} ${group}`;
  banner.parentNode.style = "display: unset";
};

const deleteGroup = (groupId) => {
  fetch(`${ACA}/${groupId}`, {
    method: 'DELETE'
  })
    .then(() => {
      fetchGroups();
    })
};

const sortGroups = (groups, attr) => {
  return groups.sort((a, b) => a[attr].localeCompare(b[attr]));
}

const sortGroupsDeeply = (groups, attr) => {
  return groups.sort((a, b) => a.college[attr].localeCompare(b.college[attr]));
}

document.addEventListener('DOMContentLoaded', event => {
  if (WINNERID === 0) {
    document.getElementById('winner').parentNode.style = "display: none;";
  }
  fetchGroups();

  const columns = [document.querySelectorAll('th')[0],
          document.querySelectorAll('th')[1],
          document.querySelectorAll('th')[2],
          document.querySelectorAll('th')[3]];

  columns.forEach(col => {
    col.addEventListener('click', event => {
      let attr = col.getAttribute('name');
      if (attr.includes("college")) {
        attr = attr.split('-')[1];
        fetchGroups(true, true, attr)
      } else {
        fetchGroups(true, false, attr)
      }
    })
  })

});
