class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    let balance = 0;
    for (let i of this.transactions) {
      balance += i.value;
    }
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

}


class Transaction {

  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    if (!this.isAllowed()) return false;
    this.time = new Date();
    this.account.addTransaction(this);
    return true;
  }

}

class Withdrawal extends Transaction {

  get value() {
    return -this.amount;
  }

  isAllowed() {
    // has access to this.account b/c of parent
    return (this.account.balance - this.amount >= 0);
  }

}

class Deposit extends Transaction {

  get value() {
    return this.amount;
  }

  isAllowed() {
    return true;
  }

}


// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account("snow-patrol");

console.log('Starting Balance:', myAccount.balance);

console.log('Attempting to withdraw even $1 should fail...');
const t1 = new Withdrawal(1.00, myAccount);
console.log('Commit result:', t1.commit());
console.log('Account Balance: ', myAccount.balance);
console.log('-----------------');
console.log('Depositing should succeed...');
const t2 = new Deposit(10.00, myAccount);
console.log('Commit result:', t2.commit());
console.log('Account Balance: ', myAccount.balance);
// console.log('-----------------');
// console.log('Withdrawal for 9.99 should be allowed...');
// const t3 = new Withdrawal(9.99, myAccount);
// console.log('Commit result:', t3.commit());
// console.log('Account Balance: ', myAccount.balance);
// console.log('-----------------');
// console.log('Account Transaction History: ', myAccount.transactions);
