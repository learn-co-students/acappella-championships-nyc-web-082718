document.addEventListener('DOMContentLoaded', () => {

  const tableBody = document.getElementById('table-body')
  const winnerBar = document.getElementById('winner')

  fetch('http://localhost:3000/a_cappella_groups')
  .then(response => {
    return response.json()
  })
  .then(data => {
    console.log(data)

    data.forEach(group => {
      const tr = document.createElement('tr')

      const collegeTd = document.createElement('td')
      const groupTd = document.createElement('td')
      const membershipTd = document.createElement('td')
      const divisionTd = document.createElement('td')
      const imageTd = document.createElement('td')
      const image = document.createElement('img')

      collegeTd.innerText = group.college.name
      groupTd.innerText = group.name
      membershipTd.innerText = group.membership
      divisionTd.innerText = group.college.division
      image.src = './assets/trophy.png'
      image.dataset.id = group.id

      tableBody.appendChild(tr)
      tr.appendChild(collegeTd)
      tr.appendChild(groupTd)
      tr.appendChild(membershipTd)
      tr.appendChild(divisionTd)
      tr.appendChild(imageTd)
      imageTd.appendChild(image)


      image.addEventListener('click', (event) => {
        winnerBar.appendChild(collegeTd)
        winnerBar.appendChild(groupTd)

        membershipTd.remove()
        divisionTd.remove()
        imageTd.remove()
      }) //END OF CLICK ADDEL
    }) //END OF FOR EACH
  }) //END OF FETCH
}) //END OF DOM
