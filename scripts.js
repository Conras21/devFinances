const Modal = {
    open(){
        // Abrir modal
        // Adicionar a class active ao model
        document.querySelector('.modal-overlay')
        .classList.add('active')
    },

    close(){
        // fechar o modal
        // remover a classe active
        document.querySelector('.modal-overlay')
        .classList.remove('active')
    }
}

const transactions = [{
    description: 'Luz',
    amount: -50000,
    date: '23/01/2021',
}, 
{
    description: 'Website',
    amount: 500000,
    date: '23/01/2021',
}, 
{
    description: 'Internet',
    amount: -20000,
    date: '23/01/2021',
}, {

    description: 'x',
    amount: -2000,
    date: '23/01/2021'
} , {
    description: 'x',
    amount: 2000,
    date: '23/01/2021'
}

]

const Transaction = {
    all: transactions,

    add(transaction){
        Transaction.all.push(transaction)
        console.log(Transaction.all)
    },

    remove(index){
        Transaction.all.splice(index, 1)

        App.reload()
    },

    incomes() {
        //Pegar as transações e se > 0 somar à uma variavel e retornar a variável
        let income = 0;

        Transaction.all.forEach(transaction => {
            if (transaction.amount > 0) {
                income += transaction.amount
            }
        })

        return income;
    },

    expenses() {
        let expense = 0;

        Transaction.all.forEach(transaction => {
            if (transaction.amount < 0) {
                expense += transaction.amount
            }
        })

        return expense;
    },
    total() {
        return Transaction.incomes() + Transaction.expenses()
    }
}

//substituir os dados do HTML com os dados do JS

const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index){
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLtransaction(transaction)
        DOM.transactionsContainer.appendChild(tr)
    },
    innerHTMLtransaction(transaction) {
        const CSSclass = transaction.amount > 0 ? "income" : "expense"

        const amount = Utils.formatCurrency(transaction.amount)


        const html = `
                <td class="description">${transaction.description}</td>
                <td class="${CSSclass}">${amount}</td>
                <td class="date">${transaction.date}</td>
                <td>
                    <img src="./assets/minus.svg" alt="Remover transação">
                </td>
        `

        return html
    },

    updateBalance() {
        document.getElementById("incomeDisplay").innerHTML = Utils.formatCurrency(Transaction.incomes())
        document.getElementById("expenseDisplay").innerHTML = Utils.formatCurrency(Transaction.expenses())
        document.getElementById("totalDisplay").innerHTML = Utils.formatCurrency(Transaction.total())
    },

    clearTransactions () {
        DOM.transactionsContainer.innerHTML = ""
    }
}


const Utils = {
    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : ""

        value = String(value).replace(/\D/g, "")
        value = Number(value) / 100
        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })

        return signal + value
    },

    formatAmount(value){
        
    }
}

const Form = {
    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),

    getValues(){
        return{
            decription: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value
        }

    },


    formatValues(){
        let { description, amount, date } = Form.getValues()
        amount = Utils.formatAmount(amount)
    },

    validateFields() {
        const { description, amount, date } = Form.getValues()

        if (description.trim() === "" || amount.trim() === "" || date.trim() === "") {
            throw new Error("Por favor, preencha todos os campos")
            
        }
    },


    submit(event){
        event.preventDefault()

        //verificar se todas as informações foram preenchidas
        try {
            Form.validateFields()
        } catch (error) {
            alert(error.message)   
        }
    }
}

const App = {
    init() {
        Transaction.all.forEach(transaction => {
            DOM.addTransaction(transaction)
        })

        DOM.updateBalance()

    },

    reload() {
        DOM.clearTransactions()
        App.init() 
    },
}




App.init()



