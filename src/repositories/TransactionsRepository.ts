import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface Request {
  value: number;
  type: 'income' | 'outcome';
  title: string;
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
    const { value: income } = this.transactions.reduce(
      (total, next) => {
        if (next.type === 'income') {
          total.value += next.value;
        }
        return total;
      },
      { value: 0 },
    );

    const { value: outcome } = this.transactions.reduce(
      (total, next) => {
        if (next.type === 'outcome') {
          total.value += next.value;
        }
        return total;
      },
      { value: 0 },
    );

    const total = income - outcome;

    const balance = {
      income,
      outcome,
      total,
    };

    return balance;
  }

  public create({ value, title, type }: Request): Transaction {
    const transaction = new Transaction({ value, title, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
