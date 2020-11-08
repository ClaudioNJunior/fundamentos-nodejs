import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const totalIncome = this.transactions.filter(transaction => transaction.type === 'income').map(transaction => transaction.value).reduce((a, b) => a + b, 0);
    const totalOutcome = this.transactions.filter(transaction => transaction.type === 'outcome').map(transaction => transaction.value).reduce((a, b) => a + b, 0);

    return { income: totalIncome, outcome: totalOutcome, total: totalIncome - totalOutcome };
  }

  public create(title: string, value: number, type: 'income' | 'outcome'): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
