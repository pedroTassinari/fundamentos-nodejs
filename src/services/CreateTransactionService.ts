import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    if (type !== 'income' && type !== 'outcome') {
      throw Error('Type must be income or outcome');
    }

    if (type === 'outcome') {
      const { total } = this.transactionsRepository.getBalance();

      if (total - value < 0) {
        throw Error('You must have enough money');
      }
    }

    const createdTransaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return createdTransaction;
  }
}

export default CreateTransactionService;
