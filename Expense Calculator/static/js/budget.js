class BudgetApp{
    constructor(addBudgetBtn,addExpenseBtn,table){
        addBudgetBtn.addEventListener('click', this.addBudget.bind(this));
        addExpenseBtn.addEventListener('click', this.addExpense.bind(this));
        table.addEventListener('click', this.deleteExpense.bind(this));
        table.addEventListener('click' , this.editExpenses.bind(this));
        this.budgetAmount = document.querySelector("#budget-amount");
        this.errors = document.querySelectorAll(".error");
        this.showBudget = document.querySelector("#feedback-item__budget__show");
        this.showExpenses = document.querySelector(
        "#feedback-item__expenses__show");
        this.showBalance = document.querySelector("#feedback-item__balance__show");
        this.expenseName = document.querySelector("#expense-name");
        this.expenseAmount = document.querySelector("#expense-amount");
        this.template = document.querySelector("#expense-row");
        this.tbody = document.querySelector("tbody");
        this.clone;
    }
    addBudget(){
        if(+this.budgetAmount.value <= 0  ||
            isNaN(+this.budgetAmount.value)){
                this.errors[0].classList.add('error-show');
                this.budgetAmount.classList.add('input-error');
                setTimeout(()=>{
                    this.errors[0].classList.remove('error-show');
                this.budgetAmount.classList.remove('input-error');
                },3000);
            }else{
                this.showBudget.innerText = +this.budgetAmount.value;
                this.showBalance.innerText = +this.budgetAmount.value - +this.showExpenses.innerText;
                this.budgetAmount.value = '';
            }
    }
    
    addExpense(){
        if(this.expenseName.value === '' ||
            /\d/.test(this.expenseName.value)){
                this.errors[1].classList.add('error-show');
                this.expenseName.classList.add('input-error');
                setTimeout(()=>{
                    this.errors[1].classList.remove('error-show');
                this.expenseName.classList.remove('input-error');
                },3000);
            }
            else if(+this.expenseAmount.value <= 0 ||
                isNaN(+this.expenseAmount.value)){
                    this.errors[2].classList.add('error-show');
                    this.expenseAmount.classList.add('input-error');
                    setTimeout(()=>{
                        this.errors[2].classList.remove('error-show');
                    this.expenseAmount.classList.remove('input-error');
                    },3000);
                }
            else{
                this.clone = this.template.content.cloneNode(true);
                let td = this.clone.querySelectorAll('td');
                td[0].innerText = this.expenseName.value;
                td[1].innerText = +this.expenseAmount.value;
                this.tbody.appendChild(this.clone);

                this.showExpenses.innerText = +this.showExpenses.innerText + +this.expenseAmount.value;
                this.showBalance.innerText = +this.showBalance.innerText - +this.expenseAmount.value;

                this.expenseName.value = '';
                this.expenseAmount.value = '';
            }
    }
    deleteExpense(e){
        if(e.target.classList.contains('deleteRow')){
            this.showBalance.innerText = +this.showBalance.innerText + +e.target.closest('tr').children[1].innerText;

            this.showExpenses.innerText = +this.showExpenses.innerText - +e.target.closest('tr').children[1].innerText;

            e.target.closest('tr').remove();
        }
    }

    editExpenses(e){
        if(e.target.classList.contains('editRow')){
            this.showBalance.innerText = +this.showBalance.innerText + +e.target.closest('tr').children[1].innerText;
            this.showExpenses.innerText = +this.showExpenses.innerText - +e.target.closest('tr').children[1].innerText;
            this.expenseName.value = e.target.closest('tr').children[0].innerText;
            this.expenseAmount.value = e.target.closest('tr').children[1].innerText;
            this.expenseName.focus();
            e.target.closest('tr').remove();
        }
    }
}


document.addEventListener('DOMContentLoaded', init);


function init(){
    const addBudgetBtn = document.querySelector('#add-budget');
    const addExpenseBtn = document.querySelector('#expense-add');
    const table = document.querySelector('table');
    new BudgetApp(addBudgetBtn,addExpenseBtn,table);
}