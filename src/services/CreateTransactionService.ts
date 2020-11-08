import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request{
  title: string;

  value: number;
  
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({title, value, type}: Request): Transaction {

    if(type === 'outcome' && this.transactionsRepository.getBalance().total < value){
      throw new Error('Can\'t create outcome without a valid balance');
    }

    return this.transactionsRepository.create(title, value, type);
  }
}

export default CreateTransactionService;
