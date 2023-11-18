
let tableEntries = [];
document.addEventListener('DOMContentLoaded', () => {
    const storedData = localStorage.getItem('expenseData');
    if (storedData) {
        tableEntries = JSON.parse(storedData);
        updateTable();
    }
});

function updateSummary() { 
	let totalIncome = tableEntries.reduce((t, e) => { 
		if (e.type === 1) t += e.amount; 
		return t; 
	}, 0); 
	let totalExpense = tableEntries.reduce((ex, e) => { 
		if (e.type === 0) ex += e.amount; 
		return ex; 
	}, 0); 
	updatedInc.innerText = totalIncome; 
	updatedExp.innerText = totalExpense; 
	updatedBal.innerText = totalIncome - totalExpense; 
} 



function addItem() { 
	let type = itemType.value; 
	let name = document.getElementById("name"); 
	let amount = document.getElementById("amount"); 
  let dateInput = document.getElementById("expenseDate");

	// Input validation 
	if (name.value === "" || Number(amount.value) === 0) 
		return alert("Incorrect Input"); 
	if (Number(amount.value) <= 0) 
		return alert( 
			"Incorrect amount! can't add negative"
		); 

	tableEntries.push({ 
		type: Number(type), 
		name: name.value, 
		amount: Number(amount.value), 
     date: dateInput.value,
	}); 

	updateTable(); 
	name.value = ""; 
	amount.value = 0; 
     dateInput.value = "";
} 
function loadItems(e, i) { 
	let cls; 

	let table = document.getElementById("table"); 
	let row = table.insertRow(i + 1); 
	let cell0 = row.insertCell(0); 
	let cell1 = row.insertCell(1); 
	let cell2 = row.insertCell(2); 
	let c3 = row.insertCell(3); 
	let c4 = row.insertCell(4); 
	cell0.innerHTML = i + 1; 
	cell1.innerHTML = e.name; 
	cell2.innerHTML = e.amount; 
	c4.innerHTML = "☒"; 
	c4.classList.add("zoom"); 
	c4.addEventListener("click", () => del(e)); 
   let c5 = row.insertCell(5);
	if (e.type == 0) { 
		cls = "red"; 
		c3.innerHTML = "➚"; 
	} else { 
		cls = "green"; 
		c3.innerHTML = "➘"; 
	} 
	c3.style.color = cls;
  c5.innerHTML = e.date;
} 

// Clear the table before updation 
function remove() { 
	while (table.rows.length > 1) table.deleteRow(-1); 
 
} 

// Function to delete a specific entry 
function del(el) { 
	remove(); 
	tableEntries = tableEntries.filter( 
		(e) => e.name !== el.name 
	); 
	tableEntries.map((e, i) => loadItems(e, i)); 
	updateSummary(); 
} 

// To render all entries 
function updateTable() { 
	remove(); 
	tableEntries.map((e, i) => { 
		loadItems(e, i); 
	}); 
	updateSummary(); 
} 

updateTable();

