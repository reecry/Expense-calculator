var budgetInput = document.querySelector("#budgetInput");
var expenseTitle = document.querySelector("#expenseInput");
var expenseAmount = document.querySelector("#expenseAmountInput");
var totalExpensesList = [];
var budget = 0;

//Budget Entry
document.querySelector("#calcBtn").addEventListener("click", function() {
  if (budgetInput.value.trim() === "") {
    var budgetErrorMsg = document.querySelector("#budget-error-message");
    displayErrorMessage(budgetErrorMsg,"Please, Enter a Valid Number in the Budget Field");
  } else {
    budget = budgetInput.value;
    document.querySelector("#budgetMoney").innerHTML = "₹" + budget;
    budgetInput.value = "";
  }
});

//Expenses List
document.querySelector("#expenseBtn").addEventListener("click", function() {
  var number = expenseAmount.value;
  var name = expenseTitle.value;
  if (expenseTitle.value.trim() === "" || expenseAmount.value.trim() === "") {
    var expenseErrorMsg = document.querySelector("#expense-error-message");
    displayErrorMessage(expenseErrorMsg,"Please, Enter a Expense Title AND Amount");
  } else {
    var editIcon = document.createElement("i");
    editIcon.classList.add("fa", "fa-pencil-square-o", "editBtn");
    editIcon.addEventListener("click", function() {
      editItem(this, number, name);
    });

    var removeIcon = document.createElement("i");
    removeIcon.classList.add("fa", "fa-trash", "removeBtn");
    removeIcon.addEventListener("click", function() {
      removeItem(this, number);
    });

    var table = document.querySelector("table");
    var new_row = document.createElement("tr");
    var icons_td = document.createElement("td");
    icons_td.appendChild(editIcon);
    icons_td.appendChild(removeIcon);

    totalExpensesList.push(number);
    new_td_title = document.createElement("td");
    new_td_title.classList.add("expense-title");
    new_td_title.innerHTML = expenseTitle.value;

    new_td_amount = document.createElement("td");
    new_td_amount.classList.add("expense-amount");
    new_td_amount.innerHTML = "₹" + expenseAmount.value;

    new_td_icons = document.createElement("td");
    new_td_icons.classList.add("icons");
    new_td_icons.appendChild(editIcon);
    new_td_icons.appendChild(removeIcon);

    new_row.appendChild(new_td_title);
    new_row.appendChild(new_td_amount);
    new_row.appendChild(new_td_icons);
    table.appendChild(new_row);

    expenseTitle.value = "";
    expenseAmount.value = "";
  }
});

//ExpensesDisplay
function expensesSum() {
  var expensesSum = 0;
  for (let i = 0; i < totalExpensesList.length; i++) {
    expensesSum += parseInt(totalExpensesList[i]);
  }
  return expensesSum;
}
setInterval(function() {
  document.querySelector("#expensesMoney").innerHTML = "₹" + expensesSum();
}, 100);

//Balance Display
function balanceDisplay() {
  var balanceText = document.querySelector("#balanceMoney");
  var balanceValue = budget - expensesSum();
  if (balanceValue > 0) {
    balanceText.style.color = "green";
  } else if (balanceValue < 0) {
    balanceText.style.color = "rgb(180,0,0)";
  } else {
    balanceText.style.color = "black";
  }
  balanceText.innerHTML = "₹" + balanceValue;
}

setInterval(balanceDisplay, 10);

//
//Font awesome buttons : Remove and Edit:

//Remove button (Font awesome icon)
function removeItem(object, number) {
  //
  object.parentElement.parentElement.remove(); 
  var newExpensesList = [];
  for (let i = 0; i < totalExpensesList.length; i++) {
    if (totalExpensesList[i] != number) {
      newExpensesList.push(parseInt(totalExpensesList[i]));
    }
  }
  console.log(newExpensesList);
  totalExpensesList = newExpensesList;
  console.log("The old array should be updated, " + totalExpensesList);
}

//Edit button (Font awesome Icon)
function editItem(object, number, name) {
  removeItem(object, number);
  expenseTitle.value = name;
  expenseAmount.value = number;
  document.querySelector("#expenseBtn").focus();
}

function displayErrorMessage(obj, text) {
  obj.classList.add("error-active");
  obj.innerHTML = text;
  setTimeout(function() {
    obj.classList.remove("error-active");
    obj.innerHTML = "";
  }, 2500);
}
// function searchTable() {
//   var input, filter, found, table, tr, td, i, j;
//   input7 = document.getElementById("myInput");
//   filter1 = input.value.toUpperCase();
//   table8 = document.getElementById("table-list");
//   console.log(table8);
//   tr = table8.getElementsByTagName("tr");
//   for (i = 0; i < tr.length; i++) {
//       td = tr[i].getElementsByTagName("td");
//       for (j = 0; j < td.length; j++) {
//           if (td[j].innerHTML.toUpperCase().indexOf(filter1) > -1) {
//               found = true;
//           }
//       }
//       if (found) {
//           tr[i].style.display = "";}}}

function myFunction() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
}

          
    